// pseudo code:
// if player choose marker X, player go first.
// else if player choose O, player go after bot.
// player add marker to the game board, after several mini seconds bot add marker.
const boxs = document.querySelectorAll(".box");
boxs.forEach(box => box.addEventListener("click", () => box.textContent = "X"));
