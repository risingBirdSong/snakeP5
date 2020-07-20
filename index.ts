import p5 from "p5";
import Snake from "./snake";
import rounder from "./helper";
export const squareSide = 20;
let counter = 50;


const App = new p5((s: p5) => {
  let score = 0;
  let scoreP: p5.Element;
  const foodArr: { x: number, y: number }[] = [];
  let foodCoords: { x: number, y: number };
  let snake: Snake;
  s.setup = () => {
    s.createCanvas(500, 500);
    s.createP("score").center("horizontal").addClass("scoreLabel");
    scoreP = s.createP(score.toString())
    scoreP.center("horizontal");
    s.frameRate(15);
    spawnSnake();
    makeFood();
    makeFood();
    makeFood();
    makeFood();
    makeFood();
  }
  const spawnSnake = function () {
    let middleWidth = rounder(squareSide, s.width / 2);
    let middleHeight = rounder(squareSide, s.height / 2);
    snake = new Snake(s, middleWidth, middleHeight);
  }
  const makeFood = () => {
    let col = rounder(squareSide, s.random(0, s.width - squareSide));
    let row = rounder(squareSide, s.random(0, s.height - squareSide));
    foodArr.push({ x: col, y: row });
    // foodCoords = { x: col, y: row }
  }
  const snakeEatsItself = () => {
    for (let i = 0; i < snake.tail.length - 1; i++) {
      let t = snake.tail[i];
      if (t.x === snake.x && t.y === snake.y) {
        snake = null;
        spawnSnake();
        resetScore();
      }
    }
  }
  const resetScore = () => {
    score = 0;
    scoreP.remove();
    scoreP = s.createP(score.toString());
    scoreP.center("horizontal");
  }
  const eat = () => {
    for (let i = 0; i < foodArr.length; i++) {
      let f = foodArr[i];
      if (f.x === snake.x && f.y === snake.y) {
        score++;
        scoreP.value(score);
        scoreP.remove();
        scoreP = s.createP(score.toString());
        scoreP.center("horizontal");
        snake.tail.push({ x: f.x, y: f.y });
        foodArr.splice(i, 1);
        makeFood();
      }
    }
  }
  s.keyPressed = () => {
    snake.steer(s.keyCode)
  }
  s.draw = () => {
    s.background(230);
    eat();
    snakeEatsItself();
    snake.update();
    snake.draw();
    for (let f of foodArr) {
      s.fill(10, 255, 10);
      s.rect(f.x, f.y, squareSide, squareSide);
    }
    if (snake.x < 0 || snake.x > s.width) {
      snake = null;
      spawnSnake();
      resetScore();
    }
    else if (snake.y < 0 || snake.y > s.height) {
      snake = null;
      spawnSnake();
      resetScore();
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