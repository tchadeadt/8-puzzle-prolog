import { Board } from './board.js';

class Puzzle {
    constructor(board) {
        this.board = board;
    }

    isMovable(index) {
        const emptyIndex = this.board.tiles.indexOf(0);
        const validMoves = this.board.getValidMoves(emptyIndex);
        return validMoves.includes(index);
    }

    moveTile(index) {
        const emptyIndex = this.board.tiles.indexOf(0);
        this.board.swapTiles(emptyIndex, index);
    }

    isSolved() {
        return this.board.isSolved();
    }
}

export { Puzzle };