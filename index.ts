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
  let active: boolean = false;
  let death: boolean = false;
  let snake: Snake;
  let restartButton: p5.Element;
  s.setup = () => {
    s.createCanvas(500, 500);
    s.createP("score").center("horizontal").addClass("scoreLabel");
    scoreP = s.createP(score.toString())
    scoreP.center("horizontal");
    s.frameRate(15);
    restartButton = s.createButton("restart label", "restart");

    restartButton.mouseClicked(() => {
      console.log("restart please");
      death = false;
    })
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
    restartButton.show();
    for (let i = 0; i < snake.tail.length - 1; i++) {
      let t = snake.tail[i];
      if (t.x === snake.x && t.y === snake.y) {
        // snake = null;
        if (active === true) {
          death = true;
        }
        // spawnSnake();
        // resetScore();
      }
    }
  }
  const resetScore = async () => {

    await new Promise((res, rej) => {
      setTimeout(res, 2000);
    })
    score = 0;
    scoreP.remove();
    scoreP = s.createP(score.toString());
    scoreP.center("horizontal");
  }
  const eat = () => {
    for (let i = 0; i < foodArr.length; i++) {
      let f = foodArr[i];
      if (f.x === snake.x && f.y === snake.y) {
        active = true;
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
    if (death === false) {
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
        // snake = null;
        death = true;
        // spawnSnake();
        resetScore();
      }
      else if (snake.y < 0 || snake.y > s.height) {
        // snake = null;
        death = true;
        // spawnSnake();
        resetScore();
      }
      for (let i = 0; i < s.width; i += squareSide) {
        s.line(i, 0, i, s.height);
        for (let j = 0; j < s.height; j += squareSide) {
          s.line(0, i, s.width, i);
        }
      }
    }
    else if (death === true) {
      s.background(230);
      for (let i = 0; i < s.width; i += squareSide) {
        s.line(i, 0, i, s.height);
        for (let j = 0; j < s.height; j += squareSide) {
          s.line(0, i, s.width, i);
        }
      }
      for (let i = 0; i < snake.snakehistory.length; i++) {
        let highVal = snake.snakehistory[snake.snakehistory.length - 1].history;
        console.log("high val", highVal);

        let hstry = snake.snakehistory[i];
        let mapped = s.map(hstry.history, 0, highVal, 50, 255);
        console.log("mapped", mapped);
        let redMapped = s.map(hstry.history, 0, highVal, 175, 255);
        let greenMapped = s.map(hstry.history, 0, highVal, 30, 150);
        let blueMapped = s.map(hstry.history, 0, highVal, 150, 255);
        let blu = Math.floor(mapped / 2);
        s.rotate(hstry.history);
        s.fill(redMapped, greenMapped, blueMapped);
        s.stroke(1);
        s.rect(hstry.x, hstry.y, squareSide, squareSide);
      }
    }
  }
})


export default App;