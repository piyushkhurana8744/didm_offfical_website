"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { SceneStop, WorldKind } from "./scene-data";
import { SceneErrorBoundary } from "./SceneErrorBoundary";
const LiveCanvas = dynamic(
  () =>
    import("./LearningUniverseCanvas").then((m) => m.LearningUniverseCanvas),
  { ssr: false },
);
function Diagnostics({
  host,
}: {
  host: React.RefObject<HTMLDivElement | null>;
}) {
  const [state, setState] = useState({});
  useEffect(() => {
    const timer = setInterval(
      () => setState({ ...host.current?.dataset }),
      750,
    );
    return () => clearInterval(timer);
  }, [host]);
  return (
    <details className="scene-diagnostics" open>
      <summary>Live scene diagnostics</summary>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </details>
  );
}
export function ImmersiveScene({
  kind = "campus",
  stops,
  active,
  onSelect,
  progressIndex,
}: {
  kind?: WorldKind;
  stops: SceneStop[];
  active: string | null;
  onSelect: (id: string | null) => void;
  progressIndex?: number;
}) {
  const host = useRef<HTMLDivElement>(null);
  const [support, setSupport] = useState<"checking" | "supported" | "fallback">(
    "checking",
  );
  const [reason, setReason] = useState("Loading the interactive scene…");
  const [visible, setVisible] = useState(true);
  const [quality, setQuality] = useState<"mobile" | "desktop">("desktop");
  const [ready, setReady] = useState(false);
  const [entered, setEntered] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const [debug, setDebug] = useState(false);
  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const check = () => {
      setReady(false);
      if (motion.matches) {
        setReason("Still preview · reduced motion is enabled");
        setSupport("fallback");
        return;
      }
      try {
        const c = document.createElement("canvas");
        const gl = c.getContext("webgl2");
        if (!gl) throw Error("WebGL 2 unavailable");
        gl.getExtension("WEBGL_lose_context")?.loseContext();
        setSupport("supported");
      } catch {
        setReason("Still preview · WebGL 2 is unavailable");
        setSupport("fallback");
      }
    };
    check();
    motion.addEventListener("change", check);
    setQuality(matchMedia("(max-width: 767px)").matches ? "mobile" : "desktop");
    setDebug(
      process.env.NODE_ENV === "development" &&
        new URLSearchParams(location.search).has("sceneDebug"),
    );
    return () => motion.removeEventListener("change", check);
  }, []);
  useEffect(() => {
    let intersecting = true;
    const update = () => setVisible(intersecting && !document.hidden);
    const obs = new IntersectionObserver(
      (entries) => {
        intersecting = entries[0].isIntersecting;
        if (intersecting) setEntered(true);
        update();
      },
      { threshold: 0.02 },
    );
    if (host.current) obs.observe(host.current);
    document.addEventListener("visibilitychange", update);
    return () => {
      obs.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  const failure = (error: string) => {
    setReason(error);
    setSupport("fallback");
    if (host.current) host.current.dataset.lastError = error;
  };
  return (
    <div
      ref={host}
      className={`immersive-scene scene-${kind}`}
      data-scene={kind}
      data-mounted="no"
      data-fallback={support === "fallback" ? "yes" : "no"}
      data-fallback-reason={support === "fallback" ? reason : ""}
      data-quality={quality}
      data-ready={ready ? "yes" : "no"}
      data-hover={hover ?? ""}
      aria-label={`Interactive ${kind} learning environment`}
    >
      {(support !== "supported" || !ready) && (
        <div
          className="scene-poster"
          role="img"
          aria-label="DIDM miniature learning campus still preview"
        >
          <img
            src={`/images/3d/${kind === "campus" ? "campus" : "studio"}-poster.webp`}
            alt="A still view of the DIDM digital learning environment"
          />
          <div className="scene-loading">
            <span>
              {support === "fallback"
                ? reason
                : "Preparing your learning campus…"}
            </span>
          </div>
        </div>
      )}
      {support === "supported" && entered && (
        <SceneErrorBoundary
          fallback={
            <div className="scene-loading">The still preview is available.</div>
          }
          onError={failure}
        >
          <LiveCanvas
            kind={kind}
            stops={stops}
            activePortal={active}
            onSelectPortal={onSelect}
            onHover={setHover}
            visible={visible}
            host={host}
            quality={quality}
            onReady={() => {
              setReady(true);
              if (host.current)
                host.current.dataset.readyMs = String(
                  Math.round(performance.now()),
                );
            }}
            onFailure={failure}
            progressIndex={progressIndex}
          />
        </SceneErrorBoundary>
      )}
      <div className="scene-caption">
        <span
          className={support === "supported" && ready ? "scene-live" : ""}
        />
        {support === "fallback"
          ? "Still campus preview"
          : hover
            ? stops.find((s) => s.id === hover)?.name
            : active
              ? "Lab view · return to explore"
              : kind === "campus"
                ? "Explore the miniature campus"
                : "Explore your learning space"}
        <span className="scene-caption-note">
          {support === "supported" ? "Tap a space to look closer" : ""}
        </span>
      </div>
      {debug && <Diagnostics host={host} />}
    </div>
  );
}
