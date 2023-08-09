import {
    hideChessFormErrors,
    hideEndPositionErrors,
    hideStartPositionErrors,
    inputPositionsMatch,
    isValidChessForm,
    resetChessForm,
    showEndPositionErrors,
    showStartPositionErrors,
} from "./error.js";
import { DomModule } from "./modules.js";

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

function createEventListeners() {
    // Set up listener for toggling button
    if (DomModule.headerNav.getBoundingClientRect().height === 0) {
        DomModule.dropDownBtn.textContent = "Show Menu";
    } else {
        DomModule.dropDownBtn.textContent = "Hide Menu";
    }
    DomModule.dropDownBtn.addEventListener("click", toggleHeaderDropDown);

    // Create event listener for start position input
    DomModule.startPositionInput.addEventListener("input", (e) => {
        // Check if it's a chess position
        if (DomModule.startPositionInput.validity.valid) {
            hideStartPositionErrors();
        } else {
            showStartPositionErrors();
        }
        // Then check if both of their inputted chess positions matched,
        // if so, we'll show an error on the 'end-position' side
        if (inputPositionsMatch()) {
            showEndPositionErrors();
        } else {
            hideEndPositionErrors();
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
        } else {
            hideEndPositionErrors();
        }
    });

    // Event listener for the form itself
    DomModule.chessPositionForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Check if the form is valid on submission

        if (isValidChessForm(e)) {
            console.log("Valid form submission!");
            hideChessFormErrors();
            resetChessForm();
        } else {
            console.log("Invalid form submission detected");
        }
    });
}

// Function for loading the page
function loadPage() {
    createEventListeners();
}

export { loadPage };
