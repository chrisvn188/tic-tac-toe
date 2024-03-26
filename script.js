// Gameboard to represent game state
// Cell hold player's token
// GameController controls the game logic
// DisplayController controls UI
function Gameboard() {
    const rows = 3;
    const columns = 3;
    const gameBoard = [];

    // Make gameboard with 3 rows, 3 columns
    for (let i = 0; i < rows * columns; i++) {
        const newCell = Cell(i);
        gameBoard.push(newCell);
    }

    const getGameBoard = () => {
        return gameBoard;
    };

    const printBoardState = () => {
        const currentBoardState = gameBoard.map((cell) => cell.getValue());
        console.log(currentBoardState);
    };

    const dropToken = (position, token) => {
        const currentCell = gameBoard[position];

        // if cells already had values, do nothing
        if (!currentCell.checkEmptyCell()) return;

        currentCell.addValue(token);
    };

    return { getGameBoard, printBoardState, dropToken };
}

function Cell(position) {
    let value = null;

    const addValue = (token) => {
        value = token;
    };

    const getValue = () => {
        return value;
    };

    const checkEmptyCell = () => {
        const value = getValue();
        return value === null ? true : false;
    };

    return { addValue, getValue, checkEmptyCell, position };
}

function GameController(player1Name, player2Name) {
    const winningConditions = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 4, 6],
        [2, 5, 8],
        [3, 4, 5],
        [6, 7, 8],
    ];
    const { getGameBoard, printBoardState, dropToken } = Gameboard();
    const players = [
        { name: player1Name, token: 'X', moves: [] },
        { name: player2Name, token: 'O', moves: [] },
    ];
    let currentPlayer = players[0];
    const switchPlayer = () => {
        currentPlayer =
            currentPlayer.name === players[0].name ? players[1] : players[0];
    };
    const playRound = (position) => {
        const { name, token } = currentPlayer;
        console.log(`${name} is playing with the token ${token}`);
        dropToken(position, token);
        printBoardState();
        switchPlayer();
    };
    return { playRound };
}

const game = GameController('Chris', 'Minh');
game.playRound(4);
game.playRound(1);
game.playRound(2);
