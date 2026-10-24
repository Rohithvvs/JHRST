import React, { useEffect, useRef } from 'react';
import { Cpu, Activity, ShieldCheck, Zap } from 'lucide-react';

export const HeroVisual: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes for interconnected AI network
    const nodeCount = 42;
    const nodes: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseRadius: number;
      color: string;
      phase: number;
    }[] = [];

    const goldColors = ['#FFF4D0', '#F5D76E', '#D4AF37', '#E4C14D', '#AA8C2C', '#FFFFFF'];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2.2 + 1.2,
        baseRadius: Math.random() * 2.2 + 1.2,
        color: goldColors[Math.floor(Math.random() * goldColors.length)],
        phase: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Central glowing gold orb & rotating wireframe rings
      const centerX = width * 0.52;
      const centerY = height * 0.48;

      // Outer radial glow
      const radialGlow = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, 210);
      radialGlow.addColorStop(0, 'rgba(212, 175, 55, 0.22)');
      radialGlow.addColorStop(0.4, 'rgba(212, 175, 55, 0.08)');
      radialGlow.addColorStop(1, 'rgba(5, 5, 5, 0)');
      ctx.fillStyle = radialGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 210, 0, Math.PI * 2);
      ctx.fill();

      // Rotating wireframe geometry rings
      ctx.save();
      ctx.translate(centerX, centerY);

      // Ring 1 (outer)
      ctx.beginPath();
      ctx.ellipse(0, 0, 145, 55, time * 0.35, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Ring 2 (tilted inner)
      ctx.beginPath();
      ctx.ellipse(0, 0, 125, 70, -time * 0.28, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(245, 215, 110, 0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Ring 3 (perpendicular high-speed)
      ctx.beginPath();
      ctx.ellipse(0, 0, 95, 95, time * 0.15, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 0.8;
      ctx.setLineDash([4, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Core pulsing geometric polyhedron (octahedron wireframe)
      const coreSize = 44 + Math.sin(time * 2) * 3;
      ctx.rotate(time * 0.4);
      ctx.strokeStyle = 'rgba(255, 240, 184, 0.85)';
      ctx.lineWidth = 1.5;

      // Draw wireframe diamond
      ctx.beginPath();
      ctx.moveTo(0, -coreSize);
      ctx.lineTo(coreSize * 0.85, 0);
      ctx.lineTo(0, coreSize);
      ctx.lineTo(-coreSize * 0.85, 0);
      ctx.closePath();
      ctx.stroke();

      // Cross diagonals
      ctx.beginPath();
      ctx.moveTo(-coreSize * 0.85, 0);
      ctx.lineTo(coreSize * 0.85, 0);
      ctx.moveTo(0, -coreSize);
      ctx.lineTo(0, coreSize);
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
      ctx.stroke();

      ctx.restore();

      // Connect nodes within threshold distance
      const maxDist = 98;
      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.32;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(212, 175, 55, ${alpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }
      }

      // Draw and update nodes
      for (let i = 0; i < nodeCount; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        // Bounce from boundaries with padding
        if (n.x < 15 || n.x > width - 15) n.vx *= -1;
        if (n.y < 15 || n.y > height - 15) n.vy *= -1;

        const pulse = Math.sin(time * 2.2 + n.phase) * 0.5 + 1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.baseRadius * pulse, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.shadowColor = '#D4AF37';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-[390px] sm:h-[460px] lg:h-[520px] flex items-center justify-center">
      {/* Background ambient radial circles */}
      <div className="absolute inset-0 bg-dark-radial pointer-events-none" />
      <div className="absolute w-[320px] h-[320px] rounded-full border border-gold-500/10 pointer-events-none" />
      <div className="absolute w-[440px] h-[440px] rounded-full border border-white/5 pointer-events-none" />

      {/* Floating HUD Card 1: Top Left */}
      <div className="absolute top-4 sm:top-8 left-2 sm:left-4 glass-card rounded-xl px-4 py-3 border border-gold-500/30 shadow-card z-10 animate-float flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
          <Activity className="w-4 h-4 animate-pulse" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-mono">System Active</p>
          </div>
          <p className="text-xs font-semibold text-white">99.98% High Availability</p>
        </div>
      </div>

      {/* Floating HUD Card 2: Bottom Right */}
      <div className="absolute bottom-6 sm:bottom-8 right-2 sm:right-4 glass-card rounded-xl px-4 py-3 border border-gold-500/30 shadow-card z-10 flex items-center gap-3 animate-float [animation-delay:2.5s]">
        <div className="w-8 h-8 rounded-lg bg-gold-500/15 border border-gold-500/40 flex items-center justify-center text-gold-300">
          <Zap className="w-4 h-4" />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-gold-400/90 font-mono">Inference Engine</p>
          <p className="text-xs font-semibold text-white font-heading">Sub-50ms Latency</p>
        </div>
      </div>

      {/* Floating HUD Badge 3: Center-Right Tag */}
      <div className="hidden sm:flex absolute top-1/2 -right-2 -translate-y-1/2 glass-card rounded-lg px-3 py-1.5 border border-white/10 items-center gap-2 z-10 text-[11px] text-gray-300">
        <Cpu className="w-3.5 h-3.5 text-gold-400" />
        <span className="font-mono text-gold-300">FastAPI</span>
        <span className="text-gray-500">&bull;</span>
        <span className="font-mono text-white">React 19</span>
      </div>

      <canvas ref={canvasRef} className="w-full h-full relative z-0" />
    </div>
  );
};


