export default class Player {
    constructor(marker) {
        this.marker = marker
    }
    // this is private variables, it can only be access inside class body
    #score = 0

    getMarker = () => this.marker

    getScore = () => this.#score

    updateScore = () => {
        this.#score = this.#score + 1
    }

    resetScore = () => {
        this.#score = 0
    }
}
