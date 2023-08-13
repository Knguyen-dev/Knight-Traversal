import { DomModule, statesModule } from "./modules.js";

// Renders the header nav and either hides or shows the nav items based on a boolean
function renderHeaderNav() {
    if (statesModule.menuCollapsed) {
        DomModule.dropDownBtn.textContent = "Show Menu";
        DomModule.headerNav.style.height = "0px";
    } else {
        DomModule.dropDownBtn.textContent = "Hide Menu";
        DomModule.headerNav.style.height = "auto";
    }
}

/*
- Shows errors at the start position. The only error
	that will be shown is when the input isn't a chess position
*/
function showStartPositionErrors() {
    if (DomModule.startPositionInput.validity.patternMismatch) {
        DomModule.startPositionErrorEl.textContent =
            "Must be a chess coordinate e.g. 'a4'!";
    }
    DomModule.startPositionErrorEl.classList.remove("content-hidden");
}

function hideStartPositionErrors() {
    DomModule.startPositionErrorEl.classList.add("content-hidden");
}

/*
- Shows errors at the end position. Here either, we will
	show that the input isn't a chess position, or either 
	the input for the start and end position were the same
*/
function showEndPositionErrors() {
    if (DomModule.endPositionInput.validity.patternMismatch) {
        DomModule.endPositionErrorEl.textContent =
            "Must be a chess coordinate e.g. 'a4'!";
    } else if (inputPositionsMatch()) {
        DomModule.endPositionErrorEl.textContent =
            "You gotta have different start and end positions!";
    }
    DomModule.endPositionErrorEl.classList.remove("content-hidden");
}

function hideEndPositionErrors() {
    DomModule.endPositionErrorEl.classList.add("content-hidden");
}

// Check if the input for the positions matched
function inputPositionsMatch() {
    const startPos = DomModule.startPositionInput.value;
    const endPos = DomModule.endPositionInput.value;
    return startPos == endPos;
}

// Validates the chess position form
function isValidChessForm(e) {
    // Check if it passes basic rules and checks for fields,
    // which would be if they entered real chess positions
    if (!e.currentTarget.checkValidity()) {
        return false;
    }
    // If the input positions match, then it's invalid form
    if (inputPositionsMatch()) {
        return false;
    }
    // Else, both conditions are met and we have a good form
    return true;
}

// hides all error elements in chess position form
function hideChessFormErrors() {
    DomModule.formErrorElements.forEach((errorEl) => {
        errorEl.classList.add("content-hidden");
    });
}

// Updates dimensions and scaling of chess canvas so it draws correctly even on resize
function updateCanvas() {
    DomModule.canvas.width = DomModule.canvas.offsetWidth;
    DomModule.canvas.height = DomModule.canvas.offsetHeight;
    DomModule.canvasContext.scale(
        DomModule.canvas.width / DomModule.chessBoardGrid.offsetWidth,
        DomModule.canvas.height / DomModule.chessBoardGrid.offsetHeight
    );
}

// Clears the canvas of any previous line paths
function resetBoard() {
    DomModule.canvasContext.clearRect(
        0,
        0,
        DomModule.canvas.width,
        DomModule.canvas.height
    );
}

// Draws a dot at an (x, y) coordinate
function drawDot(xPos, yPos) {
    const dotRadius = 2;
    DomModule.canvasContext.beginPath();
    DomModule.canvasContext.arc(xPos, yPos, dotRadius, 0, Math.PI * 2);
    DomModule.canvasContext.fill();
}

// Draws a line from the current pen location to a new one
function drawLine(xPos, yPos) {
    DomModule.canvasContext.lineTo(xPos, yPos);
    DomModule.canvasContext.stroke();
}

// Renders the chess board
function renderKnightPath() {
    // Get array of x-y coordinates in form [xIndex ,yIndex]
    const knightPath = statesModule.board.knightMovesHelper(
        statesModule.startPos,
        statesModule.endPos
    );

    // Get an array of the corresponding square elements that match the x and y index (position) values.
    const squaresArr = knightPath.map((pos) => {
        return document.querySelector(
            `.chess-square[data-x-index="${pos[0]}"][data-y-index="${pos[1]}"]`
        );
    });

    // Update the canvas to adjust to the user's screen size before drawing
    updateCanvas();
    // Reset or clear canvas of previous drawings
    resetBoard();
    DomModule.canvasContext.beginPath();

    // Draw the path
    for (let i = 0; i < squaresArr.length; i++) {
        // Calculate num pixels to be positioned away from left side of board
        const xPos = squaresArr[i].offsetLeft + squaresArr[i].offsetWidth / 2;
        // Calculate num pixels to be positioned away from top of board
        const yPos = squaresArr[i].offsetTop + squaresArr[i].offsetHeight / 2;

        // If it's the starting square, move pen to starting square and highlight the square
        if (i == 0) {
            DomModule.canvasContext.moveTo(xPos, yPos);
            drawDot(xPos, yPos);
        } else {
            // Else, it's a middle or ending square
            drawLine(xPos, yPos);
            drawDot(xPos, yPos);
        }
    }
}

// render the highlighted squares
function renderHighlightedSquares() {
    // Loop through all squares,
    DomModule.boardSquares.forEach((sqr) => {
        const xPos = parseInt(sqr.dataset.xIndex);
        const yPos = parseInt(sqr.dataset.yIndex);
        if (
            statesModule.startPos[0] == xPos &&
            statesModule.startPos[1] == yPos
        ) {
            sqr.setAttribute("data-active", true);
        } else if (
            statesModule.endPos[0] == xPos &&
            statesModule.endPos[1] == yPos
        ) {
            sqr.setAttribute("data-active", true);
        } else {
            // Else, it's an unrelated square, so make sure it doesn't have data-active
            sqr.removeAttribute("data-active");
        }
    });
}

// Calls function to render the path and squares on the chess board
function renderBoard() {
    renderKnightPath();
    renderHighlightedSquares();
}

// Renders initial state of the page
function renderInitialPage() {
    renderHeaderNav(); // render the header whether it's collapsed or not
    renderBoard();
}

export {
    renderHeaderNav,
    showStartPositionErrors,
    hideStartPositionErrors,
    showEndPositionErrors,
    hideEndPositionErrors,
    inputPositionsMatch,
    isValidChessForm,
    hideChessFormErrors,
    renderHighlightedSquares,
    renderBoard,
    renderInitialPage,
};
