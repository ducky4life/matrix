import { Frac } from "./frac_matrix.js";
import { incrementScore, setInputBoxColor } from "./matrix_web.js";
import { getRandomAugmentedMatrix3 } from "./systems.js";
function getInputFracHTML(name) {
    return `<div style="display: flex; align-items: center;">
        <span style="margin: 0;">${name} = </span>
        <math style="font-size: 3.5vh; padding-right: 1vw;">
            <mfrac>
            <mn><input id="frac_${name}_a"></input></mn>
            <mn><input id="frac_${name}_b"></input></mfrac>
        </math>
    </div>`;
}
function getInputNumberFrac(name) {
    const a = Number(document.getElementById(`frac_${name}_a`).value);
    const b = Number(document.getElementById(`frac_${name}_b`).value);
    return (new Frac(a, b)).simplify();
}
function checkNumberFracAnswer(answer_array) {
    let all_correct = true;
    const variable_array = ['x', 'y', 'z'];
    for (let i = 0; i < 3; i++) {
        const variable_name = variable_array[i];
        const elementId_a = `frac_${variable_name}_a`;
        const elementId_b = `frac_${variable_name}_b`;
        const inputNumberFrac = getInputNumberFrac(variable_name);
        const answerFrac = answer_array[i];
        if (document.getElementById(elementId_a).value
            && document.getElementById(elementId_b).value) {
            if (inputNumberFrac.equals(answerFrac)) {
                setInputBoxColor(elementId_a, 'limegreen');
                setInputBoxColor(elementId_b, 'limegreen');
            }
            else {
                all_correct = false;
                setInputBoxColor(elementId_a, 'red');
                setInputBoxColor(elementId_b, 'red');
            }
        }
        else {
            all_correct = false;
        }
    }
    return all_correct;
}
function displayExercise() {
    let finished = false;
    let answer_array = [];
    const submitButton = document.getElementById('submit');
    submitButton.addEventListener('click', () => {
        if (checkNumberFracAnswer(answer_array) && !finished) {
            incrementScore();
            finished = true;
        }
    });
}
export function setupGame() {
    const m1_box = document.getElementById('m1_box');
    const m1_number = document.getElementById('m1_frac');
    const exercise_box = document.getElementById('exercise');
    const generateButton = document.getElementById('generate');
    const randomiseButton = document.getElementById('randomise');
    const submitButton = document.getElementById('submit');
    const output_box = document.getElementById('output-div');
    generateButton.classList.remove('gone');
    submitButton.classList.remove('gone');
    randomiseButton.classList.add('gone');
    output_box.classList.add('gone');
    m1_box.classList.add('gone');
    m1_number.classList.remove('gone');
    const M1 = getRandomAugmentedMatrix3();
    const solution_frac_input = getInputFracHTML('x') + getInputFracHTML('y') + getInputFracHTML('z');
    exercise_box.innerHTML = M1.displayToHTML();
    m1_number.innerHTML = solution_frac_input;
}
