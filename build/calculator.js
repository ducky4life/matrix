import { Matrix2, Matrix3, getRandomMatrix2, getRandomMatrix3, getAnswerMatrix, eigenvaluesToString, eigenvectorsToString } from "./matrix.js";
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
function getInputRow(name) {
    const row = Number(document.getElementById(`${name}_row`).value);
    if (!([1, 2, 3].includes(row))) {
        return 1;
    }
    return row;
}
function getInputColumn(name) {
    const column = Number(document.getElementById(`${name}_column`).value);
    if (!([1, 2, 3].includes(column))) {
        return 1;
    }
    return column;
}
function getInputPower(name) {
    const power = Number(document.getElementById(`${name}_power`).value);
    if (Number.isNaN(power)) {
        return 1;
    }
    return power;
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
            setInputMatrix2('m1', M1.a1, M1.a2, M1.b1, M1.b2);
            setInputMatrix2('m2', M2.a1, M2.a2, M2.b1, M2.b2);
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
    if (curr_dimension == 2) {
        document.getElementById(`2x2_m1_a1`).value = '';
        document.getElementById(`2x2_m1_a2`).value = '';
        document.getElementById(`2x2_m1_b1`).value = '';
        document.getElementById(`2x2_m1_b2`).value = '';
        document.getElementById(`2x2_m2_a1`).value = '';
        document.getElementById(`2x2_m2_a2`).value = '';
        document.getElementById(`2x2_m2_b1`).value = '';
        document.getElementById(`2x2_m2_b2`).value = '';
    }
    else {
        document.getElementById(`3x3_m1_a1`).value = '';
        document.getElementById(`3x3_m1_a2`).value = '';
        document.getElementById(`3x3_m1_a3`).value = '';
        document.getElementById(`3x3_m1_b1`).value = '';
        document.getElementById(`3x3_m1_b2`).value = '';
        document.getElementById(`3x3_m1_b3`).value = '';
        document.getElementById(`3x3_m1_c1`).value = '';
        document.getElementById(`3x3_m1_c2`).value = '';
        document.getElementById(`3x3_m1_c3`).value = '';
        document.getElementById(`3x3_m2_a1`).value = '';
        document.getElementById(`3x3_m2_a2`).value = '';
        document.getElementById(`3x3_m2_a3`).value = '';
        document.getElementById(`3x3_m2_b1`).value = '';
        document.getElementById(`3x3_m2_b2`).value = '';
        document.getElementById(`3x3_m2_b3`).value = '';
        document.getElementById(`3x3_m2_c1`).value = '';
        document.getElementById(`3x3_m2_c2`).value = '';
        document.getElementById(`3x3_m2_c3`).value = '';
    }
}
const eigenPropertyId = [-1, -2, -3, -4];
function getInputProperty(name) {
    let property_id = Number(document.getElementById(`${name}_property`).value);
    if (curr_dimension == 3 && eigenPropertyId.includes(property_id)) {
        property_id = 3;
    }
    return property_id;
}
function getPropertyValue(M, property_id, row, column, power) {
    if (eigenPropertyId.includes(property_id)) {
        if (M instanceof Matrix2) {
            M = M;
            switch (property_id) {
                case -1:
                    if (M.numberOfEigenvalues() > 0) {
                        return eigenvaluesToString(M.eigenvalues());
                    }
                    return "no eigenvalues";
                case -2:
                    if (M.numberOfEigenvalues() > 0) {
                        return eigenvectorsToString(M.eigenvectors());
                    }
                    return "no eigenvectors";
                case -3:
                    if (M.numberOfEigenvalues() == 2) {
                        return M.eigenbasis().displayToHTML();
                    }
                    return "no eigenbasis";
                case -4:
                    if (M.numberOfEigenvalues() == 2) {
                        const eigenbasisMatrix = M.eigenbasis();
                        if (M.changeBasis(eigenbasisMatrix).isDiagonal()) {
                            const exponentiatedMatrix = M.changeOfBasisExponentiation(eigenbasisMatrix, power);
                            return exponentiatedMatrix.displayToHTML();
                        }
                        // probably floating point error such that changed matrix isn't diagonal
                        return "cannot be calculated due to floating points";
                    }
                    return "no eigenbasis, cannot change basis";
                default:
                    return "";
            }
        }
        else {
            property_id = 3;
        }
    }
    switch (property_id) {
        case 3:
            return M.determinant();
        case 4:
            if (M.isInvertible()) {
                return `
                <div class="matrix-inverse-output">
                    <math style="font-size: 3.5vh; padding-right: 1vw; margin-top: 1vh;">
                        <mfrac>
                        <mn>1</mn>
                        <mn>${M.determinant()}</mfrac>
                    </math>
                    ${M.adjoint().displayToHTML()} = ${M.inverse().displayToHTML()}
                </div>`;
            }
            else {
                return "does not exist";
            }
        case 5:
            return M.transpose().displayToHTML();
        case 6:
            return M.adjoint().displayToHTML();
        case 7:
            return M.minor(row, column);
        case 8:
            return M.cofactor(row, column);
        default:
            return M.determinant();
    }
}
function getPropertyName(property_id) {
    switch (property_id) {
        case -1:
            return "eigenvalues";
        case -2:
            return "eigenvectors";
        case -3:
            return "eigenbasis";
        case -4:
            return "raised power";
        case 3:
            return "determinant";
        case 4:
            return "inverse";
        case 5:
            return "transpose";
        case 6:
            return "adjoint matrix";
        case 7:
            return "minor";
        case 8:
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
    const operation_box = document.getElementById('operation_box');
    m1_box.innerHTML = getMatrixHTML('m1', matrix_dimension);
    m2_box.innerHTML = getMatrixHTML('m2', matrix_dimension);
    if (matrix_dimension == 3) {
        m1_box.classList.add('matrix-container-3');
        m2_box.classList.add('matrix-container-3');
        operation_box.classList.remove('operation-2');
        operation_box.classList.add('operation-3');
    }
    else {
        m1_box.classList.remove('matrix-container-3');
        m2_box.classList.remove('matrix-container-3');
        operation_box.classList.add('operation-2');
        operation_box.classList.remove('operation-3');
    }
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
                'm1_row', 'm1_column', 'm2_row', 'm2_column',
                'm1_power', 'm2_power',
                'm1_property', 'm2_property', 'operation'
            ];
            break;
        case 3:
            inputElementIds = ['3x3_m1_a1', '3x3_m1_a2', '3x3_m1_a3', '3x3_m1_b1', '3x3_m1_b2', '3x3_m1_b3', '3x3_m1_c1', '3x3_m1_c2', '3x3_m1_c3',
                'm1_row', 'm1_column', 'm2_row', 'm2_column',
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
    let m1_property = getInputProperty('m1');
    let m2_property = getInputProperty('m2');
    let m1_row = getInputRow('m1');
    let m1_column = getInputColumn('m1');
    let m1_power = getInputPower('m1');
    let m2_row = getInputRow('m2');
    let m2_column = getInputColumn('m2');
    let m2_power = getInputPower('m2');
    let m1_property_output, m2_property_output;
    m1_property_output = getPropertyValue(M1, m1_property, m1_row, m1_column, m1_power);
    m2_property_output = getPropertyValue(M2, m2_property, m2_row, m2_column, m2_power);
    const m1_property_name = getPropertyName(m1_property);
    const m2_property_name = getPropertyName(m2_property);
    const operation = Number(document.getElementById('operation').value);
    const answer = getAnswerMatrix(M1, M2, operation);
    output.innerHTML += `<div class="matrix-output" style="margin: 0; justify-content: center; padding-bottom: 2vh;">
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
