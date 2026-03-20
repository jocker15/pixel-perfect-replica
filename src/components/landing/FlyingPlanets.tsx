import { useScroll, useTransform, motion } from "framer-motion";

interface Planet {
  id: string;
  size: number;
  renderPlanet: (size: number) => React.ReactNode;
  ring?: { width: number; height: number; color: string; shadow: string };
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  scrollStart: number;
  scrollEnd: number;
  blur: number;
  opacity: number;
  rotateSpeed: number;
}

const planets: Planet[] = [
  // Earth — first, flies across the top
  {
    id: "earth",
    size: 80,
    renderPlanet: (s) => (
      <div className="w-full h-full rounded-full relative overflow-hidden" style={{
        background: `radial-gradient(circle at 30% 30%, hsl(210 60% 55%), hsl(200 70% 40%) 40%, hsl(140 45% 35%) 65%, hsl(200 60% 30%) 100%)`,
        boxShadow: `inset -${s*0.15}px -${s*0.1}px ${s*0.3}px rgba(0,0,0,0.5), 0 0 ${s*0.5}px rgba(100,180,255,0.15), inset ${s*0.05}px ${s*0.05}px ${s*0.12}px rgba(255,255,255,0.12)`,
      }}>
        {/* Continents suggestion */}
        <div className="absolute inset-0 rounded-full" style={{
          background: `
            radial-gradient(ellipse 35% 25% at 55% 40%, hsla(130,40%,35%,0.5) 0%, transparent 100%),
            radial-gradient(ellipse 20% 30% at 30% 60%, hsla(130,35%,30%,0.4) 0%, transparent 100%),
            radial-gradient(ellipse 15% 15% at 70% 25%, hsla(140,40%,35%,0.35) 0%, transparent 100%)
          `,
        }} />
        {/* Atmosphere rim */}
        <div className="absolute inset-0 rounded-full" style={{
          background: `radial-gradient(circle at 50% 50%, transparent 42%, hsla(200,80%,60%,0.08) 48%, hsla(200,80%,70%,0.12) 50%, transparent 52%)`,
        }} />
      </div>
    ),
    startX: -12,
    startY: 8,
    endX: 112,
    endY: 18,
    scrollStart: 0.0,
    scrollEnd: 0.35,
    blur: 0,
    opacity: 0.3,
    rotateSpeed: 8,
  },
  // Saturn — with prominent rings
  {
    id: "saturn",
    size: 100,
    ring: {
      width: 200,
      height: 55,
      color: "hsla(40, 50%, 55%, 0.35)",
      shadow: "0 0 12px rgba(242,122,26,0.12)",
    },
    renderPlanet: (s) => (
      <div className="w-full h-full rounded-full relative overflow-hidden" style={{
        background: `radial-gradient(circle at 35% 35%, hsl(45 55% 60%), hsl(38 45% 48%) 50%, hsl(30 35% 32%) 100%)`,
        boxShadow: `inset -${s*0.15}px -${s*0.1}px ${s*0.3}px rgba(0,0,0,0.55), 0 0 ${s*0.4}px rgba(242,180,80,0.12), inset ${s*0.04}px ${s*0.04}px ${s*0.1}px rgba(255,255,255,0.08)`,
      }}>
        {/* Bands */}
        <div className="absolute inset-0 rounded-full" style={{
          background: `repeating-linear-gradient(0deg, transparent 0%, transparent 10%, hsla(35,40%,40%,0.15) 10%, hsla(35,40%,40%,0.15) 14%, transparent 14%, transparent 22%, hsla(30,30%,35%,0.12) 22%, hsla(30,30%,35%,0.12) 26%, transparent 26%, transparent 36%)`,
        }} />
      </div>
    ),
    startX: 112,
    startY: 35,
    endX: -18,
    endY: 50,
    scrollStart: 0.15,
    scrollEnd: 0.6,
    blur: 0,
    opacity: 0.28,
    rotateSpeed: -6,
  },
  // Mars — red planet
  {
    id: "mars",
    size: 50,
    renderPlanet: (s) => (
      <div className="w-full h-full rounded-full relative" style={{
        background: `radial-gradient(circle at 35% 35%, hsl(8 65% 48%), hsl(5 55% 35%) 55%, hsl(0 45% 22%) 100%)`,
        boxShadow: `inset -${s*0.15}px -${s*0.1}px ${s*0.25}px rgba(0,0,0,0.6), 0 0 ${s*0.3}px rgba(200,80,40,0.1), inset ${s*0.04}px ${s*0.04}px ${s*0.1}px rgba(255,255,255,0.06)`,
      }}>
        {/* Polar cap */}
        <div className="absolute rounded-full" style={{
          top: '5%', left: '30%', width: '40%', height: '18%',
          background: `radial-gradient(ellipse, hsla(30,20%,75%,0.25) 0%, transparent 70%)`,
        }} />
      </div>
    ),
    startX: 25,
    startY: 110,
    endX: 75,
    endY: -12,
    scrollStart: 0.1,
    scrollEnd: 0.5,
    blur: 0,
    opacity: 0.25,
    rotateSpeed: 15,
  },
  // Jupiter — huge with bands
  {
    id: "jupiter",
    size: 130,
    renderPlanet: (s) => (
      <div className="w-full h-full rounded-full relative overflow-hidden" style={{
        background: `radial-gradient(circle at 35% 35%, hsl(30 55% 55%), hsl(25 45% 42%) 50%, hsl(20 35% 28%) 100%)`,
        boxShadow: `inset -${s*0.14}px -${s*0.1}px ${s*0.3}px rgba(0,0,0,0.5), 0 0 ${s*0.5}px rgba(242,122,26,0.1), inset ${s*0.04}px ${s*0.04}px ${s*0.12}px rgba(255,255,255,0.06)`,
      }}>
        {/* Prominent bands */}
        <div className="absolute inset-0 rounded-full" style={{
          background: `repeating-linear-gradient(0deg, transparent 0%, transparent 6%, hsla(20,50%,35%,0.2) 6%, hsla(20,50%,35%,0.2) 9%, transparent 9%, transparent 15%, hsla(25,40%,50%,0.12) 15%, hsla(25,40%,50%,0.12) 18%, transparent 18%, transparent 24%)`,
        }} />
        {/* Great red spot */}
        <div className="absolute rounded-full" style={{
          top: '52%', left: '55%', width: '18%', height: '10%',
          background: `radial-gradient(ellipse, hsla(10,60%,40%,0.35) 0%, transparent 70%)`,
        }} />
      </div>
    ),
    startX: 108,
    startY: 12,
    endX: -15,
    endY: 70,
    scrollStart: 0.3,
    scrollEnd: 0.75,
    blur: 1,
    opacity: 0.2,
    rotateSpeed: -5,
  },
  // Venus — pale yellow
  {
    id: "venus",
    size: 45,
    renderPlanet: (s) => (
      <div className="w-full h-full rounded-full" style={{
        background: `radial-gradient(circle at 35% 35%, hsl(42 50% 65%), hsl(38 40% 50%) 55%, hsl(32 30% 35%) 100%)`,
        boxShadow: `inset -${s*0.14}px -${s*0.1}px ${s*0.25}px rgba(0,0,0,0.5), 0 0 ${s*0.3}px rgba(242,200,100,0.1), inset ${s*0.04}px ${s*0.04}px ${s*0.1}px rgba(255,255,255,0.1)`,
      }} />
    ),
    startX: -10,
    startY: 70,
    endX: 108,
    endY: 55,
    scrollStart: 0.45,
    scrollEnd: 0.85,
    blur: 0,
    opacity: 0.22,
    rotateSpeed: 10,
  },
];

const PlanetElement = ({ planet }: { planet: Planet }) => {
  const { scrollYProgress } = useScroll();

  const progress = useTransform(
    scrollYProgress,
    [planet.scrollStart, planet.scrollEnd],
    [0, 1]
  );

  const x = useTransform(progress, [0, 1], [`${planet.startX}vw`, `${planet.endX}vw`]);
  const yPos = useTransform(progress, [0, 1], [`${planet.startY}vh`, `${planet.endY}vh`]);
  const rotate = useTransform(progress, [0, 1], [0, planet.rotateSpeed * 10]);
  const opacity = useTransform(
    progress,
    [0, 0.1, 0.5, 0.9, 1],
    [0, planet.opacity, planet.opacity, planet.opacity, 0]
  );
  const scale = useTransform(
    progress,
    [0, 0.3, 0.7, 1],
    [0.6, 1, 1, 0.6]
  );

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        x,
        y: yPos,
        rotate,
        opacity,
        scale,
        width: planet.ring ? planet.ring.width : planet.size,
        height: planet.ring ? planet.ring.width : planet.size,
        filter: planet.blur > 0 ? `blur(${planet.blur}px)` : undefined,
      }}
    >
      {/* Center the planet body */}
      <div
        className="absolute"
        style={{
          width: planet.size,
          height: planet.size,
          left: planet.ring ? (planet.ring.width - planet.size) / 2 : 0,
          top: planet.ring ? (planet.ring.width - planet.size) / 2 : 0,
        }}
      >
        {planet.renderPlanet(planet.size)}
      </div>

      {/* Ring */}
      {planet.ring && (
        <>
          {/* Back ring (behind planet) */}
          <div
            className="absolute"
            style={{
              width: planet.ring.width,
              height: planet.ring.height,
              left: 0,
              top: (planet.ring.width - planet.ring.height) / 2,
              border: `2.5px solid ${planet.ring.color}`,
              borderRadius: "50%",
              transform: "rotateX(72deg)",
              boxShadow: planet.ring.shadow,
              clipPath: "inset(50% 0 0 0)",
              zIndex: 0,
            }}
          />
          {/* Front ring (in front of planet) */}
          <div
            className="absolute"
            style={{
              width: planet.ring.width,
              height: planet.ring.height,
              left: 0,
              top: (planet.ring.width - planet.ring.height) / 2,
              border: `2px solid ${planet.ring.color}`,
              borderRadius: "50%",
              transform: "rotateX(72deg)",
              boxShadow: planet.ring.shadow,
              clipPath: "inset(0 0 50% 0)",
              zIndex: 2,
            }}
          />
          {/* Inner ring */}
          <div
            className="absolute"
            style={{
              width: planet.ring.width * 0.82,
              height: planet.ring.height * 0.75,
              left: planet.ring.width * 0.09,
              top: (planet.ring.width - planet.ring.height * 0.75) / 2,
              border: `1.5px solid hsla(40, 45%, 50%, 0.2)`,
              borderRadius: "50%",
              transform: "rotateX(72deg)",
              zIndex: 2,
            }}
          />
        </>
      )}

      {/* Ambient glow */}
      <div
        className="absolute rounded-full"
        style={{
          width: planet.size * 1.6,
          height: planet.size * 1.6,
          left: (planet.ring ? planet.ring.width : planet.size) / 2 - planet.size * 0.8,
          top: (planet.ring ? planet.ring.width : planet.size) / 2 - planet.size * 0.8,
          background: `radial-gradient(circle, rgba(242, 122, 26, 0.06) 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />
    </motion.div>
  );
};

export const FlyingPlanets = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden">
      {planets.map((planet) => (
        <PlanetElement key={planet.id} planet={planet} />
      ))}
    </div>
  );
};
