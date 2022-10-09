/**
 * 创建顶点着色器
 */
export function createVertexShader(
  gl: WebGLRenderingContext,
  shaderSource: string
) {
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);

  if (vertexShader) {
    gl.shaderSource(vertexShader, shaderSource);
    gl.compileShader(vertexShader);

    // 查看编译错误
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      console.info(gl.getShaderInfoLog(vertexShader));
    }

    return vertexShader;
  } else {
    throw new Error('create shader failed');
  }
}

/**
 * 创建片元着色器
 */
export function createFragmentShader(
  gl: WebGLRenderingContext,
  shaderSource: string
) {
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

  if (fragmentShader) {
    gl.shaderSource(fragmentShader, shaderSource);
    gl.compileShader(fragmentShader);

    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      console.info(gl.getShaderInfoLog(fragmentShader));
    }

    return fragmentShader;
  } else {
    throw new Error('create fragement shader failed');
  }
}

// 创建webgl程序
export function createWebglProgram(
  gl: WebGLRenderingContext,
  vertexShaderSource: string,
  fragmentShaderSource: string
) {
  const vertexShader = createVertexShader(gl, vertexShaderSource);

  const fragmentShader = createFragmentShader(gl, fragmentShaderSource);

  const program = gl.createProgram();

  if (program) {
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    // gl.useProgram(program);

    return program;
  } else {
    throw new Error('create program failed');
  }
}
