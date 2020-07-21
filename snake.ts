import p5 from "p5";
import { squareSide } from "./index";

let historyCount = 0;
interface tailI {
  x: number;
  y: number;
}

interface historyI extends tailI {
  history: number;
}
class Snake {
  private direction: number;
  public tail: tailI[] = [];
  public snakehistory: historyI[] = [];
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
    for (let i = 0; i <= this.tail.length; i++) {
      if (i < this.tail.length - 1) {
        let tail = this.tail;
        this.tail[i].x = this.tail[i + 1].x;
        this.tail[i].y = this.tail[i + 1].y;
      }
      if (i === this.tail.length - 1) {
        this.tail[i].x = this.x
        this.tail[i].y = this.y;
      }
    }
    this.x = Math.floor(this.x + this.xSpeed);
    this.y = Math.floor(this.y + this.ySpeed);
    historyCount++;
  };
  draw() {
    this.s.fill(10, 50, 250);
    this.s.rect(this.x, this.y, squareSide, squareSide);
    this.snakehistory.push({ x: this.x, y: this.y, history: historyCount });
    if (historyCount % 100 === 0) {
      let blah = "blah";
      console.log("snake history", this.snakehistory);
    }
    for (let t of this.tail) {
      this.s.rect(t.x, t.y, squareSide, squareSide);
    }
  }
}

export default Snake;
