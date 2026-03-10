# Chronos — Beautiful Time Tools

A stunning, feature-rich time toolkit built with Next.js 16. Includes a real-time clock with analog and digital displays, world clocks, stopwatch, countdown timer, and pomodoro timer.

精美的时间工具套件，基于 Next.js 16 构建。包含模拟/数字双时钟、世界时钟、秒表、倒计时器和番茄钟。

**Live Demo / 在线演示**: [clock.517113444.xyz](https://clock.517113444.xyz)

---

## Features / 功能

### Clock / 时钟
- **Analog Clock** — Elegant SVG clock face with smooth hour/minute/second hands
- **模拟表盘** — 精致的 SVG 表盘，时/分/秒针平滑转动
- **Digital Clock** — Large time display with greeting, date, and timezone
- **数字时钟** — 大号时间显示，含问候语、日期和时区
- **World Clocks** — Configurable multi-timezone grid (20 cities, add/remove)
- **世界时钟** — 可配置的多时区网格（20 个城市可选，支持增删）
- **Time-of-Day Ambient** — Background colors shift based on morning/afternoon/evening/night
- **时间段氛围** — 背景配色随早晨/下午/傍晚/深夜自动切换

### Stopwatch / 秒表
- Precise millisecond timing with lap tracking / 毫秒级精度计时与分圈记录
- Best/worst lap highlighting (green/red) / 最快/最慢分圈高亮（绿/红）
- Keyboard shortcuts: Space (start/pause), L (lap), R (reset) / 键盘操控

### Timer / 倒计时
- Quick presets: 1m, 5m, 10m, 15m, 25m, 30m, 60m / 快捷预设时间
- Custom minute:second input / 自定义分:秒输入
- Circular progress ring with smooth animation / 圆环进度动画
- Audio notification when timer completes / 完成时音效提醒

### Pomodoro / 番茄钟
- 25min work / 5min short break / 15min long break cycles / 25/5/15 分钟工作-休息循环
- Session tracking with visual dot indicators / 会话跟踪与圆点指示器
- Auto-transition between phases with audio chime / 阶段自动切换 + 音效提示
- Contextual tips for work and break phases / 工作与休息阶段的情境提示

### General / 通用
- **Dark / Light Theme** — Toggle with button or press `T` / 深色/浅色主题一键切换
- **PWA Ready** — Installable on desktop and mobile / 可安装到桌面和手机主屏
- **Hourly Chime** — Optional audio notification on the hour / 可选整点报时音效
- **Keyboard Shortcuts** — `1-4` switch tabs, `T` toggle theme / 全键盘快捷键
- **Responsive** — Works beautifully on all screen sizes / 全尺寸响应式
- **Accessibility** — Semantic HTML, ARIA labels, reduced motion support / 无障碍支持

---

## Tech Stack / 技术栈

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS v4
- CSS custom properties for theming / CSS 自定义属性驱动主题
- Web Audio API for sound effects / Web Audio API 合成音效
- SVG for analog clock / SVG 模拟表盘

## Getting Started / 快速开始

```bash
npm install
npm run dev
```

Open / 打开 [http://localhost:3000](http://localhost:3000)

## Build & Deploy / 构建部署

```bash
npm run build
vercel --prod
```

## Keyboard Shortcuts / 键盘快捷键

| Key / 按键 | Action / 操作 |
|------------|---------------|
| `1` | Switch to Clock / 切换到时钟 |
| `2` | Switch to Stopwatch / 切换到秒表 |
| `3` | Switch to Timer / 切换到倒计时 |
| `4` | Switch to Pomodoro / 切换到番茄钟 |
| `T` | Toggle dark/light theme / 切换深色/浅色主题 |
| `Space` | Start/pause stopwatch / 开始/暂停秒表 |
| `L` | Record lap (stopwatch) / 记录分圈 |
| `R` | Reset stopwatch / 重置秒表 |
