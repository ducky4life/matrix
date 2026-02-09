import { getMatrixHTML, clearInput, generateMatrixExercise, getInputMatrix2, getInputMatrix3, getRandomNumberFromArray, getInputNumber, generateNumberExercise } from "./matrix.js";
function setInputEventListener() {
    let inputElementIds = [];
    switch (curr_dimension) {
        case 2:
            inputElementIds = ['2x2_m1_a1', '2x2_m1_a2', '2x2_m1_b1', '2x2_m1_b2'];
            break;
        case 3:
            inputElementIds = ['3x3_m1_a1', '3x3_m1_a2', '3x3_m1_a3', '3x3_m1_b1', '3x3_m1_b2', '3x3_m1_b3', '3x3_m1_c1', '3x3_m1_c2', '3x3_m1_c3'];
            break;
    }
    inputElementIds.forEach((id) => {
        const element = document.getElementById(id);
        element.addEventListener('input', () => {
            if (!element.value) {
                clearInputBoxColor(id);
            }
        });
    });
}
function setOperationEventListener() {
    const operationElement = document.getElementById('type');
    operationElement.addEventListener('input', () => {
        displayExercise();
    });
}
const m1_box = document.getElementById('m1_box');
const m1_number = document.getElementById('m1_number');
function toggleNumberInput() {
    m1_box.classList.toggle('gone');
    m1_number.classList.toggle('gone');
}
function changeDimension(matrix_dimension) {
    toggleNumberInput();
    m1_box.innerHTML = getMatrixHTML('m1', matrix_dimension);
    if (matrix_dimension == 3) {
        m1_box.classList.add('matrix-container-3');
    }
    else {
        m1_box.classList.remove('matrix-container-3');
    }
    curr_dimension = matrix_dimension;
    setInputEventListener();
}
function toggleDimension() {
    switch (curr_dimension) {
        case 2:
            changeDimension(3);
            displayExercise();
            break;
        case 3:
            changeDimension(2);
            displayExercise();
            break;
    }
}
function setInputBoxColor(box_name, color) {
    const inputBox = document.getElementById(box_name);
    inputBox.style.border = `1px solid ${color}`;
    inputBox.style.borderWidth = "1.5px";
}
function clearInputBoxColor(box_name) {
    const inputBox = document.getElementById(box_name);
    inputBox.style.border = '';
}
function clearAllInputBoxColor() {
    if (number_input) {
        document.getElementById(`m1_number`).style.border = '';
    }
    else if (curr_dimension == 2) {
        document.getElementById(`2x2_m1_a1`).style.border = '';
        document.getElementById(`2x2_m1_a2`).style.border = '';
        document.getElementById(`2x2_m1_b1`).style.border = '';
        document.getElementById(`2x2_m1_b2`).style.border = '';
    }
    else {
        document.getElementById(`3x3_m1_a1`).style.border = '';
        document.getElementById(`3x3_m1_a2`).style.border = '';
        document.getElementById(`3x3_m1_a3`).style.border = '';
        document.getElementById(`3x3_m1_b1`).style.border = '';
        document.getElementById(`3x3_m1_b2`).style.border = '';
        document.getElementById(`3x3_m1_b3`).style.border = '';
        document.getElementById(`3x3_m1_c1`).style.border = '';
        document.getElementById(`3x3_m1_c2`).style.border = '';
        document.getElementById(`3x3_m1_c3`).style.border = '';
    }
}
function checkMatrixAnswer(curr_dimension, answer) {
    if (curr_dimension == 2) {
        checkMatrixAnswer2(answer);
    }
    else if (curr_dimension == 3) {
        checkMatrixAnswer3(answer);
    }
}
function checkNumberAnswer(answer) {
    const inputNumber = getInputNumber('m1');
    const elementId = "m1_number";
    if (document.getElementById(elementId).value) {
        if (inputNumber == answer) {
            setInputBoxColor(elementId, 'limegreen');
        }
        else {
            setInputBoxColor(elementId, 'red');
        }
    }
}
function checkMatrixAnswer2(answer) {
    const inputMatrix = getInputMatrix2('m1');
    for (let row = 1; row <= 2; row++) {
        for (let column = 1; column <= 2; column++) {
            const inputElement = inputMatrix.getElement(row, column);
            const answerElement = answer.getElement(row, column);
            const elementId = `2x2_m1_${inputMatrix.getElementName(row, column)}`;
            if (document.getElementById(elementId).value) {
                if (inputElement == answerElement) {
                    setInputBoxColor(`2x2_m1_${inputMatrix.getElementName(row, column)}`, 'limegreen');
                }
                else {
                    setInputBoxColor(`2x2_m1_${inputMatrix.getElementName(row, column)}`, 'red');
                }
            }
        }
    }
}
function checkMatrixAnswer3(answer) {
    const inputMatrix = getInputMatrix3('m1');
    for (let row = 1; row <= 3; row++) {
        for (let column = 1; column <= 3; column++) {
            const inputElement = inputMatrix.getElement(row, column);
            const answerElement = answer.getElement(row, column);
            const elementId = `3x3_m1_${inputMatrix.getElementName(row, column)}`;
            if (document.getElementById(elementId).value) {
                if (inputElement == answerElement) {
                    setInputBoxColor(`3x3_m1_${inputMatrix.getElementName(row, column)}`, 'limegreen');
                }
                else {
                    setInputBoxColor(`3x3_m1_${inputMatrix.getElementName(row, column)}`, 'red');
                }
            }
        }
    }
}
const matrixOperationArray = [3, 4, 5, 6, 7, 8];
function getInputOperator() {
    let operation = Number(document.getElementById('type').value);
    switch (operation) {
        case -1: // random arithmetic
            operation = getRandomNumberFromArray([0, 1, 2]);
            break;
        case -2: // random matrix operation
            operation = getRandomNumberFromArray(matrixOperationArray);
            break;
        case -3: // random all
            operation = getRandomNumberFromArray([0, 1, 2, 3, 4, 5, 6, 7, 8]);
            break;
    }
    return operation;
}
const matrixOutputExercises = [0, 1, 2, 4, 5, 6];
const numberOutputExercises = [3, 7, 8];
function displayExercise() {
    clearInput(curr_dimension, 'm1', number_input);
    clearAllInputBoxColor();
    const output = document.querySelector('#exercise');
    output.innerHTML = '';
    // let matrix_dimension = Number((document.querySelector('#dimension') as HTMLSelectElement).value);
    let max_element = Number(document.querySelector('#max_element').value);
    let operation = getInputOperator();
    if (max_element == 0) {
        if (curr_dimension == 2) {
            max_element = 10;
        }
        else {
            max_element = 9;
        }
    }
    let exercise = {};
    if (matrixOutputExercises.includes(operation)) {
        number_input = false;
        exercise = generateMatrixExercise(curr_dimension, operation, max_element);
        changeDimension(curr_dimension);
    }
    else {
        number_input = true;
        exercise = generateNumberExercise(curr_dimension, operation, max_element);
        toggleNumberInput();
    }
    const M1 = exercise['M1'];
    const M2 = exercise['M2'];
    const answer = exercise['answer'];
    const row = exercise['row'];
    const column = exercise['column'];
    const operator = exercise['operator'];
    if ([0, 1, 2].includes(operation)) { // basic arithmetic
        output.innerHTML = `
            <div style="display: flex; align-items: center;">
                ${M1.displayToHTML()}
                <span style="margin: 0 10px;">${operator}</span>
                ${M2.displayToHTML()}
                <span style="margin: 0 10px;">= </span>
            </div><br>`;
    }
    else if (operation == 4) { // inverse
        output.innerHTML = `
            <div style="display: flex; align-items: center;">
                ${M1.displayToHTML()}<div style="place-self: normal;">-1</div>
                <span style="margin: 0 10px;">= </span>
            </div><br>`;
    }
    else if (operation == 5) { // transpose
        output.innerHTML = `
            <div style="display: flex; align-items: center;">
                ${M1.displayToHTML()}<div style="place-self: normal;">T</div>
                <span style="margin: 0 10px;">= </span>
            </div><br>`;
    }
    else if (operation == 6) { // adjoint
        output.innerHTML = `
            <div style="display: flex; align-items: center;">
                <span style="margin: 0;">adj</span>
                ${M1.displayToHTML()}
                <span style="margin: 0 10px;">= </span>
            </div><br>`;
    }
    else if (operation == 3) { // determinant
        output.innerHTML = `
            <div style="display: flex; align-items: center;">
                <span style="margin: 0;">det</span>
                ${M1.displayToHTML()}
                <span style="margin: 0 10px;">= </span>
            </div><br>`;
    }
    // console.log(answer.displayToString())
    const submitButton = document.getElementById('submit');
    submitButton.addEventListener('click', () => {
        if (matrixOutputExercises.includes(operation)) {
            checkMatrixAnswer(curr_dimension, answer);
        }
        else {
            checkNumberAnswer(answer);
        }
    });
}
document.querySelector('#generate').addEventListener('click', () => displayExercise());
document.querySelector('#clear').addEventListener('click', () => {
    clearInput(curr_dimension, 'm1', number_input);
    clearAllInputBoxColor();
});
const dimensionInput = document.getElementById('dimension');
dimensionInput.addEventListener('input', () => toggleDimension());
let curr_dimension = 2;
let number_input = false;
changeDimension(2);
displayExercise();
setOperationEventListener();
