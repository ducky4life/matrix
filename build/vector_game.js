import { getRandomNumberFromArray } from "./matrix.js";
import { setScore } from "./matrix_web.js";
import { setBasisToggle } from "./vector_calculator.js";
function setBasisToggleEventListener() {
    const operationElement = document.getElementById('use_basis_format');
    operationElement.addEventListener('input', () => {
        setBasisToggle();
    });
}
function setOperationEventListener() {
    const operationElement = document.getElementById('type');
    operationElement.addEventListener('input', () => {
        displayExercise();
    });
}
function getInputExerciseType() {
    let operation = Number(document.getElementById('type').value);
    switch (operation) {
        case -1: // random arithmetic
            operation = getRandomNumberFromArray([0, 1, 2, 3]);
            break;
        case -2: // random vector
            operation = getRandomNumberFromArray(vectorOperationArray);
            break;
        case -3: // random plane
            operation = getRandomNumberFromArray(planeOperationArray);
            break;
        case -4: // random all
            operation = getRandomNumberFromArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
            break;
    }
    return operation;
}
const m1_box = document.getElementById('m1_box');
const m2_box = document.getElementById('m2_box');
const m1_number = document.getElementById('m1_frac');
const operation_box = document.getElementById('operation_box');
const generateButton = document.getElementById('generate');
const randomiseButton = document.getElementById('randomise');
const submitButton = document.getElementById('submit');
const output_box = document.getElementById('output-div');
const scoreElement = (document.getElementById('score-div'));
const max_element_box = document.getElementById('max_element_box');
const plane_toggle = document.getElementById('plane-toggle');
const m1_property = document.getElementById('m1_property');
const m2_property = document.getElementById('m2_property');
const exercise_type_box = document.getElementById('exercise_type_box');
const plane_vector_input = document.getElementById('plane-vector-input');
let exercise_type = 1;
const vectorOperationArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; // 9: volume of tetrahedron needs 4 vectors
const planeOperationArray = [10, 11, 12, 13];
const vectorOutputArray = [0, 1, 3, 5, 7, 12, 13];
function displayExercise() {
    exercise_type = getInputExerciseType();
    let max_element = Number(document.querySelector('#max_element').value);
    if (max_element == 0 || max_element > 20 || Number.isNaN(max_element)) {
        max_element = 10;
    }
    let finished = false;
    if (vectorOutputArray.includes(exercise_type)) {
    }
}
export function setupGame() {
    // (document.querySelector('#clear')as HTMLButtonElement)!.addEventListener('click', () => {
    //     clearAllInput(exercise_type);
    // });
    generateButton.classList.remove('gone');
    submitButton.classList.remove('gone');
    randomiseButton.classList.add('gone');
    output_box.classList.add('gone');
    m1_box.classList.add('gone');
    m2_box.classList.add('gone');
    operation_box.classList.add('gone');
    m1_number.classList.remove('gone');
    m1_number.style.display = 'flex';
    scoreElement.classList.remove('gone');
    max_element_box.classList.remove('gone');
    plane_toggle.classList.add('gone');
    m1_property.classList.add('gone');
    m2_property.classList.add('gone');
    exercise_type_box.classList.remove('gone');
    plane_vector_input.style.display = 'none';
    let local_score = localStorage.getItem('score');
    if (local_score == null) {
        local_score = '0';
    }
    setScore(local_score);
    // generateButton.addEventListener('click', () => {
    //     displayExercise();
    // });
    // setOperationEventListener();
    // displayExercise();
    setBasisToggle();
    setBasisToggleEventListener();
}
