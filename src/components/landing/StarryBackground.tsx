import { useEffect, useRef, useCallback } from "react";

// Real constellation data — scaled to viewport percentages
const constellations = [
  {
    name: "Ursa Major",
    stars: [
      [0.08, 0.12], [0.12, 0.10], [0.16, 0.11], [0.19, 0.14],
      [0.21, 0.18], [0.18, 0.20], [0.15, 0.19],
    ],
    lines: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,3]],
  },
  {
    name: "Orion",
    stars: [
      [0.82, 0.15], [0.88, 0.14], // shoulders
      [0.85, 0.22], // belt center
      [0.83, 0.22], [0.87, 0.22], // belt sides
      [0.81, 0.30], [0.89, 0.29], // feet
      [0.85, 0.10], // head
    ],
    lines: [[7,0],[7,1],[0,3],[1,4],[3,2],[4,2],[0,5],[1,6],[3,5],[4,6]],
  },
  {
    name: "Cassiopeia",
    stars: [[0.42, 0.06], [0.45, 0.04], [0.48, 0.07], [0.51, 0.04], [0.54, 0.06]],
    lines: [[0,1],[1,2],[2,3],[3,4]],
  },
  {
    name: "Sagittarius",
    stars: [
      [0.62, 0.72], [0.65, 0.68], [0.68, 0.70], [0.66, 0.75],
      [0.70, 0.74], [0.72, 0.70], [0.69, 0.66], [0.64, 0.78],
    ],
    lines: [[0,1],[1,2],[2,4],[4,5],[5,6],[6,1],[0,3],[3,7],[2,3]],
  },
  {
    name: "Scorpius",
    stars: [
      [0.25, 0.78], [0.28, 0.75], [0.30, 0.78], [0.33, 0.80],
      [0.35, 0.83], [0.33, 0.86], [0.30, 0.85],
    ],
    lines: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6]],
  },
  {
    name: "Leo",
    stars: [
      [0.90, 0.50], [0.93, 0.47], [0.95, 0.50], [0.93, 0.54],
      [0.88, 0.55], [0.86, 0.52], [0.92, 0.44],
    ],
    lines: [[0,1],[1,2],[2,3],[3,0],[0,4],[4,5],[1,6]],
  },
  {
    name: "Gemini",
    stars: [
      [0.05, 0.42], [0.07, 0.38], [0.04, 0.48], [0.08, 0.45],
      [0.10, 0.40], [0.09, 0.50],
    ],
    lines: [[0,1],[0,2],[0,3],[3,4],[3,5]],
  },
  {
    name: "Aquarius",
    stars: [
      [0.50, 0.88], [0.53, 0.86], [0.56, 0.88], [0.54, 0.91],
      [0.57, 0.93], [0.52, 0.94],
    ],
    lines: [[0,1],[1,2],[2,3],[3,4],[3,5],[5,0]],
  },
];

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  isConstellationStar: boolean;
}

interface Planet {
  orbitCenterX: number;
  orbitCenterY: number;
  orbitRadiusX: number;
  orbitRadiusY: number;
  speed: number;
  angle: number;
  radius: number;
  color: string;
}

export const StarryBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef(0);
  const starsRef = useRef<Star[]>([]);
  const planetsRef = useRef<Planet[]>([]);

  const initScene = useCallback((w: number, h: number) => {
    const stars: Star[] = [];

    // Constellation stars — brighter, larger
    constellations.forEach((c) => {
      c.stars.forEach(([px, py]) => {
        stars.push({
          x: px * w, y: py * h,
          radius: 1.8 + Math.random() * 0.8,
          baseAlpha: 0.6 + Math.random() * 0.3,
          twinkleSpeed: 0.003 + Math.random() * 0.004,
          twinklePhase: Math.random() * Math.PI * 2,
          isConstellationStar: true,
        });
      });
    });

    // Background stars — sparse, dim
    const bgCount = Math.floor((w * h) / 8000);
    for (let i = 0; i < bgCount; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: Math.random() * 0.8 + 0.2,
        baseAlpha: Math.random() * 0.25 + 0.05,
        twinkleSpeed: 0.001 + Math.random() * 0.003,
        twinklePhase: Math.random() * Math.PI * 2,
        isConstellationStar: false,
      });
    }

    // A few "special" stars that twinkle noticeably but rarely
    for (let i = 0; i < 8; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: 1.2 + Math.random() * 0.6,
        baseAlpha: 0.15,
        twinkleSpeed: 0.0008 + Math.random() * 0.001,
        twinklePhase: Math.random() * Math.PI * 2,
        isConstellationStar: false,
      });
    }

    starsRef.current = stars;

    // Planets — slow, subtle
    planetsRef.current = [
      {
        orbitCenterX: w * 0.75, orbitCenterY: h * 0.35,
        orbitRadiusX: w * 0.12, orbitRadiusY: h * 0.06,
        speed: 0.00012, angle: 0, radius: 3,
        color: "242, 122, 26",
      },
      {
        orbitCenterX: w * 0.25, orbitCenterY: h * 0.65,
        orbitRadiusX: w * 0.08, orbitRadiusY: h * 0.04,
        speed: 0.00018, angle: Math.PI * 0.7, radius: 2,
        color: "180, 180, 200",
      },
    ];
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initScene(rect.width, rect.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = (time: number) => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      // Constellation lines — antique engraving style
      constellations.forEach((c) => {
        // Thin dotted lines
        ctx.strokeStyle = "rgba(242, 122, 26, 0.06)";
        ctx.lineWidth = 0.6;
        ctx.setLineDash([2, 4]);

        c.lines.forEach(([a, b]) => {
          const [ax, ay] = c.stars[a];
          const [bx, by] = c.stars[b];
          ctx.beginPath();
          ctx.moveTo(ax * w, ay * h);
          ctx.lineTo(bx * w, by * h);
          ctx.stroke();
        });

        ctx.setLineDash([]);
      });

      // Stars
      starsRef.current.forEach((star) => {
        // Very slow, gentle twinkle
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase);
        const alpha = star.baseAlpha * (0.7 + 0.3 * twinkle);

        if (alpha < 0.02) return;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.isConstellationStar
          ? `rgba(255, 245, 230, ${alpha})`
          : `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();

        // Constellation stars get a very subtle warm halo
        if (star.isConstellationStar && alpha > 0.5) {
          const grd = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.radius * 4);
          grd.addColorStop(0, `rgba(242, 122, 26, ${alpha * 0.08})`);
          grd.addColorStop(1, "rgba(242, 122, 26, 0)");
          ctx.fillStyle = grd;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Planets — slow orbit, soft glow
      planetsRef.current.forEach((p) => {
        p.angle += p.speed;
        const px = p.orbitCenterX + Math.cos(p.angle) * p.orbitRadiusX;
        const py = p.orbitCenterY + Math.sin(p.angle) * p.orbitRadiusY;

        // Very faint orbit line
        ctx.beginPath();
        ctx.ellipse(p.orbitCenterX, p.orbitCenterY, p.orbitRadiusX, p.orbitRadiusY, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${p.color}, 0.025)`;
        ctx.lineWidth = 0.4;
        ctx.stroke();

        // Glow
        const grd = ctx.createRadialGradient(px, py, 0, px, py, p.radius * 6);
        grd.addColorStop(0, `rgba(${p.color}, 0.2)`);
        grd.addColorStop(1, `rgba(${p.color}, 0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(px, py, p.radius * 6, 0, Math.PI * 2);
        ctx.fill();

        // Body
        ctx.beginPath();
        ctx.arc(px, py, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, 0.7)`;
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
    />
  );
};
