const statesModule = {
    menuIsHidden: false,
};

const DomModule = (() => {
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
    };
})();

export { statesModule, DomModule };
