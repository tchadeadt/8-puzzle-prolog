class Board {
    constructor(size = 3, imageUrl = null) {
        this.size = size;
        this.imageUrl = imageUrl;
        this.tiles = Array.from({ length: size * size }, (_, i) => i);
        this.initializeBoard();
    }

    initializeBoard() {
        // Last tile should be empty (represented by size*size-1)
        this.tiles = Array.from({ length: this.size * this.size - 1 }, (_, i) => i + 1);
        this.tiles.push(0); // 0 represents empty tile
        this.shuffle();
    }

    shuffle() {
        for (let i = 0; i < 100; i++) {
            const emptyIndex = this.tiles.indexOf(0);
            const possibleMoves = this.getValidMoves(emptyIndex);
            if (possibleMoves.length > 0) {
                const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
                this.swapTiles(emptyIndex, randomMove);
            }
        }
    }

    getValidMoves(emptyIndex) {
        const row = Math.floor(emptyIndex / this.size);
        const col = emptyIndex % this.size;
        const moves = [];

        // Check all possible moves (up, down, left, right)
        if (row > 0) moves.push(emptyIndex - this.size); // up
        if (row < this.size - 1) moves.push(emptyIndex + this.size); // down
        if (col > 0) moves.push(emptyIndex - 1); // left
        if (col < this.size - 1) moves.push(emptyIndex + 1); // right

        return moves;
    }

    swapTiles(index1, index2) {
        [this.tiles[index1], this.tiles[index2]] = [this.tiles[index2], this.tiles[index1]];
    }

    render() {
        const boardElement = document.getElementById('game-board');
        boardElement.innerHTML = '';

        this.tiles.forEach((tile, index) => {
            const tileElement = document.createElement('div');
            tileElement.className = 'tile';

            if (tile !== 0) {
                if (this.imageUrl) {
                    const originalIndex = tile - 1;
                    const row = Math.floor(originalIndex / this.size);
                    const col = originalIndex % this.size;
                    const percentageX = -(col * 100) / (this.size - 1);
                    const percentageY = -(row * 100) / (this.size - 1);
                    tileElement.style.backgroundImage = `url(${this.imageUrl})`;
                    tileElement.style.backgroundSize = `${this.size * 100}%`;
                    tileElement.style.backgroundPosition = `${percentageX}% ${percentageY}%`;
                }
                const spanElement = document.createElement('span');
                spanElement.textContent = tile;
                tileElement.appendChild(spanElement);
            } else {
                tileElement.classList.add('empty');
            }

            boardElement.appendChild(tileElement);
        });
    }

    isSolved() {
        for (let i = 0; i < this.tiles.length - 1; i++) {
            if (this.tiles[i] !== i + 1) return false;
        }
        return this.tiles[this.tiles.length - 1] === 0;
    }
}

export { Board };