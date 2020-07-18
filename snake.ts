import p5 from "p5";
class Snake {
  constructor(
    public s: p5,
    public x: number = 100,
    public y: number = 100,
    public xSpeed: number = 1,
    public ySpeed: number = 0
  ) { }
  update() {
    this.x = this.x + this.xSpeed;
    this.y = this.y + this.ySpeed;
  };
  draw() {
    this.s.rect(this.x, this.y, 20, 20);
  }
}

export default Snake;
