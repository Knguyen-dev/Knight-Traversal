function createChessGrid() {
    const chessBoardGrid = document.createElement("div");
    chessBoardGrid.classList.add("chessBoardGrid-grid");
    const xPositions = ["A", "B", "C", "D", "E", "F", "G", "H"];
    /*
	- Build the chess board, let the top right be A8 and bottom left be H1.
	We build the squares of the board from top left to bottom right iteratively.
	- for range 8 to 1 because we're building from the top row and going to the bottom.
		Iterating through the numerical row labels
	- for range 0 to 8 because we're going to iterate through the xPositions like normal
		Iterating through the indices for xPositions array
	- squareCounter: Counter to let us know when a square is dark or light
	*/

    let squareCounter = 0;

    for (let i = 8; i <= 1; i--) {
        for (let j = 0; j < 8; j++) {
            squareCounter += 1;
            const square = document.createElement("div");
            square.classList.add("chess-square");
            // If it's an even square, it's dark
            if (squareCounter % 2 == 0) {
                square.classList.add("dark-square");
            }
            // If it's the first square of the row, add a numerical row label
            if (j == 0) {
                square.innerHTML += `<span class="chess-square-label row-label"
                                    >${i}</span>`;
            }
            // If we're on first row, row # 1, then we will also add the
            // alphabetical column label to the square.
            if (i == 1) {
                square.innerHTML += `<span class="chess-square-label column-label"
                                    >${xPositions[j]}</span>`;
            }
            chessBoardGrid.appendChild(square);
        }
    }

    return chessBoardGrid;
}

function createProjectFooter() {
    const footer = document.createElement("footer");
    footer.id = "project-footer";

    const footerInfoEl = document.createElement("h3");
    footerInfoEl.classList.add("footer-info-el");
    footerInfoEl.innerHTML = `Knguyen <span class="current-year-el">${
        new Date().getFullYear
    }</span>`;

    const footerLinks = {
        "Project Github": "https://github.com/",
        "Other Link 1": "https://github.com/",
        "Other Link 2": "https://github.com/",
    };
    const footerNav = document.createElement("nav");
    footerNav.classList.add("footer-nav");
    const linksContainer = document.createElement("ul");
    linksContainer.classList.add("footer-nav-links-container");
    footerLinks.forEach((linkName) => {
        linksContainer.innerHTML += `<li><a href="${footerLinks[linkName]}">${linkName}</a></li>`;
    });

    footer.appendChild(footerInfoEl);
    footerNav.appendChild(linksContainer);
    footer.appendChild(footerNav);
    return footer;
}
