import { render } from './display.js'
import { getBoard } from './gameBoard.js'

document.addEventListener('DOMContentLoaded', () => {
    render(getBoard())
})
