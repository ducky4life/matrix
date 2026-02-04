import { Matrix2, Matrix3, getRandomMatrix2, getRandomMatrix3, getAnswerMatrix } from "./matrix.js";

function getInputMatrix2(name: string) {
    const a1 = (document.getElementById(`2x2_${name}_a1`) as HTMLInputElement).value;
    const a2 = (document.getElementById(`2x2_${name}_a2`) as HTMLInputElement).value;
    const b1 = (document.getElementById(`2x2_${name}_b1`) as HTMLInputElement).value;
    const b2 = (document.getElementById(`2x2_${name}_b2`) as HTMLInputElement).value;

    return new Matrix2(Number(a1), Number(a2), Number(b1), Number(b2));
}

function getInputMatrix3(name: string) {
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

function getInputRow(name: string): number {
    const row = Number((document.getElementById(`${name}_row`) as HTMLInputElement).value);

    if (!([1,2,3].includes(row))) {
        return 1;
    }

    return row;
}

function getInputColumn(name: string): number {
    const column = Number((document.getElementById(`${name}_column`) as HTMLInputElement).value);

    if (!([1,2,3].includes(column))) {
        return 1;
    }
    
    return column;
}

function setInputMatrix2(name: string, a1: number, a2: number, b1: number, b2: number) {
    (document.getElementById(`2x2_${name}_a1`) as HTMLInputElement).value = String(a1);
    (document.getElementById(`2x2_${name}_a2`) as HTMLInputElement).value = String(a2);
    (document.getElementById(`2x2_${name}_b1`) as HTMLInputElement).value = String(b1);
    (document.getElementById(`2x2_${name}_b2`) as HTMLInputElement).value = String(b2);
}

function setInputMatrix3(name: string, a1: number, a2: number, a3: number, b1: number, b2: number, b3: number, c1: number, c2: number, c3: number) {
    (document.getElementById(`3x3_${name}_a1`) as HTMLInputElement).value = String(a1);
    (document.getElementById(`3x3_${name}_a2`) as HTMLInputElement).value = String(a2);
    (document.getElementById(`3x3_${name}_a3`) as HTMLInputElement).value = String(a3);
    (document.getElementById(`3x3_${name}_b1`) as HTMLInputElement).value = String(b1);
    (document.getElementById(`3x3_${name}_b2`) as HTMLInputElement).value = String(b2);
    (document.getElementById(`3x3_${name}_b3`) as HTMLInputElement).value = String(b3);
    (document.getElementById(`3x3_${name}_c1`) as HTMLInputElement).value = String(c1);
    (document.getElementById(`3x3_${name}_c2`) as HTMLInputElement).value = String(c2);
    (document.getElementById(`3x3_${name}_c3`) as HTMLInputElement).value = String(c3);
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
        (document.getElementById(`2x2_m1_a1`) as HTMLInputElement).value = '';
        (document.getElementById(`2x2_m1_a2`) as HTMLInputElement).value = '';
        (document.getElementById(`2x2_m1_b1`) as HTMLInputElement).value = '';
        (document.getElementById(`2x2_m1_b2`) as HTMLInputElement).value = '';

        (document.getElementById(`2x2_m2_a1`) as HTMLInputElement).value = '';
        (document.getElementById(`2x2_m2_a2`) as HTMLInputElement).value = '';
        (document.getElementById(`2x2_m2_b1`) as HTMLInputElement).value = '';
        (document.getElementById(`2x2_m2_b2`) as HTMLInputElement).value = '';
    }

    else {
        (document.getElementById(`3x3_m1_a1`) as HTMLInputElement).value = '';
        (document.getElementById(`3x3_m1_a2`) as HTMLInputElement).value = '';
        (document.getElementById(`3x3_m1_a3`) as HTMLInputElement).value = '';
        (document.getElementById(`3x3_m1_b1`) as HTMLInputElement).value = '';
        (document.getElementById(`3x3_m1_b2`) as HTMLInputElement).value = '';
        (document.getElementById(`3x3_m1_b3`) as HTMLInputElement).value = '';
        (document.getElementById(`3x3_m1_c1`) as HTMLInputElement).value = '';
        (document.getElementById(`3x3_m1_c2`) as HTMLInputElement).value = '';
        (document.getElementById(`3x3_m1_c3`) as HTMLInputElement).value = '';

        (document.getElementById(`3x3_m2_a1`) as HTMLInputElement).value = '';
        (document.getElementById(`3x3_m2_a2`) as HTMLInputElement).value = '';
        (document.getElementById(`3x3_m2_a3`) as HTMLInputElement).value = '';
        (document.getElementById(`3x3_m2_b1`) as HTMLInputElement).value = '';
        (document.getElementById(`3x3_m2_b2`) as HTMLInputElement).value = '';
        (document.getElementById(`3x3_m2_b3`) as HTMLInputElement).value = '';
        (document.getElementById(`3x3_m2_c1`) as HTMLInputElement).value = '';
        (document.getElementById(`3x3_m2_c2`) as HTMLInputElement).value = '';
        (document.getElementById(`3x3_m2_c3`) as HTMLInputElement).value = '';
    }
}

function getPropertyValue(M: Matrix2 | Matrix3, property_id: number, row: number, column: number): string | number {
    if ([-1, -2, -3].includes(property_id)) {
        if (M instanceof Matrix2) {
            M = M as Matrix2;
            switch (property_id) {
                case -1:
                    return M.eigenvalues().toString();
                case -2:
                    return M.eigenvectors().toString();
                case -3:
                    if (M.eigenvalueNumber() == 2) {
                        return M.eigenbasis().displayToHTML();
                    }
                    return "no eigenbasis";
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

function getPropertyName(property_id: number) {
    switch (property_id) {
        case -1:
            return "eigenvalues";

        case -2:
            return "eigenvectors";

        case -3:
            return "eigenbasis";

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

function getMatrixHTML(name: string, matrix_dimension: number) {
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

function changeDimension(matrix_dimension: number) {
    const m1_box = document.getElementById('m1_box')!;
    const m2_box = document.getElementById('m2_box')!;
    const operation_box = (document.getElementById('operation_box') as HTMLSelectElement);

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
    let inputElementIds: string[] = [];
    switch (curr_dimension) {
        case 2:
            inputElementIds = ['2x2_m1_a1', '2x2_m1_a2', '2x2_m1_b1', '2x2_m1_b2', '2x2_m2_a1', '2x2_m2_a2', '2x2_m2_b1', '2x2_m2_b2',
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
        const element = (document.getElementById(id) as HTMLInputElement);
        element.addEventListener('input', () => displayOutput());
    })
}

function displayOutput(matrix_dimension: number = 2) {

    matrix_dimension = curr_dimension;

    const output = document.querySelector('#output')!;
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

    let m1_property = Number((document.getElementById('m1_property') as HTMLSelectElement).value);
    let m2_property = Number((document.getElementById('m2_property') as HTMLSelectElement).value);
    let m1_row = getInputRow('m1');
    let m1_column = getInputColumn('m1');
    let m2_row = getInputRow('m2');
    let m2_column = getInputColumn('m2');
    let m1_property_output, m2_property_output;
    
    m1_property_output = getPropertyValue(M1 as any, m1_property, m1_row, m1_column);
    m2_property_output = getPropertyValue(M2 as any, m2_property, m2_row, m2_column);

    

    const m1_property_name: string = getPropertyName(m1_property);
    const m2_property_name: string = getPropertyName(m2_property);

    const operation = Number((document.getElementById('operation') as HTMLSelectElement).value);
    const answer = getAnswerMatrix(M1!, M2!, operation);

    output.innerHTML += `<div class="matrix-output" style="margin: 0; justify-content: center; padding-bottom: 2vh;">
            <div style="display: flex; align-items: center;">
                <div class="matrix-answer">${answer.displayToHTML()}</div>
            </div><br>`

    output.innerHTML += `
            <div style="justify-content: center;">
                <p style="justify-content: center; display: flex; padding-top: 0;">
                    ${m1_property_name} of M1: ${m1_property_output}
                </p>
                <p style="justify-content: center; display: flex; padding-top: 0;">
                    ${m2_property_name} of M2: ${m2_property_output}
                </p>
            </div>
            <br>`
}

(document.querySelector('#randomise')as HTMLButtonElement)!.addEventListener('click', () => randomiseInput());
(document.querySelector('#clear')as HTMLButtonElement)!.addEventListener('click', () => clearInput());
// (document.querySelector('#submit')as HTMLButtonElement)!.addEventListener('click', () => displayOutput(2));

// let inputElementIds = ['2x2_m1_a1', '2x2_m1_a2', '2x2_m1_b1', '2x2_m1_b2', '2x2_m2_a1', '2x2_m2_a2', '2x2_m2_b1', '2x2_m2_b2',
//     '3x3_m1_a1', '3x3_m1_a2', '3x3_m1_a3', '3x3_m1_b1', '3x3_m1_b2', '3x3_m1_b3', '3x3_m1_c1', '3x3_m1_c2', '3x3_m1_c3',
//     'm1_property', 'm2_property', 'operation'
// ];

// inputElementIds.forEach((id) => {
//     const element = (document.getElementById(id) as HTMLInputElement);
//     element.addEventListener('input', () => displayOutput(2));
// })

const dimensionInput = (document.getElementById('dimension') as HTMLSelectElement);

dimensionInput.addEventListener('input', () => toggleDimension());

let curr_dimension = 2;
changeDimension(2);