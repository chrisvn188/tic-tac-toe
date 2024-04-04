const Gameboard = (function () {
    let board = ['', '', '', '', '', '', '', '', '']

    const getBoard = () => board.map((cell) => cell)

    const reset = () => {
        board = ['', '', '', '', '', '', '', '', '']
    }

    const addMarker = (position, marker) => {
        if (board[position] === '') {
            board[position] = marker
        }
    }

    const checkBoardFullOfMarkers = () => {
        return board.every((cell) => cell !== '')
    }

    const checkEmptyCell = (position) => board[position] === ''

    return {
        getBoard,
        reset,
        addMarker,
        checkEmptyCell,
        checkBoardFullOfMarkers,
    }
})()

const Player = function (marker) {
    let score = 0
    const getMarker = () => marker
    const getScore = () => score
    const updateScore = () => {
        score = score + 1
    }
    return { getMarker, getScore, updateScore }
}

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
    ]
    const playerX = Player('X')
    const playerO = Player('O')

    let scoreBoard = [0, 0]

    let currentPlayer = playerX

    let gameOver = false

    const switchTurn = () =>
        (currentPlayer =
            currentPlayer.getMarker() === playerX.getMarker()
                ? playerO
                : playerX)

    const checkWin = (board) => {
        return winConditions.some((condition) =>
            condition.every(
                (position) => board[position] === currentPlayer.getMarker()
            )
        )
    }

    const getScoreBoard = () => {
        return scoreBoard
    }

    const updateScoreBoard = () => {
        scoreBoard.splice(0, scoreBoard.length)
        scoreBoard.push(playerX.getScore(), playerO.getScore())
    }

    const resetScoreBoard = () => {
        scoreBoard = [0, 0]
    }

    const addMove = (position) => {
        if (gameOver || !Gameboard.checkEmptyCell(position)) return

        Gameboard.addMarker(position, currentPlayer.getMarker())

        if (checkWin(Gameboard.getBoard())) {
            gameOver = true
            currentPlayer.updateScore()
            updateScoreBoard()
            DisplayController.showResultModal(
                `${currentPlayer.getMarker()} wins this round!`
            )
            DisplayController.updateScoreText()
            return
        }

        if (Gameboard.checkBoardFullOfMarkers()) {
            gameOver = true
            DisplayController.showResultModal(`It's a tie!`)
            return
        }

        switchTurn()
    }

    const resetBoard = () => {
        Gameboard.reset()
        currentPlayer = playerX
        gameOver = false
    }

    const resetGame = () => {
        resetBoard()
        scoreBoard = [0, 0]
    }

    return { addMove, resetGame, resetBoard, getScoreBoard, updateScoreBoard }
})()

const DisplayController = (function () {
    const gameBoardElement = document.querySelector('#game-board')
    const restartButtonElement = document.querySelector('#restart-button')
    const resultModal = document.querySelector('#result-modal')
    const playNewGameBtn = document.querySelector('#play-new-game-btn')
    const resultText = document.querySelector('#result-text')
    const markerX = document.querySelector('.marker-x')
    const markerO = document.querySelector('.marker-o')

    const createCell = (value, position) => {
        const cellElement = document.createElement('div')
        cellElement.classList.add('cell')
        cellElement.textContent = value
        cellElement.setAttribute('data-index', position)
        return cellElement
    }

    const displayBoard = (board) => {
        while (gameBoardElement.lastElementChild) {
            gameBoardElement.removeChild(gameBoardElement.lastElementChild)
        }

        board.forEach((value, index) => {
            const newCell = createCell(value, index)
            gameBoardElement.append(newCell)
        })
    }

    const updateScoreText = () => {
        markerX.setAttribute('data-score', GameController.getScoreBoard()[0])
        markerO.setAttribute('data-score', GameController.getScoreBoard()[1])
    }

    const updateResultText = (text) => {
        resultText.textContent = text
    }

    const showResultModal = (text) => {
        resultModal.showModal()
        updateResultText(text)
    }

    const render = () => {
        displayBoard(Gameboard.getBoard())
    }

    gameBoardElement.addEventListener('click', (e) => {
        GameController.addMove(+e.target.dataset.index)
        render()
    })

    restartButtonElement.addEventListener('click', () => {
        GameController.resetGame()
        updateScoreText()
        render()
    })

    playNewGameBtn.addEventListener('click', () => {
        resultModal.close()
        GameController.resetBoard()
        updateScoreText()
        render()
    })

    return { render, showResultModal, updateScoreText }
})()

DisplayController.render()
