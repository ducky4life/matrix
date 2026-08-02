import { setScore } from "./matrix_web.js";

const m1_box = document.getElementById('m1_box')!;
const m2_box = document.getElementById('m2_box')!;
const m1_number = document.getElementById('m1_frac')!;
const exercise_box = document.getElementById('exercise')!;
const operation_box = document.getElementById('operation_box')!;

const generateButton = document.getElementById('generate')!;
const randomiseButton = document.getElementById('randomise')!;
const submitButton = document.getElementById('submit')!;
const output_box = document.getElementById('output-div')!;
const scoreElement = (document.getElementById('score-div'))!;

const max_element_box = document.getElementById('max_element_box')!;

let exercise_type = 1;

export function setupGame() {

    // (document.querySelector('#clear')as HTMLButtonElement)!.addEventListener('click', () => {
    //     clearAllInput(exercise_type);
    // });

    generateButton.classList.remove('gone');
    submitButton.classList.remove('gone');
    randomiseButton.classList.add('gone');
    output_box.classList.add('gone');
    m1_box.classList.add('gone');
    m2_box.classList.add('gone');
    operation_box.classList.add('gone');
    m1_number.classList.remove('gone');
    m1_number.style.display = 'flex';
    scoreElement.classList.remove('gone');

    max_element_box.classList.remove('gone');

    let local_score = localStorage.getItem('score');
    if (local_score == null) {
        local_score = '0';
    }
    setScore(local_score);

    // generateButton.addEventListener('click', () => {
    //     displayExercise();
    // });

    // setOperationEventListener();
    // displayExercise();

}