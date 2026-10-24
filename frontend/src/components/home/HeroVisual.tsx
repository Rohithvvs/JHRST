import React, { useEffect, useRef } from 'react';
import { Cpu, Activity, Zap } from 'lucide-react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';

const PHI = (1 + Math.sqrt(5)) / 2;

const ICO_VERTS: [number, number, number][] = [
  [-1, PHI, 0],
  [1, PHI, 0],
  [-1, -PHI, 0],
  [1, -PHI, 0],
  [0, -1, PHI],
  [0, 1, PHI],
  [0, -1, -PHI],
  [0, 1, -PHI],
  [PHI, 0, -1],
  [PHI, 0, 1],
  [-PHI, 0, -1],
  [-PHI, 0, 1],
];

const ICO_FACES: [number, number, number][] = [
  [0, 11, 5],
  [0, 5, 1],
  [0, 1, 7],
  [0, 7, 10],
  [0, 10, 11],
  [1, 5, 9],
  [5, 11, 4],
  [11, 10, 2],
  [10, 7, 6],
  [7, 1, 8],
  [3, 9, 4],
  [3, 4, 2],
  [3, 2, 6],
  [3, 6, 8],
  [3, 8, 9],
  [4, 9, 5],
  [2, 4, 11],
  [6, 2, 10],
  [8, 6, 7],
  [9, 8, 1],
];

type Point3 = { x: number; y: number; z: number };
type Projected = Point3 & { sx: number; sy: number; scale: number };

function rotate(x: number, y: number, z: number, ax: number, ay: number, az: number): [number, number, number] {
  const cosX = Math.cos(ax);
  const sinX = Math.sin(ax);
  const y1 = y * cosX - z * sinX;
  const z1 = y * sinX + z * cosX;

  const cosY = Math.cos(ay);
  const sinY = Math.sin(ay);
  const x2 = x * cosY + z1 * sinY;
  const z2 = -x * sinY + z1 * cosY;

  const cosZ = Math.cos(az);
  const sinZ = Math.sin(az);
  const x3 = x2 * cosZ - y1 * sinZ;
  const y3 = x2 * sinZ + y1 * cosZ;
  return [x3, y3, z2];
}

export const HeroVisual: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const reduce = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const spring = { stiffness: 70, damping: 16, mass: 0.6 };
  const smoothX = useSpring(pointerX, spring);
  const smoothY = useSpring(pointerY, spring);

  const cardAX = useTransform(smoothX, [-0.5, 0.5], [22, -18]);
  const cardAY = useTransform(smoothY, [-0.5, 0.5], [14, -16]);
  const cardBX = useTransform(smoothX, [-0.5, 0.5], [-20, 24]);
  const cardBY = useTransform(smoothY, [-0.5, 0.5], [-10, 16]);
  const cardCX = useTransform(smoothX, [-0.5, 0.5], [-28, 12]);
  const tiltX = useTransform(smoothY, [-0.5, 0.5], [8, -8]);
  const tiltY = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = 0;
    let width = 0;
    let height = 0;
    let running = true;

    const gold = ['#FFF4D0', '#F5D76E', '#D4AF37', '#E4C14D', '#FFFFFF'];
    const particles: {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      size: number;
      color: string;
      phase: number;
    }[] = [];

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const count = 34;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 0.86,
        y: (Math.random() - 0.5) * height * 0.86,
        z: (Math.random() - 0.5) * 260,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        vz: (Math.random() - 0.5) * 0.45,
        size: Math.random() * 1.8 + 1,
        color: gold[i % gold.length],
        phase: Math.random() * Math.PI * 2,
      });
    }

    window.addEventListener('resize', resize);

    let time = 0;
    let smoothMX = 0;
    let smoothMY = 0;
    const fov = 540;

    const project = (x: number, y: number, z: number, cx: number, cy: number): Projected => {
      const scale = fov / (fov + z);
      return { x, y, z, sx: cx + x * scale, sy: cy + y * scale, scale };
    };

    const onVisibility = () => {
      running = document.visibilityState === 'visible';
      if (running) animationFrameId = requestAnimationFrame(render);
    };
    document.addEventListener('visibilitychange', onVisibility);

    const render = () => {
      if (!running) return;
      time += reduce ? 0 : 0.012;
      smoothMX += (mouse.current.x - smoothMX) * 0.06;
      smoothMY += (mouse.current.y - smoothMY) * 0.06;

      ctx.clearRect(0, 0, width, height);

      const centerX = width * 0.5 + smoothMX * 26;
      const centerY = height * 0.48 + smoothMY * 16;
      const spinX = time * 0.42 + smoothMY * 0.85;
      const spinY = time * 0.55 + smoothMX * 1.05;
      const spinZ = time * 0.18;

      const glow = ctx.createRadialGradient(centerX, centerY, 8, centerX, centerY, 230);
      glow.addColorStop(0, 'rgba(212, 175, 55, 0.28)');
      glow.addColorStop(0.42, 'rgba(212, 175, 55, 0.08)');
      glow.addColorStop(1, 'rgba(5, 5, 5, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 230, 0, Math.PI * 2);
      ctx.fill();

      const drawRing = (radius: number, ax: number, ay: number, color: string) => {
        const steps = 88;
        const pts: Projected[] = [];
        for (let i = 0; i < steps; i++) {
          const angle = (i / steps) * Math.PI * 2;
          const [x, y, z] = rotate(Math.cos(angle) * radius, 0, Math.sin(angle) * radius, ax, ay, spinZ);
          pts.push(project(x, y, z, centerX, centerY));
        }
        ctx.lineWidth = 1.15;
        for (let i = 0; i < steps; i++) {
          const a = pts[i];
          const b = pts[(i + 1) % steps];
          const depth = (a.z + b.z) / 2;
          const alpha = Math.max(0.04, Math.min(0.72, 0.42 - depth / 520));
          ctx.beginPath();
          ctx.moveTo(a.sx, a.sy);
          ctx.lineTo(b.sx, b.sy);
          ctx.strokeStyle = color.replace('ALPHA', alpha.toFixed(3));
          ctx.stroke();
        }
      };

      drawRing(168, spinX * 0.35 + 1.05, spinY * 0.2, 'rgba(212, 175, 55, ALPHA)');
      drawRing(132, -spinX * 0.28 + 0.4, spinY * 0.45 + 0.8, 'rgba(245, 215, 110, ALPHA)');
      drawRing(198, 1.25, time * 0.2 + smoothMX, 'rgba(255, 255, 255, ALPHA)');

      for (const particle of particles) {
        if (!reduce) {
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.z += particle.vz;
          if (particle.x < -width * 0.48 || particle.x > width * 0.48) particle.vx *= -1;
          if (particle.y < -height * 0.48 || particle.y > height * 0.48) particle.vy *= -1;
          if (particle.z < -150 || particle.z > 170) particle.vz *= -1;
        }
      }

      const projected = particles.map((particle) => {
        const point = project(particle.x, particle.y, particle.z, centerX, centerY);
        return { ...point, particle };
      });

      const maxDist = 110;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].sx - projected[j].sx;
          const dy = projected[i].sy - projected[j].sy;
          const dist = Math.hypot(dx, dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.28;
            ctx.beginPath();
            ctx.moveTo(projected[i].sx, projected[i].sy);
            ctx.lineTo(projected[j].sx, projected[j].sy);
            ctx.strokeStyle = `rgba(212, 175, 55, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      const behind = projected.filter((point) => point.z > 20).sort((a, b) => b.z - a.z);
      const ahead = projected.filter((point) => point.z <= 20).sort((a, b) => b.z - a.z);

      const paintParticle = (point: (typeof projected)[number]) => {
        const pulse = 0.75 + Math.sin(time * 2.2 + point.particle.phase) * 0.25;
        ctx.beginPath();
        ctx.arc(point.sx, point.sy, point.particle.size * point.scale * pulse, 0, Math.PI * 2);
        ctx.fillStyle = point.particle.color;
        ctx.globalAlpha = Math.max(0.25, Math.min(1, point.scale));
        ctx.fill();
        ctx.globalAlpha = 1;
      };

      behind.forEach(paintParticle);

      const modelScale = 58 * (1 + Math.sin(time * 1.5) * 0.035);
      const world: Point3[] = ICO_VERTS.map(([x, y, z]) => {
        const [rx, ry, rz] = rotate(x * modelScale, y * modelScale, z * modelScale, spinX, spinY, spinZ);
        return { x: rx, y: ry, z: rz };
      });
      const screen = world.map((point) => project(point.x, point.y, point.z, centerX, centerY));

      const faces = ICO_FACES.map(([a, b, c]) => {
        const pa = world[a];
        const pb = world[b];
        const pc = world[c];
        const ux = pb.x - pa.x;
        const uy = pb.y - pa.y;
        const uz = pb.z - pa.z;
        const vx = pc.x - pa.x;
        const vy = pc.y - pa.y;
        const vz = pc.z - pa.z;
        const nx = uy * vz - uz * vy;
        const ny = uz * vx - ux * vz;
        const nz = ux * vy - uy * vx;
        const len = Math.hypot(nx, ny, nz) || 1;
        const light = Math.max(0.08, (nz / len + 1) / 2);
        const avgZ = (pa.z + pb.z + pc.z) / 3;
        return { a, b, c, light, avgZ };
      }).sort((left, right) => right.avgZ - left.avgZ);

      for (const face of faces) {
        const a = screen[face.a];
        const b = screen[face.b];
        const c = screen[face.c];
        ctx.beginPath();
        ctx.moveTo(a.sx, a.sy);
        ctx.lineTo(b.sx, b.sy);
        ctx.lineTo(c.sx, c.sy);
        ctx.closePath();
        ctx.fillStyle = `rgba(212, 175, 55, ${0.05 + face.light * 0.16})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(255, 236, 176, ${0.25 + face.light * 0.55})`;
        ctx.lineWidth = 1.15;
        ctx.stroke();
      }

      for (const point of screen) {
        ctx.beginPath();
        ctx.arc(point.sx, point.sy, Math.max(1.2, 2.4 * point.scale), 0, Math.PI * 2);
        ctx.fillStyle = '#FFF6D1';
        ctx.fill();
      }

      ahead.forEach(paintParticle);

      if (reduce) return;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      running = false;
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
      cancelAnimationFrame(animationFrameId);
    };
  }, [reduce]);

  const onMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const element = wrapRef.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    mouse.current = { x, y };
    pointerX.set(x);
    pointerY.set(y);
  };

  const onMouseLeave = () => {
    mouse.current = { x: 0, y: 0 };
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative w-full h-[390px] sm:h-[460px] lg:h-[520px] flex items-center justify-center scene-3d"
    >
      <div className="absolute inset-0 bg-dark-radial pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none [perspective:900px]">
        <div className="ring-3d" />
        <div className="ring-3d-alt" />
      </div>

      <motion.div
        style={{ x: cardAX, y: cardAY, rotateX: tiltX, rotateY: tiltY, transformPerspective: 800 }}
        className="absolute top-4 sm:top-8 left-2 sm:left-4 z-10"
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="glass-card rounded-xl px-4 py-3 border border-gold-500/30 shadow-card flex items-center gap-3"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-mono">System Active</p>
            </div>
            <p className="text-xs font-semibold text-white">99.98% High Availability</p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ x: cardBX, y: cardBY, rotateX: tiltX, rotateY: tiltY, transformPerspective: 800 }}
        className="absolute bottom-6 sm:bottom-8 right-2 sm:right-4 z-10"
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, -9, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
          className="glass-card rounded-xl px-4 py-3 border border-gold-500/30 shadow-card flex items-center gap-3"
        >
          <div className="w-8 h-8 rounded-lg bg-gold-500/15 border border-gold-500/40 flex items-center justify-center text-gold-300">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-gold-400/90 font-mono">Inference Engine</p>
            <p className="text-xs font-semibold text-white font-heading">Sub-50ms Latency</p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ x: cardCX, rotateY: tiltY, transformPerspective: 700 }}
        className="hidden sm:flex absolute top-[46%] right-0 z-10"
      >
        <div className="glass-card rounded-lg px-3 py-1.5 border border-white/10 flex items-center gap-2 text-[11px] text-gray-300">
          <Cpu className="w-3.5 h-3.5 text-gold-400" />
          <span className="font-mono text-gold-300">FastAPI</span>
          <span className="text-gray-500">&bull;</span>
          <span className="font-mono text-white">React 19</span>
        </div>
      </motion.div>

      <canvas ref={canvasRef} className="w-full h-full relative z-0" />
    </div>
  );
};
