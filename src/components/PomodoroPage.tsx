'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { POMODORO_DEFAULTS } from '@/lib/constants';

type Phase = 'work' | 'shortBreak' | 'longBreak';

function formatTime(s: number): string {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

function playChime(freq = 660) {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 1);
  } catch {}
}

const phaseLabels: Record<Phase, string> = {
  work: 'Focus Time',
  shortBreak: 'Short Break',
  longBreak: 'Long Break',
};

const phaseColors: Record<Phase, string> = {
  work: 'var(--primary)',
  shortBreak: 'var(--success)',
  longBreak: 'var(--accent)',
};

export function PomodoroPage() {
  const [settings] = useLocalStorage('pomodoro-settings', POMODORO_DEFAULTS);
  const [phase, setPhase] = useState<Phase>('work');
  const [session, setSession] = useState(1);
  const [remaining, setRemaining] = useState(settings.work);
  const [running, setRunning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const phaseDuration = phase === 'work'
    ? settings.work
    : phase === 'shortBreak'
    ? settings.shortBreak
    : settings.longBreak;

  const progress = phaseDuration > 0 ? remaining / phaseDuration : 0;
  const circumference = 2 * Math.PI * 88;
  const offset = circumference * (1 - progress);
  const color = phaseColors[phase];

  const nextPhase = useCallback(() => {
    playChime(phase === 'work' ? 880 : 660);
    if (phase === 'work') {
      if (session % settings.sessionsBeforeLong === 0) {
        setPhase('longBreak');
        setRemaining(settings.longBreak);
      } else {
        setPhase('shortBreak');
        setRemaining(settings.shortBreak);
      }
    } else {
      if (phase === 'longBreak') setSession(1);
      else setSession((s) => s + 1);
      setPhase('work');
      setRemaining(settings.work);
    }
    setRunning(false);
  }, [phase, session, settings]);

  useEffect(() => {
    if (running && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining((r) => {
          if (r <= 1) {
            nextPhase();
            return 0;
          }
          return r - 1;
        });
      }, 1000);
      return () => clearInterval(intervalRef.current);
    }
  }, [running, remaining, nextPhase]);

  const skip = () => nextPhase();

  const reset = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setPhase('work');
    setSession(1);
    setRemaining(settings.work);
  };

  return (
    <div className="animate-fade-in-up max-w-lg mx-auto">
      <div className="glass rounded-2xl p-8 shadow-theme text-center">
        {/* Phase indicator */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: color }}
          />
          <span className="text-sm font-semibold uppercase tracking-wide" style={{ color }}>
            {phaseLabels[phase]}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full glass" style={{ color: 'var(--ink-3)' }}>
            Session {session}/{settings.sessionsBeforeLong}
          </span>
        </div>

        {/* Ring */}
        <div className="relative inline-flex items-center justify-center mb-6">
          <svg viewBox="0 0 200 200" className="w-60 h-60">
            <circle
              cx="100" cy="100" r="88"
              fill="none" stroke="var(--border)" strokeWidth="5"
            />
            <circle
              cx="100" cy="100" r="88"
              fill="none"
              stroke={color}
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
              className="font-mono font-bold tabular-nums"
              style={{ fontSize: 'clamp(36px, 8vw, 56px)', color: 'var(--ink)' }}
            >
              {formatTime(remaining)}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={reset}
            className="
              px-5 py-2.5 rounded-xl font-semibold text-sm cursor-pointer
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
          <button
            onClick={() => setRunning((r) => !r)}
            className="
              px-8 py-2.5 rounded-xl font-semibold text-sm cursor-pointer
              transition-all duration-200 hover:scale-105 active:scale-95
            "
            style={{
              background: `color-mix(in srgb, ${color} 15%, transparent)`,
              color,
              border: `1px solid color-mix(in srgb, ${color} 30%, transparent)`,
            }}
          >
            {running ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={skip}
            className="
              px-5 py-2.5 rounded-xl font-semibold text-sm cursor-pointer
              transition-all duration-200 hover:scale-105 active:scale-95
            "
            style={{
              background: 'color-mix(in srgb, var(--ink-3) 15%, transparent)',
              color: 'var(--ink-3)',
              border: '1px solid color-mix(in srgb, var(--ink-3) 30%, transparent)',
            }}
          >
            Skip
          </button>
        </div>

        {/* Session dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {Array.from({ length: settings.sessionsBeforeLong }, (_, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full transition-all duration-300"
              style={{
                background: i < session
                  ? color
                  : 'var(--border)',
                transform: i === session - 1 && phase === 'work' ? 'scale(1.3)' : 'scale(1)',
              }}
            />
          ))}
        </div>

        {/* Tips */}
        <p className="text-xs mt-6" style={{ color: 'var(--ink-3)' }}>
          {phase === 'work'
            ? 'Stay focused! Avoid distractions until the timer ends.'
            : 'Take a breather. Stretch, hydrate, rest your eyes.'}
        </p>
      </div>
    </div>
  );
}
