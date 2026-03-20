const zodiacSymbols = ["♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓","☽","☉","♄","♃"];

interface Symbol {
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
  const symbols: Symbol[] = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    char: zodiacSymbols[i % zodiacSymbols.length],
    x: Math.random() * 85 + 7,
    y: Math.random() * 100,
    size: Math.random() * 12 + 16,
    duration: Math.random() * 40 + 60,
    delay: Math.random() * -50,
    driftX: (Math.random() - 0.5) * 30,
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {symbols.map((s) => (
        <div
          key={s.id}
          className="absolute text-primary/[0.035] font-serif select-none"
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
