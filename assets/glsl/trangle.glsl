attribute vec2 position;
void main() { gl_PointSize = 1.0; gl_Position = vec4(position, 1.0, 1.0); }