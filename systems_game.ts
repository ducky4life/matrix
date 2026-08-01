import { Frac } from "./frac_matrix.js";
import { incrementScore, setInputBoxColor, setScore } from "./matrix_web.js";
import { generateUniqueSolutionExercise, getRandomAugmentedMatrix3 } from "./systems.js";

function getInputFracHTML(name: string) {
    return `<div style="display: flex; align-items: center;">
        <span style="margin: 0;">${name} = </span>
        <math style="font-size: 3.5vh; padding-right: 1vw;">
            <mfrac>
            <mn><input id="frac_${name}_a"></input></mn>
            <mn><input id="frac_${name}_b"></input></mfrac>
        </math>
    </div>`;
}

function getInputBackSubFracHTML(name: string) {
    return `<div style="display: flex; align-items: center;">
        <span style="margin: 0;">${name} = </span>
        <math style="font-size: 3.5vh; padding-right: 1vw;">
            <mfrac>
            <mn style="display: flex;"><input id="frac_${name}_a_t" class="num-input"></input>
                <span style="margin: 0; display: flex; align-items: flex-end; font-size: 1.5vw;">t+</span>
                <input id="frac_${name}_a_c" class="num-input"></input></mn>
            <mn><input id="frac_${name}_b"></input></mfrac>
        </math>
    </div>`;
}

function clearInput(name: string) {
    (document.getElementById(`frac_${name}_a`) as HTMLInputElement).value = '';
    (document.getElementById(`frac_${name}_b`) as HTMLInputElement).value = '';
}

function clearAllInput() {
    clearInput('x');
    clearInput('y');
    clearInput('z');
}

function getInputNumberFrac(name: string): Frac {
    const a = Number((document.getElementById(`frac_${name}_a`) as HTMLInputElement).value);
    const b = Number((document.getElementById(`frac_${name}_b`) as HTMLInputElement).value);

    return (new Frac(a, b)).simplify();
}

function checkNumberFracAnswer(answer_array: Array<Frac>) {
    let all_correct: boolean = true;
    const variable_array = ['x', 'y', 'z'];
    
    for (let i=0; i<3; i++) {
        const variable_name = variable_array[i];
        const elementId_a = `frac_${variable_name}_a`;
        const elementId_b = `frac_${variable_name}_b`;
        const inputNumberFrac = getInputNumberFrac(variable_name);
        const answerFrac = answer_array[i];

        if ((document.getElementById(elementId_a) as HTMLInputElement).value
            && (document.getElementById(elementId_b) as HTMLInputElement).value) {

            if (inputNumberFrac.equals(answerFrac)) {
                setInputBoxColor(elementId_a, 'limegreen');
                setInputBoxColor(elementId_b, 'limegreen');
            }

            else {
                all_correct = false;
                setInputBoxColor(elementId_a, 'red');
                setInputBoxColor(elementId_b, 'red');
            }

        }

        else {
            all_correct = false;
        }
    }

    return all_correct;
}

function displayExercise() {

    let finished: boolean = false;
    let exercise = generateUniqueSolutionExercise();
    let M1 = exercise['M1'];
    let answer_array: Array<Frac> = exercise['answer'];
    console.log(answer_array)

    exercise_box.innerHTML = M1.displayToHTML();

    const solution_frac_input = getInputBackSubFracHTML('x') + getInputBackSubFracHTML('y') + getInputBackSubFracHTML('z');
    m1_number.innerHTML = solution_frac_input;

    const submitButton = (document.getElementById('submit') as HTMLButtonElement)!;
    submitButton.addEventListener('click', () => {
        if (checkNumberFracAnswer(answer_array) && !finished) {
            incrementScore();
            finished = true;
        }
    });
}
const m1_box = document.getElementById('m1_box')!;
const m1_number = document.getElementById('m1_frac')!;
const exercise_box = document.getElementById('exercise')!;

const generateButton = document.getElementById('generate')!;
const randomiseButton = document.getElementById('randomise')!;
const submitButton = document.getElementById('submit')!;
const output_box = document.getElementById('output-div')!;
const scoreElement = (document.getElementById('score-div'))!;

export function setupGame() {

    (document.querySelector('#clear')as HTMLButtonElement)!.addEventListener('click', () => {
        clearAllInput();
    });

    generateButton.classList.remove('gone');
    submitButton.classList.remove('gone');
    randomiseButton.classList.add('gone');
    output_box.classList.add('gone');
    m1_box.classList.add('gone');
    m1_number.classList.remove('gone');
    m1_number.style.display = 'flex';
    scoreElement.classList.remove('gone');

    let local_score = localStorage.getItem('score');
    if (local_score == null) {
        local_score = '0';
    }
    setScore(local_score);

    generateButton.addEventListener('click', () => {
        displayExercise();
    });

    displayExercise();
}