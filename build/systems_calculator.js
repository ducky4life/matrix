import { AugmentedMatrix3 } from "./systems.js";
const m1_box = document.getElementById('m1_box');
const testAugmentedMatrix = new AugmentedMatrix3(2, -1, 1, 3, 1, 1, 1, 6, 1, 2, -1, 2);
m1_box.innerHTML = getAugmentedMatrixHTML('m1');
// m1_box.innerHTML = testAugmentedMatrix.displayToHTML();
m1_box.classList.add('matrix-container-3');
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
export function clearInput(name) {
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
document.querySelector('#clear').addEventListener('click', () => {
    clearInput('m1');
});
