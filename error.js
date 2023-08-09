import { DomModule } from "./modules.js";
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

// Shows all potential errors with the chess position form
function showChessFormErrors() {
    // Check errors in the start position
    if (DomModule.startPositionInput.validity.valid) {
        hideStartPositionErrors();
    } else {
        showStartPositionErrors();
    }
    // Check errors in the end position
    if (DomModule.endPositionInput.validity.valid) {
        hideEndPositionErrors();
    } else {
        showEndPositionErrors();
    }
    // Check both to see if they match (which is an error)
    if (!inputPositionsMatch()) {
        hideEndPositionErrors;
    } else {
        showEndPositionErrors;
    }
}

// hides all error elements in chess position form
function hideChessFormErrors() {
    DomModule.formErrorElements.forEach((errorEl) => {
        errorEl.classList.add("content-hidden");
    });
}

// Resets input fields and hides error elements in the chess form
function resetChessForm() {
    DomModule.chessPositionForm.reset();
    hideChessFormErrors();
}

export {
    showStartPositionErrors,
    hideStartPositionErrors,
    showEndPositionErrors,
    hideEndPositionErrors,
    inputPositionsMatch,
    isValidChessForm,
    hideChessFormErrors,
    resetChessForm,
};
