import { roundNumber } from "./matrix.js";
import { Vector3, getAnswerVector, getRandomVector3 } from "./vector.js";

function getInputVector(name: string): Vector3 {
    const a1 = Number((document.getElementById(`vector_${name}_a1`) as HTMLInputElement).value);
    const b1 = Number((document.getElementById(`vector_${name}_b1`) as HTMLInputElement).value);
    const c1 = Number((document.getElementById(`vector_${name}_c1`) as HTMLInputElement).value);

    return new Vector3(
        (!isNaN(a1)) ? a1 : 0,
        (!isNaN(b1)) ? b1 : 0,
        (!isNaN(c1)) ? c1 : 0,
    );
}

function setInputVector(name: string, a1: number, b1: number, c1: number) {
    (document.getElementById(`vector_${name}_a1`) as HTMLInputElement).value = String(a1);
    (document.getElementById(`vector_${name}_b1`) as HTMLInputElement).value = String(b1);
    (document.getElementById(`vector_${name}_c1`) as HTMLInputElement).value = String(c1);
}

function setInputFromVector3(name: string, V: Vector3) {
    setInputVector(name, V.a1, V.b1, V.c1);
}

function getInputVectorHTML(name: string) {

    if (use_basis_format) {
        return `<div class="vector-basis">
                <div><input id="vector_${name}_a1"></input> i + </div>
                <div style="padding-left: 0.3vw;"><input id="vector_${name}_b1"></input> j + </div>
                <div style="padding-left: 0.3vw;"><input id="vector_${name}_c1"></input> k</div>
            </div>`;
    }

    return `<div class="vector">
            <div><input id="vector_${name}_a1"></input></div>
            <div><input id="vector_${name}_b1"></input></div>
            <div><input id="vector_${name}_c1"></input></div>
        </div>`;
}

function getInputProperty(name: string): number {
    let property_id = Number((document.getElementById(`${name}_property`) as HTMLSelectElement).value);
    return property_id;
}

function getPropertyValue(V: Vector3, property_id: number, V2: Vector3): string | number {

    switch (property_id) {
        case 4:
            return roundNumber(V.magnitude());

        case 5:
            return V.getUnitVector().roundElements().displayToFormat(!use_basis_format);

        case 6:
            return roundNumber(V.includedAngleInDegrees(V2), 5);

        case 7:
            return V.projectOnto(V2).roundElements().displayToFormat(!use_basis_format);

        case 8:
            return roundNumber(V.projectionMagnitude(V2));

        default:
            return V.magnitude();
    }
}

function getPropertyName(property_id: number) {
    switch (property_id) {
        case 4:
            return "magnitude";

        case 5:
            return "unit vector";
        
        case 6:
            return "included angle";
        
        case 7:
            return "projection vector";
        
        case 8:
            return "projection magnitude";
            
        default:
            return "magnitude";
    }
}

function setInputEventListener() {
    let inputElementIds: string[] = [];

    inputElementIds = [
        'vector_m1_a1', 'vector_m2_a1', 
        'vector_m1_b1', 'vector_m2_b1',
        'vector_m1_c1', 'vector_m2_c1',
        'm1_property', 'm2_property',
        'operation', 'use_basis_format',
        'use_as_plane',
    ];

    inputElementIds.forEach((id) => {
        const element = (document.getElementById(id) as HTMLInputElement);
        element.addEventListener('input', () => displayOutput());
    })
}

function setBasisToggleEventListener() {
    const operationElement = (document.getElementById('use_basis_format') as HTMLSelectElement);
    operationElement.addEventListener('input', () => {
        setBasisToggle();
        randomiseInput();
    })
}

function setPlaneToggleEventListener() {
    const operationElement = (document.getElementById('use_as_plane') as HTMLSelectElement);
    operationElement.addEventListener('input', () => {
        setBasisToggle();
        randomiseInput();
    })
}

function setBasisToggle() {
    const use_basis = (document.getElementById('use_basis_format') as HTMLInputElement).checked;
    use_basis_format = use_basis;
    const matrix_input_box = (document.getElementById('matrix-input-box') as HTMLSelectElement);

    if (use_basis) {
        m1_box.classList.remove('vector-container');
        m1_box.classList.remove('matrix-container');
        m2_box.classList.remove('vector-container');
        m2_box.classList.remove('matrix-container');
        matrix_input_box.style.alignItems = 'baseline';
    }
    else {
        m1_box.classList.add('vector-container');
        m1_box.classList.add('matrix-container');
        m2_box.classList.add('vector-container');
        m2_box.classList.add('matrix-container');
        matrix_input_box.style.alignItems = 'stretch';
    }

    m1_box.innerHTML = getInputVectorHTML('m1');
    m2_box.innerHTML = getInputVectorHTML('m2');

    setInputEventListener();
}

function clearInput(name: string) {

    (document.getElementById(`vector_${name}_a1`) as HTMLInputElement).value = '';
    (document.getElementById(`vector_${name}_b1`) as HTMLInputElement).value = '';
    (document.getElementById(`vector_${name}_c1`) as HTMLInputElement).value = '';
}

function randomiseInput() {
    const M1 = getRandomVector3();
    const M2 = getRandomVector3();
    setInputFromVector3('m1', M1);
    setInputFromVector3('m2', M2);

    displayOutput();
}

function displayOutput() {
    const output = document.querySelector('#output')!;
    output.innerHTML = '';

    let M1 = getInputVector('m1');
    let M2 = getInputVector('m2');
    const operation = Number((document.getElementById('operation') as HTMLSelectElement).value);

    const m1_property = getInputProperty('m1');
    const m2_property = getInputProperty('m2');
    
    const m1_property_output = getPropertyValue(M1, m1_property, M2);
    const m2_property_output = getPropertyValue(M2, m2_property, M1);

    const m1_property_name: string = getPropertyName(m1_property);
    const m2_property_name: string = getPropertyName(m2_property);

    let answer = getAnswerVector(M1, M2, operation);

    if (operation != 2) {
        if (use_basis_format) {
            output.innerHTML = answer.displayToBasisComponent();
        }
        else {
            output.innerHTML = answer.displayToHTML();
        }
    }
    else {
        output.innerHTML = M1.dotProduct(M2).toString();
    }

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

let use_basis_format: boolean = false;
const m1_box = document.getElementById('m1_box')!;
const m2_box = document.getElementById('m2_box')!;

export function setupCalculator() {
    
    (document.querySelector('#randomise')as HTMLButtonElement)!.addEventListener('click', () => randomiseInput());
    (document.querySelector('#clear')as HTMLButtonElement)!.addEventListener('click', () => {
        clearInput('m1');
        clearInput('m2');
    });
    
    const m1_number = document.getElementById('m1_frac')!;
    const exercise_box = document.getElementById('exercise')!;
    const output_box = document.getElementById('output-div')!;
    const operation_box = document.getElementById('operation_box')!;
    
    const generateButton = document.getElementById('generate')!;
    const randomiseButton = document.getElementById('randomise')!;
    const submitButton = document.getElementById('submit')!;
    const scoreElement = (document.getElementById('score-div'))!;

    const exercise_type_box = document.getElementById('exercise_type_box')!;
    const max_element_box = document.getElementById('max_element_box')!;
    const solution_amount_box = document.getElementById('solution_amount_box')!;

    m1_box.classList.remove('gone');
    m2_box.classList.remove('gone');
    operation_box.classList.remove('gone');
    m1_number.classList.add('gone');
    m1_number.style.display = 'none';

    exercise_box.innerHTML = '';
    exercise_box.classList.add('gone');

    output_box.classList.remove('gone');

    generateButton.classList.add('gone');
    submitButton.classList.add('gone');
    randomiseButton.classList.remove('gone');

    scoreElement.classList.add('gone');
    exercise_type_box.classList.add('gone');
    max_element_box.classList.add('gone');
    solution_amount_box.classList.remove('gone');
    
    setBasisToggle();
    setInputEventListener();
    setBasisToggleEventListener();
}