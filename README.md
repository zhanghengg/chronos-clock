# Chronos — Beautiful Time Tools

A stunning, feature-rich time toolkit built with Next.js 16. Includes a real-time clock with analog and digital displays, world clocks, stopwatch, countdown timer, and pomodoro timer.

## Features

### Clock
- **Analog Clock** — Elegant SVG clock face with smooth hour/minute/second hands
- **Digital Clock** — Large time display with greeting, date, and timezone
- **World Clocks** — Configurable multi-timezone grid (add/remove cities)
- **Time-of-Day Ambient** — Background colors shift based on morning/afternoon/evening/night

### Stopwatch
- Precise millisecond timing with lap tracking
- Best/worst lap highlighting (green/red)
- Keyboard shortcuts: Space (start/pause), L (lap), R (reset)

### Timer
- Quick presets: 1m, 5m, 10m, 15m, 25m, 30m, 60m
- Custom minute:second input
- Circular progress ring with smooth animation
- Audio notification when timer completes

### Pomodoro
- 25min work / 5min short break / 15min long break cycles
- Session tracking with visual dot indicators
- Auto-transition between phases with audio chime
- Contextual tips for work and break phases

### General
- **Dark / Light Theme** — Toggle with button or press `T`
- **PWA Ready** — Installable on desktop and mobile
- **Hourly Chime** — Optional audio notification on the hour
- **Keyboard Shortcuts** — `1-4` switch tabs, `T` toggle theme
- **Responsive** — Works beautifully on all screen sizes
- **Accessibility** — Semantic HTML, ARIA labels, reduced motion support

## Tech Stack

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS v4
- CSS custom properties for theming
- Web Audio API for sound effects
- SVG for analog clock

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build & Deploy

```bash
npm run build
vercel --prod
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `1` | Switch to Clock |
| `2` | Switch to Stopwatch |
| `3` | Switch to Timer |
| `4` | Switch to Pomodoro |
| `T` | Toggle dark/light theme |
| `Space` | Start/pause stopwatch |
| `L` | Record lap (stopwatch) |
| `R` | Reset stopwatch |
