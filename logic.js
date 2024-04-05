import Player from './player.js'
import {
    reset,
    getBoard,
    playNextMove,
    checkBoardFullOfMarkers,
    checkEmptyCell,
} from './gameBoard.js'
import { showResultModal, updateScoreText } from './display.js'

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

let scoreValues = [0, 0]

const playerX = new Player('X')
const playerO = new Player('O')

let currentPlayer = playerX

let gameOver = false

const switchTurn = () =>
    (currentPlayer =
        currentPlayer.getMarker() === playerX.getMarker() ? playerO : playerX)

const checkWin = (board) => {
    return winConditions.some((condition) =>
        condition.every(
            (position) => board[position] === currentPlayer.getMarker()
        )
    )
}

export const getScoreValues = () => {
    return scoreValues
}

export const updateScoreValues = () => {
    scoreValues.splice(0, scoreValues.length)
    scoreValues.push(playerX.getScore(), playerO.getScore())
}

export const addMove = (position) => {
    if (gameOver || !checkEmptyCell(position)) return

    playNextMove(position, currentPlayer.getMarker())

    if (checkWin(getBoard())) {
        gameOver = true

        currentPlayer.updateScore()

        updateScoreValues()

        showResultModal(`${currentPlayer.getMarker()} wins this round!`)

        updateScoreText()

        return
    }

    if (checkBoardFullOfMarkers()) {
        gameOver = true

        showResultModal(`It's a tie!`)

        return
    }

    switchTurn()
}

export const resetBoard = () => {
    reset()
    currentPlayer = playerX
    gameOver = false
}

export const resetGame = () => {
    resetBoard()
    playerX.resetScore()
    playerO.resetScore()
    updateScoreValues()
}
