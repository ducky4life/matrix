import { Matrix2, Matrix3 } from "./matrix.js";
export function getInputMatrix2(name) {
    const a1 = document.getElementById(`2x2_${name}_a1`).value;
    const a2 = document.getElementById(`2x2_${name}_a2`).value;
    const b1 = document.getElementById(`2x2_${name}_b1`).value;
    const b2 = document.getElementById(`2x2_${name}_b2`).value;
    return new Matrix2(Number(a1), Number(a2), Number(b1), Number(b2));
}
export function getInputMatrix3(name) {
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
export function getInputNumber(name) {
    const inputNumber = document.getElementById(`${name}_number`).value;
    return Number(inputNumber);
}
export function getMatrixHTML(name, matrix_dimension) {
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
export function clearInput(curr_dimension, name, clear_number = false) {
    if (clear_number) {
        document.getElementById(`${name}_number`).value = '';
    }
    else if (curr_dimension == 2) {
        document.getElementById(`2x2_${name}_a1`).value = '';
        document.getElementById(`2x2_${name}_a2`).value = '';
        document.getElementById(`2x2_${name}_b1`).value = '';
        document.getElementById(`2x2_${name}_b2`).value = '';
    }
    else {
        document.getElementById(`3x3_${name}_a1`).value = '';
        document.getElementById(`3x3_${name}_a2`).value = '';
        document.getElementById(`3x3_${name}_a3`).value = '';
        document.getElementById(`3x3_${name}_b1`).value = '';
        document.getElementById(`3x3_${name}_b2`).value = '';
        document.getElementById(`3x3_${name}_b3`).value = '';
        document.getElementById(`3x3_${name}_c1`).value = '';
        document.getElementById(`3x3_${name}_c2`).value = '';
        document.getElementById(`3x3_${name}_c3`).value = '';
    }
}
