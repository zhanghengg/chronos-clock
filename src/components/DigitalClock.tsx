'use client';

import { pad2, getGreeting, formatDate, getTimezone } from '@/hooks/useTime';

type Props = {
  hours: number;
  minutes: number;
  seconds: number;
  date: Date;
  mounted: boolean;
};

export function DigitalClock({ hours, minutes, seconds, date, mounted }: Props) {
  const greeting = getGreeting(hours);
  const dateStr = mounted ? formatDate(date) : 'Loading…';
  const tz = mounted ? getTimezone() : '';

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Greeting & meta */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-bold tracking-[0.2em]"
          style={{ color: 'var(--ink-2)' }}>
          <span
            className="w-2 h-2 rounded-full animate-pulse-ring"
            style={{ background: 'var(--primary)' }}
          />
          LIVE
        </div>
        <span className="text-lg font-bold" style={{ color: 'var(--ink)' }}>{greeting}</span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 text-xs" style={{ color: 'var(--ink-3)' }}>
        <span>{dateStr}</span>
        <span className="opacity-60">·</span>
        <span>{tz}</span>
      </div>

      {/* Time digits */}
      <div
        className="flex items-baseline justify-center font-mono tabular-nums leading-none"
        style={{ gap: 'clamp(4px, 1vw, 10px)' }}
        role="timer"
        aria-live="polite"
      >
        <span className="font-bold" style={{ fontSize: 'clamp(48px, 8vw, 96px)', color: 'var(--ink)' }}>
          {mounted ? pad2(hours) : '--'}
        </span>
        <span
          className="font-semibold animate-blink"
          style={{ fontSize: 'clamp(36px, 6vw, 76px)', color: 'var(--ink-3)' }}
          aria-hidden="true"
        >:</span>
        <span className="font-bold" style={{ fontSize: 'clamp(48px, 8vw, 96px)', color: 'var(--ink)' }}>
          {mounted ? pad2(minutes) : '--'}
        </span>
        <span
          className="font-semibold animate-blink"
          style={{ fontSize: 'clamp(36px, 6vw, 76px)', color: 'var(--ink-3)' }}
          aria-hidden="true"
        >:</span>
        <span className="font-bold" style={{ fontSize: 'clamp(20px, 3vw, 34px)', color: 'var(--ink-2)' }}>
          {mounted ? pad2(seconds) : '--'}
        </span>
      </div>

      {/* Second progress */}
      <div className="w-full max-w-sm h-2 rounded-full overflow-hidden glass">
        <div
          className="h-full rounded-full transition-[width] duration-300 ease-out"
          style={{
            width: `${(seconds / 60) * 100}%`,
            background: 'linear-gradient(90deg, var(--primary), var(--secondary), var(--accent))',
          }}
        />
      </div>
    </div>
  );
}
