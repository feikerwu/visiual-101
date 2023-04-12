import { Point } from './vector';

/**
 * 绘制正多边形
 * @param x 正多边形中心坐标 - x
 * @param y 正多边形中心坐标 - y
 * @param r 以正多边形中心为原点的圆半径长度
 * @param edges 正多边形的边数
 */
export function getRegularPolyVertices(
  x: number,
  y: number,
  r: number,
  edges: number
) {
  const singleAngle = (Math.PI * 2) / edges;

  const points: Point[] = [];
  for (let i = 0; i < edges; i++) {
    const rotateAngle = i * singleAngle;
    points.push(
      new Point(x + r * Math.cos(rotateAngle), y + r * Math.sin(rotateAngle))
    );
  }

  return points;
}

// console.log(getRegularPolyVertices(100, 100, 100, 4));

// 根据节点绘制图元
export function drawShape(
  ctx: CanvasRenderingContext2D,
  points: Point[],
  options: Partial<CanvasRenderingContext2D> = {}
) {
  // 初始化canvas的绘制上下文
  for (let key in options) {
    ctx[key] = options[key];
  }

  ctx.beginPath();

  let [begin, ...remain] = points;
  ctx.moveTo(begin.x, begin.y);
  for (let point of remain) {
    ctx.lineTo(point.x, point.y);
  }

  ctx.closePath();
  ctx.stroke();
  ctx.fill();
}
