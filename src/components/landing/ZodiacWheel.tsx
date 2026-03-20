import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const zodiacSymbols = [
  "♈", "♉", "♊", "♋", "♌", "♍",
  "♎", "♏", "♐", "♑", "♒", "♓",
];

const planetSymbols = [
  { symbol: "☉", orbit: 0.28, angle: 0, color: "hsl(var(--primary))", size: 14 },
  { symbol: "☽", orbit: 0.22, angle: 45, color: "hsl(0 0% 75%)", size: 12 },
  { symbol: "♂", orbit: 0.35, angle: 120, color: "hsl(0 70% 55%)", size: 11 },
  { symbol: "♀", orbit: 0.18, angle: 200, color: "hsl(40 60% 65%)", size: 11 },
  { symbol: "♃", orbit: 0.42, angle: 280, color: "hsl(30 50% 55%)", size: 13 },
  { symbol: "♄", orbit: 0.38, angle: 340, color: "hsl(45 30% 50%)", size: 12 },
];

export const ZodiacWheel = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const innerRotate = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 0.7, 1, 0.7, 0]);

  const size = 620;
  const cx = size / 2;
  const cy = size / 2;

  const rings = [0.48, 0.42, 0.35, 0.28, 0.22, 0.15];

  return (
    <div ref={ref} className="relative w-full flex justify-center py-12 overflow-hidden">
      <motion.div
        style={{ y, opacity }}
        className="relative"
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="w-[500px] h-[500px] sm:w-[580px] sm:h-[580px] lg:w-[620px] lg:h-[620px]"
        >
          <defs>
            <radialGradient id="wheel-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.06" />
              <stop offset="70%" stopColor="hsl(var(--primary))" stopOpacity="0.02" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Ambient glow */}
          <circle cx={cx} cy={cy} r={cx * 0.95} fill="url(#wheel-glow)" />

          {/* Outer ring — rotates with scroll */}
          <motion.g style={{ rotate, originX: `${cx}px`, originY: `${cy}px` }}>
            {/* Concentric circles */}
            {rings.map((r, i) => (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={cx * r}
                fill="none"
                stroke="hsl(var(--primary))"
                strokeOpacity={i === 0 ? 0.12 : 0.06}
                strokeWidth={i === 0 ? 1 : 0.5}
              />
            ))}

            {/* Sector dividers — 12 lines from center to outer ring */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              const innerR = cx * 0.15;
              const outerR = cx * 0.48;
              return (
                <line
                  key={i}
                  x1={cx + Math.cos(angle) * innerR}
                  y1={cy + Math.sin(angle) * innerR}
                  x2={cx + Math.cos(angle) * outerR}
                  y2={cy + Math.sin(angle) * outerR}
                  stroke="hsl(var(--primary))"
                  strokeOpacity={0.08}
                  strokeWidth={0.5}
                />
              );
            })}

            {/* Zodiac symbols on outer ring */}
            {zodiacSymbols.map((symbol, i) => {
              const angle = ((i * 30 + 15) * Math.PI) / 180;
              const r = cx * 0.45;
              return (
                <text
                  key={i}
                  x={cx + Math.cos(angle) * r}
                  y={cy + Math.sin(angle) * r}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.25}
                  fontSize={18}
                  fontFamily="serif"
                >
                  {symbol}
                </text>
              );
            })}

            {/* Degree tick marks on outermost ring */}
            {Array.from({ length: 72 }).map((_, i) => {
              const angle = (i * 5 * Math.PI) / 180;
              const isMajor = i % 6 === 0;
              const innerR = cx * (isMajor ? 0.46 : 0.475);
              const outerR = cx * 0.48;
              return (
                <line
                  key={i}
                  x1={cx + Math.cos(angle) * innerR}
                  y1={cy + Math.sin(angle) * innerR}
                  x2={cx + Math.cos(angle) * outerR}
                  y2={cy + Math.sin(angle) * outerR}
                  stroke="hsl(var(--primary))"
                  strokeOpacity={isMajor ? 0.15 : 0.06}
                  strokeWidth={isMajor ? 0.8 : 0.4}
                />
              );
            })}
          </motion.g>

          {/* Inner elements — counter-rotate for depth */}
          <motion.g style={{ rotate: innerRotate, originX: `${cx}px`, originY: `${cy}px` }}>
            {/* Cross lines through center */}
            {[0, 45, 90, 135].map((deg) => {
              const angle = (deg * Math.PI) / 180;
              const r = cx * 0.12;
              return (
                <line
                  key={deg}
                  x1={cx + Math.cos(angle) * r}
                  y1={cy + Math.sin(angle) * r}
                  x2={cx - Math.cos(angle) * r}
                  y2={cy - Math.sin(angle) * r}
                  stroke="hsl(var(--primary))"
                  strokeOpacity={0.1}
                  strokeWidth={0.5}
                />
              );
            })}

            {/* Planet symbols on orbits */}
            {planetSymbols.map((p, i) => {
              const angle = (p.angle * Math.PI) / 180;
              const r = cx * p.orbit;
              return (
                <g key={i}>
                  {/* Planet orbit dot trail */}
                  <circle
                    cx={cx + Math.cos(angle) * r}
                    cy={cy + Math.sin(angle) * r}
                    r={p.size * 0.8}
                    fill="none"
                    stroke={p.color}
                    strokeOpacity={0.08}
                    strokeWidth={0.5}
                  />
                  <text
                    x={cx + Math.cos(angle) * r}
                    y={cy + Math.sin(angle) * r}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={p.color}
                    fillOpacity={0.3}
                    fontSize={p.size}
                    fontFamily="serif"
                  >
                    {p.symbol}
                  </text>
                </g>
              );
            })}

            {/* Center dot */}
            <circle cx={cx} cy={cy} r={3} fill="hsl(var(--primary))" fillOpacity={0.2} />
            <circle cx={cx} cy={cy} r={1.2} fill="hsl(var(--primary))" fillOpacity={0.4} />
          </motion.g>
        </svg>
      </motion.div>
    </div>
  );
};
