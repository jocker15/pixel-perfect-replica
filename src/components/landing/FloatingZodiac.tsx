import { useEffect, useState } from "react";

const zodiacSymbols = ["♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓","☽","☉","♄","♃","♂","♀"];

interface FloatingSymbol {
  id: number;
  char: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
}

export const FloatingZodiac = () => {
  const [symbols] = useState<FloatingSymbol[]>(() =>
    Array.from({ length: 14 }, (_, i) => ({
      id: i,
      char: zodiacSymbols[i % zodiacSymbols.length],
      x: Math.random() * 90 + 5,
      y: Math.random() * 100,
      size: Math.random() * 16 + 14,
      duration: Math.random() * 30 + 40,
      delay: Math.random() * -40,
      driftX: (Math.random() - 0.5) * 60,
    }))
  );

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {symbols.map((s) => (
        <div
          key={s.id}
          className="absolute text-primary/[0.06] font-serif select-none"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            fontSize: s.size,
            animation: `zodiac-drift ${s.duration}s linear ${s.delay}s infinite`,
            ["--drift-x" as string]: `${s.driftX}px`,
          }}
        >
          {s.char}
        </div>
      ))}
    </div>
  );
};
