import { useScroll, useTransform, motion, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

import earthTexture from "@/assets/planets/earth.jpg";
import moonTexture from "@/assets/planets/moon.jpg";
import saturnTexture from "@/assets/planets/saturn.jpg";
import saturnRingTexture from "@/assets/planets/saturn_ring.png";
import jupiterTexture from "@/assets/planets/jupiter.jpg";
import marsTexture from "@/assets/planets/mars.jpg";
import venusTexture from "@/assets/planets/venus.jpg";

interface PlanetConfig {
  id: string;
  size: number;
  texture: string;
  ring?: boolean;
  moon?: { texture: string; size: number };
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  scrollStart: number;
  scrollEnd: number;
  blur: number;
  opacity: number;
  rotateSpeed: number;
  tilt?: number;
}

const planets: PlanetConfig[] = [
  {
    id: "earth",
    size: 80,
    texture: earthTexture,
    moon: { texture: moonTexture, size: 22 },
    startX: -12,
    startY: 8,
    endX: 112,
    endY: 18,
    scrollStart: 0.0,
    scrollEnd: 0.35,
    blur: 0,
    opacity: 0.45,
    rotateSpeed: 8,
    tilt: -23.4,
  },
  {
    id: "saturn",
    size: 90,
    texture: saturnTexture,
    ring: true,
    startX: 112,
    startY: 35,
    endX: -18,
    endY: 50,
    scrollStart: 0.15,
    scrollEnd: 0.6,
    blur: 0,
    opacity: 0.4,
    rotateSpeed: -6,
    tilt: -26.7,
  },
  {
    id: "mars",
    size: 50,
    texture: marsTexture,
    startX: 25,
    startY: 110,
    endX: 75,
    endY: -12,
    scrollStart: 0.1,
    scrollEnd: 0.5,
    blur: 0,
    opacity: 0.35,
    rotateSpeed: 15,
    tilt: -25.2,
  },
  {
    id: "jupiter",
    size: 130,
    texture: jupiterTexture,
    startX: 108,
    startY: 12,
    endX: -15,
    endY: 70,
    scrollStart: 0.3,
    scrollEnd: 0.75,
    blur: 1,
    opacity: 0.3,
    rotateSpeed: -5,
    tilt: -3.1,
  },
  {
    id: "venus",
    size: 45,
    texture: venusTexture,
    startX: -10,
    startY: 70,
    endX: 108,
    endY: 55,
    scrollStart: 0.45,
    scrollEnd: 0.85,
    blur: 0,
    opacity: 0.32,
    rotateSpeed: 10,
    tilt: -177.4,
  },
];

/* Textured sphere with lighting overlay */
const TexturedSphere = ({ size, texture, tilt = 0, progress }: {
  size: number; texture: string; tilt?: number; progress: number;
}) => {
  // Rotate texture based on scroll progress
  const bgOffsetX = progress * 200; // shift texture as planet "rotates"

  return (
    <div
      className="rounded-full relative overflow-hidden"
      style={{
        width: size,
        height: size,
        transform: `rotate(${tilt}deg)`,
      }}
    >
      {/* Texture layer — scrolls horizontally for rotation effect */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          backgroundImage: `url(${texture})`,
          backgroundSize: `${size * 2}px ${size}px`,
          backgroundPosition: `${bgOffsetX}px 0`,
          backgroundRepeat: "repeat-x",
        }}
      />
      {/* 3D lighting overlay */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `
            radial-gradient(circle at 35% 35%, 
              rgba(255,255,255,0.12) 0%, 
              transparent 40%),
            radial-gradient(circle at 50% 50%, 
              transparent 30%, 
              rgba(0,0,0,0.3) 60%, 
              rgba(0,0,0,0.7) 100%)
          `,
        }}
      />
      {/* Atmosphere rim for Earth */}
      <div
        className="absolute rounded-full"
        style={{
          inset: -2,
          border: "1px solid rgba(100,180,255,0.08)",
          borderRadius: "50%",
        }}
      />
    </div>
  );
};

/* Saturn's ring using texture */
const SaturnRings = ({ planetSize }: { planetSize: number }) => {
  const ringWidth = planetSize * 2.2;
  const ringHeight = planetSize * 0.6;
  const offset = (ringWidth - planetSize) / 2;

  return (
    <>
      {/* Back half of ring (behind planet) */}
      <div
        className="absolute"
        style={{
          width: ringWidth,
          height: ringHeight,
          left: -offset,
          top: (planetSize - ringHeight) / 2,
          backgroundImage: `url(${saturnRingTexture})`,
          backgroundSize: "100% 100%",
          borderRadius: "50%",
          transform: "rotateX(75deg)",
          clipPath: "inset(50% 0 0 0)",
          opacity: 0.6,
          zIndex: 0,
        }}
      />
      {/* Front half of ring (in front of planet) */}
      <div
        className="absolute"
        style={{
          width: ringWidth,
          height: ringHeight,
          left: -offset,
          top: (planetSize - ringHeight) / 2,
          backgroundImage: `url(${saturnRingTexture})`,
          backgroundSize: "100% 100%",
          borderRadius: "50%",
          transform: "rotateX(75deg)",
          clipPath: "inset(0 0 50% 0)",
          opacity: 0.6,
          zIndex: 3,
        }}
      />
    </>
  );
};

/* Moon orbiting Earth */
const Moon = ({ parentSize, progress }: { parentSize: number; progress: number }) => {
  const orbitRadius = parentSize * 0.9;
  const moonSize = 22;
  const angle = progress * Math.PI * 6; // Multiple orbits during transit
  const mx = Math.cos(angle) * orbitRadius;
  const my = Math.sin(angle) * orbitRadius * 0.35; // Elliptical orbit
  const behindPlanet = Math.sin(angle) > 0.3; // Simple depth check

  return (
    <div
      className="absolute rounded-full"
      style={{
        width: moonSize,
        height: moonSize,
        left: parentSize / 2 + mx - moonSize / 2,
        top: parentSize / 2 + my - moonSize / 2,
        zIndex: behindPlanet ? -1 : 4,
        opacity: behindPlanet ? 0.4 : 0.8,
        transition: "opacity 0.3s",
      }}
    >
      {/* Moon texture */}
      <div
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{
          backgroundImage: `url(${moonTexture})`,
          backgroundSize: `${moonSize * 2}px ${moonSize}px`,
          backgroundRepeat: "repeat-x",
        }}
      />
      {/* Moon lighting */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.15) 0%, transparent 40%), radial-gradient(circle at 50% 50%, transparent 25%, rgba(0,0,0,0.5) 80%)`,
        }}
      />
    </div>
  );
};

const PlanetElement = ({ planet }: { planet: PlanetConfig }) => {
  const { scrollYProgress } = useScroll();
  const [progressVal, setProgressVal] = useState(0);

  const progress = useTransform(
    scrollYProgress,
    [planet.scrollStart, planet.scrollEnd],
    [0, 1]
  );

  useMotionValueEvent(progress, "change", (v) => setProgressVal(v));

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

  const containerSize = planet.ring ? planet.size * 2.2 : planet.size;

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        x,
        y: yPos,
        rotate,
        opacity,
        scale,
        width: containerSize,
        height: containerSize,
        filter: planet.blur > 0 ? `blur(${planet.blur}px)` : undefined,
      }}
    >
      {/* Planet body centered */}
      <div
        className="absolute"
        style={{
          width: planet.size,
          height: planet.size,
          left: (containerSize - planet.size) / 2,
          top: (containerSize - planet.size) / 2,
          zIndex: 1,
        }}
      >
        <TexturedSphere
          size={planet.size}
          texture={planet.texture}
          tilt={planet.tilt}
          progress={progressVal}
        />

        {/* Moon for Earth */}
        {planet.moon && (
          <Moon parentSize={planet.size} progress={progressVal} />
        )}
      </div>

      {/* Saturn rings */}
      {planet.ring && (
        <div
          className="absolute"
          style={{
            width: planet.size,
            height: planet.size,
            left: (containerSize - planet.size) / 2,
            top: (containerSize - planet.size) / 2,
          }}
        >
          <SaturnRings planetSize={planet.size} />
        </div>
      )}

      {/* Ambient glow */}
      <div
        className="absolute rounded-full"
        style={{
          width: planet.size * 1.6,
          height: planet.size * 1.6,
          left: containerSize / 2 - planet.size * 0.8,
          top: containerSize / 2 - planet.size * 0.8,
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
