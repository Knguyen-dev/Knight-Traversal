function createChessGrid() {
    const chessBoardGrid = document.createElement("div");
    chessBoardGrid.classList.add("chessboard-grid");
    const xPositions = ["A", "B", "C", "D", "E", "F", "G", "H"];
    for (let i = 7; i >= 0; i--) {
        for (let j = 0; j < 8; j++) {
            const square = document.createElement("div");
            square.classList.add("chess-square");
            square.setAttribute("data-x-index", j);
            square.setAttribute("data-y-index", i);
            /*
			- If on odd index row, every odd index square is dark
			- If on even index row, every even index square is dark
			*/
            if (i % 2 != 0) {
                if (j % 2 != 0) {
                    square.classList.add("dark-square");
                }
            } else {
                if (j % 2 == 0) {
                    square.classList.add("dark-square");
                }
            }
            // If it's the first square of the row, add a numerical row label
            if (j == 0) {
                square.innerHTML += `<span class="chess-square-label row-label"
                                    >${i + 1}</span>`;
            }
            // If we're on first row, row # 1 or row index 0, then we will also add the
            // alphabetical column label to the square.
            if (i == 0) {
                square.innerHTML += `<span class="chess-square-label column-label"
                                    >${xPositions[j]}</span>`;
            }
            chessBoardGrid.appendChild(square);
        }
    }
    return chessBoardGrid;
}

function createChessForm() {
    const chessForm = document.createElement("form");
    chessForm.id = "chess-position-form";

    // Object for creating form fields
    const formFields = {
        "Start Position": {
            id: "input-start-position-el",
            name: "input-start-position",
            errorID: "start-position-error-el",
        },
        "End Position": {
            id: "input-end-position-el",
            name: "input-end-position",
            errorID: "end-position-error-el",
        },
    };
    for (const key in formFields) {
        const fieldSet = document.createElement("fieldset");
        const labelEl = document.createElement("label");
        labelEl.htmlFor = formFields[key].id;
        labelEl.textContent = key;
        const inputEl = document.createElement("input");
        inputEl.type = "text";
        inputEl.id = formFields[key].id;
        inputEl.name = formFields[key].name;
        inputEl.pattern = "^[a-hA-H][1-8]$";
        inputEl.required = true;
        const errorEl = document.createElement("span");
        errorEl.id = formFields[key].errorID;
        errorEl.classList.add("field-error-el");
        errorEl.classList.add("content-hidden");
        fieldSet.appendChild(labelEl);
        fieldSet.appendChild(inputEl);
        fieldSet.appendChild(errorEl);
        chessForm.appendChild(fieldSet);
    }
    const submitBtn = document.createElement("button");
    submitBtn.id = "submit-chess-form-btn";
    submitBtn.type = "submit";
    submitBtn.textContent = "Submit";
    chessForm.appendChild(submitBtn);
    return chessForm;
}

function createProjectHeader() {
    const header = document.createElement("header");
    header.id = "project-header";

    const siteInfoDiv = document.createElement("div");
    siteInfoDiv.className = "site-info";

    const siteNameEl = document.createElement("h2");
    siteNameEl.className = "site-name-el";
    siteNameEl.textContent = "Knight Travels";

    const extraBtnsDiv = document.createElement("div");
    extraBtnsDiv.className = "extra-btns-section";

    const headerDropDownBtn = document.createElement("button");
    headerDropDownBtn.id = "header-drop-down-btn";

    const headerLinks = {
        // text for link : id of element its linked to
        Home: "#",
        About: "#",
        "Other Projects": "#",
    };
    const headerNav = document.createElement("nav");
    headerNav.className = "header-nav";

    const linksList = document.createElement("ul");
    linksList.className = "header-nav-links";

    for (const key in headerLinks) {
        const listEl = document.createElement("li");
        const linkEl = document.createElement("a");
        linkEl.textContent = key;
        linkEl.href = headerLinks[key];
        listEl.appendChild(linkEl);
        linksList.appendChild(listEl);
    }

    siteInfoDiv.appendChild(siteNameEl);
    extraBtnsDiv.appendChild(headerDropDownBtn);
    headerNav.appendChild(linksList);
    header.appendChild(siteInfoDiv);
    header.appendChild(extraBtnsDiv);
    header.appendChild(headerNav);
    return header;
}

function createMainContent() {
    const mainSection = document.createElement("main");
    mainSection.id = "project-main-content";

    const mainHeader = document.createElement("div");
    mainHeader.className = "main-header";

    const formContainer = document.createElement("section");
    formContainer.className = "chess-form-container";

    const headerMessage = document.createElement("h4");
    headerMessage.className = "main-header-message";
    headerMessage.textContent = "Enter board positions for the knight!";

    const chessForm = createChessForm();

    const mainBody = document.createElement("section");
    mainBody.className = "main-body";

    const chessBoardGrid = createChessGrid();

    const canvas = document.createElement("canvas");
    canvas.classList.add("chess-canvas");

    formContainer.appendChild(headerMessage);
    formContainer.appendChild(chessForm);
    mainHeader.appendChild(formContainer);
    chessBoardGrid.appendChild(canvas);
    mainBody.appendChild(chessBoardGrid);
    mainSection.appendChild(mainHeader);
    mainSection.appendChild(mainBody);
    return mainSection;
}

function createProjectFooter() {
    const footer = document.createElement("footer");
    footer.id = "project-footer";

    const footerInfoEl = document.createElement("h3");
    footerInfoEl.className = "footer-info-el";
    footerInfoEl.innerHTML = `Knguyen <span class="current-year-el">${new Date().getFullYear()}</span>`;

    const footerLinks = {
        "Project Github": "https://github.com/Knguyen-dev/Knight-Traversal.git",
    };
    const footerNav = document.createElement("nav");
    footerNav.className = "footer-nav";
    const linksList = document.createElement("ul");
    linksList.className = "footer-nav-links-container";

    for (const key in footerLinks) {
        const listEl = document.createElement("li");
        const linkEl = document.createElement("a");
        linkEl.textContent = key;
        linkEl.href = footerLinks[key];
        listEl.appendChild(linkEl);
        linksList.appendChild(listEl);
    }

    footer.appendChild(footerInfoEl);
    footerNav.appendChild(linksList);
    footer.appendChild(footerNav);
    return footer;
}

function createInitialPage() {
    const contentDiv = document.createElement("div");
    contentDiv.className = "content";

    const projectDiv = document.createElement("div");
    projectDiv.id = "project-container";

    const projectHeader = createProjectHeader();
    const mainContent = createMainContent();
    const projectFooter = createProjectFooter();

    projectDiv.appendChild(projectHeader);
    projectDiv.appendChild(mainContent);
    projectDiv.appendChild(projectFooter);
    contentDiv.appendChild(projectDiv);

    return contentDiv;
}

export { createInitialPage };
