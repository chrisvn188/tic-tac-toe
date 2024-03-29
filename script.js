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

    const switchTurn = () =>
        (currentPlayer =
            currentPlayer.getMarker() === playerX.getMarker()
                ? playerO
                : playerX);

    const checkWin = (board) => {
        return winConditions.some((condition) =>
            condition.every(
                (position) => board[position] === currentPlayer.getMarker()
            )
        );
    };

    const addMove = (position) => {
        if (gameOver || !Gameboard.checkEmptyCell(position)) return;

        Gameboard.addMarker(position, currentPlayer.getMarker());

        if (checkWin(Gameboard.getBoard())) {
            gameOver = true;
            DisplayController.showResultModal(
                `${currentPlayer.getMarker()} wins this round!`
            );
            return;
        }

        if (Gameboard.checkBoardFullOfMarkers()) {
            gameOver = true;
            DisplayController.showResultModal(`It's a tie!`);
            return;
        }

        switchTurn();
    };

    const resetGame = () => {
        Gameboard.reset();
        currentPlayer = playerX;
        gameOver = false;
    };

    return { addMove, resetGame };
})();

const DisplayController = (function () {
    const gameBoardElement = document.querySelector('#game-board');
    const restartButtonElement = document.querySelector('#restart-button');
    const resultModal = document.querySelector('#result-modal');
    const restartButtonOnModal = document.querySelector('#restart-on-modal');
    const resultText = document.querySelector('#result-text');

    const createCell = (value, position) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.textContent = value;
        cellElement.setAttribute('data-index', position);
        return cellElement;
    };

    const displayBoard = (board) => {
        // remove all old children, rendering new children
        while (gameBoardElement.lastElementChild) {
            gameBoardElement.removeChild(gameBoardElement.lastElementChild);
        }

        board.forEach((value, index) => {
            const newCell = createCell(value, index);
            gameBoardElement.append(newCell);
        });
    };

    const updateResultText = (text) => {
        resultText.textContent = text;
    };

    const showResultModal = (text) => {
        resultModal.showModal();
        updateResultText(text);
    };

    const render = () => {
        displayBoard(Gameboard.getBoard());
    };

    gameBoardElement.addEventListener('click', (e) => {
        GameController.addMove(+e.target.dataset.index);
        render();
    });

    restartButtonElement.addEventListener('click', () => {
        GameController.resetGame();
        render();
    });

    restartButtonOnModal.addEventListener('click', () => {
        resultModal.close();
        GameController.resetGame();
        render();
    });

    return { render, showResultModal };
})();

DisplayController.render();
