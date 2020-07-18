import p5 from "p5";
import Snake from "./snake";

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
    s.background(100);
    snake.draw();
  }
})


export default App;