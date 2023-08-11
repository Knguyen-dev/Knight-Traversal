import { setupChessForm } from "./form.js";
import { DomModule } from "./modules.js";
import {
    renderHeaderNav,
    toggleHeaderNav,
    renderKnightPath,
} from "./rendering.js";

// Our main function
window.addEventListener("DOMContentLoaded", () => {
    // Render the drop down header nav on smaller screens, which is collapsed or hidden, based on modules.js
    renderHeaderNav();

    // Set up event listener for toggling the header nav on smaller screens
    DomModule.dropDownBtn.addEventListener("click", toggleHeaderNav);

    // Render a knight's path based on default coordinates in modules.js
    renderKnightPath();

    // Set up event listeners for our form
    setupChessForm();
});
