"use client";
import { useEffect, useRef, type RefObject } from "react";

/** Keep keyboard interaction inside an open public dialog and restore the invoking control. */
export function useDialogFocus(ref: RefObject<HTMLElement | null>, open: boolean, onDismiss?: () => void) {
  const dismiss = useRef(onDismiss);
  dismiss.current = onDismiss;
  useEffect(() => {
    const dialog = ref.current;
    if (!open || !dialog) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const background = [document.querySelector<HTMLElement>("#main"), document.querySelector<HTMLElement>("footer")].filter((element): element is HTMLElement => !!element && !element.contains(dialog));
    const inertStates = background.map(element => element.inert);
    background.forEach(element => { element.inert = true; });
    const focusable = () => Array.from(dialog.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex="0"]')).filter(element => element.getClientRects().length > 0);
    const frame = requestAnimationFrame(() => (focusable()[0] || dialog).focus());
    const trap = (event: KeyboardEvent) => {
      if (event.key === "Escape" && dismiss.current) { event.preventDefault(); dismiss.current(); return; }
      if (event.key !== "Tab") return;
      const controls = focusable(), first = controls[0], last = controls[controls.length - 1];
      if (!first) { event.preventDefault(); dialog.focus(); }
      else if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    const contain = (event: FocusEvent) => { if (!dialog.contains(event.target as Node)) (focusable()[0] || dialog).focus(); };
    document.addEventListener("keydown", trap);
    document.addEventListener("focusin", contain);
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", trap);
      document.removeEventListener("focusin", contain);
      background.forEach((element, index) => { element.inert = inertStates[index]; });
      if (previous?.isConnected) previous.focus();
    };
  }, [open, ref]);
}
