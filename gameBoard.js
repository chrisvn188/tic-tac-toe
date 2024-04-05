let board = ['', '', '', '', '', '', '', '', '']

export const getBoard = () => board.map((cell) => cell)

export const reset = () => {
    board = ['', '', '', '', '', '', '', '', '']
}

export const playNextMove = (position, marker) => {
    if (board[position] === '') {
        board[position] = marker
    }
}

export const checkBoardFullOfMarkers = () => {
    return board.every((cell) => cell !== '')
}

export const checkEmptyCell = (position) => board[position] === ''
