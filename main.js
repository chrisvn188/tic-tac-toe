const markerXBtn = document.querySelector("#marker-x");
const markerOBtn = document.querySelector("#marker-o");
const tiles = document.querySelectorAll(".tile");
const modal = document.querySelector(".winner-modal");
const winnerText = document.querySelector(".winner-text");
const resetBtn = document.querySelector(".reset-btn");
const playAgainBtn = document.querySelector("#play-again-btn");
const winnerModal = document.querySelector(".winner-modal");

const gameBoard = (function () {
  // assign gameboard an array with 9 empty string
  let _gameBoard = ["", "", "", "", "", "", "", "", ""];

  // function to get game board
  function getGameBoard() {
    return _gameBoard;
  }

  function resetBoard() {
    _gameBoard = ["", "", "", "", "", "", "", "", ""];
  }

  return { getGameBoard, resetBoard };
})();

const Player = function (name,marker) {

  function addMarks(gameBoard, index) {
    gameBoard.splice(index, 1, marker);
    displayController.updateGameBoard();
    return marker;
  }
  return { name, addMarks };
};

const displayController = (function () {
  function updateGameBoard() {
    tiles.forEach(
      (tile, index) => (tile.textContent = gameBoard.getGameBoard()[index])
    );
  }

  function displayWinner(winner) {
    if (!winner) return;
    else if (winner.name === "Human") {
      winnerText.textContent = `The winner is Human!`;
    } else if (winner.name === "Bot") {
      winnerText.textContent = `The winner is Bot!`;
    } else if (winner === "tie") {
      winner.textContent = `It's a tie!`;
    }
    modal.style.display = "block";
  }

  markerXBtn.textContent = "X";
  markerOBtn.textContent = "O";

  return { updateGameBoard, displayWinner };
})();

const gameController = (function () {
  let isGameOver = false;
  let winner = undefined;
  let humanPositions = [];
  let botPositions = [];

  // winning positions
  const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // create players, human and bot
  const human = Player("Human","X");
  const bot = Player("Bot","O");

  // generate bot move indexes excluding those indexes have been taken
  function generateRandomNumber(min, max, humanPositions, botPositions) {
    let randomNumber = Math.floor(Math.random() * (max - min) + min);
    let condition =
      humanPositions.includes(randomNumber) ||
      botPositions.includes(randomNumber);
    return condition
      ? generateRandomNumber(min, max, humanPositions, botPositions)
      : randomNumber;
  }

  function getWinner() {
    return winner;
  }

  function resetGame() {
    gameBoard.resetBoard();
    winner = undefined;
    humanPositions = [];
    botPositions = [];
    displayController.updateGameBoard();
  }

  function playAgain() {
    winnerModal.style.display = "none";
    resetGame();
  }

  // game logic
  tiles.forEach((tile, index) =>
    tile.addEventListener("click", (e) => {
      if (e.target.textContent === "" && !winner) {
        const min = 0;
        const max = 8;

        // human go first by default
        human.addMarks(gameBoard.getGameBoard(), index);
        humanPositions.push(index);

        let humanWinningCondition = winningPositions.some((position) =>
          position.every((num) => humanPositions.includes(num))
        );

        if (humanWinningCondition) {
          winner = human;
        } else if (humanPositions.length + botPositions.length < max) {
          let randomIndex = generateRandomNumber(
            min,
            max,
            humanPositions,
            botPositions
          );
          bot.addMarks(gameBoard.getGameBoard(), randomIndex);
          botPositions.push(randomIndex);

          let botWinningCondition = winningPositions.some((position) =>
            position.every((num) => botPositions.includes(num))
          );

          if (botWinningCondition) {
            winner = bot;
          }
        } else {
          winner = "tie";
        }

        displayController.displayWinner(winner);

        return winner;
      } else return;
    })
  );

  // reset game
  resetBtn.addEventListener("click", resetGame);
  playAgainBtn.addEventListener("click", playAgain);
  
  return { getWinner, resetGame };
})();
