import { Vector3, getAnswerVector, getRandomVector3 } from "./vector.js";
function getInputVector(name) {
    const a1 = Number(document.getElementById(`vector_${name}_a1`).value);
    const b1 = Number(document.getElementById(`vector_${name}_b1`).value);
    const c1 = Number(document.getElementById(`vector_${name}_c1`).value);
    return new Vector3((!isNaN(a1)) ? a1 : 0, (!isNaN(b1)) ? b1 : 0, (!isNaN(c1)) ? c1 : 0);
}
function setInputVector(name, a1, b1, c1) {
    document.getElementById(`vector_${name}_a1`).value = String(a1);
    document.getElementById(`vector_${name}_b1`).value = String(b1);
    document.getElementById(`vector_${name}_c1`).value = String(c1);
}
function setInputFromVector3(name, V) {
    setInputVector(name, V.a1, V.b1, V.c1);
}
function getInputVectorHTML(name) {
    if (use_basis_format) {
        return `<div class="vector-basis">
                <input id="vector_${name}_a1"></input> i +
                <input id="vector_${name}_b1"></input> j +
                <input id="vector_${name}_c1"></input> k
            </div>`;
    }
    return `<div class="vector">
            <div><input id="vector_${name}_a1"></input></div>
            <div><input id="vector_${name}_b1"></input></div>
            <div><input id="vector_${name}_c1"></input></div>
        </div>`;
}
function setInputEventListener() {
    let inputElementIds = [];
    inputElementIds = [
        'vector_m1_a1', 'vector_m2_a1',
        'vector_m1_b1', 'vector_m2_b1',
        'vector_m1_c1', 'vector_m2_c1',
        'operation'
    ];
    inputElementIds.forEach((id) => {
        const element = document.getElementById(id);
        element.addEventListener('input', () => displayOutput());
    });
}
function setBasisToggleEventListener() {
    const operationElement = document.getElementById('use_basis_format');
    operationElement.addEventListener('input', () => {
        setBasisToggle();
    });
}
function setBasisToggle() {
    const use_basis = document.getElementById('use_basis_format').checked;
    use_basis_format = use_basis;
    if (use_basis) {
        m1_box.classList.remove('vector-container');
        m1_box.classList.remove('matrix-container');
        m2_box.classList.remove('vector-container');
        m2_box.classList.remove('matrix-container');
    }
    else {
        m1_box.classList.add('vector-container');
        m1_box.classList.add('matrix-container');
        m2_box.classList.add('vector-container');
        m2_box.classList.add('matrix-container');
    }
    m1_box.innerHTML = getInputVectorHTML('m1');
    m2_box.innerHTML = getInputVectorHTML('m2');
}
function clearInput(name) {
    document.getElementById(`vector_${name}_a1`).value = '';
    document.getElementById(`vector_${name}_b1`).value = '';
    document.getElementById(`vector_${name}_c1`).value = '';
}
function randomiseInput() {
    const M1 = getRandomVector3();
    const M2 = getRandomVector3();
    setInputFromVector3('m1', M1);
    setInputFromVector3('m2', M2);
    displayOutput();
}
function displayOutput() {
    const output = document.querySelector('#output');
    output.innerHTML = '';
    let M1 = getInputVector('m1');
    let M2 = getInputVector('m2');
    const operation = Number(document.getElementById('operation').value);
    let answer = getAnswerVector(M1, M2, operation);
    if (operation != 2) {
        output.innerHTML = answer.displayToBasisComponent();
    }
    else {
        output.innerHTML = M1.dotProduct(M2).toString();
    }
}
let use_basis_format = false;
const m1_box = document.getElementById('m1_box');
const m2_box = document.getElementById('m2_box');
export function setupCalculator() {
    document.querySelector('#randomise').addEventListener('click', () => randomiseInput());
    document.querySelector('#clear').addEventListener('click', () => {
        clearInput('m1');
    });
    const m1_number = document.getElementById('m1_frac');
    const exercise_box = document.getElementById('exercise');
    const output_box = document.getElementById('output-div');
    const operation_box = document.getElementById('operation_box');
    const generateButton = document.getElementById('generate');
    const randomiseButton = document.getElementById('randomise');
    const submitButton = document.getElementById('submit');
    const scoreElement = (document.getElementById('score-div'));
    const exercise_type_box = document.getElementById('exercise_type_box');
    const max_element_box = document.getElementById('max_element_box');
    const solution_amount_box = document.getElementById('solution_amount_box');
    m1_box.classList.remove('gone');
    m2_box.classList.remove('gone');
    operation_box.classList.remove('gone');
    m1_number.classList.add('gone');
    m1_number.style.display = 'none';
    exercise_box.innerHTML = '';
    exercise_box.classList.add('gone');
    output_box.classList.remove('gone');
    generateButton.classList.add('gone');
    submitButton.classList.add('gone');
    randomiseButton.classList.remove('gone');
    scoreElement.classList.add('gone');
    exercise_type_box.classList.add('gone');
    max_element_box.classList.add('gone');
    solution_amount_box.classList.remove('gone');
    setBasisToggle();
    setInputEventListener();
    setBasisToggleEventListener();
}
