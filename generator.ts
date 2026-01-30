import { Matrix2, Matrix3 } from "./matrix";

function getRandomMatrix2(max: number = 10) {
    max = max + 1;

    const a = Math.floor(Math.random() * max);
    const b = Math.floor(Math.random() * max);
    const c = Math.floor(Math.random() * max);
    const d = Math.floor(Math.random() * max);

    const M = new Matrix2(a,b,c,d);
    return M;
}

function getRandomMatrix3(max: number = 10) {
    max = max + 1;

    const a1 = Math.floor(Math.random() * max);
    const a2 = Math.floor(Math.random() * max);
    const a3 = Math.floor(Math.random() * max);
    const b1 = Math.floor(Math.random() * max);
    const b2 = Math.floor(Math.random() * max);
    const b3 = Math.floor(Math.random() * max);
    const c1 = Math.floor(Math.random() * max);
    const c2 = Math.floor(Math.random() * max);
    const c3 = Math.floor(Math.random() * max);

    const M = new Matrix3(a1,a2,a3,b1,b2,b3,c1,c2,c3);
    return M;
}

function generateExercise2(type: number = 2, max: number = 10) {
    const M1 = getRandomMatrix2(max);
    const M2 = getRandomMatrix2(max);

    const sum = M1.add(M2); // type == 0
    const difference = M1.minus(M2); // type == 1
    const product = M1.multiply(M2); // type == 2

    let ex_type = 2;
    let answer = new Matrix2(0,0,0,0);
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
            operator = '*'
            break;
    }

    const generated_exercise: { M1: Matrix2; M2: Matrix2; answer: Matrix2; ex_type: number; operator: string } = {
        M1: M1,
        M2: M2,
        answer: answer,
        ex_type: ex_type,
        operator: operator,
    };
    return generated_exercise;
}

function generateExercise3(type: number = 2, max: number = 10) {
    const M1 = getRandomMatrix3(max);
    const M2 = getRandomMatrix3(max);

    const sum = M1.add(M2); // type == 0
    const difference = M1.minus(M2); // type == 1
    const product = M1.multiply(M2); // type == 2

    let ex_type = 2;
    let answer = new Matrix3(0,0,0,0);
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
            operator = '*'
            break;
    }

    const generated_exercise: { M1: Matrix3; M2: Matrix3; answer: Matrix3; ex_type: number; operator: string } = {
        M1: M1,
        M2: M2,
        answer: answer,
        ex_type: ex_type,
        operator: operator,
    };
    return generated_exercise;
}

function displayExercise(matrix_dimension: number = 2, type: number = 2, max: number = 10) {
    const output = document.querySelector('#output')!;
    output.innerHTML = '';

    const latex_mode = (document.querySelector('#latex_mode') as HTMLInputElement);

    const reveal = (document.querySelector('#reveal_all') as HTMLInputElement);
    let hidden_class = '';
    let checked_value = 'checked';
    if (!reveal.checked) {
        hidden_class = 'hidden';
        checked_value = '';
    }
    const amount: string = (document.querySelector('#amount') as HTMLTextAreaElement).value;
    type = Number((document.querySelector('#type') as HTMLSelectElement).value);
    matrix_dimension = Number((document.querySelector('#dimension') as HTMLSelectElement).value);

    let num_amount: number = 1;
    if (!amount) {
        num_amount = 1;
    }
    else {
        num_amount = Number(amount);
        // if (num_amount == NaN) {
        //     num_amount = 1;
        // }
    }

    for (let i=0; i<num_amount; i++) {
        let exercise: any = {};
        if (matrix_dimension == 2) {
            max = 10;
            exercise = generateExercise2(type, max);
        }
        else {
            max = 7; // pls dont get too big
            exercise = generateExercise3(type, max);
        }
        const M1 = exercise['M1'];
        const M2 = exercise['M2'];
        const answer = exercise['answer'];
        const ex_type = exercise['ex_type'];
        const operator = exercise['operator'];

        const expression = M1.displayToString() + operator + M2.displayToString() + " = " + answer.displayToString();
        const latex_expression = M1.displayToLaTeX() + operator + M2.displayToLaTeX()  + " = " + answer.displayToLaTeX();
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
                    <div class="matrix-answer ${hidden_class}" id="answer_${i+1}">${answer.displayToHTML()}</div>
                </div>
                <div style="margin-left: auto; margin-right: 5vw;">
                    <label class="switch">
                        <input class="answer-toggle" type="checkbox" id="reveal_${i+1}" onclick="revealAnswer(${i+1})" ${checked_value}>
                        <span class="slider round"></span>
                    </label>
                </div>
                    <button class="copy-button" id="copy_${i+1}" title="Copy as LaTeX">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M9 4H6a1 1 0 0 0-1 1v15a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-3M9 3h6v4H9V3z"/></svg>
                    </button>
                </div>
            </div><br>`;
            const copyButton = (document.querySelector(`#copy_${i+1}`) as HTMLInputElement);
            copyButton.addEventListener('click', async (event) => { 
                event.preventDefault(); // Prevent default behavior
                await copyExpression(latex_expression);
            });
        }
    }
}

const copyExpression = async (text: string): Promise<void> => {
    try {
        await navigator.clipboard?.writeText(text);
    } catch (error) {
        console.error(error);
    }
};

function revealAnswer(index: number) {
    const answer = document.querySelector(`#answer_${index}`)!;
    answer.classList.toggle('hidden');
}

function revealAnswerAll() {
    const ans_toggles = document.querySelectorAll('.answer-toggle');
    ans_toggles.forEach((ans_toggle) => {
        (ans_toggle as HTMLInputElement).checked = true;
    });
    
    const answers = document.querySelectorAll('.matrix-answer');
    answers.forEach((answer) => {
        answer.classList.remove('hidden');
    });
}

function hideAnswerAll() {
    const ans_toggles = document.querySelectorAll('.answer-toggle');
    ans_toggles.forEach((ans_toggle) => {
        (ans_toggle as HTMLInputElement).checked = false;
    });
    
    const answers = document.querySelectorAll('.matrix-answer');
    answers.forEach((answer) => {
        answer.classList.add('hidden');
    });
}

(document.querySelector('#submit')as HTMLButtonElement)!.addEventListener('click', () => displayExercise(3, 2, 10));

const revealAll = (document.querySelector('#reveal_all') as HTMLInputElement);

const handleRevealAnswer = (event: Event) => {

    const target = event.target as HTMLInputElement;
    if (target.checked) {
        revealAnswerAll();
    } else {
        hideAnswerAll();
    }
};

revealAll.addEventListener('change', handleRevealAnswer);
