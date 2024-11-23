export class Circle {
  private x: number;
  private y: number;
  private r: number;
  public alive = true;

  constructor(x: number, y: number, r: number) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  getPosition() {
    return { x: this.x, y: this.y };
  }

  getRadius() {
    return this.r;
  }

  dilate() {
    if (!this.alive) return;
    this.r = this.r + 0.5;
  }
}
