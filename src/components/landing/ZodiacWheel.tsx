import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const zodiacSymbols = [
  "♈", "♉", "♊", "♋", "♌", "♍",
  "♎", "♏", "♐", "♑", "♒", "♓",
];

const planetSymbols = [
  { symbol: "☉", orbit: 0.32, angle: 15, size: 18 },
  { symbol: "☽", orbit: 0.26, angle: 75, size: 16 },
  { symbol: "♂", orbit: 0.40, angle: 140, size: 15 },
  { symbol: "♀", orbit: 0.20, angle: 210, size: 15 },
  { symbol: "♃", orbit: 0.46, angle: 270, size: 17 },
  { symbol: "♄", orbit: 0.38, angle: 320, size: 16 },
  { symbol: "☿", orbit: 0.16, angle: 50, size: 14 },
  { symbol: "♆", orbit: 0.44, angle: 185, size: 14 },
];

export const ZodiacWheel = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

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
          className="w-[90vmin] h-[90vmin] max-w-[800px] max-h-[800px]"
        >
          <defs>
            <radialGradient id="wg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(27 89% 52%)" stopOpacity="0.12" />
              <stop offset="40%" stopColor="hsl(27 89% 52%)" stopOpacity="0.06" />
              <stop offset="80%" stopColor="hsl(27 89% 52%)" stopOpacity="0.02" />
              <stop offset="100%" stopColor="hsl(27 89% 52%)" stopOpacity="0" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
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
                strokeOpacity={i < 2 ? 0.3 : 0.15}
                strokeWidth={i === 0 ? 1.5 : i === 1 ? 1 : 0.6}
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
                  strokeOpacity={0.2}
                  strokeWidth={0.7}
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
                  strokeOpacity={major ? 0.35 : 0.15}
                  strokeWidth={major ? 0.8 : 0.5}
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
                  fillOpacity={0.5}
                  fontSize={26}
                  fontFamily="serif"
                  filter="url(#glow)"
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
                  fillOpacity={0.25}
                  fontSize={16}
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
                  strokeOpacity={0.25}
                  strokeWidth={0.6}
                />
              );
            })}

            {/* Center ornament */}
            <circle cx={cx} cy={cy} r={6} fill="none" stroke="hsl(27 89% 52%)" strokeOpacity={0.4} strokeWidth={1} filter="url(#glow)" />
            <circle cx={cx} cy={cy} r={2.5} fill="hsl(27 89% 52%)" fillOpacity={0.6} filter="url(#glow)" />
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
                  <circle
                    cx={px} cy={py} r={p.size * 0.9}
                    fill="none"
                    stroke="hsl(27 89% 52%)"
                    strokeOpacity={0.18}
                    strokeWidth={0.5}
                  />
                  <text
                    x={px} y={py}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="hsl(27 89% 52%)"
                    fillOpacity={0.55}
                    fontSize={p.size}
                    fontFamily="serif"
                    filter="url(#glow)"
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
