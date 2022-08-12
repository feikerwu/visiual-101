import React, { useEffect, useState, useRef } from 'react';
import { hierarchy, pack } from 'd3-hierarchy';

async function getData() {
  const dataSource = 'https://s5.ssl.qhres2.com/static/b0695e2dd30daa64.json';
  const data = await (await fetch(dataSource)).json();

  return data;
}

const TAU = 2 * Math.PI;

function processData(data: any) {
  const regions = hierarchy(data)
    // 计算当前节点下所有儿子节点以及当前节点的个数
    .sum(d => 1)
    .sort((a, b) => (a.value || 0) - (b.value || 0));

  const packData = pack().size([1600, 1600]).padding(3);

  const root = packData(regions);

  return root;
}

// 递归绘制层次数据
function draw({
  ctx,
  node,
  fillStyle = 'rgba(0, 0, 0, 0.2)',
  textColor = '#F9F9F9',
}) {
  const { children = [], x, y, r } = node;
  ctx.beginPath();
  ctx.fillStyle = fillStyle;

  // 圆周率
  ctx.arc(x, y, r, 0, TAU);
  ctx.fill();

  if (children.length) {
    children.forEach(child => {
      draw({ ctx, node: child, fillStyle });
    });
  } else {
    // 针对叶子结点
    const label = node.data.name;
    ctx.fillStyle = textColor;
    ctx.font = '24px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, x, y);
  }
}

const Hierarchy = () => {
  // const [data, setData] = useState({});
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    getData().then(data => {
      let root = processData(data);
      // setData(root);
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx?.clearRect(0, 0, canvas.width, canvas.height);

        draw({ ctx, node: root });
      }
    });
  }, []);

  return (
    <div style={{ width: '800px', height: '800px' }}>
      <canvas
        ref={canvasRef}
        width='1600'
        height='1600'
        style={{ width: '100%', height: '100%' }}
      ></canvas>
    </div>
  );
};

export default Hierarchy;
