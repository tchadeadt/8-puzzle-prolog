# 8-Puzzle Game with Prolog On Browser Solver

An interactive implementation of the classic 8-puzzle sliding tile game with added image-splitting functionality and an automated solver using Prolog on browser.

I've been asked to create a Prolog solver for a game, and then I thought, 'Why not make it interactive on the web?

## Features

- Classic 8-puzzle sliding tile gameplay
- Image splitting functionality - turn any image into a puzzle
- Automated puzzle solver using Prolog
- Mobile-responsive design
- Move counter
- Shuffle functionality
- Visual feedback for valid moves
- Semi-transparent preview of correct tile positions

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Prolog (via [Trealla-Js](https://github.com/guregu/trealla-js))
- CSS Grid for layout
- Responsive Design

## How It Works

### Game Mechanics
1. The game initializes with a 3x3 grid (8 numbered tiles + 1 empty space)
2. Players can choose an image to split into puzzle pieces
3. Tiles can be moved by clicking if they are adjacent to the empty space
4. The goal is to arrange the tiles in numerical order (1-8) with the empty space last

### Image Splitting
- Selected images are dynamically split into 9 equal pieces
- Each piece is positioned as a background image on its respective tile
- Empty tile shows a semi-transparent preview of the correct piece

### Solver Implementation
- Uses Prolog for puzzle-solving logic
- Implements Iterative Deepening Search (IDS) algorithm
- Finds the optimal solution path
- Displays step-by-step moves to solve the puzzle

## How to Play

1. Select an image from the available options
2. Click tiles adjacent to the empty space to move them
3. Try to arrange the numbers from 1-8 in order
4. Use the "Shuffle" button to randomize the puzzle
5. Click "Solve" to see the solution

## Technical Implementation

### Key Components

1. **Board Class**
   - Manages the puzzle state
   - Handles tile movement logic
   - Controls image splitting

2. **Puzzle Class**
   - Validates moves
   - Checks win condition
   - Manages game state

3. **Prolog Solver**
   - Implements IDS algorithm
   - Finds optimal solution path
   - Handles state space search

### Responsive Design
- Adapts to different screen sizes
- Touch-friendly for mobile devices
- Maintains puzzle aspect ratio
- Adjusts UI elements for better mobile experience

## Installation

1. Clone the repository:
```bash
git clone https://github.com/tchadeadt/8-puzzle-prolog.git
```
2. Navigate to the project directory:
```bash
cd 8-puzzle-prolog
```
3. Serve the files using a local web server:
```bash
# Using PHP's built-in server
php -S localhost:8000

# Or using Python
python -m http.server 8000
```
4. Open your browser and visit `http://localhost:8000`
   
## Contribution

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Acknowledgments

- [Trealla Prolog](https://github.com/trealla-prolog/trealla) 
- [@guregu's trealla-js](https://github.com/guregu/trealla-js) for for the solver implementation in the web browser
- Original 8-puzzle game concept
- Contributors and testers (i hope so xD)

## Future Enhancements
- Different puzzle sizes (4x4, 5x5)
- Save/load puzzle states
- Animation improvements
- css styling improvements
- adding Perus, Caramel and Zaghloul (A.K.A Casper) pictures as puzzles (they're cats.)