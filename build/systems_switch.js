import { setupCalculator } from "./systems_calculator.js";
import { setupGame } from "./systems_game.js";
const toggle = document.getElementById('toggle_mode');
let currMode = 'calculator';
function toggleMode() {
    if (currMode == 'calculator') {
        currMode = 'game';
        setupGame();
    }
    else if (currMode == 'game') {
        currMode = 'calculator';
        setupCalculator();
    }
}
toggle.addEventListener('input', () => toggleMode());
setupCalculator();
