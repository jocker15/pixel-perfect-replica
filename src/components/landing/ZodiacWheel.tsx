import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const zodiacSymbols = [
  "♈", "♉", "♊", "♋", "♌", "♍",
  "♎", "♏", "♐", "♑", "♒", "♓",
];

const planetSymbols = [
  { symbol: "☉", orbit: 0.32, angle: 15, size: 16 },
  { symbol: "☽", orbit: 0.26, angle: 75, size: 14 },
  { symbol: "♂", orbit: 0.40, angle: 140, size: 13 },
  { symbol: "♀", orbit: 0.20, angle: 210, size: 13 },
  { symbol: "♃", orbit: 0.46, angle: 270, size: 15 },
  { symbol: "♄", orbit: 0.38, angle: 320, size: 14 },
  { symbol: "☿", orbit: 0.16, angle: 50, size: 12 },
  { symbol: "♆", orbit: 0.44, angle: 185, size: 12 },
];

export const ZodiacWheel = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Parallax: wheel drifts up slower than scroll
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "-40vh"]);
  const outerRotate = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const innerRotate = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const planetRotate = useTransform(scrollYProgress, [0, 1], [0, 25]);

  const size = 800;
  const cx = size / 2;
  const cy = size / 2;

  return (
    <div
      ref={ref}
      className="fixed inset-0 pointer-events-none z-[1] flex items-center justify-center overflow-hidden"
    >
      <motion.div style={{ y }} className="relative">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="w-[90vmin] h-[90vmin] max-w-[800px] max-h-[800px] opacity-100"
        >
          <defs>
            <radialGradient id="wg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(27 89% 52%)" stopOpacity="0.04" />
              <stop offset="60%" stopColor="hsl(27 89% 52%)" stopOpacity="0.015" />
              <stop offset="100%" stopColor="hsl(27 89% 52%)" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx={cx} cy={cy} r={cx * 0.96} fill="url(#wg)" />

          {/* === OUTER GROUP: zodiac ring === */}
          <motion.g style={{ rotate: outerRotate, originX: `${cx}px`, originY: `${cy}px` }}>

            {/* Concentric rings */}
            {[0.95, 0.82, 0.70, 0.58, 0.46, 0.34, 0.22, 0.12].map((r, i) => (
              <circle
                key={i}
                cx={cx} cy={cy} r={cx * r}
                fill="none"
                stroke="hsl(27 89% 52%)"
                strokeOpacity={i < 2 ? 0.1 : 0.05}
                strokeWidth={i === 0 ? 1.2 : i === 1 ? 0.8 : 0.5}
              />
            ))}

            {/* 12 sector divider lines */}
            {Array.from({ length: 12 }).map((_, i) => {
              const a = (i * 30 * Math.PI) / 180;
              return (
                <line
                  key={i}
                  x1={cx + Math.cos(a) * cx * 0.12}
                  y1={cy + Math.sin(a) * cx * 0.12}
                  x2={cx + Math.cos(a) * cx * 0.95}
                  y2={cy + Math.sin(a) * cx * 0.95}
                  stroke="hsl(27 89% 52%)"
                  strokeOpacity={0.07}
                  strokeWidth={0.5}
                />
              );
            })}

            {/* Degree ticks on outer ring */}
            {Array.from({ length: 72 }).map((_, i) => {
              const a = (i * 5 * Math.PI) / 180;
              const major = i % 6 === 0;
              return (
                <line
                  key={i}
                  x1={cx + Math.cos(a) * cx * (major ? 0.90 : 0.92)}
                  y1={cy + Math.sin(a) * cx * (major ? 0.90 : 0.92)}
                  x2={cx + Math.cos(a) * cx * 0.95}
                  y2={cy + Math.sin(a) * cx * 0.95}
                  stroke="hsl(27 89% 52%)"
                  strokeOpacity={major ? 0.12 : 0.05}
                  strokeWidth={major ? 0.7 : 0.4}
                />
              );
            })}

            {/* Zodiac symbols — between outer two rings */}
            {zodiacSymbols.map((s, i) => {
              const a = ((i * 30 + 15) * Math.PI) / 180;
              const r = cx * 0.88;
              return (
                <text
                  key={i}
                  x={cx + Math.cos(a) * r}
                  y={cy + Math.sin(a) * r}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="hsl(27 89% 52%)"
                  fillOpacity={0.18}
                  fontSize={22}
                  fontFamily="serif"
                >
                  {s}
                </text>
              );
            })}

            {/* Secondary zodiac symbols — inner ring */}
            {zodiacSymbols.map((s, i) => {
              const a = ((i * 30 + 15) * Math.PI) / 180;
              const r = cx * 0.76;
              return (
                <text
                  key={`inner-${i}`}
                  x={cx + Math.cos(a) * r}
                  y={cy + Math.sin(a) * r}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="hsl(27 89% 52%)"
                  fillOpacity={0.08}
                  fontSize={14}
                  fontFamily="serif"
                >
                  {s}
                </text>
              );
            })}
          </motion.g>

          {/* === INNER GROUP: planets + center — counter-rotate === */}
          <motion.g style={{ rotate: innerRotate, originX: `${cx}px`, originY: `${cy}px` }}>
            {/* Cross-hair lines */}
            {[0, 30, 60, 90, 120, 150].map((deg) => {
              const a = (deg * Math.PI) / 180;
              const r = cx * 0.10;
              return (
                <line
                  key={deg}
                  x1={cx + Math.cos(a) * r}
                  y1={cy + Math.sin(a) * r}
                  x2={cx - Math.cos(a) * r}
                  y2={cy - Math.sin(a) * r}
                  stroke="hsl(27 89% 52%)"
                  strokeOpacity={0.08}
                  strokeWidth={0.5}
                />
              );
            })}

            {/* Center ornament */}
            <circle cx={cx} cy={cy} r={4} fill="none" stroke="hsl(27 89% 52%)" strokeOpacity={0.15} strokeWidth={0.8} />
            <circle cx={cx} cy={cy} r={1.5} fill="hsl(27 89% 52%)" fillOpacity={0.25} />
          </motion.g>

          {/* === PLANET GROUP: separate rotation speed === */}
          <motion.g style={{ rotate: planetRotate, originX: `${cx}px`, originY: `${cy}px` }}>
            {planetSymbols.map((p, i) => {
              const a = (p.angle * Math.PI) / 180;
              const r = cx * p.orbit;
              const px = cx + Math.cos(a) * r;
              const py = cy + Math.sin(a) * r;
              return (
                <g key={i}>
                  {/* Small circle around planet */}
                  <circle
                    cx={px} cy={py} r={p.size * 0.9}
                    fill="none"
                    stroke="hsl(27 89% 52%)"
                    strokeOpacity={0.06}
                    strokeWidth={0.4}
                  />
                  <text
                    x={px} y={py}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="hsl(27 89% 52%)"
                    fillOpacity={0.22}
                    fontSize={p.size}
                    fontFamily="serif"
                  >
                    {p.symbol}
                  </text>
                </g>
              );
            })}
          </motion.g>
        </svg>
      </motion.div>
    </div>
  );
};
