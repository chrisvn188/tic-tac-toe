import { addMove, getScoreValues, resetBoard, resetGame } from './logic.js'
import { getBoard } from './gameBoard.js'

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

export const updateScoreText = () => {
    markerX.setAttribute('data-score', getScoreValues()[0])
    markerO.setAttribute('data-score', getScoreValues()[1])
}

const updateResultText = (text) => {
    resultText.textContent = text
}

export const showResultModal = (text) => {
    resultModal.showModal()
    updateResultText(text)
}

export const render = (board) => {
    displayBoard(board)
}

gameBoardElement.addEventListener('click', (e) => {
    addMove(+e.target.dataset.index)
    render(getBoard())
})

restartButtonElement.addEventListener('click', () => {
    resetGame()
    updateScoreText()
    render(getBoard())
})

playNewGameBtn.addEventListener('click', () => {
    resultModal.close()
    resetBoard()
    updateScoreText()
    render(getBoard())
})
