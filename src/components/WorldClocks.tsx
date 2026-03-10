'use client';

import { useState } from 'react';
import { useTimezone } from '@/hooks/useTime';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { DEFAULT_WORLD_CLOCKS, ALL_TIMEZONES } from '@/lib/constants';

type WorldClock = { id: string; city: string; tz: string; flag: string };

function WorldClockCard({ clock, onRemove }: { clock: WorldClock; onRemove: () => void }) {
  const { time, offset } = useTimezone(clock.tz);

  return (
    <div className="glass rounded-xl p-4 animate-fade-in group relative">
      <button
        onClick={onRemove}
        className="
          absolute top-2 right-2 w-6 h-6 rounded-full
          flex items-center justify-center text-xs
          opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer
        "
        style={{ background: 'var(--bg-card-hover)', color: 'var(--ink-3)' }}
        aria-label={`Remove ${clock.city}`}
      >
        ×
      </button>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{clock.flag}</span>
        <span className="font-semibold text-sm" style={{ color: 'var(--ink)' }}>{clock.city}</span>
      </div>
      <div className="font-mono text-xl font-bold tabular-nums" style={{ color: 'var(--ink)' }}>
        {time || '--:--:--'}
      </div>
      <div className="text-xs mt-1" style={{ color: 'var(--ink-3)' }}>
        {offset || '...'}
      </div>
    </div>
  );
}

export function WorldClocks() {
  const [clocks, setClocks] = useLocalStorage<WorldClock[]>('world-clocks', DEFAULT_WORLD_CLOCKS);
  const [showPicker, setShowPicker] = useState(false);

  const addClock = (tz: WorldClock) => {
    setClocks((prev) => [...prev, tz]);
    setShowPicker(false);
  };

  const removeClock = (id: string) => {
    setClocks((prev) => prev.filter((c) => c.id !== id));
  };

  const available = ALL_TIMEZONES.filter((tz) => !clocks.some((c) => c.id === tz.id));

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold tracking-wide uppercase" style={{ color: 'var(--ink-3)' }}>
          World Clocks
        </h2>
        {available.length > 0 && (
          <button
            onClick={() => setShowPicker(!showPicker)}
            className="
              px-3 py-1.5 rounded-lg glass glass-hover text-xs font-medium cursor-pointer
              transition-all duration-200
            "
            style={{ color: 'var(--primary)' }}
          >
            {showPicker ? 'Cancel' : '+ Add City'}
          </button>
        )}
      </div>

      {showPicker && (
        <div className="glass rounded-xl p-3 mb-4 animate-fade-in">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {available.map((tz) => (
              <button
                key={tz.id}
                onClick={() => addClock(tz)}
                className="
                  flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left
                  transition-all duration-150 cursor-pointer
                "
                style={{ color: 'var(--ink-2)' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-card-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <span>{tz.flag}</span>
                <span>{tz.city}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {clocks.map((c) => (
          <WorldClockCard key={c.id} clock={c} onRemove={() => removeClock(c.id)} />
        ))}
      </div>
    </div>
  );
}
