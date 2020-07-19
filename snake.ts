import p5 from "p5";
import { squareSide } from "./index";
class Snake {
  private direction: number;
  constructor(
    public s: p5,
    public x: number,
    public y: number,
    private xSpeed: number = 0,
    private ySpeed: number = 0
  ) {
    this.x = x;
    this.y = y;
  };
  steer(key) {
    switch (key) {
      case this.s.LEFT_ARROW:
        if (this.direction === this.s.RIGHT_ARROW) {
          break;
        }
        this.direction = this.s.LEFT_ARROW
        this.xSpeed = -squareSide;
        this.ySpeed = 0;
        break;
      case this.s.RIGHT_ARROW:
        if (this.direction === this.s.LEFT_ARROW) {
          break;
        }
        this.direction = this.s.RIGHT_ARROW;
        this.xSpeed = squareSide;
        this.ySpeed = 0;
        break;
      case this.s.UP_ARROW:
        if (this.direction === this.s.DOWN_ARROW) {
          break;
        }
        this.direction = this.s.UP_ARROW;
        this.ySpeed = -squareSide;
        this.xSpeed = 0;
        break;
      case this.s.DOWN_ARROW:
        if (this.direction === this.s.UP_ARROW) {
          break;
        }
        this.direction = this.s.DOWN_ARROW;
        this.ySpeed = squareSide;
        this.xSpeed = 0;
        break;
    }
  }
  update() {
    this.x = Math.floor(this.x + this.xSpeed);
    this.y = Math.floor(this.y + this.ySpeed);
  };
  draw() {

    this.s.fill(10, 50, 250);
    this.s.rect(this.x, this.y, squareSide, squareSide);
  }
}

export default Snake;
