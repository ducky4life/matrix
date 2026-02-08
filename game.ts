import { Matrix2, Matrix3, getMatrixHTML, clearInput, generateExercise2, generateExercise3, getInputMatrix2, getInputMatrix3, getRandomNumberFromArray } from "./matrix.js";

function setInputEventListener() {
    let inputElementIds: string[] = [];
    switch (curr_dimension) {
        case 2:
            inputElementIds = ['2x2_m1_a1', '2x2_m1_a2', '2x2_m1_b1', '2x2_m1_b2'];
            break;

        case 3:
            inputElementIds = ['3x3_m1_a1', '3x3_m1_a2', '3x3_m1_a3', '3x3_m1_b1', '3x3_m1_b2', '3x3_m1_b3', '3x3_m1_c1', '3x3_m1_c2', '3x3_m1_c3'];
            break;
    }

    inputElementIds.forEach((id) => {
        const element = (document.getElementById(id) as HTMLInputElement);
        element.addEventListener('input', () => {
            if (!element.value) {
                clearInputBoxColor(id);
            }
        });
    })
}

function setOperationEventListener() {
    const operationElement = (document.getElementById('type') as HTMLSelectElement);
    operationElement.addEventListener('input', () => {
        displayExercise();
    })
}

function changeDimension(matrix_dimension: number) {
    const m1_box = document.getElementById('m1_box')!;

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
            displayExercise(3);
            break;
        case 3:
            changeDimension(2);
            displayExercise(2);
            break;
    }
}

function setInputBoxColor(box_name: string, color: string) {
    const inputBox = (document.getElementById(box_name) as HTMLInputElement);
    inputBox.style.border = `1px solid ${color}`;
    inputBox.style.borderWidth = "1.5px";
}

function clearInputBoxColor(box_name: string) {
    const inputBox = (document.getElementById(box_name) as HTMLInputElement);
    inputBox.style.border = '';
}

function clearAllInputBoxColor() {
    if (curr_dimension == 2) {
        (document.getElementById(`2x2_m1_a1`) as HTMLInputElement).style.border = '';
        (document.getElementById(`2x2_m1_a2`) as HTMLInputElement).style.border = '';
        (document.getElementById(`2x2_m1_b1`) as HTMLInputElement).style.border = '';
        (document.getElementById(`2x2_m1_b2`) as HTMLInputElement).style.border = '';
    }

    else {
        (document.getElementById(`3x3_m1_a1`) as HTMLInputElement).style.border = '';
        (document.getElementById(`3x3_m1_a2`) as HTMLInputElement).style.border = '';
        (document.getElementById(`3x3_m1_a3`) as HTMLInputElement).style.border = '';
        (document.getElementById(`3x3_m1_b1`) as HTMLInputElement).style.border = '';
        (document.getElementById(`3x3_m1_b2`) as HTMLInputElement).style.border = '';
        (document.getElementById(`3x3_m1_b3`) as HTMLInputElement).style.border = '';
        (document.getElementById(`3x3_m1_c1`) as HTMLInputElement).style.border = '';
        (document.getElementById(`3x3_m1_c2`) as HTMLInputElement).style.border = '';
        (document.getElementById(`3x3_m1_c3`) as HTMLInputElement).style.border = '';
    }
}

function checkAnswer(curr_dimension: number, answer: Matrix2|Matrix3) {
    if (curr_dimension == 2) {
        checkAnswer2(answer as Matrix2);
    }
    else if (curr_dimension == 3) {
        checkAnswer3(answer as Matrix3);
    }
}

function checkAnswer2(answer: Matrix2) {
    const inputMatrix: Matrix2 = getInputMatrix2('m1');

    for (let row=1; row<=2; row++) {
        for (let column=1; column<=2; column++) {
            const inputElement: number = inputMatrix.getElement(row, column);
            const answerElement: number = answer.getElement(row, column);
            const elementId = `2x2_m1_${inputMatrix.getElementName(row, column)}`;

            if ((document.getElementById(elementId) as HTMLInputElement).value) {

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

function checkAnswer3(answer: Matrix3) {
    const inputMatrix: Matrix3 = getInputMatrix3('m1');

    for (let row=1; row<=3; row++) {
        for (let column=1; column<=3; column++) {
            const inputElement: number = inputMatrix.getElement(row, column);
            const answerElement: number = answer.getElement(row, column);
            const elementId = `3x3_m1_${inputMatrix.getElementName(row, column)}`;

            if ((document.getElementById(elementId) as HTMLInputElement).value) {

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

const matrixOperationArray: Array<number> = [4,5,6];

function getInputOperator(): number {
    let operation = Number((document.getElementById('type') as HTMLSelectElement).value);

    switch (operation) {
        case -1: // random arithmetic
            operation = getRandomNumberFromArray([0,1,2]);
            break;

        case -2: // random matrix operation
            operation = getRandomNumberFromArray(matrixOperationArray);
            break;

        case -3: // random all
            operation = getRandomNumberFromArray([0,1,2,4,5,6]);
            break;
    }

    return operation;
}

function displayExercise(matrix_dimension: number = 2, max: number = 10) {
    clearInput(curr_dimension, 'm1');
    clearAllInputBoxColor();
    const output = document.querySelector('#exercise')!;
    output.innerHTML = '';

    matrix_dimension = Number((document.querySelector('#dimension') as HTMLSelectElement).value);

    let operation = getInputOperator();

    let exercise: any = {};
    if (matrix_dimension == 2) {
        max = 10;
        exercise = generateExercise2(operation, max);
    }
    else {
        max = 9;
        exercise = generateExercise3(operation, max);
    }

    const M1 = exercise['M1'];
    const M2 = exercise['M2'];
    const answer = exercise['answer'];
    const operator = exercise['operator'];

    if (!matrixOperationArray.includes(operation)) {

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

    console.log(answer.displayToString())

    const submitButton = (document.getElementById('submit') as HTMLButtonElement)!;
    submitButton.addEventListener('click', () => checkAnswer(curr_dimension, answer));
}

(document.querySelector('#generate') as HTMLButtonElement)!.addEventListener('click', () => displayExercise());
(document.querySelector('#clear')as HTMLButtonElement)!.addEventListener('click', () => {
    clearInput(curr_dimension, 'm1');
    clearAllInputBoxColor();
});
const dimensionInput = (document.getElementById('dimension') as HTMLSelectElement);

dimensionInput.addEventListener('input', () => toggleDimension());

let curr_dimension = 2;
changeDimension(2);
displayExercise(2);
setOperationEventListener();