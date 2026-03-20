import { useEffect, useRef, useCallback } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  brightness: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

interface ConstellationLine {
  x1: number; y1: number; x2: number; y2: number;
}

interface Planet {
  x: number;
  y: number;
  radius: number;
  orbitRadius: number;
  orbitCenterX: number;
  orbitCenterY: number;
  speed: number;
  angle: number;
  color: string;
  glowRadius: number;
}

// Occult-style constellation patterns (pentagrams, crosses, triangles)
const constellationPatterns = [
  // Pentagram-ish
  { points: [[0,0],[40,-60],[80,0],[65,50],[15,50]], offset: [0.12, 0.15] },
  // Triangle
  { points: [[0,40],[30,0],[60,40]], offset: [0.7, 0.1] },
  // Cross
  { points: [[20,0],[20,50],[0,25],[40,25]], offset: [0.85, 0.55] },
  // Diamond
  { points: [[25,0],[50,30],[25,60],[0,30]], offset: [0.15, 0.65] },
  // Zigzag constellation
  { points: [[0,0],[30,30],[60,10],[90,40],[120,20]], offset: [0.4, 0.75] },
  // Eye of providence shape
  { points: [[0,20],[30,0],[60,20],[30,10]], offset: [0.55, 0.3] },
];

export const StarryBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const starsRef = useRef<Star[]>([]);
  const planetsRef = useRef<Planet[]>([]);
  const constellationsRef = useRef<ConstellationLine[][]>([]);
  const initedRef = useRef(false);

  const initScene = useCallback((w: number, h: number) => {
    // Stars — dense field
    const stars: Star[] = [];
    const count = Math.floor((w * h) / 2500);
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: Math.random() * 1.5 + 0.3,
        brightness: Math.random() * 0.7 + 0.3,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }
    starsRef.current = stars;

    // Constellations
    const constLines: ConstellationLine[][] = [];
    constellationPatterns.forEach((pattern) => {
      const ox = pattern.offset[0] * w;
      const oy = pattern.offset[1] * h;
      const scale = Math.min(w, h) / 900;
      const lines: ConstellationLine[] = [];
      for (let i = 0; i < pattern.points.length - 1; i++) {
        lines.push({
          x1: ox + pattern.points[i][0] * scale,
          y1: oy + pattern.points[i][1] * scale,
          x2: ox + pattern.points[i + 1][0] * scale,
          y2: oy + pattern.points[i + 1][1] * scale,
        });
      }
      // Close shape for first 4 patterns
      if (pattern.points.length >= 3 && constLines.length < 4) {
        const last = pattern.points.length - 1;
        lines.push({
          x1: ox + pattern.points[last][0] * scale,
          y1: oy + pattern.points[last][1] * scale,
          x2: ox + pattern.points[0][0] * scale,
          y2: oy + pattern.points[0][1] * scale,
        });
      }
      constLines.push(lines);
    });
    constellationsRef.current = constLines;

    // Planets
    planetsRef.current = [
      {
        x: 0, y: 0, radius: 4, orbitRadius: w * 0.18,
        orbitCenterX: w * 0.8, orbitCenterY: h * 0.3,
        speed: 0.0003, angle: 0, color: "242, 122, 26", glowRadius: 20,
      },
      {
        x: 0, y: 0, radius: 2.5, orbitRadius: w * 0.12,
        orbitCenterX: w * 0.2, orbitCenterY: h * 0.7,
        speed: 0.0005, angle: Math.PI, color: "242, 122, 26", glowRadius: 12,
      },
      {
        x: 0, y: 0, radius: 3, orbitRadius: w * 0.22,
        orbitCenterX: w * 0.5, orbitCenterY: h * 0.5,
        speed: 0.00015, angle: Math.PI / 3, color: "200, 200, 200", glowRadius: 15,
      },
    ];
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      initScene(rect.width, rect.height);
      initedRef.current = true;
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = (time: number) => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      // Stars
      starsRef.current.forEach((star) => {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase);
        const alpha = star.brightness * (0.5 + 0.5 * twinkle);
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();

        // Bright stars get a cross flare
        if (star.radius > 1.2 && alpha > 0.7) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.3})`;
          ctx.lineWidth = 0.5;
          const len = star.radius * 4;
          ctx.beginPath();
          ctx.moveTo(star.x - len, star.y);
          ctx.lineTo(star.x + len, star.y);
          ctx.moveTo(star.x, star.y - len);
          ctx.lineTo(star.x, star.y + len);
          ctx.stroke();
        }
      });

      // Constellations — thin occult lines
      constellationsRef.current.forEach((lines) => {
        ctx.strokeStyle = "rgba(242, 122, 26, 0.08)";
        ctx.lineWidth = 0.8;
        ctx.setLineDash([4, 6]);
        lines.forEach((l) => {
          ctx.beginPath();
          ctx.moveTo(l.x1, l.y1);
          ctx.lineTo(l.x2, l.y2);
          ctx.stroke();
        });
        ctx.setLineDash([]);

        // Constellation node dots
        lines.forEach((l) => {
          ctx.beginPath();
          ctx.arc(l.x1, l.y1, 2, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(242, 122, 26, 0.25)";
          ctx.fill();
        });
      });

      // Planets with orbits and glow
      planetsRef.current.forEach((planet) => {
        planet.angle += planet.speed;
        planet.x = planet.orbitCenterX + Math.cos(planet.angle) * planet.orbitRadius;
        planet.y = planet.orbitCenterY + Math.sin(planet.angle) * planet.orbitRadius * 0.4;

        // Orbit path
        ctx.beginPath();
        ctx.ellipse(planet.orbitCenterX, planet.orbitCenterY, planet.orbitRadius, planet.orbitRadius * 0.4, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${planet.color}, 0.04)`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Glow
        const grd = ctx.createRadialGradient(planet.x, planet.y, 0, planet.x, planet.y, planet.glowRadius);
        grd.addColorStop(0, `rgba(${planet.color}, 0.3)`);
        grd.addColorStop(1, `rgba(${planet.color}, 0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(planet.x, planet.y, planet.glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Planet body
        ctx.beginPath();
        ctx.arc(planet.x, planet.y, planet.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${planet.color}, 0.9)`;
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [initScene]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.9 }}
    />
  );
};
