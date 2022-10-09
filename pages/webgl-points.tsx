/**
 * webgl 程序，点击页面随机生成一个鼠标所在的节点，with WebGL
 */

import React, { useEffect, useRef, useState } from 'react';
import { createWebglProgram } from '../utils/webgl';

type Color = {
  r: number;
  g: number;
  b: number;
  a: number;
};
function randomColor(): Color {
  return {
    r: Math.random() * 255,
    g: Math.random() * 255,
    b: Math.random() * 255,
    a: 1,
  };
}

const RandomPoints = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [points, setPoints] = useState<
    Array<{ x: number; y: number; color: Color }>
  >([]);

  // 在 hook 内每次触发 react 刷新导致的
  useEffect(() => {
    if (ref.current) {
      const gl = ref.current.getContext('webgl');

      if (gl) {
        const vertexShader = `
          precision mediump float;
          attribute vec2 custom_position;
          attribute vec2 canvas_size;

          void main() {
            // 将canvas内的坐标系转换为NOC坐标
            vec2 position = (custom_position / canvas_size) * 2.0 - 1.0;
            // 坐标系反转
            position = position * vec2(1.0, -1.0);
            gl_Position = vec4(position.x, position.y, 0, 1);
            // gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
            gl_PointSize = 10.0;
          }
        `;
        const fragmentShader = `
          precision mediump float;
          uniform vec4 u_Color;

          void main() {
            vec4 color = u_Color / vec4(255.0, 255.0, 255.0, 1.0);
            gl_FragColor = color;
          }
        `;

        const program = createWebglProgram(gl, vertexShader, fragmentShader);

        if (program) {
          gl.useProgram(program);
          gl.clearColor(0.0, 0.0, 0.0, 1.0);
          // console.log(gl.COLOR_BUFFER_BIT);
          gl.clear(gl.COLOR_BUFFER_BIT);

          const custom_position = gl.getAttribLocation(
            program,
            'custom_position'
          );

          const canvas_size = gl.getAttribLocation(program, 'canvas_size');

          const u_Color = gl.getUniformLocation(program, 'u_Color');

          // console.log(ref.current.width, ref.current.height);
          gl.vertexAttrib2f(
            canvas_size,
            ref.current.clientWidth,
            ref.current.clientHeight
          );

          console.log(points);

          for (let { x, y, color } of points) {
            gl.uniform4f(u_Color, color.r, color.g, color.b, color.a);
            gl.vertexAttrib2f(custom_position, x, y);
            gl.drawArrays(gl.POINTS, 0, 1);
          }
        }
      }
    }
  }, [points]);

  useEffect(() => {
    const canvas = ref.current;
    if (canvas) {
      const handleClick = e => {
        const newPoints = [...points];
        newPoints.push({
          x: e.offsetX,
          y: e.offsetY,
          color: randomColor(),
        });
        setPoints(newPoints);
      };

      canvas.addEventListener('click', handleClick);
      return () => canvas.removeEventListener('click', handleClick);
    }
  }, [points]);

  return (
    <div>
      {/* <button onClick={() => setCount(count + 1)}>update</button> */}
      <canvas ref={ref}></canvas>
    </div>
  );
};

export default RandomPoints;
