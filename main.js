const gameBoard = (function () {
  // assign gameboard an array with 9 empty string
  let _gameBoard = ["", "", "", "", "", "", "", "", ""];

  // gameboard has 2 marker choices
  const _markerX = "X";
  const _markerO = "O";

  // function to get game board
  function getGameBoard() {
    return _gameBoard;
  }
  // functions to get markers
  function getMarkerX() {
    return _markerX;
  }

  function getMarkerO() {
    return _markerO;
  }

  function resetBoard() {
    _gameBoard = ["", "", "", "", "", "", "", "", ""];
  }

  return { getGameBoard, getMarkerX, getMarkerO, resetBoard };
})();

const displayController = (function () {
  const markerXBtn = document.querySelector("#marker-x");
  const markerOBtn = document.querySelector("#marker-o");
  const tiles = document.querySelectorAll(".tile");

  function updateGameBoard() {
    tiles.forEach(
      (tile, index) => (tile.textContent = gameBoard.getGameBoard()[index])
    );
  }

  function displayWinner(){
    console.log(gameController.getWinner().name);
  }

  markerXBtn.textContent = gameBoard.getMarkerX();
  markerOBtn.textContent = gameBoard.getMarkerO();

  return { updateGameBoard,displayWinner};
})();

const gameController = (function () {
  let isGameOver = false;
  let winner = undefined;

  // create players
  const human = Player("Human");
  const bot = Player("Bot");

  // set marker to players
  human.chooseMarker(gameBoard.getMarkerX());
  bot.chooseMarker(gameBoard.getMarkerO());

  // indexes that are taken by human and bot
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

  // generate bot move indexes excluding those indexes have been taken
  function _generateRandomNumber(min, max, humanPositions, botPositions) {
    let randomNumber = Math.floor(Math.random() * (max - min) + min);
    let condition =
      humanPositions.includes(randomNumber) ||
      botPositions.includes(randomNumber);
    return condition
      ? _generateRandomNumber(min, max, humanPositions, botPositions)
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
    console.log("Reset game successfully!!!");
    console.log(gameBoard.getGameBoard());
  }

  // game logic
  const tiles = document.querySelectorAll(".tile");
  const resetBtn = document.querySelector(".reset-btn");

  tiles.forEach((tile, index) =>
    tile.addEventListener("click", (e) => {
      if (e.target.textContent === "" && !winner) {
        const min = 0;
        const max = 8;

        human.addMarks(gameBoard.getGameBoard(), index);
        humanPositions.push(index);

        let humanWinningCondition = winningPositions.some((position) =>
          position.every((num) => humanPositions.includes(num))
        );
        if (humanWinningCondition) {
          winner = human;
        }

        else if (humanPositions.length + botPositions.length < max) {
          let randomIndex = _generateRandomNumber(
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
        }

        else{
          winner = "tie";
        }

        if(winner){
          displayController.displayWinner();
        }
        else return;
        
        return winner;
      } 
      else return;
    })
  );

  // reset game
  resetBtn.addEventListener("click", resetGame);

  return { getWinner, resetGame };
})();

function Player(name) {
  let _marker = "";

  function chooseMarker(marker) {
    _marker = marker;
  }

  function getMarker() {
    return _marker;
  }

  function addMarks(gameBoard, index) {
    gameBoard.splice(index, 1, _marker);
    displayController.updateGameBoard();
    return _marker;
  }

  return { name, chooseMarker, getMarker, addMarks };
}
