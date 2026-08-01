import { Frac } from "./frac_matrix.js";
import { incrementScore, setInputBoxColor, setScore } from "./matrix_web.js";
import { generateInfiniteSolutionsExercise, generateUniqueSolutionExercise } from "./systems.js";
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
function getInputBackSubFracHTML(name) {
    return `<div style="display: flex; align-items: center;">
        <span style="margin: 0;">${name} = </span>
        <math style="font-size: 3.5vh; padding-right: 1vw;">
            <mfrac>
            <mn style="display: flex;"><input id="frac_${name}_a_t" class="num-input"></input>
                <span style="margin: 0; display: flex; align-items: flex-end; font-size: 1.5vw;">t+</span>
                <input id="frac_${name}_a_c" class="num-input"></input></mn>
            <mn><input id="frac_${name}_b"></input></mfrac>
        </math>
    </div>`;
}
function clearInput(name) {
    document.getElementById(`frac_${name}_a`).value = '';
    document.getElementById(`frac_${name}_b`).value = '';
}
function clearAllInput() {
    clearInput('x');
    clearInput('y');
    clearInput('z');
}
function getInputNumberFrac(name) {
    const a = Number(document.getElementById(`frac_${name}_a`).value);
    const b = Number(document.getElementById(`frac_${name}_b`).value);
    return (new Frac(a, b)).simplify();
}
function getInputBackSubFrac(name) {
    const a_t = Number(document.getElementById(`frac_${name}_a_t`).value);
    const a_c = Number(document.getElementById(`frac_${name}_a_c`).value);
    const b = Number(document.getElementById(`frac_${name}_b`).value);
    const t_coeff = new Frac(a_t, b);
    const constant = new Frac(a_c, b);
    return {
        't_coeff': t_coeff,
        'constant': constant
    };
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
function checkBackSubFracAnswer(answer_array) {
    let all_correct = true;
    const variable_array = ['x', 'y', 'z'];
    for (let i = 0; i < 3; i++) {
        const variable_name = variable_array[i];
        const elementId_a_t = `frac_${variable_name}_a_t`;
        const elementId_a_c = `frac_${variable_name}_a_c`;
        const elementId_b = `frac_${variable_name}_b`;
        const inputNumberFracCoeffs = getInputBackSubFrac(variable_name);
        const answerCoeffs = answer_array[i];
        const t_coeff = inputNumberFracCoeffs['t_coeff'];
        const constant = inputNumberFracCoeffs['constant'];
        const ans_t_coeff = answerCoeffs['t_coeff'];
        const ans_constant = answerCoeffs['constant'];
        if (document.getElementById(elementId_a_t).value
            && document.getElementById(elementId_a_c).value
            && document.getElementById(elementId_b).value) {
            if (t_coeff.equals(ans_t_coeff) && constant.equals(ans_constant)) {
                setInputBoxColor(elementId_a_t, 'limegreen');
                setInputBoxColor(elementId_a_c, 'limegreen');
                setInputBoxColor(elementId_b, 'limegreen');
            }
            else {
                all_correct = false;
                setInputBoxColor(elementId_a_t, 'red');
                setInputBoxColor(elementId_a_c, 'red');
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
    let exercise_type = 1;
    let finished = false;
    let exercise = {};
    if (exercise_type == 1) {
        exercise = generateInfiniteSolutionsExercise();
    }
    else {
        exercise = generateUniqueSolutionExercise();
    }
    let M1 = exercise['M1'];
    let answer_array = exercise['answer'];
    console.log(answer_array);
    exercise_box.innerHTML = M1.displayToHTML();
    const solution_frac_input = getInputBackSubFracHTML('x') + getInputBackSubFracHTML('y') + getInputBackSubFracHTML('z');
    m1_number.innerHTML = solution_frac_input;
    const submitButton = document.getElementById('submit');
    submitButton.addEventListener('click', () => {
        if (exercise_type == 0) {
            if (checkNumberFracAnswer(answer_array) && !finished) {
                incrementScore();
                finished = true;
            }
        }
        else if (exercise_type == 1) {
            if (checkBackSubFracAnswer(answer_array) && !finished) {
                incrementScore();
                finished = true;
            }
        }
    });
}
const m1_box = document.getElementById('m1_box');
const m1_number = document.getElementById('m1_frac');
const exercise_box = document.getElementById('exercise');
const generateButton = document.getElementById('generate');
const randomiseButton = document.getElementById('randomise');
const submitButton = document.getElementById('submit');
const output_box = document.getElementById('output-div');
const scoreElement = (document.getElementById('score-div'));
const exercise_type_box = document.getElementById('exercise_type_box');
const max_element_box = document.getElementById('max_element_box');
export function setupGame() {
    document.querySelector('#clear').addEventListener('click', () => {
        clearAllInput();
    });
    generateButton.classList.remove('gone');
    submitButton.classList.remove('gone');
    randomiseButton.classList.add('gone');
    output_box.classList.add('gone');
    m1_box.classList.add('gone');
    m1_number.classList.remove('gone');
    m1_number.style.display = 'flex';
    scoreElement.classList.remove('gone');
    exercise_type_box.classList.remove('gone');
    max_element_box.classList.remove('gone');
    let local_score = localStorage.getItem('score');
    if (local_score == null) {
        local_score = '0';
    }
    setScore(local_score);
    generateButton.addEventListener('click', () => {
        displayExercise();
    });
    displayExercise();
}
