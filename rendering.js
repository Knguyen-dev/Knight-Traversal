import { DomModule, statesModule } from "./modules.js";

// Toggles and renders the drop down menu
function toggleHeaderDropDown() {
    // Get the heights of the links and their container
    const linksHeight = DomModule.headerNavLinks.getBoundingClientRect().height;
    const containerHeight = DomModule.headerNav.getBoundingClientRect().height;
    // If container has no height (links are hidden), then show links
    if (containerHeight === 0) {
        DomModule.dropDownBtn.textContent = "Hide Menu";
        DomModule.headerNav.style.height = `${linksHeight}px`;
    } else {
        // Else container has height (links are visible), so hide them
        DomModule.dropDownBtn.textContent = "Show Menu";
        DomModule.headerNav.style.height = 0;
    }
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

function resetCanvas() {
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
    resetCanvas();
    DomModule.canvasContext.beginPath();

    // Draw the path
    for (let i = 0; i < squaresArr.length; i++) {
        // Calculate num pixels to be positioned away from left side of board
        const xPos = squaresArr[i].offsetLeft + squaresArr[i].offsetWidth / 2;
        // Calculate num pixels to be positioned away from top of board
        const yPos = squaresArr[i].offsetTop + squaresArr[i].offsetHeight / 2;

        // If it's the starting square, move pen to starting square
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

export { renderKnightPath, toggleHeaderDropDown };
