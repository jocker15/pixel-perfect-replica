import { useScroll, useTransform, motion, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

interface Planet {
  id: string;
  size: number;
  color1: string;
  color2: string;
  color3?: string;
  ring?: boolean;
  startX: number; // vw
  startY: number; // vh
  endX: number;
  endY: number;
  scrollStart: number; // 0-1
  scrollEnd: number;
  blur: number;
  opacity: number;
  rotateSpeed: number;
}

const planets: Planet[] = [
  {
    id: "jupiter",
    size: 120,
    color1: "hsl(27 60% 45%)",
    color2: "hsl(30 50% 35%)",
    color3: "hsl(25 70% 55%)",
    startX: -15,
    startY: 30,
    endX: 110,
    endY: 20,
    scrollStart: 0.05,
    scrollEnd: 0.45,
    blur: 0,
    opacity: 0.25,
    rotateSpeed: 15,
  },
  {
    id: "saturn",
    size: 90,
    color1: "hsl(35 45% 50%)",
    color2: "hsl(30 30% 35%)",
    ring: true,
    startX: 110,
    startY: 60,
    endX: -20,
    endY: 40,
    scrollStart: 0.2,
    scrollEnd: 0.65,
    blur: 1,
    opacity: 0.2,
    rotateSpeed: -10,
  },
  {
    id: "mars",
    size: 50,
    color1: "hsl(15 65% 40%)",
    color2: "hsl(10 50% 28%)",
    startX: 20,
    startY: 110,
    endX: 80,
    endY: -15,
    scrollStart: 0.1,
    scrollEnd: 0.55,
    blur: 0,
    opacity: 0.22,
    rotateSpeed: 20,
  },
  {
    id: "neptune",
    size: 70,
    color1: "hsl(27 40% 35%)",
    color2: "hsl(20 50% 25%)",
    startX: 105,
    startY: 15,
    endX: -10,
    endY: 85,
    scrollStart: 0.35,
    scrollEnd: 0.8,
    blur: 2,
    opacity: 0.15,
    rotateSpeed: -8,
  },
  {
    id: "venus",
    size: 40,
    color1: "hsl(32 70% 55%)",
    color2: "hsl(27 60% 40%)",
    startX: -10,
    startY: 75,
    endX: 105,
    endY: 55,
    scrollStart: 0.5,
    scrollEnd: 0.9,
    blur: 0,
    opacity: 0.2,
    rotateSpeed: 12,
  },
  {
    id: "mercury",
    size: 28,
    color1: "hsl(25 30% 45%)",
    color2: "hsl(20 25% 30%)",
    startX: 85,
    startY: -10,
    endX: 15,
    endY: 110,
    scrollStart: 0.0,
    scrollEnd: 0.4,
    blur: 1,
    opacity: 0.18,
    rotateSpeed: 25,
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
        width: planet.size,
        height: planet.size,
        filter: planet.blur > 0 ? `blur(${planet.blur}px)` : undefined,
      }}
    >
      {/* Planet body */}
      <div
        className="w-full h-full rounded-full relative"
        style={{
          background: planet.color3
            ? `radial-gradient(circle at 35% 35%, ${planet.color3}, ${planet.color1} 50%, ${planet.color2} 100%)`
            : `radial-gradient(circle at 35% 35%, ${planet.color1}, ${planet.color2} 100%)`,
          boxShadow: `
            inset -${planet.size * 0.15}px -${planet.size * 0.1}px ${planet.size * 0.3}px rgba(0,0,0,0.6),
            0 0 ${planet.size * 0.4}px rgba(242, 122, 26, 0.15),
            inset ${planet.size * 0.05}px ${planet.size * 0.05}px ${planet.size * 0.15}px rgba(255,255,255,0.08)
          `,
        }}
      >
        {/* Surface bands for gas giants */}
        {planet.size >= 80 && (
          <>
            <div
              className="absolute rounded-full overflow-hidden inset-0"
              style={{
                background: `
                  repeating-linear-gradient(
                    0deg,
                    transparent 0%,
                    transparent 8%,
                    rgba(0,0,0,0.12) 8%,
                    rgba(0,0,0,0.12) 12%,
                    transparent 12%,
                    transparent 20%
                  )
                `,
              }}
            />
          </>
        )}
      </div>

      {/* Saturn ring */}
      {planet.ring && (
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: planet.size * 1.8,
            height: planet.size * 0.5,
            border: `2px solid hsla(35, 45%, 50%, 0.3)`,
            borderRadius: "50%",
            transform: "translate(-50%, -50%) rotateX(70deg)",
            boxShadow: `0 0 ${planet.size * 0.1}px rgba(242, 122, 26, 0.1)`,
          }}
        />
      )}

      {/* Ambient glow */}
      <div
        className="absolute rounded-full -inset-[30%]"
        style={{
          background: `radial-gradient(circle, rgba(242, 122, 26, 0.08) 0%, transparent 70%)`,
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
