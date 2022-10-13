/**
 * webgl 程序，点击页面随机生成一个鼠标所在的节点，with WebGL
 */

import React, { useEffect, useRef, useState } from 'react';
import { createWebglProgram, createBuffer } from '../utils/webgl';

type Color = [number, number, number, number];

function randomColor(): Color {
  return [Math.random() * 255, Math.random() * 255, Math.random() * 255, 1];
}

const RandomPoints = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [points, setPoints] = useState<Array<{ x: number; y: number }>>([]);

  // 在 hook 内每次触发 react 刷新导致的
  useEffect(() => {
    if (ref.current) {
      const gl = ref.current.getContext('webgl');

      if (gl) {
        const vertexShader = `
          precision mediump float;
          attribute vec2 custom_position;
          attribute vec2 canvas_size;
          attribute vec4 custom_color;
          varying vec4 u_color;

          void main() {
            // 将canvas内的坐标系转换为NOC坐标
            vec2 position = (custom_position / canvas_size) * 2.0 - 1.0;

            // 坐标系反转
            position = position * vec2(1.0, -1.0);
            gl_Position = vec4(position.x, position.y, 0, 1);
            // gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
            gl_PointSize = 1.0;
            u_color = custom_color;

          }
        `;
        const fragmentShader = `
          precision mediump float;
          varying vec4 u_color;

          void main() {
            vec4 color = u_color / vec4(255.0, 255.0, 255.0, 1.0);
            gl_FragColor = color;
          }
        `;

        const program = createWebglProgram(gl, vertexShader, fragmentShader);

        if (program) {
          gl.useProgram(program);

          const custom_position = gl.getAttribLocation(
            program,
            'custom_position'
          );

          const custom_color = gl.getAttribLocation(program, 'custom_color');
          const canvas_size = gl.getAttribLocation(program, 'canvas_size');
          const u_Color = gl.getUniformLocation(program, 'u_color');

          // console.log(ref.current.width, ref.current.height);
          gl.vertexAttrib2f(
            canvas_size,
            ref.current.clientWidth,
            ref.current.clientHeight
          );

          gl.uniform4f(u_Color, ...randomColor());

          // console.log(points);

          if (points.length > 0) {
            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            let trianglesPoints: number[] = [];
            for (let { x, y } of points) {
              trianglesPoints.push(x, y, ...randomColor());
            }

            createBuffer(gl, new Float32Array(trianglesPoints));

            // 缓存区数据获取节点位置
            gl.enableVertexAttribArray(custom_position);
            gl.vertexAttribPointer(custom_position, 2, gl.FLOAT, false, 6, 0);

            // 缓存区数据获取颜色
            gl.enableVertexAttribArray(custom_color);
            gl.vertexAttribPointer(custom_color, 4, gl.FLOAT, false, 6, 2);

            gl.drawArrays(gl.LINE_STRIP, 0, points.length / 6);
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
        newPoints.push({ x: e.pageX, y: e.pageY });

        setPoints(newPoints);

        // setPoints(newPoints.slice(-3));
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
