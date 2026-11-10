import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

export class CDPBrowser {
  constructor(options = {}) {
    this.chromePath = options.chromePath || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
    this.port = options.port || 9222;
    this.userDataDir = options.userDataDir || '/tmp/didm-chrome-cdp-profile';
    this.proc = null;
    this.ws = null;
    this.msgId = 0;
    this.callbacks = new Map();
    this.consoleLogs = [];
    this.pageErrors = [];
  }

  async launch() {
    if (!fs.existsSync(this.userDataDir)) {
      fs.mkdirSync(this.userDataDir, { recursive: true });
    }

    this.proc = spawn(this.chromePath, [
      '--headless=new',
      `--remote-debugging-port=${this.port}`,
      `--user-data-dir=${this.userDataDir}`,
      '--no-sandbox',
      '--disable-gpu',
      '--disable-background-networking',
      '--disable-default-apps',
      '--disable-extensions',
      '--disable-sync',
      '--disable-translate',
      '--metrics-recording-only',
      '--no-first-run',
      '--safebrowsing-disable-auto-update',
      'about:blank'
    ], { stdio: 'ignore' });

    // Poll for CDP port to be open
    let wsUrl = null;
    for (let i = 0; i < 30; i++) {
      await new Promise(r => setTimeout(r, 200));
      try {
        const res = await fetch(`http://127.0.0.1:${this.port}/json/new`, { method: 'PUT' });
        const data = await res.json();
        wsUrl = data.webSocketDebuggerUrl;
        if (wsUrl) break;
      } catch (err) {
        // retry
      }
    }

    if (!wsUrl) {
      throw new Error(`Failed to connect to Chrome on port ${this.port}`);
    }

    this.ws = new WebSocket(wsUrl);

    await new Promise((resolve, reject) => {
      this.ws.onopen = resolve;
      this.ws.onerror = reject;
    });

    this.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && this.callbacks.has(msg.id)) {
        const { resolve, reject } = this.callbacks.get(msg.id);
        this.callbacks.delete(msg.id);
        if (msg.error) reject(new Error(msg.error.message || JSON.stringify(msg.error)));
        else resolve(msg.result);
      } else if (msg.method === 'Runtime.consoleAPICalled') {
        const text = msg.params.args.map(a => a.value ?? a.description ?? '').join(' ');
        this.consoleLogs.push({ type: msg.params.type, text });
      } else if (msg.method === 'Runtime.exceptionThrown') {
        this.pageErrors.push(msg.params.exceptionDetails);
      }
    };

    // Enable domains
    await this.send('Page.enable');
    await this.send('Runtime.enable');
    await this.send('DOM.enable');
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = ++this.msgId;
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async setViewport(width, height, isMobile = false, deviceScaleFactor = 1) {
    await this.send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor,
      mobile: isMobile,
      screenOrientation: isMobile && height > width ? { angle: 0, type: 'portraitPrimary' } : { angle: 90, type: 'landscapePrimary' }
    });
    await this.send('Emulation.setVisibleSize', { width, height });
  }

  async setReducedMotion(enabled = true) {
    await this.send('Emulation.setEmulatedMedia', {
      features: [{ name: 'prefers-reduced-motion', value: enabled ? 'reduce' : 'no-preference' }]
    });
  }

  async navigate(url) {
    await this.send('Page.navigate', { url });
    // Wait for load event
    await new Promise(r => setTimeout(r, 1500));
  }

  async waitForSelector(selector, timeoutMs = 8000) {
    const startTime = Date.now();
    while (Date.now() - startTime < timeoutMs) {
      const exists = await this.evaluate(`!!document.querySelector(${JSON.stringify(selector)})`);
      if (exists) return true;
      await new Promise(r => setTimeout(r, 100));
    }
    throw new Error(`Timeout waiting for selector: ${selector}`);
  }

  async evaluate(expression) {
    const res = await this.send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true
    });
    return res.result ? res.result.value : undefined;
  }

  async click(selector) {
    await this.waitForSelector(selector);
    const clicked = await this.evaluate(`(() => {
      const el = document.querySelector(${JSON.stringify(selector)});
      if (!el) return false;
      el.scrollIntoView({ behavior: 'instant', block: 'center' });
      el.click();
      return true;
    })()`);
    if (!clicked) throw new Error(`Could not click element: ${selector}`);
    await new Promise(r => setTimeout(r, 200));
  }

  async type(selector, text) {
    await this.waitForSelector(selector);
    await this.evaluate(`(() => {
      const el = document.querySelector(${JSON.stringify(selector)});
      if (!el) return false;
      el.focus();
      el.value = ${JSON.stringify(text)};
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
      return true;
    })()`);
  }

  async screenshot(filePath, options = {}) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const clip = options.clip;
    const params = { format: 'png' };
    if (clip) params.clip = clip;

    const res = await this.send('Page.captureScreenshot', params);
    const buffer = Buffer.from(res.data, 'base64');
    fs.writeFileSync(filePath, buffer);
    return filePath;
  }

  async screenshotElement(selector, filePath) {
    await this.waitForSelector(selector);
    const rect = await this.evaluate(`(() => {
      const el = document.querySelector(${JSON.stringify(selector)});
      if (!el) return null;
      el.scrollIntoView({ behavior: 'instant', block: 'center' });
      const r = el.getBoundingClientRect();
      return { x: r.x, y: r.y, width: r.width, height: r.height };
    })()`);

    if (!rect || rect.width <= 0 || rect.height <= 0) {
      throw new Error(`Invalid rect for selector ${selector}: ${JSON.stringify(rect)}`);
    }

    return this.screenshot(filePath, {
      clip: {
        x: Math.max(0, rect.x),
        y: Math.max(0, rect.y),
        width: rect.width,
        height: rect.height,
        scale: 1
      }
    });
  }

  async close() {
    try {
      if (this.ws) this.ws.close();
      if (this.proc) this.proc.kill();
    } catch (e) {
      // ignore
    }
  }
}

