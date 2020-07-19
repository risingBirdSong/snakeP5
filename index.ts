import p5 from "p5";
import Snake from "./snake";
import rounder from "./helper";
export const squareSide = 20;
let counter = 50;


const App = new p5((s: p5) => {
  let foodCoords: { x: number, y: number };
  let snake: Snake;
  s.setup = () => {
    s.createCanvas(500, 500);
    s.frameRate(10);
    spawnSnake();
    makeFood();
  }
  const spawnSnake = function () {
    let middleWidth = rounder(squareSide, s.width / 2);
    let middleHeight = rounder(squareSide, s.height / 2);
    let firstTailX = middleWidth - 20;
    let firstTailY = middleHeight - 20;
    let secondTailX = middleWidth - 40;
    let secondTailY = middleHeight - 40;
    snake = new Snake(s, middleWidth, middleHeight);
    snake.tail.push({ x: firstTailX, y: firstTailY });
    snake.tail.push({ x: secondTailX, y: secondTailY });
  }

  const makeFood = () => {
    let col = rounder(squareSide, s.random(0, s.width - squareSide));
    let row = rounder(squareSide, s.random(0, s.height - squareSide));
    foodCoords = { x: col, y: row }
  }
  const eat = () => {
    if (foodCoords.x === snake.x && foodCoords.y === snake.y) {
      snake.tail.push({ x: foodCoords.x, y: foodCoords.y });
      makeFood();
    }
  }
  s.keyPressed = () => {
    snake.steer(s.keyCode)
  }
  s.draw = () => {
    s.background(230);
    eat();
    snake.update();
    snake.draw();
    s.fill(10, 255, 10);
    s.rect(foodCoords.x, foodCoords.y, squareSide, squareSide);
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