import { setupCalculator } from "./systems_calculator.js";
const toggle = document.getElementById('toggle_mode');
let currMode = 'calculator';
function toggleMode() {
    if (currMode == 'calculator') {
        currMode = 'game';
        const generateButton = document.getElementById('generate');
        const randomiseButton = document.getElementById('randomise');
        const submitButton = document.getElementById('submit');
        generateButton.classList.remove('gone');
        submitButton.classList.remove('gone');
        randomiseButton.classList.add('gone');
    }
    else if (currMode == 'game') {
        currMode = 'calculator';
        setupCalculator();
    }
}
toggle.addEventListener('input', () => toggleMode());
setupCalculator();
