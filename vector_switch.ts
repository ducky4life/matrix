import { AugmentedMatrix3 } from "./systems.js";
import { Plane, Vector3 } from "./vector.js";
import { setupCalculator } from "./vector_calculator.js";
import { setupGame } from "./vector_game.js";

const toggle = (document.getElementById('toggle_mode') as HTMLSelectElement);
export let currMode = 'calculator';

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