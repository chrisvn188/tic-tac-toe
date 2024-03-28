const Gameboard = (function () {
    let board = ['', '', '', '', '', '', '', '', ''];

    const getBoard = () => board.map((cell) => cell);

    const reset = () => {
        board = ['', '', '', '', '', '', '', '', ''];
    };

    const addMarker = (position, marker) => {
        if (board[position] === '') {
            board[position] = marker;
        }
    };

    const checkBoardFullOfMarkers = () => {
        return board.every((cell) => cell !== '');
    };

    const checkEmptyCell = (position) => board[position] === '';

    return {
        getBoard,
        reset,
        addMarker,
        checkEmptyCell,
        checkBoardFullOfMarkers,
    };
})();

const Player = function (marker) {
    const getMarker = () => marker;
    return { getMarker };
};

const GameController = (function () {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    const playerX = Player('X');
    const playerO = Player('O');

    let currentPlayer = playerX;

    let gameOver = false;

    const switchTurn = () => (currentPlayer === playerX ? playerO : playerX);

    const checkWin = (board) => {
        return winConditions.some((condition) =>
            condition.every(
                (position) => board[position] === currentPlayer.getMarker()
            )
        );
    };

    const makeMove = (position) => {
        if (gameOver || !Gameboard.checkEmptyCell(position)) return;

        Gameboard.addMarker(position, currentPlayer.getMarker());

        if (checkWin(Gameboard.getBoard())) {
            console.log(`${currentPlayer.getMarker()} wins this round!`);
            gameOver = true;
            return;
        }

        if (Gameboard.checkBoardFullOfMarkers()) {
            console.log(`It's a tie!`);
            gameOver = true;
            return;
        }

        switchTurn();
    };

    const resetGame = () => {
        Gameboard.reset();
        currentPlayer = playerX;
        gameOver = false;
    };

    return { makeMove, resetGame };
})();

const DisplayController = (function () {
    const gameBoardElement = document.querySelector('#game-board');
    const restartButtonElement = document.querySelector('#restart-button');

    const createCell = (value) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.textContent = value;
        return cellElement;
    };

    const displayBoard = () => {
        const board = Gameboard.getBoard();
        board.forEach((value) => {
            const newCell = createCell(value);
            gameBoardElement.append(newCell);
        });
    };

    const render = () => {
        displayBoard();
        update();
        console.log('Rendering...');
    };
    const update = () => {
        console.log('Updating...');
    };
    return { render, update };
})();

DisplayController.render();
