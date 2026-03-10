'use client';

export type Tab = 'clock' | 'stopwatch' | 'timer' | 'pomodoro';

const tabs: { id: Tab; label: string; icon: string; key: string }[] = [
  { id: 'clock', label: 'Clock', icon: '🕐', key: '1' },
  { id: 'stopwatch', label: 'Stopwatch', icon: '⏱', key: '2' },
  { id: 'timer', label: 'Timer', icon: '⏳', key: '3' },
  { id: 'pomodoro', label: 'Pomodoro', icon: '🍅', key: '4' },
];

type Props = {
  current: Tab;
  onChange: (tab: Tab) => void;
};

export function TabNav({ current, onChange }: Props) {
  return (
    <nav className="flex gap-1 p-1 rounded-2xl glass" role="tablist">
      {tabs.map((t) => (
        <button
          key={t.id}
          role="tab"
          aria-selected={current === t.id}
          onClick={() => onChange(t.id)}
          title={`${t.label} (${t.key})`}
          className={`
            relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
            transition-all duration-200 cursor-pointer select-none
            ${current === t.id
              ? 'text-ink shadow-theme'
              : 'text-ink-3 hover:text-ink-2'}
          `}
          style={current === t.id ? {
            background: 'var(--bg-card-hover)',
            boxShadow: '0 4px 20px var(--shadow)',
          } : undefined}
        >
          <span className="text-base">{t.icon}</span>
          <span className="hidden sm:inline">{t.label}</span>
        </button>
      ))}
    </nav>
  );
}
