import { Matrix2, Matrix3 } from "./matrix.js";

export function getInputMatrix2(name: string) {
    const a1 = (document.getElementById(`2x2_${name}_a1`) as HTMLInputElement).value;
    const a2 = (document.getElementById(`2x2_${name}_a2`) as HTMLInputElement).value;
    const b1 = (document.getElementById(`2x2_${name}_b1`) as HTMLInputElement).value;
    const b2 = (document.getElementById(`2x2_${name}_b2`) as HTMLInputElement).value;

    return new Matrix2(Number(a1), Number(a2), Number(b1), Number(b2));
}

export function getInputMatrix3(name: string) {
    const a1 = (document.getElementById(`3x3_${name}_a1`) as HTMLInputElement).value;
    const a2 = (document.getElementById(`3x3_${name}_a2`) as HTMLInputElement).value;
    const a3 = (document.getElementById(`3x3_${name}_a3`) as HTMLInputElement).value;
    const b1 = (document.getElementById(`3x3_${name}_b1`) as HTMLInputElement).value;
    const b2 = (document.getElementById(`3x3_${name}_b2`) as HTMLInputElement).value;
    const b3 = (document.getElementById(`3x3_${name}_b3`) as HTMLInputElement).value;
    const c1 = (document.getElementById(`3x3_${name}_c1`) as HTMLInputElement).value;
    const c2 = (document.getElementById(`3x3_${name}_c2`) as HTMLInputElement).value;
    const c3 = (document.getElementById(`3x3_${name}_c3`) as HTMLInputElement).value;

    return new Matrix3(Number(a1), Number(a2), Number(a3), Number(b1), Number(b2), Number(b3), Number(c1), Number(c2), Number(c3));
}

export function getInputNumber(name: string) {
    const inputNumber = (document.getElementById(`${name}_number`) as HTMLInputElement).value;
    return Number(inputNumber);
}

export function getMatrixHTML(name: string, matrix_dimension: number) {
    let matrixHTML: string;

    switch (matrix_dimension) {
        case 2:
            matrixHTML = `<div class="matrix-2">
                <div><input id="2x2_${name}_a1"></input></div> <div><input id="2x2_${name}_a2"></input></div>
                <div><input id="2x2_${name}_b1"></input></div> <div><input id="2x2_${name}_b2"></input></div>
            </div>`
            break;
        
        case 3:
            matrixHTML = `<div class="matrix-3">
                <div><input id="3x3_${name}_a1"></input></div><div><input id="3x3_${name}_a2"></input></div><div><input id="3x3_${name}_a3"></input></div>
                <div><input id="3x3_${name}_b1"></input></div><div><input id="3x3_${name}_b2"></input></div><div><input id="3x3_${name}_b3"></input></div>
                <div><input id="3x3_${name}_c1"></input></div><div><input id="3x3_${name}_c2"></input></div><div><input id="3x3_${name}_c3"></input></div>
            </div>`
            break;

        default:
            matrixHTML = "";
            break;
    }

    return matrixHTML;
}

export function clearInput(curr_dimension: number, name: string, clear_number: boolean = false) {

    if (clear_number) {
        (document.getElementById(`${name}_number`) as HTMLInputElement).value = '';
    }

    else if (curr_dimension == 2) {
        (document.getElementById(`2x2_${name}_a1`) as HTMLInputElement).value = '';
        (document.getElementById(`2x2_${name}_a2`) as HTMLInputElement).value = '';
        (document.getElementById(`2x2_${name}_b1`) as HTMLInputElement).value = '';
        (document.getElementById(`2x2_${name}_b2`) as HTMLInputElement).value = '';
    }

    else {
        (document.getElementById(`3x3_${name}_a1`) as HTMLInputElement).value = '';
        (document.getElementById(`3x3_${name}_a2`) as HTMLInputElement).value = '';
        (document.getElementById(`3x3_${name}_a3`) as HTMLInputElement).value = '';
        (document.getElementById(`3x3_${name}_b1`) as HTMLInputElement).value = '';
        (document.getElementById(`3x3_${name}_b2`) as HTMLInputElement).value = '';
        (document.getElementById(`3x3_${name}_b3`) as HTMLInputElement).value = '';
        (document.getElementById(`3x3_${name}_c1`) as HTMLInputElement).value = '';
        (document.getElementById(`3x3_${name}_c2`) as HTMLInputElement).value = '';
        (document.getElementById(`3x3_${name}_c3`) as HTMLInputElement).value = '';
    }
}