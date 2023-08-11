import { Board } from "./board.js";
import { createInitialPage } from "./initialPage.js";

/*
- On:renderChessBoard: function with the form. My idea 
	is that in the statesModule we'd record the x-y coordinates of the 
	first and second moves. Then when this function is called, we 
	look at the values of the first and second moves from that statesModule
	and then we do the math and add our class, etc. more code. Rather than
	iterating through the board itself, we use our 'path' list, and iterate
	through that list. We know the .children matches the indices, I think
	we can just index like normal. 
	

	- board class: Going to import the board class, rather than creating
		a class instance everytime we'd probably put it in the 
		statesModule.


	Form: On our form we'd likely accept and record the coordinate values to 
	the statesModule, obviously after converting their notation, which would be a separate function.
	And then obviously the form submits and we run the render function

	Board squares event listeners: When a square is clicked 
	


*/

const statesModule = {
    /*
	- Values recording the x-y positions of where the knight should start 
		and end, though in terms of indices of the chess board. 
	*/
    startPos: [0, 0],
    endPos: [7, 7],
    // Board class instance that we use to make those calculations
    board: new Board(),
};

const DomModule = (() => {
    // Create and put page onto the screen
    const page = createInitialPage();
    document.body.appendChild(page);

    // Get the form and input elements
    const chessPositionForm = document.querySelector("#chess-position-form");
    const startPositionInput = document.querySelector(
        "#input-start-position-el"
    );
    const endPositionInput = document.querySelector("#input-end-position-el");
    // Get the error elements
    const startPositionErrorEl = document.querySelector(
        "#start-position-error-el"
    );
    const endPositionErrorEl = document.querySelector("#end-position-error-el");
    const formErrorElements = document.querySelectorAll(".field-error-el");

    const dropDownBtn = document.querySelector("#header-drop-down-btn");
    const headerNav = document.querySelector(".header-nav");
    const headerNavLinks = document.querySelector(".header-nav-links");

    const chessBoardGrid = document.querySelector(".chessboard-grid");
    const boardSquares = chessBoardGrid.children;

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
