import { useEffect, useState } from 'react';

// 顶点着色器
const vertex = `
  attribute vec2 position;

  void main() {
    gl_PointSize = 1.0;
    gl_Position = vec4(position, 1.0, 1.0);
}`;

// 片元着色器
const fragment = `
  precision mediump float;

  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
} `;

const WebGLDemo = () => {
  const [drawTime, setDrawtime] = useState(1);

  useEffect(() => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const webgl = canvas.getContext('webgl');
      if (webgl) {
        const vertexShader = webgl.createShader(
          webgl.VERTEX_SHADER
        ) as WebGLShader;

        const fragmentShader = webgl.createShader(
          webgl.FRAGMENT_SHADER
        ) as WebGLShader;

        webgl.shaderSource(vertexShader, vertex);
        webgl.shaderSource(fragmentShader, fragment);

        webgl.compileShader(vertexShader);
        webgl.compileShader(fragmentShader);

        const program = webgl.createProgram() as WebGLProgram;

        webgl.attachShader(program, vertexShader);
        webgl.attachShader(program, fragmentShader);

        webgl.linkProgram(program);

        // 使用这个program
        webgl.useProgram(program);

        const points = new Float32Array([-1, -1, 0, 1, 1, -1]);

        const bufferId = webgl.createBuffer();
        webgl.bindBuffer(webgl.ARRAY_BUFFER, bufferId);
        webgl.bufferData(webgl.ARRAY_BUFFER, points, webgl.STATIC_DRAW);

        const position = webgl.getAttribLocation(program, 'position');
        webgl.vertexAttribPointer(position, 2, webgl.FLOAT, false, 0, 0);
        // 激活这个变量
        webgl.enableVertexAttribArray(position);

        webgl.clear(webgl.COLOR_BUFFER_BIT);

        webgl.drawArrays(webgl.TRIANGLES, 0, points.length / 2);
      }
    }
  }, [drawTime]);

  return (
    <div>
      <button onClick={() => setDrawtime(drawTime + 1)}>刷新</button>

      <canvas width={100} height={100}></canvas>
    </div>
  );
};

export default WebGLDemo;
