import { DomModule, statesModule } from "./modules.js";
import { toggleHeaderDropDown, renderKnightPath } from "./rendering.js";
import {
    showStartPositionErrors,
    hideStartPositionErrors,
    showEndPositionErrors,
    hideEndPositionErrors,
    inputPositionsMatch,
    isValidChessForm,
    hideChessFormErrors,
} from "./form.js";
import { convertBoardNotation } from "./board.js";

// Set up event listener for the drop down btn
function setupDropDownBtn() {
    if (DomModule.headerNav.getBoundingClientRect().height === 0) {
        DomModule.dropDownBtn.textContent = "Show Menu";
    } else {
        DomModule.dropDownBtn.textContent = "Hide Menu";
    }
    DomModule.dropDownBtn.addEventListener("click", toggleHeaderDropDown);
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

function loadEventListeners() {
    setupChessForm();
    setupDropDownBtn();
}

export { loadEventListeners };
