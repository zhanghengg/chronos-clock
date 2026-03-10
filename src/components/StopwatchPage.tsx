'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

type Lap = { id: number; split: number; total: number };

function formatMs(ms: number): string {
  const mins = Math.floor(ms / 60000);
  const secs = Math.floor((ms % 60000) / 1000);
  const centis = Math.floor((ms % 1000) / 10);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${String(centis).padStart(2, '0')}`;
}

export function StopwatchPage() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<Lap[]>([]);
  const startRef = useRef(0);
  const rafRef = useRef<number>(0);
  const baseRef = useRef(0);

  const tick = useCallback(() => {
    setElapsed(baseRef.current + Date.now() - startRef.current);
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const start = useCallback(() => {
    startRef.current = Date.now();
    setRunning(true);
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const pause = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    baseRef.current += Date.now() - startRef.current;
    setRunning(false);
  }, []);

  const reset = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    baseRef.current = 0;
    setElapsed(0);
    setRunning(false);
    setLaps([]);
  }, []);

  const lap = useCallback(() => {
    const total = baseRef.current + Date.now() - startRef.current;
    const prevTotal = laps.length > 0 ? laps[0].total : 0;
    setLaps((prev) => [{ id: prev.length + 1, split: total - prevTotal, total }, ...prev]);
  }, [laps]);

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      if (e.code === 'Space') {
        e.preventDefault();
        running ? pause() : start();
      } else if (e.key === 'l' || e.key === 'L') {
        if (running) lap();
      } else if (e.key === 'r' || e.key === 'R') {
        if (!running && elapsed > 0) reset();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [running, elapsed, start, pause, lap, reset]);

  const bestLap = laps.length > 1 ? Math.min(...laps.map((l) => l.split)) : -1;
  const worstLap = laps.length > 1 ? Math.max(...laps.map((l) => l.split)) : -1;

  return (
    <div className="animate-fade-in-up max-w-lg mx-auto">
      <div className="glass rounded-2xl p-8 shadow-theme text-center">
        {/* Display */}
        <div
          className="font-mono font-bold tabular-nums leading-none mb-8"
          style={{ fontSize: 'clamp(48px, 12vw, 88px)', color: 'var(--ink)' }}
        >
          {formatMs(elapsed)}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          {!running && elapsed === 0 && (
            <ActionButton onClick={start} color="var(--primary)" label="Start" hint="Space" />
          )}
          {running && (
            <>
              <ActionButton onClick={lap} color="var(--accent)" label="Lap" hint="L" />
              <ActionButton onClick={pause} color="var(--secondary)" label="Pause" hint="Space" />
            </>
          )}
          {!running && elapsed > 0 && (
            <>
              <ActionButton onClick={reset} color="var(--danger)" label="Reset" hint="R" />
              <ActionButton onClick={start} color="var(--primary)" label="Resume" hint="Space" />
            </>
          )}
        </div>
      </div>

      {/* Laps */}
      {laps.length > 0 && (
        <div className="mt-6 glass rounded-2xl overflow-hidden shadow-theme">
          <div className="px-5 py-3 flex text-xs font-semibold uppercase tracking-wide"
            style={{ color: 'var(--ink-3)', borderBottom: '1px solid var(--border)' }}>
            <span className="w-14">#</span>
            <span className="flex-1">Split</span>
            <span className="flex-1 text-right">Total</span>
          </div>
          <div className="max-h-[300px] overflow-y-auto">
            {laps.map((l) => (
              <div
                key={l.id}
                className="px-5 py-3 flex text-sm font-mono tabular-nums animate-fade-in"
                style={{
                  borderBottom: '1px solid var(--border-2)',
                  color: l.split === bestLap ? 'var(--success)' : l.split === worstLap ? 'var(--danger)' : 'var(--ink-2)',
                }}
              >
                <span className="w-14" style={{ color: 'var(--ink-3)' }}>{l.id}</span>
                <span className="flex-1">{formatMs(l.split)}</span>
                <span className="flex-1 text-right">{formatMs(l.total)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="text-center text-xs mt-4" style={{ color: 'var(--ink-3)' }}>
        Space to start/pause · L for lap · R to reset
      </p>
    </div>
  );
}

function ActionButton({ onClick, color, label, hint }: {
  onClick: () => void; color: string; label: string; hint: string;
}) {
  return (
    <button
      onClick={onClick}
      className="
        px-6 py-3 rounded-xl font-semibold text-sm
        transition-all duration-200 cursor-pointer select-none
        hover:scale-105 active:scale-95
      "
      style={{
        background: `color-mix(in srgb, ${color} 15%, transparent)`,
        color,
        border: `1px solid color-mix(in srgb, ${color} 30%, transparent)`,
      }}
    >
      {label}
      <span className="ml-2 text-xs opacity-50">({hint})</span>
    </button>
  );
}
