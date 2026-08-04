import { getRandomNumberFromArray } from "./matrix.js";
import { clearInputBoxColor, getInputNumber, incrementScore, setInputBoxColor, setScore } from "./matrix_web.js";
import { generateNumberExercise, generateVectorExercise, numberRoughlyEquals } from "./vector.js";
import { getInputVector, setBasisToggle, use_basis_format } from "./vector_calculator.js";
function setNumberInputEventListener() {
    m1_number.addEventListener('input', () => {
        if (!m1_number.value) {
            clearInputBoxColor('m1_number');
        }
    });
}
function clearVectorInput(name) {
    document.getElementById(`vector_${name}_a1`).value = '';
    document.getElementById(`vector_${name}_b1`).value = '';
    document.getElementById(`vector_${name}_c1`).value = '';
}
function clearNumberInput(name) {
    document.getElementById(`${name}_number`).value = '';
}
function clearAllInputBoxColor() {
    clearInputBoxColor('m1_number');
    clearInputBoxColor('vector_m1_a1');
    clearInputBoxColor('vector_m1_b1');
    clearInputBoxColor('vector_m1_c1');
    clearInputBoxColor('vector_m2_a1');
    clearInputBoxColor('vector_m2_b1');
    clearInputBoxColor('vector_m2_c1');
}
function clearAllInput() {
    clearNumberInput('m1');
    clearVectorInput('m1');
    clearVectorInput('m2');
    clearAllInputBoxColor();
}
function setNumberInput() {
    m1_box.classList.add('gone');
    m1_number.classList.remove('gone');
    setNumberInputEventListener();
}
function setVectorInput() {
    m1_box.classList.remove('gone');
    m1_number.classList.add('gone');
}
function setBasisToggleEventListener() {
    const operationElement = document.getElementById('use_basis_format');
    operationElement.addEventListener('input', () => {
        setBasisToggle();
    });
}
function setOperationEventListener() {
    const operationElement = document.getElementById('type');
    operationElement.addEventListener('input', () => {
        setBasisToggle();
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
function checkVectorAnswer(answerVector) {
    let all_correct = true;
    const inputVector = getInputVector('m1');
    const elementId_a1 = document.getElementById("vector_m1_a1");
    const elementId_b1 = document.getElementById("vector_m1_b1");
    const elementId_c1 = document.getElementById("vector_m1_c1");
    if (elementId_a1.value && elementId_b1.value && elementId_c1.value) {
        if (inputVector.equals(answerVector, true)) {
            setInputBoxColor("vector_m1_a1", 'limegreen');
            setInputBoxColor("vector_m1_b1", 'limegreen');
            setInputBoxColor("vector_m1_c1", 'limegreen');
        }
        else {
            all_correct = false;
            setInputBoxColor("vector_m1_a1", 'red');
            setInputBoxColor("vector_m1_b1", 'red');
            setInputBoxColor("vector_m1_c1", 'red');
        }
    }
    else {
        all_correct = false;
    }
    return all_correct;
}
function checkNumberAnswer(answer) {
    let all_correct = true;
    const inputNumber = getInputNumber('m1');
    const elementId = "m1_number";
    if (document.getElementById(elementId).value) {
        if (numberRoughlyEquals(inputNumber, answer)) {
            setInputBoxColor(elementId, 'limegreen');
        }
        else {
            all_correct = false;
            setInputBoxColor(elementId, 'red');
        }
    }
    else {
        all_correct = false;
    }
    return all_correct;
}
const m1_box = document.getElementById('m1_box');
const m2_box = document.getElementById('m2_box');
const m1_number = document.getElementById('m1_number');
const exercise_box = document.getElementById('exercise');
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
    let exercise = {};
    if (vectorOutputArray.includes(exercise_type)) {
        exercise = generateVectorExercise(exercise_type, max_element);
        setVectorInput();
    }
    else {
        exercise = generateNumberExercise(exercise_type, max_element);
        setNumberInput();
    }
    const V1 = exercise['V1'];
    const V2 = exercise['V2'];
    const P = exercise['P'];
    const answer = exercise['answer'];
    if (exercise_type == 0) {
        exercise_box.innerHTML = `
            <div style="display: flex; align-items: center;">
                ${V1.displayToFormat(!use_basis_format, true)}
                <span style="margin: 0 20px;">+</span>
                ${V2.displayToFormat(!use_basis_format, true)}
                <span style="margin: 0 20px;">= </span>
            </div><br>`;
    }
    else if (exercise_type == 1) {
        exercise_box.innerHTML = `
            <div style="display: flex; align-items: center;">
                ${V1.displayToFormat(!use_basis_format, true)}
                <span style="margin: 0 20px;">-</span>
                ${V2.displayToFormat(!use_basis_format, true)}
                <span style="margin: 0 20px;">= </span>
            </div><br>`;
    }
    else if (exercise_type == 2) {
        exercise_box.innerHTML = `
            <div style="display: flex; align-items: center;">
                ${V1.displayToFormat(!use_basis_format, true)}
                <span style="margin: 0 20px;">•</span>
                ${V2.displayToFormat(!use_basis_format, true)}
                <span style="margin: 0 20px;">= </span>
            </div><br>`;
    }
    else if (exercise_type == 3) {
        exercise_box.innerHTML = `
            <div style="display: flex; align-items: center;">
                ${V1.displayToFormat(!use_basis_format, true)}
                <span style="margin: 0 20px;">×</span>
                ${V2.displayToFormat(!use_basis_format, true)}
                <span style="margin: 0 20px;">= </span>
            </div><br>`;
    }
    else if (exercise_type == 4) {
        exercise_box.innerHTML = `
            <div style="display: flex; align-items: center;">
                <span style="margin: 0 20px; font-size: min(20px, 3vw)">magnitude of</span>
                ${V1.displayToFormat(!use_basis_format, true)}
                <span style="margin: 0 20px;">= </span>
            </div><br>`;
    }
    else if (exercise_type == 5) {
        exercise_box.innerHTML = `
            <div style="display: flex; align-items: center;">
                <span style="margin: 0 20px; font-size: min(20px, 3vw)">unit vector of</span>
                ${V1.displayToFormat(!use_basis_format, true)}
                <span style="margin: 0 20px;">= </span>
            </div><br>`;
    }
    else if (exercise_type == 6) {
        exercise_box.innerHTML = `
            <div style="display: flex; align-items: center;">
                <span style="margin: 0 20px; font-size: min(20px, 3vw)">angle between</span>
                ${V1.displayToFormat(!use_basis_format, true)}, 
                ${V2.displayToFormat(!use_basis_format, true)}
                <span style="margin: 0 20px;">= </span>
            </div><br>`;
    }
    else if (exercise_type == 7) {
        exercise_box.innerHTML = `
            <div style="display: flex; align-items: center;">
                <span style="margin: 0 20px; font-size: min(20px, 3vw)">projection of</span>
                ${V1.displayToFormat(!use_basis_format, true)}
                <span style="margin: 0 20px; font-size: min(20px, 3vw)">on</span>
                ${V2.displayToFormat(!use_basis_format, true)}
                <span style="margin: 0 20px;">= </span>
            </div><br>`;
    }
    else if (exercise_type == 8) {
        exercise_box.innerHTML = `
            <div style="display: flex; align-items: center;">
                <span style="margin: 0 20px; font-size: min(20px, 3vw)">magnitude of proj. of</span>
                ${V1.displayToFormat(!use_basis_format, true)}
                <span style="margin: 0 20px; font-size: min(20px, 3vw)">on</span>
                ${V2.displayToFormat(!use_basis_format, true)}
                <span style="margin: 0 20px;">= </span>
            </div><br>`;
    }
    else if (exercise_type == 9) {
        if (use_basis_format) {
            exercise_box.innerHTML = `
                <div style="display: flex; align-items: center;">
                    <span style="margin: 0 20px; font-size: min(20px, 3vw)">volume of VABC</span>
                    <div style="display: flex; flex-direction: column; align-items: flex-start;">
                        <div style="padding-bottom: 20px;">V: ${V1.displayToBasisComponent()}</div>
                        <div style="padding-bottom: 20px;">A: ${V2.displayToBasisComponent()}</div>
                        <div style="padding-bottom: 20px;">B: ${P.V1.displayToBasisComponent()}</div>
                        <div>C: ${P.V2.displayToBasisComponent()}</div>
                    </div>
                    <span style="margin: 0 20px;">= </span>
                </div><br>`;
        }
        else {
            exercise_box.innerHTML = `
                <div style="display: flex; align-items: center;">
                    <span style="margin: 0 20px; font-size: min(20px, 3vw)">volume of VABC</span>
                    V: ${V1.displayToHTML()}
                    A: ${V2.displayToHTML()}
                    B: ${P.V1.displayToHTML()}
                    C: ${P.V2.displayToHTML()}
                    <span style="margin: 0 20px;">= </span>
                </div><br>`;
        }
    }
    else if (exercise_type == 10) {
        exercise_box.innerHTML = `
            <div style="display: flex; align-items: center;">
                <span style="margin: 0 20px; font-size: min(20px, 3vw)">angle between</span>
                ${V1.displayToFormat(!use_basis_format, true)}
                <span style="margin: 0 20px; font-size: min(20px, 3vw)">and plane</span>
                <div id="plane-vectors">${P.displayToHTML(!use_basis_format)}</div>
                <span style="margin: 0 20px;">= </span>
            </div><br>`;
    }
    const submitButton = document.getElementById('submit');
    submitButton.addEventListener('click', () => {
        if (vectorOutputArray.includes(exercise_type)) {
            if (checkVectorAnswer(answer) && !finished) {
                incrementScore();
                finished = true;
            }
        }
        else {
            if (checkNumberAnswer(answer) && !finished) {
                incrementScore();
                finished = true;
            }
        }
    });
}
export function setupGame() {
    document.querySelector('#clear').addEventListener('click', () => {
        clearAllInput();
    });
    generateButton.classList.remove('gone');
    submitButton.classList.remove('gone');
    randomiseButton.classList.add('gone');
    output_box.classList.add('gone');
    m2_box.classList.add('gone');
    operation_box.style.display = 'none';
    exercise_box.classList.remove('gone');
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
    generateButton.addEventListener('click', () => {
        displayExercise();
    });
    setOperationEventListener();
    displayExercise();
    setBasisToggle();
    setBasisToggleEventListener();
}
