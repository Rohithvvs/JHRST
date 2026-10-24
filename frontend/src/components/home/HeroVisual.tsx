import React, { useEffect, useRef } from 'react';

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
    const nodeCount = 38;
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

    const goldColors = ['#F5D76E', '#D4AF37', '#E4C14D', '#AA8C2C', '#FFFFFF'];

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
      const radialGlow = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, 180);
      radialGlow.addColorStop(0, 'rgba(212, 175, 55, 0.18)');
      radialGlow.addColorStop(0.5, 'rgba(212, 175, 55, 0.05)');
      radialGlow.addColorStop(1, 'rgba(5, 5, 5, 0)');
      ctx.fillStyle = radialGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 180, 0, Math.PI * 2);
      ctx.fill();

      // Rotating wireframe geometry rings
      ctx.save();
      ctx.translate(centerX, centerY);

      // Ring 1
      ctx.beginPath();
      ctx.ellipse(0, 0, 130, 48, time * 0.35, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.35)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Ring 2
      ctx.beginPath();
      ctx.ellipse(0, 0, 115, 65, -time * 0.25, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(245, 215, 110, 0.25)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Core pulsing geometric polyhedron (octahedron wireframe)
      const coreSize = 42 + Math.sin(time * 2) * 2;
      ctx.rotate(time * 0.4);
      ctx.strokeStyle = 'rgba(245, 215, 110, 0.7)';
      ctx.lineWidth = 1.5;

      // Draw wireframe diamond
      ctx.beginPath();
      ctx.moveTo(0, -coreSize);
      ctx.lineTo(coreSize * 0.8, 0);
      ctx.lineTo(0, coreSize);
      ctx.lineTo(-coreSize * 0.8, 0);
      ctx.closePath();
      ctx.stroke();

      // Cross diagonals
      ctx.beginPath();
      ctx.moveTo(-coreSize * 0.8, 0);
      ctx.lineTo(coreSize * 0.8, 0);
      ctx.moveTo(0, -coreSize);
      ctx.lineTo(0, coreSize);
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.3)';
      ctx.stroke();

      ctx.restore();

      // Connect nodes within threshold distance
      const maxDist = 95;
      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.28;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(212, 175, 55, ${alpha})`;
            ctx.lineWidth = 0.8;
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

        const pulse = Math.sin(time * 2 + n.phase) * 0.5 + 1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.baseRadius * pulse, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.shadowColor = '#D4AF37';
        ctx.shadowBlur = 6;
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
    <div className="relative w-full h-[380px] sm:h-[440px] lg:h-[500px] flex items-center justify-center">
      {/* Background radial gradient circle */}
      <div className="absolute inset-0 bg-dark-radial pointer-events-none" />

      {/* Futuristic Floating Badges */}
      <div className="absolute top-6 left-4 sm:left-8 bg-[#141414]/90 border border-gold-500/30 rounded-xl px-4 py-2.5 backdrop-blur-md shadow-card z-10 animate-float flex items-center gap-3">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted font-medium">System Architecture</p>
          <p className="text-xs font-semibold text-white">Intelligent &amp; Scalable</p>
        </div>
      </div>

      <div className="absolute bottom-8 right-4 sm:right-8 bg-[#141414]/90 border border-gold-500/30 rounded-xl px-4 py-2.5 backdrop-blur-md shadow-card z-10 flex items-center gap-3 animate-float [animation-delay:2s]">
        <div className="w-6 h-6 rounded-lg bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-300 text-xs font-bold font-heading">
          AI
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted font-medium">Applied Intelligence</p>
          <p className="text-xs font-semibold text-white">Models &bull; Workflows &bull; APIs</p>
        </div>
      </div>

      <canvas ref={canvasRef} className="w-full h-full relative z-0" />
    </div>
  );
};

