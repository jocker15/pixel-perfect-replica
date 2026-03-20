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
  /** Horizontal start/end in vw */
  startX: number;
  endX: number;
  /** Vertical base position in vh */
  baseY: number;
  /** Parallax speed multiplier — higher = moves faster = appears closer */
  speed: number;
  /** Direction: 1 = left-to-right, -1 = right-to-left */
  direction: 1 | -1;
  /** Scroll range [0..1] when planet is visible */
  scrollStart: number;
  scrollEnd: number;
  /** Base opacity */
  opacity: number;
  /** Axial tilt in degrees */
  tilt: number;
  /** Texture rotation speed (deg per scroll unit) */
  spinRate: number;
}

const planets: PlanetConfig[] = [
  {
    id: "earth",
    size: 90,
    texture: earthTexture,
    hasMoon: true,
    startX: -15,
    endX: 115,
    baseY: 12,
    speed: 1.2,
    direction: 1,
    scrollStart: 0.0,
    scrollEnd: 0.35,
    opacity: 0.5,
    tilt: -23.4,
    spinRate: 360,
  },
  {
    id: "saturn",
    size: 100,
    texture: saturnTexture,
    hasRing: true,
    startX: 115,
    endX: -20,
    baseY: 38,
    speed: 0.7,
    direction: -1,
    scrollStart: 0.15,
    scrollEnd: 0.6,
    opacity: 0.45,
    tilt: -26.7,
    spinRate: 200,
  },
  {
    id: "jupiter",
    size: 140,
    texture: jupiterTexture,
    startX: 110,
    endX: -18,
    baseY: 15,
    speed: 0.5,
    direction: -1,
    scrollStart: 0.3,
    scrollEnd: 0.75,
    opacity: 0.35,
    tilt: -3.1,
    spinRate: 280,
  },
  {
    id: "mars",
    size: 55,
    texture: marsTexture,
    startX: -12,
    endX: 112,
    baseY: 75,
    speed: 1.5,
    direction: 1,
    scrollStart: 0.1,
    scrollEnd: 0.5,
    opacity: 0.4,
    tilt: -25.2,
    spinRate: 340,
  },
  {
    id: "venus",
    size: 50,
    texture: venusTexture,
    startX: -10,
    endX: 112,
    baseY: 60,
    speed: 0.9,
    direction: 1,
    scrollStart: 0.45,
    scrollEnd: 0.85,
    opacity: 0.38,
    tilt: -177.4,
    spinRate: 150,
  },
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

/** Maps scroll progress to planet-local progress [0..1] */
function planetProgress(scroll: number, start: number, end: number) {
  if (scroll < start || scroll > end) return -1;
  return (scroll - start) / (end - start);
}

/** Fade in/out at edges */
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
      {planets.map((p) => {
        const t = planetProgress(scroll, p.scrollStart, p.scrollEnd);
        if (t < 0) return null;

        const tc = clamp(t, 0, 1);
        const xPos = lerp(p.startX, p.endX, tc * p.speed / Math.max(p.speed, 1.5));
        const xFinal = clamp(lerp(p.startX, p.endX, tc), p.startX < p.endX ? p.startX : p.endX, p.startX < p.endX ? p.endX : p.startX);
        const yOffset = Math.sin(tc * Math.PI) * 8 * p.speed; // slight arc
        const fade = fadeEnvelope(tc) * p.opacity;
        const scaleFactor = 0.6 + 0.4 * Math.sin(tc * Math.PI); // grow in middle
        const texRotation = tc * p.spinRate;

        // Container size accounts for rings
        const containerSize = p.hasRing ? p.size * 2.4 : p.size;

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
              transition: "none",
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
              }}
            >
              {/* Rotating texture */}
              <div
                className="absolute rounded-full"
                style={{
                  width: p.size * 2,
                  height: p.size,
                  left: -(texRotation % p.size),
                  top: 0,
                  backgroundImage: `url(${p.texture})`,
                  backgroundSize: `${p.size * 2}px ${p.size}px`,
                  backgroundRepeat: "repeat-x",
                }}
              />
              {/* Duplicate for seamless wrap */}
              <div
                className="absolute rounded-full"
                style={{
                  width: p.size * 2,
                  height: p.size,
                  left: -(texRotation % p.size) + p.size * 2,
                  top: 0,
                  backgroundImage: `url(${p.texture})`,
                  backgroundSize: `${p.size * 2}px ${p.size}px`,
                  backgroundRepeat: "repeat-x",
                }}
              />
              {/* 3D lighting */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `
                    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.18) 0%, transparent 35%),
                    radial-gradient(circle at 50% 50%, transparent 25%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.7) 100%)
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
                    opacity: 0.55,
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
                    opacity: 0.55,
                    zIndex: 3,
                  }}
                />
              </div>
            )}

            {/* Moon orbiting Earth */}
            {p.hasMoon && (() => {
              const moonOrbitRadius = p.size * 0.85;
              const moonAngle = tc * Math.PI * 8;
              const moonX = Math.cos(moonAngle) * moonOrbitRadius;
              const moonY = Math.sin(moonAngle) * moonOrbitRadius * 0.3;
              const moonBehind = Math.sin(moonAngle) > 0.2;
              const moonSize = 24;

              return (
                <div
                  className="absolute rounded-full overflow-hidden"
                  style={{
                    width: moonSize,
                    height: moonSize,
                    left: containerSize / 2 + moonX - moonSize / 2,
                    top: containerSize / 2 + moonY - moonSize / 2,
                    zIndex: moonBehind ? 0 : 4,
                    opacity: moonBehind ? 0.3 : 0.7,
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
                      background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15) 0%, transparent 35%), radial-gradient(circle at 50% 50%, transparent 20%, rgba(0,0,0,0.6) 85%)`,
                    }}
                  />
                </div>
              );
            })()}

            {/* Ambient glow */}
            <div
              className="absolute rounded-full"
              style={{
                width: p.size * 1.8,
                height: p.size * 1.8,
                left: containerSize / 2 - p.size * 0.9,
                top: containerSize / 2 - p.size * 0.9,
                background: `radial-gradient(circle, hsla(27, 89%, 52%, 0.05) 0%, transparent 70%)`,
                pointerEvents: "none",
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
