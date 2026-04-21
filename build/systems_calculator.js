import { TextFrac } from "./frac_matrix.js";
import { AugmentedMatrix3, getRandomAugmentedMatrix3 } from "./systems.js";
function getInputAugmentedMatrix(name) {
    const a1 = document.getElementById(`augmented_${name}_a1`).value;
    const a2 = document.getElementById(`augmented_${name}_a2`).value;
    const a3 = document.getElementById(`augmented_${name}_a3`).value;
    const a4 = document.getElementById(`augmented_${name}_a4`).value;
    const b1 = document.getElementById(`augmented_${name}_b1`).value;
    const b2 = document.getElementById(`augmented_${name}_b2`).value;
    const b3 = document.getElementById(`augmented_${name}_b3`).value;
    const b4 = document.getElementById(`augmented_${name}_b4`).value;
    const c1 = document.getElementById(`augmented_${name}_c1`).value;
    const c2 = document.getElementById(`augmented_${name}_c2`).value;
    const c3 = document.getElementById(`augmented_${name}_c3`).value;
    const c4 = document.getElementById(`augmented_${name}_c4`).value;
    return new AugmentedMatrix3(Number(a1), Number(a2), Number(a3), Number(a4), Number(b1), Number(b2), Number(b3), Number(b4), Number(c1), Number(c2), Number(c3), Number(c4));
}
function setInputAugmentedMatrix(name, a1, a2, a3, a4, b1, b2, b3, b4, c1, c2, c3, c4) {
    document.getElementById(`augmented_${name}_a1`).value = String(a1);
    document.getElementById(`augmented_${name}_a2`).value = String(a2);
    document.getElementById(`augmented_${name}_a3`).value = String(a3);
    document.getElementById(`augmented_${name}_a4`).value = String(a4);
    document.getElementById(`augmented_${name}_b1`).value = String(b1);
    document.getElementById(`augmented_${name}_b2`).value = String(b2);
    document.getElementById(`augmented_${name}_b3`).value = String(b3);
    document.getElementById(`augmented_${name}_b4`).value = String(b4);
    document.getElementById(`augmented_${name}_c1`).value = String(c1);
    document.getElementById(`augmented_${name}_c2`).value = String(c2);
    document.getElementById(`augmented_${name}_c3`).value = String(c3);
    document.getElementById(`augmented_${name}_c4`).value = String(c4);
}
function getAugmentedMatrixHTML(name) {
    return `<div class="matrix-3 augmented-matrix-3">
        <div><input id="augmented_${name}_a1"></input></div><div><input id="augmented_${name}_a2"></input></div><div><input id="augmented_${name}_a3"></input></div>|<div><input id="augmented_${name}_a4"></input></div>
        <div><input id="augmented_${name}_b1"></input></div><div><input id="augmented_${name}_b2"></input></div><div><input id="augmented_${name}_b3"></input></div>|<div><input id="augmented_${name}_b4"></input></div>
        <div><input id="augmented_${name}_c1"></input></div><div><input id="augmented_${name}_c2"></input></div><div><input id="augmented_${name}_c3"></input></div>|<div><input id="augmented_${name}_c4"></input></div>
    </div>`;
}
function setInputEventListener() {
    let inputElementIds = [];
    inputElementIds = [
        'augmented_m1_a1', 'augmented_m1_a2', 'augmented_m1_a3', 'augmented_m1_a4',
        'augmented_m1_b1', 'augmented_m1_b2', 'augmented_m1_b3', 'augmented_m1_b4',
        'augmented_m1_c1', 'augmented_m1_c2', 'augmented_m1_c3', 'augmented_m1_c4',
    ];
    inputElementIds.forEach((id) => {
        const element = document.getElementById(id);
        element.addEventListener('input', () => displayOutput());
    });
}
function clearInput(name) {
    document.getElementById(`augmented_${name}_a1`).value = '';
    document.getElementById(`augmented_${name}_a2`).value = '';
    document.getElementById(`augmented_${name}_a3`).value = '';
    document.getElementById(`augmented_${name}_a4`).value = '';
    document.getElementById(`augmented_${name}_b1`).value = '';
    document.getElementById(`augmented_${name}_b2`).value = '';
    document.getElementById(`augmented_${name}_b3`).value = '';
    document.getElementById(`augmented_${name}_b4`).value = '';
    document.getElementById(`augmented_${name}_c1`).value = '';
    document.getElementById(`augmented_${name}_c2`).value = '';
    document.getElementById(`augmented_${name}_c3`).value = '';
    document.getElementById(`augmented_${name}_c4`).value = '';
}
function setInputFromMatrix(name, M1) {
    setInputAugmentedMatrix(name, M1.a1, M1.a2, M1.a3, M1.a4, M1.b1, M1.b2, M1.b3, M1.b4, M1.c1, M1.c2, M1.c3, M1.c4);
}
function randomiseInput() {
    const M1 = getRandomAugmentedMatrix3(3, false);
    setInputFromMatrix('m1', M1);
    displayOutput();
}
function displayOutput() {
    const output = document.querySelector('#output');
    output.innerHTML = '';
    let M1 = getInputAugmentedMatrix('m1');
    // console.log(M1.getCoefficientMatrix().determinant());
    // console.log(M1.numberOfSolutions());
    const firstEliminationHTML = M1.firstGaussianElimination().displayToHTML();
    const secondEliminationHTML = M1.gaussianElimination().displayToHTML();
    const solution = M1.getFracSolution();
    output.innerHTML += `<div class="gaussian-elimination-output">first column: ${firstEliminationHTML} second column: ${secondEliminationHTML}</div>`;
    let solutionText = "";
    if (M1.hasUniqueSolution()) {
        solutionText = `x = ${solution[0].displayToHTML()}, y = ${solution[1].displayToHTML()}, z = ${solution[2].displayToHTML()}`;
        output.innerHTML += `<div style="margin-bottom: 1vh; margin-top: 2vh; overflow-y: hidden;">${solutionText}</div>`;
    }
    else if (M1.hasNoSolutions()) {
        solutionText = "no solutions";
        output.innerHTML += `<div style="margin-bottom: 1vh; margin-top: 2vh; overflow-y: hidden;">${solutionText}</div>`;
    }
    else {
        const solutionArray = M1.getSolutionSetByBackSubstitution();
        let formattedSolutionArray = [];
        solutionArray.forEach((solution) => {
            const fractionArray = solution.split('/');
            const solutionTextFrac = new TextFrac(fractionArray[0], fractionArray[1]);
            formattedSolutionArray.push(solutionTextFrac.displayToHTML());
        });
        solutionText = `The solution set is {(${formattedSolutionArray[0]}, ${formattedSolutionArray[1]}, ${formattedSolutionArray[2]}) : t&isin;&reals;}`;
        console.log(solutionText);
        output.innerHTML += `<div style="margin-bottom: 1vh; margin-top: 2vh; overflow-y: hidden;" class="solution-set">${solutionText}</div>`;
    }
}
export function setupCalculator() {
    document.querySelector('#randomise').addEventListener('click', () => randomiseInput());
    document.querySelector('#clear').addEventListener('click', () => {
        clearInput('m1');
    });
    const m1_box = document.getElementById('m1_box');
    const exercise_box = document.getElementById('exercise');
    const output_box = document.getElementById('output-div');
    const generateButton = document.getElementById('generate');
    const randomiseButton = document.getElementById('randomise');
    const submitButton = document.getElementById('submit');
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
