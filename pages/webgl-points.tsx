/**
 * webgl 程序，点击页面随机生成一个鼠标所在的节点，with WebGL
 */
import React, { useEffect, useRef } from 'react';
import { createWebglProgram } from '../utils/webgl';

const RandomPoints = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (ref.current) {
      const gl = ref.current.getContext('webgl');

      if (gl) {
        const vertexShader = `void main() {
          gl_position = vec4(0.0, 0.0, 0.0, 1.0);
          gl_PointSize = 10;
        }`;

        const fragmentShader = `void main(){
	 	//设置像素颜色为红色
		gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
	}`;

        const program = createWebglProgram(gl, vertexShader, fragmentShader);

        if (program) {
          console.log(program);
          // gl.useProgram(program);

          gl.clearColor(0.0, 0.0, 0.0, 1.0);
          console.log(gl.COLOR_BUFFER_BIT);

          gl.clear(gl.COLOR_BUFFER_BIT);

          gl.drawArrays(gl.POINTS, 0, 1);
        }
      }
    }
  }, []);
  return <canvas ref={ref}></canvas>;
};

export default RandomPoints;
