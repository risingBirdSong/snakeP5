import p5 from "p5";
import Snake from "./snake";
import rounder from "./helper";
export const squareSide = 20;
let counter = 50;


const App = new p5((s: p5) => {

  let snake: Snake;
  s.setup = () => {
    s.createCanvas(500, 500);
    s.frameRate(10);
    spawnSnake();
  }
  const spawnSnake = function () {
    let middleWidth = rounder(squareSide, s.width / 2);
    let middleHeight = rounder(squareSide, s.height / 2);
    snake = new Snake(s, middleWidth, middleHeight);
  }
  s.keyPressed = () => {
    snake.steer(s.keyCode)
  }
  s.draw = () => {
    snake.update();
    s.background(230);
    snake.draw();
    if (snake.x < 0 || snake.x > s.width) {
      snake = null;
      spawnSnake();
    }
    else if (snake.y < 0 || snake.y > s.height) {
      snake = null;
      spawnSnake();
    }
    for (let i = 0; i < s.width; i += squareSide) {
      s.line(i, 0, i, s.height);
      for (let j = 0; j < s.height; j += squareSide) {
        s.line(0, i, s.width, i);
      }
    }
  }
})


export default App;