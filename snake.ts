import p5 from "p5";
class Snake {
  constructor(
    public s: p5,
    public x: number = 100,
    public y: number = 100,
    public xSpeed: number = 0,
    public ySpeed: number = 0
  ) { };
  steer(key) {
    switch (key) {
      case this.s.LEFT_ARROW:
        console.log('left');
        this.xSpeed = -1;
        this.ySpeed = 0;
        break;
      case this.s.RIGHT_ARROW:
        console.log('right');
        this.xSpeed = 1;
        this.ySpeed = 0;
        break;
      case this.s.UP_ARROW:
        console.log('up');
        this.ySpeed = -1;
        this.xSpeed = 0;
        break;
      case this.s.DOWN_ARROW:
        console.log('down');
        this.ySpeed = 1;
        this.xSpeed = 0;
        break;
    }
  }
  update() {
    this.x = this.x + this.xSpeed;
    this.y = this.y + this.ySpeed;
  };
  draw() {
    this.s.rect(this.x, this.y, 20, 20);
  }
}

export default Snake;
