import { AugmentedMatrix3, getRandomAugmentedMatrix3 } from "./systems.js";

function getInputAugmentedMatrix(name: string): AugmentedMatrix3 {
    const a1 = (document.getElementById(`augmented_${name}_a1`) as HTMLInputElement).value;
    const a2 = (document.getElementById(`augmented_${name}_a2`) as HTMLInputElement).value;
    const a3 = (document.getElementById(`augmented_${name}_a3`) as HTMLInputElement).value;
    const a4 = (document.getElementById(`augmented_${name}_a4`) as HTMLInputElement).value;
    const b1 = (document.getElementById(`augmented_${name}_b1`) as HTMLInputElement).value;
    const b2 = (document.getElementById(`augmented_${name}_b2`) as HTMLInputElement).value;
    const b3 = (document.getElementById(`augmented_${name}_b3`) as HTMLInputElement).value;
    const b4 = (document.getElementById(`augmented_${name}_b4`) as HTMLInputElement).value;
    const c1 = (document.getElementById(`augmented_${name}_c1`) as HTMLInputElement).value;
    const c2 = (document.getElementById(`augmented_${name}_c2`) as HTMLInputElement).value;
    const c3 = (document.getElementById(`augmented_${name}_c3`) as HTMLInputElement).value;
    const c4 = (document.getElementById(`augmented_${name}_c4`) as HTMLInputElement).value;

    return new AugmentedMatrix3(Number(a1), Number(a2), Number(a3), Number(a4), Number(b1), Number(b2), Number(b3), Number(b4), Number(c1), Number(c2), Number(c3), Number(c4));
}

function setInputAugmentedMatrix(name: string, a1: number, a2: number, a3: number, a4: number, b1: number, b2: number, b3: number, b4: number, c1: number, c2: number, c3: number, c4: number) {
    (document.getElementById(`augmented_${name}_a1`) as HTMLInputElement).value = String(a1);
    (document.getElementById(`augmented_${name}_a2`) as HTMLInputElement).value = String(a2);
    (document.getElementById(`augmented_${name}_a3`) as HTMLInputElement).value = String(a3);
    (document.getElementById(`augmented_${name}_a4`) as HTMLInputElement).value = String(a4);
    (document.getElementById(`augmented_${name}_b1`) as HTMLInputElement).value = String(b1);
    (document.getElementById(`augmented_${name}_b2`) as HTMLInputElement).value = String(b2);
    (document.getElementById(`augmented_${name}_b3`) as HTMLInputElement).value = String(b3);
    (document.getElementById(`augmented_${name}_b4`) as HTMLInputElement).value = String(b4);
    (document.getElementById(`augmented_${name}_c1`) as HTMLInputElement).value = String(c1);
    (document.getElementById(`augmented_${name}_c2`) as HTMLInputElement).value = String(c2);
    (document.getElementById(`augmented_${name}_c3`) as HTMLInputElement).value = String(c3);
    (document.getElementById(`augmented_${name}_c4`) as HTMLInputElement).value = String(c4);
}

function getAugmentedMatrixHTML(name: string) {
    return `<div class="matrix-3 augmented-matrix-3">
        <div><input id="augmented_${name}_a1"></input></div><div><input id="augmented_${name}_a2"></input></div><div><input id="augmented_${name}_a3"></input></div>|<div><input id="augmented_${name}_a4"></input></div>
        <div><input id="augmented_${name}_b1"></input></div><div><input id="augmented_${name}_b2"></input></div><div><input id="augmented_${name}_b3"></input></div>|<div><input id="augmented_${name}_b4"></input></div>
        <div><input id="augmented_${name}_c1"></input></div><div><input id="augmented_${name}_c2"></input></div><div><input id="augmented_${name}_c3"></input></div>|<div><input id="augmented_${name}_c4"></input></div>
    </div>`;
}

function setInputEventListener() {
    let inputElementIds: string[] = [];

    inputElementIds = [
        'augmented_m1_a1', 'augmented_m1_a2', 'augmented_m1_a3', 'augmented_m1_a4',
        'augmented_m1_b1', 'augmented_m1_b2', 'augmented_m1_b3', 'augmented_m1_b4',
        'augmented_m1_c1', 'augmented_m1_c2', 'augmented_m1_c3', 'augmented_m1_c4',
    ];

    inputElementIds.forEach((id) => {
        const element = (document.getElementById(id) as HTMLInputElement);
        element.addEventListener('input', () => displayOutput());
    })
}

function clearInput(name: string) {

    (document.getElementById(`augmented_${name}_a1`) as HTMLInputElement).value = '';
    (document.getElementById(`augmented_${name}_a2`) as HTMLInputElement).value = '';
    (document.getElementById(`augmented_${name}_a3`) as HTMLInputElement).value = '';
    (document.getElementById(`augmented_${name}_a4`) as HTMLInputElement).value = '';
    (document.getElementById(`augmented_${name}_b1`) as HTMLInputElement).value = '';
    (document.getElementById(`augmented_${name}_b2`) as HTMLInputElement).value = '';
    (document.getElementById(`augmented_${name}_b3`) as HTMLInputElement).value = '';
    (document.getElementById(`augmented_${name}_b4`) as HTMLInputElement).value = '';
    (document.getElementById(`augmented_${name}_c1`) as HTMLInputElement).value = '';
    (document.getElementById(`augmented_${name}_c2`) as HTMLInputElement).value = '';
    (document.getElementById(`augmented_${name}_c3`) as HTMLInputElement).value = '';
    (document.getElementById(`augmented_${name}_c4`) as HTMLInputElement).value = '';
}

function setInputFromMatrix(name: string, M1: AugmentedMatrix3) {
    setInputAugmentedMatrix(name, M1.a1, M1.a2, M1.a3, M1.a4, M1.b1, M1.b2, M1.b3, M1.b4, M1.c1, M1.c2, M1.c3, M1.c4);
}

function randomiseInput() {
    const M1 = getRandomAugmentedMatrix3(3, true);
    setInputFromMatrix('m1', M1);

    displayOutput();
}

function displayOutput() {
    const output = document.querySelector('#output')!;
    output.innerHTML = '';

    let M1 = getInputAugmentedMatrix('m1');

    console.log(M1.getCoefficientMatrix().determinant());

    const firstEliminationHTML = M1.firstGaussianElimination().displayToHTML();
    const secondEliminationHTML =  M1.gaussianElimination().displayToHTML();
    
    const solution = M1.getFracSolution();

    output.innerHTML += `<div class="gaussian-elimination-output">first column: ${firstEliminationHTML} second column: ${secondEliminationHTML}</div>`
    output.innerHTML += `<div style="margin-bottom: 1vh; margin-top: 2vh; overflow-y: hidden;">x = ${solution[0].displayToHTML()}, y = ${solution[1].displayToHTML()}, z = ${solution[2].displayToHTML()}</div>`;
}

export function setupCalculator() {
    
    (document.querySelector('#randomise')as HTMLButtonElement)!.addEventListener('click', () => randomiseInput());
    (document.querySelector('#clear')as HTMLButtonElement)!.addEventListener('click', () => {
        clearInput('m1');
    });
    
    const m1_box = document.getElementById('m1_box')!;
    const exercise_box = document.getElementById('exercise')!;
    const output_box = document.getElementById('output-div')!;
    
    const generateButton = document.getElementById('generate')!;
    const randomiseButton = document.getElementById('randomise')!;
    const submitButton = document.getElementById('submit')!;
    
    m1_box.innerHTML = getAugmentedMatrixHTML('m1');
    m1_box.classList.add('matrix-container-3');

    exercise_box.innerHTML = '';
    exercise_box.classList.add('gone');

    output_box.classList.remove('gone');

    generateButton.classList.add('gone');
    submitButton.classList.add('gone');
    randomiseButton.classList.remove('gone');
    
    setInputEventListener();
}
