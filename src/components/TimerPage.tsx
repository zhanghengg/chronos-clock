'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { TIMER_PRESETS } from '@/lib/constants';

function formatTimer(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function playAlarm() {
  try {
    const ctx = new AudioContext();
    const playNote = (freq: number, start: number, dur: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.2, ctx.currentTime + start);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + start);
      osc.stop(ctx.currentTime + start + dur);
    };
    playNote(880, 0, 0.3);
    playNote(880, 0.35, 0.3);
    playNote(1108, 0.7, 0.5);
  } catch {}
}

export function TimerPage() {
  const [total, setTotal] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const [customMin, setCustomMin] = useState('');
  const [customSec, setCustomSec] = useState('');

  const startTimer = useCallback((secs: number) => {
    setTotal(secs);
    setRemaining(secs);
    setDone(false);
    setRunning(true);
  }, []);

  const togglePause = useCallback(() => {
    setRunning((r) => !r);
  }, []);

  const reset = useCallback(() => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setDone(false);
    setRemaining(0);
    setTotal(0);
  }, []);

  useEffect(() => {
    if (running && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining((r) => {
          if (r <= 1) {
            setRunning(false);
            setDone(true);
            playAlarm();
            return 0;
          }
          return r - 1;
        });
      }, 1000);
      return () => clearInterval(intervalRef.current);
    }
  }, [running, remaining]);

  const progress = total > 0 ? remaining / total : 0;
  const circumference = 2 * Math.PI * 88;
  const offset = circumference * (1 - progress);

  const handleCustom = () => {
    const m = parseInt(customMin) || 0;
    const s = parseInt(customSec) || 0;
    const t = m * 60 + s;
    if (t > 0) startTimer(t);
  };

  return (
    <div className="animate-fade-in-up max-w-lg mx-auto">
      <div className="glass rounded-2xl p-8 shadow-theme text-center">
        {total === 0 ? (
          <>
            {/* Presets */}
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: 'var(--ink-3)' }}>
              Quick Presets
            </h3>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {TIMER_PRESETS.map((p) => (
                <button
                  key={p.label}
                  onClick={() => startTimer(p.seconds)}
                  className="
                    px-5 py-3 rounded-xl font-semibold text-sm
                    glass glass-hover transition-all duration-200 cursor-pointer
                    hover:scale-105 active:scale-95
                  "
                  style={{ color: 'var(--primary)' }}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Custom input */}
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: 'var(--ink-3)' }}>
              Custom Timer
            </h3>
            <div className="flex items-center justify-center gap-3">
              <input
                type="number"
                placeholder="Min"
                min="0"
                max="999"
                value={customMin}
                onChange={(e) => setCustomMin(e.target.value)}
                className="w-20 px-3 py-2 rounded-xl text-center font-mono text-lg glass outline-none"
                style={{ color: 'var(--ink)', border: '1px solid var(--border)' }}
              />
              <span className="text-xl font-bold" style={{ color: 'var(--ink-3)' }}>:</span>
              <input
                type="number"
                placeholder="Sec"
                min="0"
                max="59"
                value={customSec}
                onChange={(e) => setCustomSec(e.target.value)}
                className="w-20 px-3 py-2 rounded-xl text-center font-mono text-lg glass outline-none"
                style={{ color: 'var(--ink)', border: '1px solid var(--border)' }}
              />
              <button
                onClick={handleCustom}
                className="
                  px-5 py-2 rounded-xl font-semibold text-sm cursor-pointer
                  transition-all duration-200 hover:scale-105 active:scale-95
                "
                style={{
                  background: 'color-mix(in srgb, var(--primary) 15%, transparent)',
                  color: 'var(--primary)',
                  border: '1px solid color-mix(in srgb, var(--primary) 30%, transparent)',
                }}
              >
                Start
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Ring progress */}
            <div className="relative inline-flex items-center justify-center mb-6">
              <svg viewBox="0 0 200 200" className="w-56 h-56">
                <circle
                  cx="100" cy="100" r="88"
                  fill="none" stroke="var(--border)" strokeWidth="5"
                />
                <circle
                  cx="100" cy="100" r="88"
                  fill="none"
                  stroke={done ? 'var(--danger)' : 'var(--primary)'}
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  transform="rotate(-90 100 100)"
                  style={{ transition: 'stroke-dashoffset 0.5s ease, stroke 0.3s' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span
                  className={`font-mono font-bold tabular-nums ${done ? 'animate-pulse' : ''}`}
                  style={{
                    fontSize: 'clamp(28px, 6vw, 44px)',
                    color: done ? 'var(--danger)' : 'var(--ink)',
                  }}
                >
                  {formatTimer(remaining)}
                </span>
                {done && (
                  <span className="text-sm font-semibold mt-1" style={{ color: 'var(--danger)' }}>
                    Time&apos;s up!
                  </span>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={reset}
                className="
                  px-6 py-3 rounded-xl font-semibold text-sm cursor-pointer
                  transition-all duration-200 hover:scale-105 active:scale-95
                "
                style={{
                  background: 'color-mix(in srgb, var(--danger) 15%, transparent)',
                  color: 'var(--danger)',
                  border: '1px solid color-mix(in srgb, var(--danger) 30%, transparent)',
                }}
              >
                Reset
              </button>
              {!done && (
                <button
                  onClick={togglePause}
                  className="
                    px-6 py-3 rounded-xl font-semibold text-sm cursor-pointer
                    transition-all duration-200 hover:scale-105 active:scale-95
                  "
                  style={{
                    background: `color-mix(in srgb, ${running ? 'var(--accent)' : 'var(--primary)'} 15%, transparent)`,
                    color: running ? 'var(--accent)' : 'var(--primary)',
                    border: `1px solid color-mix(in srgb, ${running ? 'var(--accent)' : 'var(--primary)'} 30%, transparent)`,
                  }}
                >
                  {running ? 'Pause' : 'Resume'}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
