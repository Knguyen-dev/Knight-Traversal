import { renderInitialPage } from "./rendering.js";
import { loadPageListeners } from "./controller.js";
// Our main function
window.addEventListener("DOMContentLoaded", () => {
    renderInitialPage();
    loadPageListeners();
});
