type Vector2DOptions = {
  x: number;
  y: number;
};
export class Vector2D {
  /**
   * x 坐标
   */
  public x: number;

  /**
   * y 坐标
   */
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  copy() {
    return new Vector2D(this.x, this.y);
  }

  /**
   *
   * @param dir 旋转角度
   */
  rotate(dir: number) {
    const { x, y } = this;

    this.x = Math.cos(dir) * x - Math.sin(dir) * y;
    this.y = Math.sin(dir) * x + Math.cos(dir) * y;

    return this;
  }

  scale(multiplier: number) {
    this.x = this.x * multiplier;
    this.y = this.y * multiplier;
  }

  add(ver: Vector2D) {
    this.x = this.x + ver.x;
    this.y = this.y + ver.y;
  }
}

export class Point extends Vector2D {}
