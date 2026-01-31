import { Matrix2, Matrix3, getRandomMatrix2 } from "./matrix.js";
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
    const M1 = getRandomMatrix2(10);
    const M2 = getRandomMatrix2(10);
    setInputMatrix2('m1', M1.a, M1.b, M1.c, M1.d);
    setInputMatrix2('m2', M2.a, M2.b, M2.c, M2.d);
    displayOutput(2);
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
function displayOutput(matrix_dimension = 2) {
    const output = document.querySelector('#output');
    output.innerHTML = '';
    const M1 = getInputMatrix2('m1');
    const M2 = getInputMatrix2('m2');
    let m1_property = Number(document.getElementById('m1_property').value);
    let m2_property = Number(document.getElementById('m2_property').value);
    let m1_property_output, m2_property_output;
    if (matrix_dimension == 2) {
        m1_property = 3;
        m2_property = 3;
        m1_property_output = M1.determinant();
        m2_property_output = M2.determinant();
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
const inputElementIds = ['2x2_m1_a1', '2x2_m1_a2', '2x2_m1_b1', '2x2_m1_b2', '2x2_m2_a1', '2x2_m2_a2', '2x2_m2_b1', '2x2_m2_b2',
    '3x3_m1_a1', '3x3_m1_a2', '3x3_m1_a3', '3x3_m1_b1', '3x3_m1_b2', '3x3_m1_b3', '3x3_m1_c1', '3x3_m1_c2', '3x3_m1_c3',
    'm1_property', 'm2_property', 'operation'
];
inputElementIds.forEach((id) => {
    const element = document.getElementById(id);
    element.addEventListener('input', () => displayOutput(2));
});
