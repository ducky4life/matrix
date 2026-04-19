import { AugmentedMatrix3 } from "./systems.js";

const m1_box = document.getElementById('m1_box')!;
const testAugmentedMatrix = new AugmentedMatrix3(
    2, -1, 1, 3,
    1, 1, 1, 6,
    1, 2, -1, 2
);

m1_box.innerHTML = getAugmentedMatrixHTML('m1');
// m1_box.innerHTML = testAugmentedMatrix.displayToHTML();

m1_box.classList.add('matrix-container-3');

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

export function clearInput(name: string) {

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

(document.querySelector('#clear')as HTMLButtonElement)!.addEventListener('click', () => {
    clearInput('m1');
});