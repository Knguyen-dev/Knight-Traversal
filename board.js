/*
+ Knight's tour:

- What is the knight's tour?: A knight in chess, can start at any square and travel to every other
    square exactly once. While we're not solving this, we're actually applying the idea of the 
    shortest path to the knights tour. 

- Definition (Naive): A 'Naive' solution is to try all possible outcomes and output an outcome/solution
    that meets the constraints of the problem.

- Definition (Backtracking): A algorithmic philosophy where we solve problems by trying
    every possible configuration or outcome, if an outcome doesn't work, we move on to the next
    one until we find the one that works. It's more iterative and incremental, and is considered
    a more optimized version of the naive one.
*/

// Class for creating an 8 x 8 chess board
class Board {
    constructor() {
        // Create an 8 by 8 matrix to represent your board
        // Let position [0, 0], represent the top-right of the board for easier visualization
        this.N = 8;
        this.board = [];
        for (let i = 0; i < this.N; i++) {
            const row = [];
            for (let j = 0; j < this.N; j++) {
                row.push(0);
            }
            this.board.push(row);
        }
    }

    // Returns an array with all possible board positions that the knight can move given its
    // current position.
    calculatePossibleMoves(currentPosition) {
        // Array of all possible x-y change a knight can make
        const moveVariations = [
            [1, 2],
            [2, 1],
            [1, -2],
            [-2, 1],
            [-1, 2],
            [2, -1],
            [-1, -2],
            [-2, -1],
        ];

        const x = currentPosition[0];
        const y = currentPosition[1];
        let possibleMoves = [];

        for (const moveType of moveVariations) {
            const newX = x + moveType[0];
            const newY = y + moveType[1];
            // x and y coordinates are both in range after a move, then it's valid
            if (this.isValidMove(newX, newY)) {
                possibleMoves.push([newX, newY]);
            }
        }
        return possibleMoves;
    }

    isValidMove(x, y) {
        return x >= 0 && x <= 7 && y >= 0 && y <= 7;
    }

    isSamePosition(pos1, pos2) {
        return pos1[0] == pos2[0] && pos1[1] == pos2[1];
    }

    // Given an array, visited, representing visited positions
    // Check if 'pos' is already in said array, meaning that position has already been visited
    isVisitedPosition(visited, pos) {
        for (let i = 0; i < visited.length; i++) {
            if (this.isSamePosition(visited[i], pos)) {
                return true;
            }
        }
        return false;
    }

    // Do a breadth-first traversal to find the shortest path of a knight and
    // return an array for the path it took
    knightMovesHelper(start, end) {
        let visited = []; // array of tuples representing visited squares
        let queue = []; // queue representing the moves that we're processing
        let prev = {}; // A set that keeps track of the previous position to a given position, allows us to reconstruct the path
        prev[start] = null; // For example, the previous position of the starting position is 'null' since it doesn't exist.

        // Process the start position by marking it as visited and putting it into the processing queue
        visited.push(start);
        queue.push(start);

        while (queue.length > 0) {
            // While there are still positions being processed
            const currentPos = queue.shift(); // Check if the current position matches our end position
            if (this.isSamePosition(currentPos, end)) {
                break;
            }
            const newPositions = this.calculatePossibleMoves(currentPos);
            for (let i = 0; i < newPositions.length; i++) {
                const newPos = newPositions[i];
                // If it's a position that's possible and hasn't been visited yet,
                // then visit it.
                if (!this.isVisitedPosition(visited, newPos)) {
                    queue.push(newPos);
                    visited.push(newPos);
                    // Make a record that the newPos's previous position is currentPos
                    // So that we can back-track to it later
                    prev[newPos.toString()] = currentPos; // NOTE: Arrays are turned into strings automatically, but we make it explicit here
                }
            }
        }

        // Reconstruct the path that we took by back tracking using the 'prev' object/map
        // Iterate, if position == null, we've reached the end
        let position = end;
        let path = [];
        while (position !== null) {
            path.unshift(position);
            position = prev[position]; // update position to the previous position
        }
        return path;
    }

    // Displays the amount of moves the knight took and the sequence of moves
    knightMoves(start, end) {
        const path = this.knightMovesHelper(start, end);
        const numMoves = path.length - 1;
        console.log(`Completed in ${numMoves} moves`);
        for (let i = 0; i < path.length; i++) {
            console.log(path[i]);
        }
    }
}

/*
- Converts a chess position string e.g "a4" into indices 
an 8 x 8 board/matrix, and returns it into an array in form [xIndex, yIndex].
*/
function convertBoardNotation(positionStr) {
    const xPositions = ["A", "B", "C", "D", "E", "F", "G", "H"];
    // Ensure string is uppercase so it can convert easily
    positionStr = positionStr.toUpperCase();
    // Get the correct index of the column
    const xIndex = xPositions.indexOf(positionStr.slice(0, 1));
    // Decrement by 1 to correctly represent the INDEX of the row rather
    // than the row number
    const yIndex = parseInt(positionStr.slice(1)) - 1;
    return [xIndex, yIndex];
}

export { Board, convertBoardNotation };
