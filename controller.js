import { DomModule, statesModule } from "./modules.js";
import {
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
} from "./rendering.js";
import { convertBoardNotation, convertArrayNotation } from "./board.js";

// Toggles and renders the drop down menu
function toggleHeaderNav() {
    if (statesModule.menuCollapsed) {
        statesModule.menuCollapsed = false;
    } else {
        statesModule.menuCollapsed = true;
    }
    renderHeaderNav();
}

// Set up event listeners for the form and its related elements
function setupChessForm() {
    // Create event listener for start position input
    DomModule.startPositionInput.addEventListener("input", (e) => {
        // Check if it's a chess position
        if (DomModule.startPositionInput.validity.valid) {
            hideStartPositionErrors();
        } else {
            showStartPositionErrors();
            return;
        }
        // Then check if both of their inputted chess positions matched,
        // if so, we'll show an error on the 'end-position' side
        if (!inputPositionsMatch()) {
            hideEndPositionErrors();
        } else {
            showEndPositionErrors();
            return;
        }
    });
    // Event listener for end position input
    DomModule.endPositionInput.addEventListener("input", (e) => {
        /*
		- If either it doesn't meet constraints or the input positions match,
		 	then we show an error. NOTE: Since both errors affect
			the same element, if both errors occur it'll
			prioritize telling that the chess move was incorrect .
		*/
        if (
            !DomModule.endPositionInput.validity.valid ||
            inputPositionsMatch()
        ) {
            showEndPositionErrors();
            return;
        } else {
            hideEndPositionErrors();
        }
    });

    // Event listener for the form itself
    DomModule.chessPositionForm.addEventListener("submit", (e) => {
        e.preventDefault();
        // If form is valid
        if (isValidChessForm(e)) {
            // Record the positions and convert them into board indices
            statesModule.startPos = convertBoardNotation(
                DomModule.startPositionInput.value
            );
            statesModule.endPos = convertBoardNotation(
                DomModule.endPositionInput.value
            );
            // Render the board and hide any left-over errors
            renderBoard();
            hideChessFormErrors();
        }
    });
}

function setupBoardSquares() {
    DomModule.boardSquares.forEach((sqr) => {
        sqr.addEventListener("click", () => {
            // Get indices for board square
            const pos = [
                parseInt(sqr.dataset.xIndex),
                parseInt(sqr.dataset.yIndex),
            ];
            /*
			- If the data-active attribute is already there user wants to unselect position
				1. Check which position this square corresponds with in the state module
				2. Overwrite the input accordingly to blank
				2. Overwrite stateModule's position value to [-1, -1] to indicate 
					undefined value for position.
				5. If we cleared start position,  do overwriteStartInput = true, so 
					next the user clicks, we are going to overwrite the start position.
				6. Conversely, if we cleared the end position, do overwriteStartInput = false,
					so they fill the end position next time.
				7. Call to update the rendering for the highlighted squares
				8. Stop the function early.
			*/
            if (sqr.hasAttribute("data-active")) {
                if (
                    statesModule.startPos[0] == pos[0] &&
                    statesModule.startPos[1] == pos[1]
                ) {
                    DomModule.startPositionInput.value = "";
                    statesModule.startPos = [-1, -1];
                    statesModule.overwriteStartInput = true;
                } else {
                    DomModule.endPositionInput.value = "";
                    statesModule.endPos = [-1, -1];
                    statesModule.overwriteStartInput = false;
                }
                renderHighlightedSquares();
                return;
            }
            /*
			- If overwriting the start input:
				1. Overwrite start position in the stateModule.
				2. Update the input value for start input element so it represents the board position
					of the square that the user clicked
				3. Change boolean so that next we overwrite the end position
			- Else overwriting the end input: 
				1. Overwrite end position in statesModule
				2. Overwrite the end input's value in the form so it represents the board position
					of the square that the user clicked
				3. Change booelan so we overwrite the start position 	
			- Finally render the new highlighted squares
			*/
            if (statesModule.overwriteStartInput) {
                statesModule.startPos = pos;
                DomModule.startPositionInput.value = convertArrayNotation(pos);
                statesModule.overwriteStartInput = false;
            } else {
                statesModule.endPos = pos;
                DomModule.endPositionInput.value = convertArrayNotation(pos);
                statesModule.overwriteStartInput = true;
            }
            renderHighlightedSquares();
        });
    });
}

function loadPageListeners() {
    DomModule.dropDownBtn.addEventListener("click", toggleHeaderNav);
    setupChessForm();
    setupBoardSquares();
}

export { loadPageListeners };
