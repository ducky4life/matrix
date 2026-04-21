import { AugmentedMatrix3 } from "./systems.js";
import { setupCalculator } from "./systems_calculator.js";

const toggle = (document.getElementById('toggle_mode') as HTMLSelectElement);
let currMode = 'calculator';

function toggleMode() {
    
    if (currMode == 'calculator') {
        
        const generateButton = document.getElementById('generate')!;
        const randomiseButton = document.getElementById('randomise')!;
        const submitButton = document.getElementById('submit')!;
    
        generateButton.classList.remove('gone');
        submitButton.classList.remove('gone');
        randomiseButton.classList.add('gone');
    
    }
        
    else if (currMode == 'game') {
        setupCalculator();
    }
    
}

toggle.addEventListener('click', () => toggleMode());
setupCalculator();
