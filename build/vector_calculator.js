function getInputVectorHTML(name) {
    return `<div class="vector">
                <div><input id="vector_${name}_a1"></input></div>
                <div><input id="vector_${name}_b1"></input></div>
                <div><input id="vector_${name}_c1"></input></div>
        </div>`;
}
export function setupCalculator() {
    // (document.querySelector('#randomise')as HTMLButtonElement)!.addEventListener('click', () => randomiseInput());
    // (document.querySelector('#clear')as HTMLButtonElement)!.addEventListener('click', () => {
    //     clearInput('m1');
    // });
    const m1_box = document.getElementById('m1_box');
    const m2_box = document.getElementById('m2_box');
    const m1_number = document.getElementById('m1_frac');
    const exercise_box = document.getElementById('exercise');
    const output_box = document.getElementById('output-div');
    const operation_box = document.getElementById('operation_box');
    const generateButton = document.getElementById('generate');
    const randomiseButton = document.getElementById('randomise');
    const submitButton = document.getElementById('submit');
    const scoreElement = (document.getElementById('score-div'));
    const exercise_type_box = document.getElementById('exercise_type_box');
    const max_element_box = document.getElementById('max_element_box');
    const solution_amount_box = document.getElementById('solution_amount_box');
    m1_box.innerHTML = getInputVectorHTML('m1');
    m2_box.innerHTML = getInputVectorHTML('m2');
    m1_box.classList.add('vector-container');
    m1_box.classList.add('matrix-container');
    m2_box.classList.add('vector-container');
    m2_box.classList.add('matrix-container');
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
    // setInputEventListener();
    // setSolutionAmountEventListener();
}
