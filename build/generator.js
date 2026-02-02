var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Matrix2, Matrix3, getRandomMatrix2, getRandomMatrix3 } from "./matrix.js";
function generateExercise2(type = 2, max = 10) {
    const M1 = getRandomMatrix2(max);
    const M2 = getRandomMatrix2(max);
    const sum = M1.add(M2); // type == 0
    const difference = M1.minus(M2); // type == 1
    const product = M1.multiply(M2); // type == 2
    let ex_type = 2;
    let answer = new Matrix2(0, 0, 0, 0);
    let operator = '*';
    // if random: choose
    if (type == -1) {
        ex_type = Math.floor(Math.random() * 3);
    }
    else {
        ex_type = type;
    }
    switch (ex_type) {
        case 0: // sum
            answer = sum;
            operator = '+';
            break;
        case 1: // difference
            answer = difference;
            operator = '-';
            break;
        case 2: // product
            answer = product;
            operator = '*';
            break;
        default: // default to product
            answer = product;
            operator = '*';
            break;
    }
    const generated_exercise = {
        M1: M1,
        M2: M2,
        answer: answer,
        ex_type: ex_type,
        operator: operator,
    };
    return generated_exercise;
}
function generateExercise3(type = 2, max = 10) {
    const M1 = getRandomMatrix3(max);
    const M2 = getRandomMatrix3(max);
    const sum = M1.add(M2); // type == 0
    const difference = M1.minus(M2); // type == 1
    const product = M1.multiply(M2); // type == 2
    let ex_type = 2;
    let answer = new Matrix3(0, 0, 0, 0);
    let operator = '*';
    // if random: choose
    if (type == -1) {
        ex_type = Math.floor(Math.random() * 3);
    }
    else {
        ex_type = type;
    }
    switch (ex_type) {
        case 0: // sum
            answer = sum;
            operator = '+';
            break;
        case 1: // difference
            answer = difference;
            operator = '-';
            break;
        case 2: // product
            answer = product;
            operator = '*';
            break;
        default: // default to product
            answer = product;
            operator = '*';
            break;
    }
    const generated_exercise = {
        M1: M1,
        M2: M2,
        answer: answer,
        ex_type: ex_type,
        operator: operator,
    };
    return generated_exercise;
}
function displayExercise(matrix_dimension = 2, type = 2, max = 10) {
    const output = document.querySelector('#output');
    output.innerHTML = '';
    const latex_mode = document.querySelector('#latex_mode');
    const reveal = document.querySelector('#reveal_all');
    let hidden_class = '';
    let checked_value = 'checked';
    if (!reveal.checked) {
        hidden_class = 'hidden';
        checked_value = '';
    }
    const amount = document.querySelector('#amount').value;
    type = Number(document.querySelector('#type').value);
    matrix_dimension = Number(document.querySelector('#dimension').value);
    let num_amount = 1;
    if (!amount) {
        num_amount = 1;
    }
    else {
        num_amount = Number(amount);
        if (Number.isNaN(num_amount)) {
            num_amount = 1;
        }
    }
    for (let i = 0; i < num_amount; i++) {
        let exercise = {};
        if (matrix_dimension == 2) {
            max = 10;
            exercise = generateExercise2(type, max);
        }
        else {
            max = 9; // pls dont get too big
            exercise = generateExercise3(type, max);
        }
        const M1 = exercise['M1'];
        const M2 = exercise['M2'];
        const answer = exercise['answer'];
        const ex_type = exercise['ex_type'];
        const operator = exercise['operator'];
        const expression = M1.displayToString() + operator + M2.displayToString() + " = " + answer.displayToString();
        const latex_expression = M1.displayToLaTeX() + operator + M2.displayToLaTeX() + " = " + answer.displayToLaTeX();
        console.log(expression);
        console.log(M1.determinant());
        if (latex_mode.checked) {
            output.innerHTML += latex_expression + '<br><br>';
        }
        else {
            output.innerHTML += `<div class="matrix-output">
                <div style="display: flex; align-items: center;">
                    ${M1.displayToHTML()}
                    <span style="margin: 0 10px;">${operator}</span>
                    ${M2.displayToHTML()}
                    <span style="margin: 0 10px;">= </span>
                    <div class="matrix-answer ${hidden_class}" id="answer_${i + 1}">${answer.displayToHTML()}</div>
                </div>
                <div class="matrix-output-toggle-box">
                    <label class="switch">
                        <input class="answer-toggle" type="checkbox" id="reveal_${i + 1}" ${checked_value}>
                        <span class="slider round"></span>
                    </label>
                </div>
                    <button class="copy-button" id="copy_${i + 1}" title="Copy as LaTeX">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M9 4H6a1 1 0 0 0-1 1v15a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-3M9 3h6v4H9V3z"/></svg>
                    </button>
                </div>
            </div><br>`;
            const answerToggle = document.querySelector(`#reveal_${i + 1}`);
            answerToggle.addEventListener('change', (event) => {
                revealAnswer(i + 1);
            });
            const copyButton = document.querySelector(`#copy_${i + 1}`);
            copyButton.addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                event.preventDefault(); // Prevent default behavior
                yield copyExpression(latex_expression);
            }));
        }
    }
}
const copyExpression = (text) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        yield ((_a = navigator.clipboard) === null || _a === void 0 ? void 0 : _a.writeText(text));
    }
    catch (error) {
        console.error(error);
    }
});
function revealAnswer(index) {
    const answer = document.querySelector(`#answer_${index}`);
    answer.classList.toggle('hidden');
}
function revealAnswerAll() {
    const ans_toggles = document.querySelectorAll('.answer-toggle');
    ans_toggles.forEach((ans_toggle) => {
        ans_toggle.checked = true;
    });
    const answers = document.querySelectorAll('.matrix-answer');
    answers.forEach((answer) => {
        answer.classList.remove('hidden');
    });
}
function hideAnswerAll() {
    const ans_toggles = document.querySelectorAll('.answer-toggle');
    ans_toggles.forEach((ans_toggle) => {
        ans_toggle.checked = false;
    });
    const answers = document.querySelectorAll('.matrix-answer');
    answers.forEach((answer) => {
        answer.classList.add('hidden');
    });
}
document.querySelector('#submit').addEventListener('click', () => displayExercise(3, 2, 10));
const revealAll = document.querySelector('#reveal_all');
const handleRevealAnswer = (event) => {
    const target = event.target;
    if (target.checked) {
        revealAnswerAll();
    }
    else {
        hideAnswerAll();
    }
};
revealAll.addEventListener('change', handleRevealAnswer);
