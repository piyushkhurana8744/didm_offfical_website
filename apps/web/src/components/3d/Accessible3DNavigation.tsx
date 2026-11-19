"use client";
import Link from "next/link";
import type { SceneStop } from "./scene-data";
export function Accessible3DNavigation({
  stops,
  active,
  onSelect,
  compact = false,
}: {
  stops: SceneStop[];
  active: string | null;
  onSelect: (id: string | null) => void;
  compact?: boolean;
}) {
  const selected = stops.find((s) => s.id === active);
  return (
    <div
      className={`world-navigation ${compact ? "world-navigation-compact" : ""}`}
    >
      <div
        className="world-tabs"
        role="group"
        aria-label="Explore learning spaces"
      >
        <button
          type="button"
          aria-pressed={active === null}
          onClick={() => onSelect(null)}
        >
          Overview
        </button>
        {stops.map((s, i) => (
          <button
            key={s.id}
            type="button"
            aria-pressed={active === s.id}
            onClick={() => onSelect(s.id)}
          >
            <span style={{ background: s.color }} />
            {compact ? String(i + 1).padStart(2, "0") : s.name}
          </button>
        ))}
      </div>
      <div className="world-detail" aria-live="polite">
        {selected ? (
          <>
            <div>
              <strong>{selected.name}</strong>
              <p>{selected.description}</p>
            </div>
            <Link href={selected.href}>
              Explore curriculum <span aria-hidden>↗</span>
            </Link>
            <button
              type="button"
              onClick={() => onSelect(null)}
              aria-label="Return to campus overview"
            >
              ↶ Overview
            </button>
          </>
        ) : (
          <p>Choose a space to discover what you’ll learn.</p>
        )}
      </div>
    </div>
  );
}
