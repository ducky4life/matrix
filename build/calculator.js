import { Matrix2, Matrix3, getRandomMatrix2, getRandomMatrix3 } from "./matrix.js";
function getInputMatrix2(name) {
    const a1 = document.getElementById(`2x2_${name}_a1`).value;
    const a2 = document.getElementById(`2x2_${name}_a2`).value;
    const b1 = document.getElementById(`2x2_${name}_b1`).value;
    const b2 = document.getElementById(`2x2_${name}_b2`).value;
    return new Matrix2(Number(a1), Number(a2), Number(b1), Number(b2));
}
function getInputMatrix3(name) {
    const a1 = document.getElementById(`3x3_${name}_a1`).value;
    const a2 = document.getElementById(`3x3_${name}_a2`).value;
    const a3 = document.getElementById(`3x3_${name}_a3`).value;
    const b1 = document.getElementById(`3x3_${name}_b1`).value;
    const b2 = document.getElementById(`3x3_${name}_b2`).value;
    const b3 = document.getElementById(`3x3_${name}_b3`).value;
    const c1 = document.getElementById(`3x3_${name}_c1`).value;
    const c2 = document.getElementById(`3x3_${name}_c2`).value;
    const c3 = document.getElementById(`3x3_${name}_c3`).value;
    return new Matrix3(Number(a1), Number(a2), Number(a3), Number(b1), Number(b2), Number(b3), Number(c1), Number(c2), Number(c3));
}
function setInputMatrix2(name, a1, a2, b1, b2) {
    document.getElementById(`2x2_${name}_a1`).value = String(a1);
    document.getElementById(`2x2_${name}_a2`).value = String(a2);
    document.getElementById(`2x2_${name}_b1`).value = String(b1);
    document.getElementById(`2x2_${name}_b2`).value = String(b2);
}
function setInputMatrix3(name, a1, a2, a3, b1, b2, b3, c1, c2, c3) {
    document.getElementById(`3x3_${name}_a1`).value = String(a1);
    document.getElementById(`3x3_${name}_a2`).value = String(a2);
    document.getElementById(`3x3_${name}_a3`).value = String(a3);
    document.getElementById(`3x3_${name}_b1`).value = String(b1);
    document.getElementById(`3x3_${name}_b2`).value = String(b2);
    document.getElementById(`3x3_${name}_b3`).value = String(b3);
    document.getElementById(`3x3_${name}_c1`).value = String(c1);
    document.getElementById(`3x3_${name}_c2`).value = String(c2);
    document.getElementById(`3x3_${name}_c3`).value = String(c3);
}
function randomiseInput() {
    let M1, M2;
    switch (curr_dimension) {
        case 2:
            M1 = getRandomMatrix2(10);
            M2 = getRandomMatrix2(10);
            setInputMatrix2('m1', M1.a, M1.b, M1.c, M1.d);
            setInputMatrix2('m2', M2.a, M2.b, M2.c, M2.d);
            break;
        case 3:
            M1 = getRandomMatrix3(10);
            M2 = getRandomMatrix3(10);
            setInputMatrix3('m1', M1.a1, M1.a2, M1.a3, M1.b1, M1.b2, M1.b3, M1.c1, M1.c2, M1.c3);
            setInputMatrix3('m2', M2.a1, M2.a2, M2.a3, M2.b1, M2.b2, M2.b3, M2.c1, M2.c2, M2.c3);
            break;
    }
    displayOutput();
}
function clearInput() {
    document.getElementById(`2x2_m1_a1`).value = '';
    document.getElementById(`2x2_m1_a2`).value = '';
    document.getElementById(`2x2_m1_b1`).value = '';
    document.getElementById(`2x2_m1_b2`).value = '';
    document.getElementById(`2x2_m2_a1`).value = '';
    document.getElementById(`2x2_m2_a2`).value = '';
    document.getElementById(`2x2_m2_b1`).value = '';
    document.getElementById(`2x2_m2_b2`).value = '';
}
function getPropertyValue3(M, property_id, row, column) {
    switch (property_id) {
        case 3:
            return M.determinant();
        case 4:
            return M.minor(row, column);
        case 5:
            return M.cofactor(row, column);
    }
}
function getPropertyName(property_id) {
    switch (property_id) {
        case 3:
            return "determinant";
        case 4:
            return "minor";
        case 5:
            return "cofactor";
        default:
            return "determinant";
    }
}
function getMatrixHTML(name, matrix_dimension) {
    let matrixHTML;
    switch (matrix_dimension) {
        case 2:
            matrixHTML = `<div class="matrix-2">
                <div><input id="2x2_${name}_a1"></input></div> <div><input id="2x2_${name}_a2"></input></div>
                <div><input id="2x2_${name}_b1"></input></div> <div><input id="2x2_${name}_b2"></input></div>
            </div>`;
            break;
        case 3:
            matrixHTML = `<div class="matrix-3">
                <div><input id="3x3_${name}_a1"></input></div><div><input id="3x3_${name}_a2"></input></div><div><input id="3x3_${name}_a3"></input></div>
                <div><input id="3x3_${name}_b1"></input></div><div><input id="3x3_${name}_b2"></input></div><div><input id="3x3_${name}_b3"></input></div>
                <div><input id="3x3_${name}_c1"></input></div><div><input id="3x3_${name}_c2"></input></div><div><input id="3x3_${name}_c3"></input></div>
            </div>`;
            break;
        default:
            matrixHTML = "";
            break;
    }
    return matrixHTML;
}
function changeDimension(matrix_dimension) {
    const m1_box = document.getElementById('m1_box');
    const m2_box = document.getElementById('m2_box');
    m1_box.innerHTML = getMatrixHTML('m1', matrix_dimension);
    m2_box.innerHTML = getMatrixHTML('m2', matrix_dimension);
    curr_dimension = matrix_dimension;
    setInputEventListener();
}
function toggleDimension() {
    switch (curr_dimension) {
        case 2:
            changeDimension(3);
            break;
        case 3:
            changeDimension(2);
            break;
    }
}
function setInputEventListener() {
    let inputElementIds = [];
    switch (curr_dimension) {
        case 2:
            inputElementIds = ['2x2_m1_a1', '2x2_m1_a2', '2x2_m1_b1', '2x2_m1_b2', '2x2_m2_a1', '2x2_m2_a2', '2x2_m2_b1', '2x2_m2_b2',
                'm1_property', 'm2_property', 'operation'
            ];
            break;
        case 3:
            inputElementIds = ['3x3_m1_a1', '3x3_m1_a2', '3x3_m1_a3', '3x3_m1_b1', '3x3_m1_b2', '3x3_m1_b3', '3x3_m1_c1', '3x3_m1_c2', '3x3_m1_c3',
                'm1_property', 'm2_property', 'operation'
            ];
            break;
    }
    inputElementIds.forEach((id) => {
        const element = document.getElementById(id);
        element.addEventListener('input', () => displayOutput());
    });
}
function displayOutput(matrix_dimension = 2) {
    matrix_dimension = curr_dimension;
    const output = document.querySelector('#output');
    output.innerHTML = '';
    let M1, M2;
    switch (matrix_dimension) {
        case 2:
            M1 = getInputMatrix2('m1');
            M2 = getInputMatrix2('m2');
            break;
        case 3:
            M1 = getInputMatrix3('m1');
            M2 = getInputMatrix3('m2');
            break;
    }
    let m1_property = Number(document.getElementById('m1_property').value);
    let m2_property = Number(document.getElementById('m2_property').value);
    let m1_property_output, m2_property_output;
    if (matrix_dimension == 2) {
        m1_property = 3;
        m2_property = 3;
        m1_property_output = M1.determinant();
        m2_property_output = M2.determinant();
    }
    else {
        m1_property_output = getPropertyValue3(M1, m1_property, "a", "1");
        m2_property_output = getPropertyValue3(M2, m2_property, "a", "1");
    }
    const m1_property_name = getPropertyName(m1_property);
    const m2_property_name = getPropertyName(m2_property);
    const operation = Number(document.getElementById('operation').value);
    let answer;
    switch (operation) {
        case 0: // addition
            answer = M1.add(M2);
            break;
        case 1: // subtraction
            answer = M1.minus(M2);
            break;
        case 2: // multiplication
            answer = M1.multiply(M2);
            break;
        default:
            answer = M1.multiply(M2);
            break;
    }
    output.innerHTML += `<div class="matrix-output" style="margin: 0; justify-content: center;">
            <div style="display: flex; align-items: center;">
                <div class="matrix-answer">${answer.displayToHTML()}</div>
            </div><br>`;
    output.innerHTML += `
            <div style="justify-content: center;">
                <p style="justify-content: center; display: flex; padding-top: 0;">
                    ${m1_property_name} of M1: ${m1_property_output}
                </p>
                <p style="justify-content: center; display: flex; padding-top: 0;">
                    ${m2_property_name} of M2: ${m2_property_output}
                </p>
            </div>
            <br>`;
}
document.querySelector('#randomise').addEventListener('click', () => randomiseInput());
document.querySelector('#clear').addEventListener('click', () => clearInput());
// (document.querySelector('#submit')as HTMLButtonElement)!.addEventListener('click', () => displayOutput(2));
// let inputElementIds = ['2x2_m1_a1', '2x2_m1_a2', '2x2_m1_b1', '2x2_m1_b2', '2x2_m2_a1', '2x2_m2_a2', '2x2_m2_b1', '2x2_m2_b2',
//     '3x3_m1_a1', '3x3_m1_a2', '3x3_m1_a3', '3x3_m1_b1', '3x3_m1_b2', '3x3_m1_b3', '3x3_m1_c1', '3x3_m1_c2', '3x3_m1_c3',
//     'm1_property', 'm2_property', 'operation'
// ];
// inputElementIds.forEach((id) => {
//     const element = (document.getElementById(id) as HTMLInputElement);
//     element.addEventListener('input', () => displayOutput(2));
// })
const dimensionInput = document.getElementById('dimension');
dimensionInput.addEventListener('input', () => toggleDimension());
let curr_dimension = 2;
changeDimension(2);
