'use client';

import { useEffect, useState, useMemo } from 'react';

export type TimeTick = {
  hours: number;
  minutes: number;
  seconds: number;
  ms: number;
  date: Date;
};

export type Period = 'night' | 'morning' | 'afternoon' | 'evening';

export function useTime(intervalMs = 1000): TimeTick {
  const [tick, setTick] = useState<TimeTick>(() => fromDate(new Date()));

  useEffect(() => {
    const update = () => setTick(fromDate(new Date()));
    update();
    const id = setInterval(update, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return tick;
}

export function getPeriod(hours: number): Period {
  if (hours < 6) return 'night';
  if (hours < 12) return 'morning';
  if (hours < 18) return 'afternoon';
  return 'evening';
}

export function getGreeting(hours: number): string {
  if (hours < 6) return 'Late Night';
  if (hours < 12) return 'Good Morning';
  if (hours < 18) return 'Good Afternoon';
  return 'Good Evening';
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

function fromDate(d: Date): TimeTick {
  return {
    hours: d.getHours(),
    minutes: d.getMinutes(),
    seconds: d.getSeconds(),
    ms: d.getMilliseconds(),
    date: d,
  };
}

export function useTimezone(tz: string) {
  const [time, setTime] = useState('');
  const [offset, setOffset] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString('en-US', {
        timeZone: tz,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      setTime(formatted);

      const localOffset = now.getTimezoneOffset();
      const parts = now.toLocaleString('en-US', { timeZone: tz, timeZoneName: 'shortOffset' });
      const match = parts.match(/GMT([+-]\d+)?/);
      const tzOffset = match?.[1] ? parseInt(match[1]) * 60 : 0;
      const diff = (tzOffset + localOffset) / 60;
      const sign = diff >= 0 ? '+' : '';
      setOffset(`${sign}${diff}h`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [tz]);

  return { time, offset };
}
