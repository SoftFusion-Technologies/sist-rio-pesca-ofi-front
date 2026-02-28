import React, { useEffect, useRef } from 'react';

/*
 * Benjamin Orellana - 2026-02-22 - Fondo global animado temático pesca/camping con río calmado inferior, peces, burbujas y cañas de pescar decorativas.
 */

export default function FishingCampingBackground({
  className = '',
  zIndex = 0,
  opacity = 0.8,
  particleCount = 55, // se reutiliza como cantidad de microburbujas ambientales
  bubbleCount = 12, // burbujas más grandes que nacen del río
  fishCount = 3,
  waveLines = 4
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let t = 0;
    let reducedMotion = false;

    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const onMotionChange = () => {
      reducedMotion = !!media?.matches;
    };
    onMotionChange();
    media?.addEventListener?.('change', onMotionChange);

    const rand = (min, max) => Math.random() * (max - min) + min;
    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
    const getRiverTopRatio = () => {
      // Benjamin Orellana - 2026-02-22 - Ajusta la altura del río según viewport para mejorar visibilidad de peces en desktop.
      if (width >= 1536) return 0.74;
      if (width >= 1280) return 0.76;
      if (width >= 1024) return 0.78;
      return 0.82;
    };

    let microBubbles = [];
    let riverBubbles = [];
    let fish = [];
    let driftingGlowDots = [];

    // Benjamin Orellana - 2026-02-22 - Inicializa/redistribuye entidades visuales según tamaño de viewport manteniendo densidad estable.
    const initScene = () => {
      const isDesktop = width >= 1024;
      const riverTopRatio = getRiverTopRatio();
      const riverTop = height * riverTopRatio;
      const riverBottom = height;
      const riverBand = riverBottom - riverTop;

      microBubbles = Array.from({ length: particleCount }).map(() => ({
        x: rand(0, width),
        y: rand(height * 0.08, height * 0.86),
        r: rand(0.6, 1.8),
        vx: rand(-0.03, 0.03),
        vy: rand(-0.06, -0.015),
        alpha: rand(0.04, 0.12),
        wobble: rand(0, Math.PI * 2),
        wobbleSpeed: rand(0.004, 0.012)
      }));

      riverBubbles = Array.from({ length: bubbleCount }).map(() => ({
        x: rand(0, width),
        y: rand(riverTop + 10, riverBottom + 80),
        r: rand(1.4, 4.2),
        vy: rand(0.12, 0.42),
        drift: rand(-0.08, 0.08),
        wobble: rand(0, Math.PI * 2),
        wobbleSpeed: rand(0.008, 0.02),
        alpha: rand(0.08, 0.22)
      }));

      // Benjamin Orellana - 2026-02-22 - Incrementa peces y mejora visibilidad en pantallas grandes (alpha, escala y rango vertical).
      const effectiveFishCount = Math.max(fishCount, isDesktop ? 7 : fishCount);

      fish = Array.from({ length: effectiveFishCount }).map(() => {
        const fromLeft = Math.random() > 0.5;
        return {
          x: fromLeft ? rand(-120, -20) : rand(width + 20, width + 120),
          // más arriba y concentrados en una banda visible del río
          y: rand(riverTop + riverBand * 0.08, riverTop + riverBand * 0.55),
          scale: rand(isDesktop ? 0.95 : 0.7, isDesktop ? 1.45 : 1.25),
          speed: rand(0.6, 0.38) * (fromLeft ? 1 : -1),
          sway: rand(0, Math.PI * 2),
          swaySpeed: rand(0.006, 0.014),
          alpha: rand(isDesktop ? 0.11 : 0.05, isDesktop ? 0.2 : 0.1),
          flip: fromLeft ? 1 : -1
        };
      });

      driftingGlowDots = Array.from({
        length: clamp(Math.round(width / 42), 16, 40)
      }).map(() => ({
        x: rand(0, width),
        y: rand(height * 0.1, height * 0.78),
        r: rand(0.5, 1.6),
        alpha: rand(0.03, 0.08),
        twinkle: rand(0, Math.PI * 2),
        twinkleSpeed: rand(0.006, 0.018)
      }));
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initScene();
    };

    const drawCircle = (x, y, r, a, stroke = false) => {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      if (stroke) {
        ctx.strokeStyle = `rgba(255,255,255,${a * opacity})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      } else {
        ctx.fillStyle = `rgba(255,255,255,${a * opacity})`;
        ctx.fill();
      }
    };

    const riverY = (x, base, amp1 = 7, amp2 = 3.5, ph = 0) => {
      return (
        base +
        Math.sin(x * 0.009 + ph) * amp1 +
        Math.cos(x * 0.0048 + ph * 0.65) * amp2
      );
    };

    const drawCalmRiver = () => {
      const riverTopBase = height * getRiverTopRatio();
      const riverBottom = height + 8;

      // Capa de agua translúcida (blanca muy suave para contrastar con fondo navy)
      const fillGrad = ctx.createLinearGradient(
        0,
        riverTopBase - 10,
        0,
        riverBottom
      );
      fillGrad.addColorStop(0, `rgba(255,255,255,${0.015 * opacity})`);
      fillGrad.addColorStop(0.45, `rgba(255,255,255,${0.03 * opacity})`);
      fillGrad.addColorStop(1, `rgba(255,255,255,${0.06 * opacity})`);

      ctx.beginPath();
      ctx.moveTo(-20, riverBottom);
      for (let x = -20; x <= width + 20; x += 8) {
        ctx.lineTo(x, riverY(x, riverTopBase, 7, 2.5, t * 0.012));
      }
      ctx.lineTo(width + 20, riverBottom);
      ctx.closePath();
      ctx.fillStyle = fillGrad;
      ctx.fill();

      // Líneas de río calmado (ondas suaves)
      for (let i = 0; i < waveLines; i += 1) {
        const yBase = riverTopBase + i * 14;
        const amp1 = 4.2 + i * 1.2;
        const amp2 = 1.8 + i * 0.7;
        const phase = t * (0.01 + i * 0.0018);

        ctx.beginPath();
        for (let x = -10; x <= width + 10; x += 6) {
          const y = riverY(x, yBase, amp1, amp2, phase);
          if (x === -10) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.strokeStyle = `rgba(255,255,255,${(0.05 + i * 0.015) * opacity})`;
        ctx.lineWidth = i === 0 ? 1.2 : 1;
        ctx.stroke();
      }

      // Brillo horizontal muy sutil en superficie
      const shine = ctx.createLinearGradient(0, 0, width, 0);
      shine.addColorStop(0, 'rgba(255,255,255,0)');
      shine.addColorStop(0.25, `rgba(255,255,255,${0.03 * opacity})`);
      shine.addColorStop(0.5, `rgba(255,255,255,${0.05 * opacity})`);
      shine.addColorStop(0.75, `rgba(255,255,255,${0.03 * opacity})`);
      shine.addColorStop(1, 'rgba(255,255,255,0)');

      ctx.beginPath();
      for (let x = -10; x <= width + 10; x += 8) {
        const y = riverY(x, riverTopBase + 5, 3, 1.2, t * 0.008);
        if (x === -10) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = shine;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const drawFish = (f) => {
      const y = f.y + Math.sin(f.sway + t * f.swaySpeed) * 3.6;
      const x = f.x;
      const s = f.scale;

      ctx.save();
      ctx.translate(x, y);
      ctx.scale(f.flip, 1);

      ctx.strokeStyle = `rgba(255,255,255,${f.alpha * opacity})`;
      ctx.fillStyle = `rgba(255,255,255,${f.alpha * 0.12 * opacity})`;
      ctx.lineWidth = width >= 1024 ? 1.25 : 1;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // cuerpo
      ctx.beginPath();
      ctx.ellipse(0, 0, 16 * s, 6.4 * s, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // cola
      ctx.beginPath();
      ctx.moveTo(-14 * s, 0);
      ctx.lineTo(-24 * s, -7 * s);
      ctx.lineTo(-28 * s, 0);
      ctx.lineTo(-24 * s, 7 * s);
      ctx.closePath();
      ctx.stroke();

      // aleta superior
      ctx.beginPath();
      ctx.moveTo(-2 * s, -4.5 * s);
      ctx.lineTo(3 * s, -9 * s);
      ctx.lineTo(8 * s, -3.5 * s);
      ctx.stroke();

      // aleta inferior
      ctx.beginPath();
      ctx.moveTo(-5 * s, 3.5 * s);
      ctx.lineTo(5 * s, 7.5 * s);
      ctx.lineTo(7 * s, 3.2 * s);
      ctx.stroke();

      // ojo
      drawCircle(8 * s, -0.8 * s, Math.max(0.5, 0.7 * s), f.alpha * 1.35);

      ctx.restore();
    };

    const drawFishingRods = () => {
      const waterY = height * getRiverTopRatio();

      ctx.save();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Caña izquierda
      ctx.strokeStyle = `rgba(255,255,255,${0.085 * opacity})`;
      ctx.lineWidth = 1.35;

      ctx.beginPath();
      ctx.moveTo(34, height - 22);
      ctx.quadraticCurveTo(90, height * 0.65, 165, height * 0.36);
      ctx.stroke();

      // Línea izquierda
      ctx.strokeStyle = `rgba(255,255,255,${0.06 * opacity})`;
      ctx.lineWidth = 0.9;
      ctx.beginPath();
      ctx.moveTo(165, height * 0.36);
      ctx.bezierCurveTo(182, height * 0.5, 152, waterY - 32, 168, waterY + 6);
      ctx.stroke();

      // Boya izquierda (muy sutil)
      drawCircle(168, waterY + 6 + Math.sin(t * 0.018) * 1.5, 2.6, 0.07);
      drawCircle(168, waterY + 6 + Math.sin(t * 0.018) * 1.5, 5.2, 0.03, true);

      // Caña derecha
      ctx.strokeStyle = `rgba(255,255,255,${0.085 * opacity})`;
      ctx.lineWidth = 1.35;

      ctx.beginPath();
      ctx.moveTo(width - 36, height - 24);
      ctx.quadraticCurveTo(
        width - 92,
        height * 0.66,
        width - 176,
        height * 0.33
      );
      ctx.stroke();

      // Línea derecha
      ctx.strokeStyle = `rgba(255,255,255,${0.06 * opacity})`;
      ctx.lineWidth = 0.9;
      ctx.beginPath();
      ctx.moveTo(width - 176, height * 0.33);
      ctx.bezierCurveTo(
        width - 194,
        height * 0.5,
        width - 158,
        waterY - 28,
        width - 176,
        waterY + 4
      );
      ctx.stroke();

      drawCircle(
        width - 176,
        waterY + 4 + Math.sin(t * 0.016 + 1.2) * 1.5,
        2.6,
        0.07
      );
      drawCircle(
        width - 176,
        waterY + 4 + Math.sin(t * 0.016 + 1.2) * 1.5,
        5.2,
        0.03,
        true
      );

      ctx.restore();
    };

    const drawAtmosphere = () => {
      // Microburbujas repartidas (lo "otro")
      for (const p of microBubbles) {
        if (!reducedMotion) {
          p.x += p.vx + Math.sin(p.wobble) * 0.012;
          p.y += p.vy;
          p.wobble += p.wobbleSpeed;
        }

        if (p.x < -8) p.x = width + 8;
        if (p.x > width + 8) p.x = -8;
        if (p.y < -8) {
          p.y = rand(height * 0.72, height * 0.9);
          p.x = rand(0, width);
        }

        drawCircle(p.x, p.y, p.r, p.alpha);

        if (p.r > 1.25 && Math.random() > 0.992) {
          drawCircle(p.x, p.y, p.r + 0.8, p.alpha * 0.45, true);
        }
      }

      // Puntitos glow suaves (solo profundidad visual)
      for (const g of driftingGlowDots) {
        if (!reducedMotion) g.twinkle += g.twinkleSpeed;
        const a = g.alpha + Math.sin(g.twinkle) * 0.02;
        drawCircle(g.x, g.y, g.r, a);
      }
    };

    const drawRiverBubbles = () => {
      const riverTop = height * (getRiverTopRatio() - 0.02);
      for (const b of riverBubbles) {
        if (!reducedMotion) {
          b.y -= b.vy;
          b.wobble += b.wobbleSpeed;
          b.x += Math.sin(b.wobble) * 0.12 + b.drift;
        }

        if (b.y < riverTop - 42) {
          b.y = rand(height * 0.84, height + 80);
          b.x = rand(0, width);
          b.r = rand(1.4, 4.2);
          b.alpha = rand(0.08, 0.22);
        }

        // Mantenerlas cerca del río visualmente
        if (b.y > riverTop - 8) {
          drawCircle(b.x, b.y, b.r, b.alpha);
          if (b.r > 2.2) {
            drawCircle(b.x, b.y, b.r + 1.1, b.alpha * 0.42, true);
          }
        }
      }
    };

    const updateFish = () => {
      const riverTop = height * getRiverTopRatio();
      const minY = riverTop + 6;
      // Benjamin Orellana - 2026-02-22 - Limita los peces a una franja más visible del río en desktop.
      const maxY = Math.min(height - 26, riverTop + (height - riverTop) * 0.62);

      for (const f of fish) {
        if (!reducedMotion) {
          f.x += f.speed;
          f.sway += f.swaySpeed;
        }

        // Reingreso lateral
        if (f.speed > 0 && f.x > width + 130) {
          f.x = rand(-150, -40);
          f.y = rand(minY, maxY);
        } else if (f.speed < 0 && f.x < -130) {
          f.x = rand(width + 40, width + 150);
          f.y = rand(minY, maxY);
        }

        // Mantenerlos en el río (si cambia viewport)
        f.y = clamp(f.y, minY, maxY);
      }
    };

    const drawVignette = () => {
      const g = ctx.createLinearGradient(0, 0, 0, height);
      g.addColorStop(0, `rgba(255,255,255,${0.01 * opacity})`);
      g.addColorStop(0.4, 'rgba(255,255,255,0)');
      g.addColorStop(1, `rgba(255,255,255,${0.015 * opacity})`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);
    };

    const frame = () => {
      rafRef.current = window.requestAnimationFrame(frame);
      if (!width || !height) return;

      t += reducedMotion ? 0.25 : 1;

      ctx.clearRect(0, 0, width, height);

      // 1) Atmósfera superior/media (burbujas suaves)
      drawAtmosphere();

      // 2) Cañas de pescar decorativas
      drawFishingRods();

      // 3) Río calmado (pie visual)
      drawCalmRiver();

      // 4) Peces (encima del río)
      updateFish();
      for (const f of fish) drawFish(f);

      // 5) Burbujas que nacen del río
      drawRiverBubbles();

      // 6) Viñeta final
      drawVignette();
    };

    resize();
    frame();

    window.addEventListener('resize', resize, { passive: true });

    return () => {
      window.removeEventListener('resize', resize);
      media?.removeEventListener?.('change', onMotionChange);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [opacity, particleCount, bubbleCount, fishCount, waveLines]);

  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex,
        overflow: 'hidden'
      }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
