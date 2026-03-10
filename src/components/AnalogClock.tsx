'use client';

type Props = {
  hours: number;
  minutes: number;
  seconds: number;
};

export function AnalogClock({ hours, minutes, seconds }: Props) {
  const hourAngle = ((hours % 12) + minutes / 60) * 30;
  const minuteAngle = (minutes + seconds / 60) * 6;
  const secondAngle = seconds * 6;

  return (
    <div className="relative flex items-center justify-center">
      <svg viewBox="0 0 200 200" className="w-full max-w-[280px]" role="img" aria-label="Analog clock">
        {/* Outer ring */}
        <circle cx="100" cy="100" r="96" fill="none" stroke="var(--border)" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="94" fill="none" stroke="var(--border-2)" strokeWidth="0.5" />

        {/* Minute markers */}
        {Array.from({ length: 60 }, (_, i) => {
          const angle = (i * 6 * Math.PI) / 180;
          const isHour = i % 5 === 0;
          const r1 = isHour ? 80 : 86;
          const r2 = 90;
          return (
            <line
              key={i}
              x1={100 + r1 * Math.sin(angle)}
              y1={100 - r1 * Math.cos(angle)}
              x2={100 + r2 * Math.sin(angle)}
              y2={100 - r2 * Math.cos(angle)}
              stroke={isHour ? 'var(--ink-2)' : 'var(--ink-3)'}
              strokeWidth={isHour ? 2 : 0.8}
              strokeLinecap="round"
            />
          );
        })}

        {/* Hour numbers */}
        {Array.from({ length: 12 }, (_, i) => {
          const num = i === 0 ? 12 : i;
          const angle = (i * 30 * Math.PI) / 180;
          return (
            <text
              key={`num-${i}`}
              x={100 + 70 * Math.sin(angle)}
              y={100 - 70 * Math.cos(angle)}
              textAnchor="middle"
              dominantBaseline="central"
              fill="var(--ink-3)"
              fontSize="10"
              fontFamily="var(--font-sans)"
              fontWeight="600"
            >
              {num}
            </text>
          );
        })}

        {/* Hour hand */}
        <line
          x1="100" y1="100" x2="100" y2="48"
          stroke="var(--ink)"
          strokeWidth="3.5"
          strokeLinecap="round"
          transform={`rotate(${hourAngle} 100 100)`}
          style={{ transition: 'transform 0.3s cubic-bezier(.4,0,.2,1)' }}
        />

        {/* Minute hand */}
        <line
          x1="100" y1="100" x2="100" y2="30"
          stroke="var(--ink-2)"
          strokeWidth="2.5"
          strokeLinecap="round"
          transform={`rotate(${minuteAngle} 100 100)`}
          style={{ transition: 'transform 0.3s cubic-bezier(.4,0,.2,1)' }}
        />

        {/* Second hand */}
        <g transform={`rotate(${secondAngle} 100 100)`}>
          <line
            x1="100" y1="115" x2="100" y2="24"
            stroke="var(--primary)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <circle cx="100" cy="24" r="2.5" fill="var(--primary)" />
        </g>

        {/* Center dot */}
        <circle cx="100" cy="100" r="4" fill="var(--primary)" />
        <circle cx="100" cy="100" r="2" fill="var(--bg-0)" />
      </svg>
    </div>
  );
}
