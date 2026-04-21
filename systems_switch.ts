import { AugmentedMatrix3 } from "./systems.js";
import { setupCalculator } from "./systems_calculator.js";

const toggle = (document.getElementById('toggle_mode') as HTMLSelectElement);
let currMode = 'calculator';

function toggleMode() {
    
    if (currMode == 'calculator') {
    
    }
        
    else if (currMode == 'game') {
        setupCalculator();
    }
    
}

toggle.addEventListener('click', () => toggleMode());
