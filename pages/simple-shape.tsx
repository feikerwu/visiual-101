import React, { useRef, useState, useEffect } from 'react';

export const CustomCanvas = ({ width, height, style = {}, draw }) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (ref.current) {
      const canvasEle = ref.current;
      const ctx = canvasEle.getContext('2d');
      draw(ctx);
    }
  }, [draw]);

  return (
    <div style={style}>
      <canvas width={width} height={height} ref={ref}></canvas>
    </div>
  );
};

class Point {
  public x: number;
  public y: number;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function lineTo(ctx: CanvasRenderingContext2D, points: Point[]) {
  for (let i = 0; i < points.length; i++) {
    const { x, y } = points[i];
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }

  ctx.lineTo(points[0].x, points[0].y);

  return ctx;
}

function drawThriangle(
  ctx: CanvasRenderingContext2D,
  { strokeStyle = '#00b8a9' }
) {
  const points = [new Point(0, 0), new Point(200, 20), new Point(400, 200)];
  ctx.strokeStyle = strokeStyle;
  ctx.beginPath();
  lineTo(ctx, points);
  ctx.stroke();
}

const SimpleShape = () => {
  return (
    <CustomCanvas
      width={1000}
      height={1000}
      draw={ctx => {
        drawThriangle(ctx, {});
      }}
      style={{}}
    ></CustomCanvas>
  );
};

export default SimpleShape;
