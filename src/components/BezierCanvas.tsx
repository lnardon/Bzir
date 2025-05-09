import React, { useRef, useEffect, useState } from 'react';
import { Point } from '../types';

interface BezierCanvasProps {
  points: Point[];
  size: number;
  onChange: (points: Point[]) => void;
}

const BezierCanvas: React.FC<BezierCanvasProps> = ({ points, size, onChange }) => {
  const [activePointIndex, setActivePointIndex] = useState<number | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const canvasSize = size;
  const pointRadius = 8;
  const fixedPoints = [0, 3];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasSize, canvasSize);
    ctx.save();
    ctx.translate(0, canvasSize);
    ctx.scale(1, -1);
    drawGrid(ctx);
    drawBezierCurve(ctx, points);

    ctx.beginPath();
    ctx.moveTo(points[0].x * canvasSize, points[0].y * canvasSize);
    ctx.lineTo(points[1].x * canvasSize, points[1].y * canvasSize);
    ctx.moveTo(points[3].x * canvasSize, points[3].y * canvasSize);
    ctx.lineTo(points[2].x * canvasSize, points[2].y * canvasSize);
    ctx.strokeStyle = '#34d399';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 2]);
    ctx.stroke();
    ctx.setLineDash([]);

    points.forEach((point, index) => {
      const isActive = index === activePointIndex;
      const isFixed = fixedPoints.includes(index);

      ctx.beginPath();
      ctx.arc(
        point.x * canvasSize,
        point.y * canvasSize,
        pointRadius,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = isFixed 
        ? 'rgba(16, 185, 129, 0.4)' 
        : isActive 
          ? '#047857' 
          : '#10b981';
      ctx.fill();
      ctx.strokeStyle = isFixed ? '#047857' : '#047857';
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    ctx.restore();
  }, [points, activePointIndex, size]);

  const drawGrid = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.lineWidth = 1;

    for (let i = 0; i <= 10; i++) {
      const pos = (i / 10) * canvasSize;
      ctx.moveTo(pos, 0);
      ctx.lineTo(pos, canvasSize);
      ctx.moveTo(0, pos);
      ctx.lineTo(canvasSize, pos);
    }

    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.lineWidth = 2;
    ctx.moveTo(0, 0);
    ctx.lineTo(canvasSize, 0);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, canvasSize);
    ctx.stroke();
  };

  const drawBezierCurve = (ctx: CanvasRenderingContext2D, points: Point[]) => {
    ctx.beginPath();
    ctx.moveTo(points[0].x * canvasSize, points[0].y * canvasSize);
    ctx.bezierCurveTo(
      points[1].x * canvasSize, points[1].y * canvasSize,
      points[2].x * canvasSize, points[2].y * canvasSize,
      points[3].x * canvasSize, points[3].y * canvasSize
    );
    ctx.strokeStyle = '#059669';
    ctx.lineWidth = 3;
    ctx.stroke();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / canvasSize;
    const y = 1 - (e.clientY - rect.top) / canvasSize;

    let closestPointIndex = -1;
    let closestDistance = Number.MAX_VALUE;

    points.forEach((point, index) => {
      if (fixedPoints.includes(index)) return;

      const distance = Math.sqrt(
        Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2)
      );

      if (distance < closestDistance) {
        closestDistance = distance;
        closestPointIndex = index;
      }
    });

    if (closestDistance < 0.05) {
      setActivePointIndex(closestPointIndex);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (activePointIndex === null || fixedPoints.includes(activePointIndex)) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / canvasSize;
    const y = 1 - (e.clientY - rect.top) / canvasSize;

    const clampedX = Math.max(0, Math.min(1, x));
    const clampedY = Math.max(-0.5, Math.min(1.5, y));
    const newPoints = [...points];
    newPoints[activePointIndex] = { x: clampedX, y: clampedY };
    onChange(newPoints);
  };

  const handleMouseUp = () => {
    setActivePointIndex(null);
  };

  const handleMouseLeave = () => {
    setActivePointIndex(null);
  };

  return (
    <div ref={containerRef} className="relative">
      <canvas
        ref={canvasRef}
        width={canvasSize}
        height={canvasSize}
        className="border border-gray-200 rounded-lg bg-white shadow-inner"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
};

export default BezierCanvas;