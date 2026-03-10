'use client';

export function Background() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Noise grain */}
      <div
        className="absolute -inset-1/2 mix-blend-overlay opacity-15 rotate-[8deg]"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/></filter><rect width='160' height='160' filter='url(%23n)' opacity='0.28'/></svg>")`,
        }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(55% 55% at 50% 45%, rgba(0,0,0,0.9), transparent 75%)',
          WebkitMaskImage: 'radial-gradient(55% 55% at 50% 45%, rgba(0,0,0,0.9), transparent 75%)',
        }}
      />

      {/* Orbs */}
      <div
        className="absolute rounded-full blur-[28px] opacity-55"
        style={{
          width: 540, height: 540, left: -180, top: -190,
          background: `radial-gradient(circle at 30% 30%, var(--orb-a), transparent 60%)`,
          animation: 'drift-a 14s ease-in-out infinite',
        }}
      />
      <div
        className="absolute rounded-full blur-[28px] opacity-55"
        style={{
          width: 520, height: 520, right: -190, top: 120,
          background: `radial-gradient(circle at 35% 35%, var(--orb-b), transparent 62%)`,
          animation: 'drift-b 16s ease-in-out infinite',
        }}
      />
      <div
        className="absolute rounded-full blur-[28px] opacity-55"
        style={{
          width: 520, height: 520, left: '10%', bottom: -240,
          background: `radial-gradient(circle at 35% 35%, var(--orb-c), transparent 62%)`,
          animation: 'drift-c 18s ease-in-out infinite',
        }}
      />
    </div>
  );
}
