import { useEffect, useState, useRef } from "react";

import earthTexture from "@/assets/planets/earth.png";
import moonTexture from "@/assets/planets/moon.png";
import saturnTexture from "@/assets/planets/saturn.png";
import saturnRingTexture from "@/assets/planets/saturn_ring.png";
import jupiterTexture from "@/assets/planets/jupiter.png";
import marsTexture from "@/assets/planets/mars.png";
import venusTexture from "@/assets/planets/venus.png";

interface PlanetConfig {
  id: string;
  size: number;
  texture: string;
  hasRing?: boolean;
  hasMoon?: boolean;
  startX: number;
  endX: number;
  baseY: number;
  speed: number;
  direction: 1 | -1;
  scrollStart: number;
  scrollEnd: number;
  opacity: number;
  tilt: number;
  spinRate: number;
  glowColor: string;
}

const planets: PlanetConfig[] = [
  {
    id: "earth",
    size: 120,
    texture: earthTexture,
    hasMoon: true,
    startX: -15,
    endX: 115,
    baseY: 12,
    speed: 1.2,
    direction: 1,
    scrollStart: 0.0,
    scrollEnd: 0.35,
    opacity: 0.75,
    tilt: -23.4,
    spinRate: 360,
    glowColor: "100, 180, 255",
  },
  {
    id: "saturn",
    size: 130,
    texture: saturnTexture,
    hasRing: true,
    startX: 115,
    endX: -20,
    baseY: 38,
    speed: 0.7,
    direction: -1,
    scrollStart: 0.15,
    scrollEnd: 0.6,
    opacity: 0.7,
    tilt: -26.7,
    spinRate: 200,
    glowColor: "220, 180, 100",
  },
  {
    id: "jupiter",
    size: 180,
    texture: jupiterTexture,
    startX: 110,
    endX: -18,
    baseY: 15,
    speed: 0.5,
    direction: -1,
    scrollStart: 0.3,
    scrollEnd: 0.75,
    opacity: 0.6,
    tilt: -3.1,
    spinRate: 280,
    glowColor: "210, 160, 100",
  },
  {
    id: "mars",
    size: 75,
    texture: marsTexture,
    startX: -12,
    endX: 112,
    baseY: 75,
    speed: 1.5,
    direction: 1,
    scrollStart: 0.1,
    scrollEnd: 0.5,
    opacity: 0.65,
    tilt: -25.2,
    spinRate: 340,
    glowColor: "200, 80, 40",
  },
  {
    id: "venus",
    size: 65,
    texture: venusTexture,
    startX: -10,
    endX: 112,
    baseY: 60,
    speed: 0.9,
    direction: 1,
    scrollStart: 0.45,
    scrollEnd: 0.85,
    opacity: 0.6,
    tilt: -177.4,
    spinRate: 150,
    glowColor: "240, 200, 120",
  },
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function planetProgress(scroll: number, start: number, end: number) {
  if (scroll < start || scroll > end) return -1;
  return (scroll - start) / (end - start);
}

function fadeEnvelope(t: number): number {
  if (t < 0.1) return t / 0.1;
  if (t > 0.9) return (1 - t) / 0.1;
  return 1;
}

export const FlyingPlanets = () => {
  const [scroll, setScroll] = useState(0);
  const rafRef = useRef(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        rafRef.current = requestAnimationFrame(() => {
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          setScroll(maxScroll > 0 ? window.scrollY / maxScroll : 0);
          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden">
      {/* Orbital lines — antique map style */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.08 }}>
        {planets.map((p) => {
          const midX = (p.startX + p.endX) / 2;
          const midY = p.baseY;
          const radiusX = Math.abs(p.endX - p.startX) * 0.45;
          const radiusY = 12;
          return (
            <ellipse
              key={`orbit-${p.id}`}
              cx={`${midX}%`}
              cy={`${midY}%`}
              rx={`${radiusX}%`}
              ry={`${radiusY}%`}
              fill="none"
              stroke="hsl(27, 89%, 52%)"
              strokeWidth="0.8"
              strokeDasharray="4 6"
              strokeLinecap="round"
            />
          );
        })}
      </svg>

      {planets.map((p) => {
        const t = planetProgress(scroll, p.scrollStart, p.scrollEnd);
        if (t < 0) return null;

        const tc = clamp(t, 0, 1);
        const xFinal = lerp(p.startX, p.endX, tc);
        const yOffset = Math.sin(tc * Math.PI) * 10 * p.speed;
        const fade = fadeEnvelope(tc) * p.opacity;
        const scaleFactor = 0.7 + 0.3 * Math.sin(tc * Math.PI);
        const texRotation = tc * p.spinRate;

        const containerSize = p.hasRing ? p.size * 2.4 : p.size * 1.2;

        return (
          <div
            key={p.id}
            className="absolute"
            style={{
              left: `${xFinal}vw`,
              top: `calc(${p.baseY}vh + ${yOffset}px)`,
              opacity: fade,
              transform: `translate(-50%, -50%) scale(${scaleFactor})`,
              width: containerSize,
              height: containerSize,
              willChange: "transform, left, top, opacity",
            }}
          >
            {/* Planet sphere */}
            <div
              className="absolute rounded-full overflow-hidden"
              style={{
                width: p.size,
                height: p.size,
                left: (containerSize - p.size) / 2,
                top: (containerSize - p.size) / 2,
                transform: `rotate(${p.tilt}deg)`,
                zIndex: 1,
                boxShadow: `0 0 ${p.size * 0.4}px rgba(${p.glowColor}, 0.15), 0 0 ${p.size * 0.8}px rgba(${p.glowColor}, 0.08)`,
              }}
            >
              {/* Rotating texture */}
              <div
                className="absolute"
                style={{
                  width: p.size * 3,
                  height: p.size,
                  left: -(texRotation % p.size),
                  top: 0,
                  backgroundImage: `url(${p.texture})`,
                  backgroundSize: `${p.size * 2}px ${p.size}px`,
                  backgroundRepeat: "repeat-x",
                }}
              />
              {/* 3D lighting — lighter to show more texture */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `
                    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.22) 0%, transparent 40%),
                    radial-gradient(circle at 50% 50%, transparent 30%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0.55) 100%)
                  `,
                  zIndex: 2,
                }}
              />
            </div>

            {/* Saturn ring */}
            {p.hasRing && (
              <div
                className="absolute"
                style={{
                  width: p.size,
                  height: p.size,
                  left: (containerSize - p.size) / 2,
                  top: (containerSize - p.size) / 2,
                }}
              >
                {/* Back ring */}
                <div
                  className="absolute"
                  style={{
                    width: p.size * 2.2,
                    height: p.size * 0.55,
                    left: -(p.size * 0.6),
                    top: p.size * 0.22,
                    backgroundImage: `url(${saturnRingTexture})`,
                    backgroundSize: "100% 100%",
                    borderRadius: "50%",
                    transform: "rotateX(75deg)",
                    clipPath: "inset(50% 0 0 0)",
                    opacity: 0.7,
                    zIndex: 0,
                  }}
                />
                {/* Front ring */}
                <div
                  className="absolute"
                  style={{
                    width: p.size * 2.2,
                    height: p.size * 0.55,
                    left: -(p.size * 0.6),
                    top: p.size * 0.22,
                    backgroundImage: `url(${saturnRingTexture})`,
                    backgroundSize: "100% 100%",
                    borderRadius: "50%",
                    transform: "rotateX(75deg)",
                    clipPath: "inset(0 0 50% 0)",
                    opacity: 0.7,
                    zIndex: 3,
                  }}
                />
              </div>
            )}

            {/* Moon orbiting Earth */}
            {p.hasMoon && (() => {
              const moonOrbitRadius = p.size * 0.8;
              const moonAngle = tc * Math.PI * 8;
              const moonX = Math.cos(moonAngle) * moonOrbitRadius;
              const moonY = Math.sin(moonAngle) * moonOrbitRadius * 0.3;
              const moonBehind = Math.sin(moonAngle) > 0.2;
              const moonSize = 30;

              return (
                <>
                  {/* Moon orbit line */}
                  <svg
                    className="absolute"
                    style={{
                      width: moonOrbitRadius * 2 + moonSize,
                      height: moonOrbitRadius * 0.6 + moonSize,
                      left: containerSize / 2 - moonOrbitRadius - moonSize / 2,
                      top: containerSize / 2 - moonOrbitRadius * 0.3 - moonSize / 2,
                      opacity: 0.12,
                    }}
                  >
                    <ellipse
                      cx="50%"
                      cy="50%"
                      rx={moonOrbitRadius}
                      ry={moonOrbitRadius * 0.3}
                      fill="none"
                      stroke="hsl(0, 0%, 70%)"
                      strokeWidth="0.6"
                      strokeDasharray="2 4"
                    />
                  </svg>
                  <div
                    className="absolute rounded-full overflow-hidden"
                    style={{
                      width: moonSize,
                      height: moonSize,
                      left: containerSize / 2 + moonX - moonSize / 2,
                      top: containerSize / 2 + moonY - moonSize / 2,
                      zIndex: moonBehind ? 0 : 4,
                      opacity: moonBehind ? 0.4 : 0.85,
                      boxShadow: `0 0 ${moonSize * 0.3}px rgba(200, 200, 220, 0.12)`,
                    }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `url(${moonTexture})`,
                        backgroundSize: `${moonSize * 2}px ${moonSize}px`,
                        backgroundRepeat: "repeat-x",
                      }}
                    />
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 35%), radial-gradient(circle at 50% 50%, transparent 25%, rgba(0,0,0,0.45) 80%)`,
                      }}
                    />
                  </div>
                </>
              );
            })()}

            {/* Ambient glow — brighter */}
            <div
              className="absolute rounded-full"
              style={{
                width: p.size * 2,
                height: p.size * 2,
                left: containerSize / 2 - p.size,
                top: containerSize / 2 - p.size,
                background: `radial-gradient(circle, rgba(${p.glowColor}, 0.12) 0%, rgba(${p.glowColor}, 0.04) 40%, transparent 70%)`,
                pointerEvents: "none",
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
