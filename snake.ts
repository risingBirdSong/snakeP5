import p5 from "p5";
import { squareSide } from "./index";
class Snake {
  constructor(
    public s: p5,
    public x: number = 0,
    public y: number = 0,
    public xSpeed: number = 0,
    public ySpeed: number = 0
  ) { };
  placeOnGrid() {
    let col = Math.floor(this.s.width / squareSide);
    let row = Math.floor(this.s.height / squareSide);
  }
  steer(key) {
    switch (key) {
      case this.s.LEFT_ARROW:
        this.xSpeed = -1;
        this.ySpeed = 0;
        break;
      case this.s.RIGHT_ARROW:
        this.xSpeed = 1;
        this.ySpeed = 0;
        break;
      case this.s.UP_ARROW:
        this.ySpeed = -1;
        this.xSpeed = 0;
        break;
      case this.s.DOWN_ARROW:
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
    this.s.rect(this.x, this.y, squareSide, squareSide);
    this.s.fill(10, 50, 250);
  }
}

export default Snake;
