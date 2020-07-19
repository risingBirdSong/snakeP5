
function rounder(round: number, input: number, lowOrHigh?: "low" | "high"): number {
  let remainder = input % round;
  if (lowOrHigh) {
    if (lowOrHigh === "low") {
      return input - remainder;
    }
    else if (lowOrHigh === "high") {
      return input - remainder + round;
    }
  }
  //if no lowOrHigh
  let halfWay = round / 2;
  if (remainder > halfWay) {
    return input + (round - remainder)
  }
  else if (remainder < halfWay) {
    return input - remainder;
  }
  return 0;
}
