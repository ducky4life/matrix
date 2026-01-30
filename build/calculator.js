import { Matrix2 } from "./matrix.js";
function getInputMatrix2(name) {
    const a1 = document.getElementById(`2x2_${name}_a1`).value;
    const a2 = document.getElementById(`2x2_${name}_a2`).value;
    const b1 = document.getElementById(`2x2_${name}_b1`).value;
    const b2 = document.getElementById(`2x2_${name}_b2`).value;
    return new Matrix2(Number(a1), Number(a2), Number(b1), Number(b2));
}
function displayOutput(matrix_dimension = 2) {
    const output = document.querySelector('#output');
    output.innerHTML = '';
    const M1 = getInputMatrix2('m1');
    const M2 = getInputMatrix2('m2');
    const m1_property = Number(document.getElementById('m1_property').value);
    const m2_property = Number(document.getElementById('m2_property').value);
    let m1_property_output, m2_property_output;
    if (matrix_dimension == 2) {
        m1_property_output = M1.determinant();
        m2_property_output = M2.determinant();
    }
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
                <p>chosen properties:</p><br>
                <p style="justify-content: center; display: flex; padding-top: 0;">M1: ${m1_property_output},
                M2: ${m2_property_output}
                </p>
            </div>
            <br>`;
}
document.querySelector('#submit').addEventListener('click', () => displayOutput(2));
