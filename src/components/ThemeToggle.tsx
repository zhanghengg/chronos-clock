'use client';

type Props = {
  theme: 'dark' | 'light';
  onToggle: () => void;
};

export function ThemeToggle({ theme, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      title="Toggle theme (T)"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="
        relative w-10 h-10 rounded-xl glass glass-hover
        flex items-center justify-center
        transition-all duration-300 cursor-pointer select-none
      "
    >
      <span
        className="text-lg transition-transform duration-300"
        style={{ transform: theme === 'dark' ? 'rotate(0deg)' : 'rotate(180deg)' }}
      >
        {theme === 'dark' ? '🌙' : '☀️'}
      </span>
    </button>
  );
}
