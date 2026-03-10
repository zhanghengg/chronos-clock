export const DEFAULT_WORLD_CLOCKS = [
  { id: 'nyc', city: 'New York', tz: 'America/New_York', flag: '🇺🇸' },
  { id: 'ldn', city: 'London', tz: 'Europe/London', flag: '🇬🇧' },
  { id: 'tky', city: 'Tokyo', tz: 'Asia/Tokyo', flag: '🇯🇵' },
  { id: 'syd', city: 'Sydney', tz: 'Australia/Sydney', flag: '🇦🇺' },
];

export const ALL_TIMEZONES = [
  { id: 'nyc', city: 'New York', tz: 'America/New_York', flag: '🇺🇸' },
  { id: 'lax', city: 'Los Angeles', tz: 'America/Los_Angeles', flag: '🇺🇸' },
  { id: 'chi', city: 'Chicago', tz: 'America/Chicago', flag: '🇺🇸' },
  { id: 'ldn', city: 'London', tz: 'Europe/London', flag: '🇬🇧' },
  { id: 'par', city: 'Paris', tz: 'Europe/Paris', flag: '🇫🇷' },
  { id: 'ber', city: 'Berlin', tz: 'Europe/Berlin', flag: '🇩🇪' },
  { id: 'mow', city: 'Moscow', tz: 'Europe/Moscow', flag: '🇷🇺' },
  { id: 'dxb', city: 'Dubai', tz: 'Asia/Dubai', flag: '🇦🇪' },
  { id: 'bom', city: 'Mumbai', tz: 'Asia/Kolkata', flag: '🇮🇳' },
  { id: 'bkk', city: 'Bangkok', tz: 'Asia/Bangkok', flag: '🇹🇭' },
  { id: 'sha', city: 'Shanghai', tz: 'Asia/Shanghai', flag: '🇨🇳' },
  { id: 'hkg', city: 'Hong Kong', tz: 'Asia/Hong_Kong', flag: '🇭🇰' },
  { id: 'tky', city: 'Tokyo', tz: 'Asia/Tokyo', flag: '🇯🇵' },
  { id: 'sel', city: 'Seoul', tz: 'Asia/Seoul', flag: '🇰🇷' },
  { id: 'syd', city: 'Sydney', tz: 'Australia/Sydney', flag: '🇦🇺' },
  { id: 'akl', city: 'Auckland', tz: 'Pacific/Auckland', flag: '🇳🇿' },
  { id: 'sao', city: 'São Paulo', tz: 'America/Sao_Paulo', flag: '🇧🇷' },
  { id: 'jnb', city: 'Johannesburg', tz: 'Africa/Johannesburg', flag: '🇿🇦' },
  { id: 'cai', city: 'Cairo', tz: 'Africa/Cairo', flag: '🇪🇬' },
  { id: 'sgp', city: 'Singapore', tz: 'Asia/Singapore', flag: '🇸🇬' },
];

export const TIMER_PRESETS = [
  { label: '1m', seconds: 60 },
  { label: '5m', seconds: 300 },
  { label: '10m', seconds: 600 },
  { label: '15m', seconds: 900 },
  { label: '25m', seconds: 1500 },
  { label: '30m', seconds: 1800 },
  { label: '60m', seconds: 3600 },
];

export const POMODORO_DEFAULTS = {
  work: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
  sessionsBeforeLong: 4,
};
