/**
 * 用于验证canvas的性能情况
 */
import { getRegularPolyVertices, drawShape } from '../utils/shape';
import { randomInt } from '../utils/help';
import { Point } from '../utils/vector';

import { useEffect, useRef } from 'react';

const shapeCount = 1000;
const width = 500,
  height = 400,
  r = 10;

const edgeTypes = [3, 4, 8, 100];

const PerfDemo = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    function draw() {
      let allShape = Array.from({ length: shapeCount }).map(_ =>
        getRegularPolyVertices(
          randomInt(width),
          randomInt(height),
          randomInt(r),
          edgeTypes[Math.floor(Math.random() * 4)]
        )
      );

      if (ref.current) {
        const ctx = ref.current.getContext('2d') as CanvasRenderingContext2D;
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = 'rgba(24, 44, 79, 0.8)';
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        allShape.forEach(points => {
          if (points.length < 50) {
            drawShape(ctx, points);
          } else {
            ctx.arc(
              randomInt(width),
              randomInt(height),
              randomInt(r),
              0,
              Math.PI * 2
            );
          }
        });
      }

      requestAnimationFrame(draw);
    }

    draw();

    // const requestId = requestAnimationFrame(draw);
  }, []);

  return (
    <canvas
      ref={ref}
      width={width}
      height={height}
      className={'w-8/12, h-8/12'}
    ></canvas>
  );
};

export default PerfDemo;
