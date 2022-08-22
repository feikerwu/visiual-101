import { useEffect, useRef } from 'react';
import { Vector2D } from '../utils/vector';

const config = {
  thicknessCut: 0.8,
  lengthCut: 0.9,
  dirChange: 0.2,
  // 最小粗度
  minThickness: 2,
};
function drawBranch({ ctx, begin, thickness, length, dir, bias = 0.02 }) {
  const added = new Vector2D(1, 0).rotate(dir).scale(length);
  const next = begin.copy().add(added);

  ctx.lineCap = 'round';
  ctx.lineWidth = thickness;

  ctx.beginPath();
  ctx.moveTo(begin.x, begin.y);
  ctx.lineTo(next.x, next.y);
  ctx.stoke();

  if (thickness > config.minThickness) {
    // 左边
    drawBranch({
      ctx,
      begin: next,
      thickness: thickness * config.thicknessCut,
      length: length * config.lengthCut,
      dir: dir - config.dirChange,
      bias: bias,
    });
    // 右边
    drawBranch({
      ctx,
      begin: next,
      thickness: thickness * config.thicknessCut,
      length: length * config.lengthCut,
      dir: dir - config.dirChange,
      bias: bias,
    });
  }
}

const AutoDrawTree = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (ref.current) {
      const ctx = ref.current.getContext('2d');

      if (ctx) {
        ctx.scale(0, -1);

        drawBranch({
          ctx,
          begin: new Vector2D(500, 0),
          thickness: 10,
          length: 30,
          dir: Math.PI / 2,
          bias: 0.02,
        });
      }
    }
  }, []);

  return (
    <canvas
      ref={ref}
      width='1000'
      height='1000'
      style={{ width: '1000px', height: '1000px' }}
    ></canvas>
  );
};

export default AutoDrawTree;
