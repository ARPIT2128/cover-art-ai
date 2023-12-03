import { useEffect, useRef } from 'react';

const ParticleCanvas = () => {
  const canvasRef = useRef(null);
  const mouse = { x: 0, y: 0 };
  const parts = [];
  const w = typeof window !== 'undefined' ? window.innerWidth : 0;
  const h = typeof window !== 'undefined' ? window.innerHeight : 0;
  const rate = 60;
  const arc = 100;
  const size = 7;
  const speed = 20;
  const colors = ['red', '#f57900', 'yellow', '#ce5c00', '#5c3566'];
  let time = 0;
  let count = 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.setAttribute('width', w);
    canvas.setAttribute('height', h);

    const create = () => {
      time = 0;
      count = 0;

      for (let i = 0; i < arc; i++) {
        parts[i] = {
          x: Math.ceil(Math.random() * w),
          y: Math.ceil(Math.random() * h),
          toX: Math.random() * 5 - 1,
          toY: Math.random() * 2 - 1,
          c: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * size,
        };
      }
    };

    const particles = () => {
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < arc; i++) {
        const li = parts[i];
        const distanceFactor = DistanceBetween(mouse, parts[i]);
        const distanceFactorClamped = Math.max(Math.min(15 - distanceFactor / 10, 10), 1);
        ctx.beginPath();
        ctx.arc(li.x, li.y, li.size * distanceFactorClamped, 0, Math.PI * 2, false);
        ctx.fillStyle = li.c;
        ctx.strokeStyle = li.c;
        if (i % 2 === 0) ctx.stroke();
        else ctx.fill();

        li.x = li.x + li.toX * (time * 0.05);
        li.y = li.y + li.toY * (time * 0.05);

        if (li.x > w) li.x = 0;
        if (li.y > h) li.y = 0;
        if (li.x < 0) li.x = w;
        if (li.y < 0) li.y = h;
      }

      if (time < speed) {
        time++;
      }

      requestAnimationFrame(particles);
    };

    const MouseMove = (e) => {
      // Debounce the mouse movement
      clearTimeout(mouseMoveTimeout);
      mouseMoveTimeout = setTimeout(() => {
        mouse.x = e.layerX;
        mouse.y = e.layerY;
      }, 10);
    };

    const DistanceBetween = (p1, p2) => {
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      return Math.sqrt(dx * dx + dy * dy);
    };

    let mouseMoveTimeout;

    create();
    particles();

    // Attach event listener outside the animation loop
    canvas.addEventListener('mousemove', MouseMove);

    // Cleanup event listener on component unmount
    return () => {
      canvas.removeEventListener('mousemove', MouseMove);
      clearTimeout(mouseMoveTimeout);
    };
  }, [w, h]);

  return <canvas ref={canvasRef} id="particle-canvas" style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }} />;
};

export default ParticleCanvas;
