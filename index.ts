import p5 from "p5";
import Snake from "./snake";
export const squareSide = 20;

const App = new p5((s: p5) => {
  let snake = new Snake(s);
  s.setup = () => {
    s.createCanvas(500, 500);
  }
  s.keyPressed = () => {
    snake.steer(s.keyCode)
  }
  s.draw = () => {
    snake.update();
    s.background(230);
    snake.draw();
    for (let i = 0; i < s.width; i += squareSide) {
      s.line(i, 0, i, s.height);
      for (let j = 0; j < s.height; j += squareSide) {
        s.line(0, i, s.width, i);
      }
    }
  }
})


export default App;