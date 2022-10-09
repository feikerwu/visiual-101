/**
 * webgl 程序，点击页面随机生成一个鼠标所在的节点，with WebGL
 */

import React, { useEffect, useRef, useState } from 'react';
import { createWebglProgram } from '../utils/webgl';

const RandomPoints = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [count, setCount] = useState(1);

  // 在 hook 内每次触发 react 刷新导致的
  useEffect(() => {
    if (ref.current) {
      const gl = ref.current.getContext('webgl');

      if (gl) {
        const vertexShader = `void main() {
          gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
          gl_PointSize = 10.0;
        }`;

        const fragmentShader = `void main() {
          gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }`;

        const program = createWebglProgram(gl, vertexShader, fragmentShader);

        if (program) {
          gl.useProgram(program);
          gl.clearColor(0.0, 0.0, 0.0, 1.0);
          console.log(gl.COLOR_BUFFER_BIT);
          gl.clear(gl.COLOR_BUFFER_BIT);

          gl.drawArrays(gl.POINTS, 0, 1);
        }
      }
    }
  }, [count]);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>update</button>
      <canvas ref={ref}></canvas>;
    </div>
  );
};

export default RandomPoints;
