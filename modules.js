import { Board, convertArrayNotation } from "./board.js";
import { createInitialPage } from "./initialPage.js";

const statesModule = {
    /*
	- Values recording the x-y positions of where the knight should start 
		and end, though in terms of indices of the chess board. 
	*/
    startPos: [0, 0],
    endPos: [7, 7],
    // Board class instance that we use to make those calculations
    board: new Board(),

    // boolean deciding if the menu is collapsed or not on the drop down on
    // smaller screens
    menuCollapsed: true,

    // If true, overwrite the input value for the start position, else overwrite the end position input
    overwriteStartInput: true,
};

const DomModule = (() => {
    // Create and load page onto the screen
    const page = createInitialPage();
    document.body.appendChild(page);

    /*
	- Get the form and input elements. Then fill out the input elements with the default starting and ending positions, 
		which helps contribute to how the site will render a default knight's path when a user loads in. It's to demonstrate 
		how the program works.
	*/
    const chessPositionForm = document.querySelector("#chess-position-form");
    const startPositionInput = document.querySelector(
        "#input-start-position-el"
    );
    startPositionInput.value = convertArrayNotation(statesModule.startPos);
    const endPositionInput = document.querySelector("#input-end-position-el");
    endPositionInput.value = convertArrayNotation(statesModule.endPos);

    // Get the error elements
    const startPositionErrorEl = document.querySelector(
        "#start-position-error-el"
    );
    const endPositionErrorEl = document.querySelector("#end-position-error-el");
    const formErrorElements = document.querySelectorAll(".field-error-el");

    // Get the drop down button for smaller screens and make sure it has appropriate text
    const dropDownBtn = document.querySelector("#header-drop-down-btn");

    const headerNav = document.querySelector(".header-nav");
    const headerNavLinks = document.querySelector(".header-nav-links");

    const chessBoardGrid = document.querySelector(".chessboard-grid");
    const boardSquares = document.querySelectorAll(".chess-square");

    // console.log(boardSquares);
    const canvas = document.querySelector(".chess-canvas");
    const canvasContext = canvas.getContext("2d");
    canvasContext.strokeStyle = "black"; // Set line color

    return {
        chessPositionForm,
        startPositionInput,
        endPositionInput,
        startPositionErrorEl,
        endPositionErrorEl,
        formErrorElements,
        dropDownBtn,
        headerNav,
        headerNavLinks,
        chessBoardGrid,
        boardSquares,
        canvas,
        canvasContext,
    };
})();

export { statesModule, DomModule };
