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
const m1_box = document.getElementById('m1_box');
const m1_number = document.getElementById('m1_number');
function setNumberInputEventListener() {
    m1_number.addEventListener('input', () => {
        if (!m1_number.value) {
            clearInputBoxColor('m1_number');
        }
    });
}
function setOperationEventListener() {
    const operationElement = document.getElementById('type');
    operationElement.addEventListener('input', () => {
        displayExercise();
    });
}
function setNumberInput() {
    m1_box.classList.add('gone');
    m1_number.classList.remove('gone');
    setNumberInputEventListener();
}
function setMatrixInput() {
    m1_box.classList.remove('gone');
    m1_number.classList.add('gone');
}
function changeDimension(matrix_dimension) {
    setMatrixInput();
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
function incrementScore() {
    const scoreElement = (document.getElementById('score'));
    const curr_score = Number(scoreElement.innerHTML);
    const new_score = curr_score + 1;
    scoreElement.innerHTML = new_score.toString();
    const submitButton = document.getElementById('submit');
    submitButton.removeEventListener;
}
function checkMatrixAnswer(curr_dimension, answer) {
    if (curr_dimension == 2) {
        return checkMatrixAnswer2(answer);
    }
    else if (curr_dimension == 3) {
        return checkMatrixAnswer3(answer);
    }
}
function checkNumberAnswer(answer) {
    let all_correct = true;
    const inputNumber = getInputNumber('m1');
    const elementId = "m1_number";
    if (document.getElementById(elementId).value) {
        if (inputNumber == answer) {
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
function checkMatrixAnswer2(answer) {
    let all_correct = true;
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
                    all_correct = false;
                    setInputBoxColor(`2x2_m1_${inputMatrix.getElementName(row, column)}`, 'red');
                }
            }
            else {
                all_correct = false;
            }
        }
    }
    return all_correct;
}
function checkMatrixAnswer3(answer) {
    let all_correct = true;
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
                    all_correct = false;
                    setInputBoxColor(`3x3_m1_${inputMatrix.getElementName(row, column)}`, 'red');
                }
            }
            else {
                all_correct = false;
            }
        }
    }
    return all_correct;
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
        setNumberInput();
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
    else if (operation == 7) { // minor
        output.innerHTML = `
            <div style="display: flex; align-items: center;">
                <span style="margin: 0;">minor(${row}, ${column}) of </span>
                ${M1.displayToHTML()}
                <span style="margin: 0 10px;">= </span>
            </div><br>`;
    }
    else if (operation == 8) { // cofactor
        output.innerHTML = `
            <div style="display: flex; align-items: center;">
                <span style="margin: 0;">cofactor(${row}, ${column}) of </span>
                ${M1.displayToHTML()}
                <span style="margin: 0 10px;">= </span>
            </div><br>`;
    }
    // console.log(answer.displayToString())
    let finished = false;
    const submitButton = document.getElementById('submit');
    submitButton.addEventListener('click', () => {
        if (matrixOutputExercises.includes(operation)) {
            if (checkMatrixAnswer(curr_dimension, answer) && !finished) {
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
