import { DomModule, statesModule } from "./modules.js";
import { renderKnightPath } from "./rendering.js";
import { convertBoardNotation } from "./board.js";

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
        // If form is valid, record the positions and convert them into board indices
        if (isValidChessForm(e)) {
            statesModule.startPos = convertBoardNotation(
                DomModule.startPositionInput.value
            );

            statesModule.endPos = convertBoardNotation(
                DomModule.endPositionInput.value
            );
            // Then call the function to render the board pieces and reset the form
            renderKnightPath();
            hideChessFormErrors();
        }
    });
}

export { setupChessForm };
