import { Frac } from "./frac_matrix.js";
import { getRandomNumberFromArray } from "./matrix.js";
import { clearInputBoxColor, incrementScore, setInputBoxColor, setScore } from "./matrix_web.js";
import { AugmentedMatrix3, generateInfiniteSolutionsExercise, generateUniqueSolutionExercise, getRandomAugmentedMatrix3 } from "./systems.js";

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
                <span style="margin: 0; display: flex; align-items: flex-end;" class="backsubinput">t+</span>
                <input id="frac_${name}_a_c" class="num-input"></input></mn>
            <mn><input id="frac_${name}_b"></input></mfrac>
        </math>
    </div>`;
}

function getInputHTML() {

    if (exercise_type == 0) {
        return (getInputFracHTML('x') + getInputFracHTML('y') + getInputFracHTML('z'));
    }
    else if (exercise_type == 1) {
        return (getInputBackSubFracHTML('x') + getInputBackSubFracHTML('y') + getInputBackSubFracHTML('z'));
    }

    return "";
}

function clearInput(name: string, exercise_type: number) {

    if (exercise_type == 0) {
        (document.getElementById(`frac_${name}_a`) as HTMLInputElement).value = '';
        (document.getElementById(`frac_${name}_b`) as HTMLInputElement).value = '';
    }
    else if (exercise_type == 1) {
        (document.getElementById(`frac_${name}_a_t`) as HTMLInputElement).value = '';
        (document.getElementById(`frac_${name}_a_c`) as HTMLInputElement).value = '';
        (document.getElementById(`frac_${name}_b`) as HTMLInputElement).value = '';
    }
}

function clearAllInput(exercise_type: number) {
    clearInput('x', exercise_type);
    clearInput('y', exercise_type);
    clearInput('z', exercise_type);

    clearAllInputBoxColor();
}

function getInputNumberFrac(name: string): Frac {
    const a = Number((document.getElementById(`frac_${name}_a`) as HTMLInputElement).value);
    const b = Number((document.getElementById(`frac_${name}_b`) as HTMLInputElement).value);

    return (new Frac(a, b)).simplify();
}

function getInputBackSubFrac(name: string): Record<string, Frac> {
    const a_t = Number((document.getElementById(`frac_${name}_a_t`) as HTMLInputElement).value);
    const a_c = Number((document.getElementById(`frac_${name}_a_c`) as HTMLInputElement).value);
    const b = Number((document.getElementById(`frac_${name}_b`) as HTMLInputElement).value);

    const t_coeff = new Frac(a_t, b);
    const constant = new Frac(a_c, b);

    return {
        't_coeff': t_coeff,
        'constant': constant
    };
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

function checkBackSubFracAnswer(answer_array: Array<Record<string, Frac>>) {
    let all_correct: boolean = true;
    const variable_array = ['x', 'y', 'z'];
    
    for (let i=0; i<3; i++) {
        const variable_name = variable_array[i];
        const elementId_a_t = `frac_${variable_name}_a_t`;
        const elementId_a_c = `frac_${variable_name}_a_c`;
        const elementId_b = `frac_${variable_name}_b`;
        const inputNumberFracCoeffs = getInputBackSubFrac(variable_name);
        const answerCoeffs = answer_array[i];

        const t_coeff = inputNumberFracCoeffs['t_coeff'];
        const constant = inputNumberFracCoeffs['constant'];
        const ans_t_coeff = answerCoeffs['t_coeff'];
        const ans_constant = answerCoeffs['constant'];

        if ((document.getElementById(elementId_a_t) as HTMLInputElement).value
            && (document.getElementById(elementId_a_c) as HTMLInputElement).value
            && (document.getElementById(elementId_b) as HTMLInputElement).value) {

            if (t_coeff.equals(ans_t_coeff) && constant.equals(ans_constant)) {
                setInputBoxColor(elementId_a_t, 'limegreen');
                setInputBoxColor(elementId_a_c, 'limegreen');
                setInputBoxColor(elementId_b, 'limegreen');
            }

            else {
                all_correct = false;
                setInputBoxColor(elementId_a_t, 'red');
                setInputBoxColor(elementId_a_c, 'red');
                setInputBoxColor(elementId_b, 'red');
            }

        }

        else {
            all_correct = false;
        }
    }

    return all_correct;
}

function clearAllInputBoxColor() {

    if (exercise_type == 0) {
        clearInputBoxColor("frac_x_a");
        clearInputBoxColor("frac_x_b");
        clearInputBoxColor("frac_y_a");
        clearInputBoxColor("frac_y_b");
        clearInputBoxColor("frac_z_a");
        clearInputBoxColor("frac_z_b");
    }
    else if (exercise_type == 1) {
        clearInputBoxColor("frac_x_a_t");
        clearInputBoxColor("frac_x_a_c");
        clearInputBoxColor("frac_x_b");
        clearInputBoxColor("frac_y_a_t");
        clearInputBoxColor("frac_y_a_c");
        clearInputBoxColor("frac_y_b");
        clearInputBoxColor("frac_z_a_t");
        clearInputBoxColor("frac_z_a_c");
        clearInputBoxColor("frac_z_b");
    }

}

function setOperationEventListener() {
    const operationElement = (document.getElementById('type') as HTMLSelectElement);
    operationElement.addEventListener('input', () => {
        displayExercise();
    })
}

function getInputExerciseType(): number {
    let operation = Number((document.getElementById('type') as HTMLSelectElement).value);

    switch (operation) {
        case -1: // random solving
            operation = getRandomNumberFromArray([0,1]);
            break;

        case -2: // random all
            operation = getRandomNumberFromArray([0,1,2]);
            break;
    }

    return operation;
}

function displayExercise() {

    exercise_type = getInputExerciseType();
    let max_element = Number((document.querySelector('#max_element') as HTMLTextAreaElement).value);

    if (max_element == 0 || max_element > 20 || Number.isNaN(max_element)) {
        max_element = 10;
    }

    let finished: boolean = false;
    let exercise: Record<string, Array<Frac>|Array<Record<string, Frac>>|AugmentedMatrix3> = {};

    if (exercise_type == 1) {
        exercise = generateInfiniteSolutionsExercise(max_element);
    }
    else {
        exercise = generateUniqueSolutionExercise(max_element);
    }


    let M1 = exercise['M1'] as AugmentedMatrix3;
    let answer_array = exercise['answer'];
    console.log(answer_array)

    exercise_box.innerHTML = M1.displayToHTML();

    const solution_frac_input = getInputHTML();
    m1_number.innerHTML = solution_frac_input;

    const submitButton = (document.getElementById('submit') as HTMLButtonElement)!;
    submitButton.addEventListener('click', () => {

        if (exercise_type == 0) {
            if (checkNumberFracAnswer(answer_array as Array<Frac>) && !finished) {
                incrementScore();
                finished = true;
            }
        }
        else if (exercise_type == 1) {
            if (checkBackSubFracAnswer(answer_array as Array<Record<string, Frac>>) && !finished) {
                incrementScore();
                finished = true;
            }
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

const exercise_type_box = document.getElementById('exercise_type_box')!;
const max_element_box = document.getElementById('max_element_box')!;
const solution_amount_box = document.getElementById('solution_amount_box')!;

let exercise_type = 1;

export function setupGame() {

    (document.querySelector('#clear')as HTMLButtonElement)!.addEventListener('click', () => {
        clearAllInput(exercise_type);
    });

    generateButton.classList.remove('gone');
    submitButton.classList.remove('gone');
    randomiseButton.classList.add('gone');
    output_box.classList.add('gone');
    m1_box.classList.add('gone');
    m1_number.classList.remove('gone');
    m1_number.style.display = 'flex';
    scoreElement.classList.remove('gone');

    exercise_type_box.classList.remove('gone');
    max_element_box.classList.remove('gone');
    solution_amount_box.classList.add('gone');

    let local_score = localStorage.getItem('score');
    if (local_score == null) {
        local_score = '0';
    }
    setScore(local_score);

    generateButton.addEventListener('click', () => {
        displayExercise();
    });

    setOperationEventListener();
    displayExercise();
}