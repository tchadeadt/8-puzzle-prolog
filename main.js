// main.js

import { Board } from './utils/board.js';
import { Puzzle } from './utils/puzzle.js';
import { load, Prolog, toJSON, FORMATS } from 'https://esm.sh/trealla@0.21.9?target=es2022';
//import './utils/prolog.js';

let boardElement;
let shuffleButton;
let solveButton;
let movesElement;
let board;
let puzzle;
let moves = 0;
let selectedImage = null;
let pl;

function initGame(imageUrl = null) {
    board = new Board(3, imageUrl);  // Pass image URL to Board constructor
    puzzle = new Puzzle(board);
    renderBoard();
    updateMoves();
    boardElement.style.display = 'grid';  // Show the board
}

function renderBoard() {
    boardElement.innerHTML = '';
    board.tiles.forEach((tile, index) => {
        const tileElement = document.createElement('div');
        tileElement.className = 'tile';

        // Calculate original position for both filled and empty tiles
        const originalIndex = tile === 0 ? index : tile - 1;
        const row = Math.floor(originalIndex / board.size);
        const col = originalIndex % board.size;
        const percentageX = (col * 100) / (board.size - 1);
        const percentageY = (row * 100) / (board.size - 1);

        if (board.imageUrl) {
            tileElement.style.backgroundImage = `url(${board.imageUrl})`;
            tileElement.style.backgroundSize = `${board.size * 100}%`;
            tileElement.style.backgroundPosition = `${percentageX}% ${percentageY}%`;
        }

        if (tile !== 0) {
            const spanElement = document.createElement('span');
            spanElement.textContent = tile;
            tileElement.appendChild(spanElement);
        } else {
            tileElement.classList.add('empty');
        }

        tileElement.addEventListener('click', () => handleTileClick(index));
        boardElement.appendChild(tileElement);
    });
}

function handleTileClick(index) {
    if (puzzle.isMovable(index)) {
        puzzle.moveTile(index);
        moves++;
        renderBoard();
        updateMoves();
        if (puzzle.isSolved()) {
            alert(`Congratulations! You've solved the puzzle in ${moves} moves.`);
        }
    }
}

function updateMoves() {
    movesElement.innerText = `Moves: ${moves}`;
}

document.addEventListener('DOMContentLoaded', async () => {
    boardElement = document.getElementById('game-board');
    shuffleButton = document.getElementById('shuffle-button');
    solveButton = document.getElementById('solve-button');
    movesElement = document.getElementById('moves');

    // Hide the board initially
    boardElement.style.display = 'none';

    // Add image selection handlers
    const images = document.querySelectorAll('.puzzle-option');
    images.forEach(img => {
        img.addEventListener('click', (e) => {
            selectedImage = e.target.src;
            moves = 0;
            initGame(selectedImage);
            images.forEach(i => i.classList.remove('selected'));
            e.target.classList.add('selected');
        });
    });

    if (!boardElement) {
        console.error('Missing element with id "game-board"');
        return;
    }
    if (!shuffleButton) {
        console.error('Missing element with id "shuffle-button"');
        return;
    }
    if (!solveButton) {
        console.error('Missing element with id "solve-button"');
        return;
    }
    if (!movesElement) {
        console.error('Missing element with id "moves"');
        return;
    }

    //await initProlog();

    shuffleButton.addEventListener('click', () => {
        board.shuffle();
        renderBoard();
    });

    solveButton.addEventListener('click', async () => {
        console.log("begin solve");
        document.querySelector('.solution').innerText = `Solving...Please Wait`;
        await load();
        pl = new Prolog();
        pl.fs.open("/ids.pl", { write: true, create: true }).writeString(`
      % ids predicate that accepts a list and solves the puzzle
ids(List) :-
    List = [A, B, C, D, E, F, G, H, I],
    State = state(A, B, C, D, E, F, G, H, I),
    length(Moves, N), % Find a solution with N moves
    dfs([State], Moves, Path), !, % Perform depth-first search
    show([start|Moves], Path), % Display the solution
    format('~nmoves = ~w~n', [N]). % Display the number of moves

% Predicate for depth-first search
dfs([State|States], [], Path) :-
    goal(State), !,
    reverse([State|States], Path).

dfs([State|States], [Move|Moves], Path) :-
    move(State, Next, Move),
    not(memberchk(Next, [State|States])),
    dfs([Next,State|States], Moves, Path).

% Display the moves and states
show([], _).
show([Move|Moves], [State|States]) :-
    State = state(A, B, C, D, E, F, G, H, I),
    format('~n~w~n~n', [Move]),
    format('~w ~w ~w~n', [A, B, C]),
    format('~w ~w ~w~n', [D, E, F]),
    format('~w ~w ~w~n', [G, H, I]),
    show(Moves, States).

% Define the goal state
goal(state(1, 2, 3, 4, 5, 6, 7, 8, *)).

% Moves remain unchanged
move(state(*,B,C,D,E,F,G,H,I), state(B,*,C,D,E,F,G,H,I), ➡️).
move(state(*,B,C,D,E,F,G,H,I), state(D,B,C,*,E,F,G,H,I), ⬇️).
move(state(A,*,C,D,E,F,G,H,I), state(*,A,C,D,E,F,G,H,I), ⬅️).
move(state(A,*,C,D,E,F,G,H,I), state(A,C,*,D,E,F,G,H,I), ➡️).
move(state(A,*,C,D,E,F,G,H,I), state(A,E,C,D,*,F,G,H,I), ⬇️).
move(state(A,B,*,D,E,F,G,H,I), state(A,*,B,D,E,F,G,H,I), ⬅️).
move(state(A,B,*,D,E,F,G,H,I), state(A,B,F,D,E,*,G,H,I), ⬇️).
move(state(A,B,C,*,E,F,G,H,I), state(*,B,C,A,E,F,G,H,I), ⬆️).
move(state(A,B,C,*,E,F,G,H,I), state(A,B,C,E,*,F,G,H,I), ➡️).
move(state(A,B,C,*,E,F,G,H,I), state(A,B,C,G,E,F,*,H,I), ⬇️).
move(state(A,B,C,D,*,F,G,H,I), state(A,*,C,D,B,F,G,H,I), ⬆️).
move(state(A,B,C,D,*,F,G,H,I), state(A,B,C,D,F,*,G,H,I), ➡️).
move(state(A,B,C,D,*,F,G,H,I), state(A,B,C,D,H,F,G,*,I), ⬇️).
move(state(A,B,C,D,*,F,G,H,I), state(A,B,C,*,D,F,G,H,I), ⬅️).
move(state(A,B,C,D,E,*,G,H,I), state(A,B,*,D,E,C,G,H,I), ⬆️).
move(state(A,B,C,D,E,*,G,H,I), state(A,B,C,D,*,E,G,H,I), ⬅️).
move(state(A,B,C,D,E,*,G,H,I), state(A,B,C,D,E,I,G,H,*), ⬇️).
move(state(A,B,C,D,E,F,*,H,I), state(A,B,C,D,E,F,H,*,I), ➡️).
move(state(A,B,C,D,E,F,*,H,I), state(A,B,C,*,E,F,D,H,I), ⬆️).
move(state(A,B,C,D,E,F,G,*,I), state(A,B,C,D,E,F,*,G,I), ⬅️).
move(state(A,B,C,D,E,F,G,*,I), state(A,B,C,D,*,F,G,E,I), ⬆️).
move(state(A,B,C,D,E,F,G,*,I), state(A,B,C,D,E,F,G,I,*), ➡️).
move(state(A,B,C,D,E,F,G,H,*), state(A,B,C,D,E,*,G,H,F), ⬆️).
move(state(A,B,C,D,E,F,G,H,*), state(A,B,C,D,E,F,G,*,H), ⬅️).

    `);
        // consult file
        await pl.consult("/ids.pl");

        const input = board.tiles.map(tile => tile === 0 ? '*' : tile);
        const result = toJSON(input, FORMATS.json);

        // Ensure result is parsed as an array (if it isn't already)
        const arrayResult = Array.isArray(result) ? result : JSON.parse(result);

        // Construct the desired output
        console.log(`ids([${arrayResult.join(',')}]).`);


        const query = pl.query(`ids([${arrayResult.join(',')}]).`);
        //const query = pl.query("ids([1,3,2,4,6,5,7,*,8]).");
        let solutionText = '';
        for await (const answer of query) {
            console.log("answers: ", answer.stdout);
            solutionText += answer.stdout + '\n';
        }

        document.querySelector('.solution').innerText = solutionText;
    });

    // initGame();  // Do not initialize the game initially
});

function animateSolution(solution) {
    let i = 0;
    const interval = setInterval(() => {
        if (i >= solution.length - 1) {
            clearInterval(interval);
            return;
        }
        const emptyIndex = board.tiles.indexOf(0);
        const moveIndex = solution[i].indexOf(0);
        board.swapTiles(emptyIndex, moveIndex);
        renderBoard();
        i++;
    }, 500);
}