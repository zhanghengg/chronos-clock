'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Background } from '@/components/Background';
import { TabNav, type Tab } from '@/components/TabNav';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ClockPage } from '@/components/ClockPage';
import { StopwatchPage } from '@/components/StopwatchPage';
import { TimerPage } from '@/components/TimerPage';
import { PomodoroPage } from '@/components/PomodoroPage';
import { useTime, getPeriod } from '@/hooks/useTime';
import { useLocalStorage } from '@/hooks/useLocalStorage';

function playHourlyChime() {
  try {
    const ctx = new AudioContext();
    const play = (freq: number, start: number, dur: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.15, ctx.currentTime + start);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + start);
      osc.stop(ctx.currentTime + start + dur);
    };
    play(523, 0, 0.6);
    play(659, 0.3, 0.6);
    play(784, 0.6, 0.8);
  } catch {}
}

export default function Page() {
  const [tab, setTab] = useLocalStorage<Tab>('active-tab', 'clock');
  const [theme, setTheme] = useLocalStorage<'dark' | 'light'>('theme', 'dark');
  const [chimeEnabled, setChimeEnabled] = useLocalStorage('chime', true);
  const [mounted, setMounted] = useState(false);
  const tick = useTime(1000);
  const lastChimeHour = useRef(-1);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Apply theme and time period to document
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.setAttribute('data-period', getPeriod(tick.hours));
  }, [theme, tick.hours]);

  // Hourly chime
  useEffect(() => {
    if (!chimeEnabled) return;
    if (tick.minutes === 0 && tick.seconds === 0 && tick.hours !== lastChimeHour.current) {
      lastChimeHour.current = tick.hours;
      playHourlyChime();
    }
  }, [tick.hours, tick.minutes, tick.seconds, chimeEnabled]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      switch (e.key) {
        case '1': setTab('clock'); break;
        case '2': setTab('stopwatch'); break;
        case '3': setTab('timer'); break;
        case '4': setTab('pomodoro'); break;
        case 't': case 'T':
          setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
          break;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [setTab, setTheme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }, [setTheme]);

  return (
    <main className="min-h-screen relative">
      <Background />

      <div className="relative z-10 flex flex-col min-h-screen" style={{ padding: 'clamp(12px, 3vw, 28px)' }}>
        {/* Header */}
        <header className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold tracking-tight" style={{ color: 'var(--ink)' }}>
              Chronos
            </h1>
          </div>

          <TabNav current={tab} onChange={setTab} />

          <div className="flex items-center gap-2">
            {/* Chime toggle */}
            <button
              onClick={() => setChimeEnabled((c) => !c)}
              title="Toggle hourly chime"
              className="
                w-10 h-10 rounded-xl glass glass-hover
                flex items-center justify-center text-lg
                transition-all duration-200 cursor-pointer select-none
              "
              style={{ opacity: chimeEnabled ? 1 : 0.4 }}
            >
              🔔
            </button>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 flex items-start justify-center" style={{ paddingTop: 'clamp(8px, 2vw, 32px)' }}>
          <div className="w-full max-w-4xl">
            {tab === 'clock' && <ClockPage tick={tick} mounted={mounted} />}
            {tab === 'stopwatch' && <StopwatchPage />}
            {tab === 'timer' && <TimerPage />}
            {tab === 'pomodoro' && <PomodoroPage />}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-4">
          <p className="text-xs" style={{ color: 'var(--ink-3)' }}>
            Press 1-4 to switch tabs · T to toggle theme · Built with Next.js
          </p>
        </footer>
      </div>
    </main>
  );
}
