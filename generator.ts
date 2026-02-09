import { generateMatrixExercise2, generateMatrixExercise3 } from "./matrix.js";

function displayExercise() {
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
    
    let amount: number = Number((document.querySelector('#amount') as HTMLTextAreaElement).value);
    let max_element: number = Number((document.querySelector('#max_element') as HTMLTextAreaElement).value);
    let operation: number = Number((document.querySelector('#type') as HTMLSelectElement).value);
    let matrix_dimension: number = Number((document.querySelector('#dimension') as HTMLSelectElement).value);

    if (Number.isNaN(amount) || amount == 0) {
        amount = 1;
    }

    if (Number.isNaN(max_element) || max_element == 0) {
        if (matrix_dimension == 2) {
            max_element = 10;
        }
        else {
            max_element = 9;
        }
    }

    if (operation == -1) {
        operation = Math.floor(Math.random() * 3);
    }

    for (let i=0; i<amount; i++) {

        let exercise: any = {};
        if (matrix_dimension == 2) {
            exercise = generateMatrixExercise2(operation, max_element);
        }
        else {
            exercise = generateMatrixExercise3(operation, max_element);
        }

        const M1 = exercise['M1'];
        const M2 = exercise['M2'];
        const answer = exercise['answer'];
        const operator = exercise['operator'];

        // const expression = M1.displayToString() + operator + M2.displayToString() + " = " + answer.displayToString();
        const latex_expression = M1.displayToLaTeX() + operator + M2.displayToLaTeX()  + " = " + answer.displayToLaTeX();

        if (latex_mode.checked) {
            output.innerHTML += latex_expression + '<br><br>';
        }
        else {
            output.innerHTML += `
            <div class="matrix-output" style="margin-bottom: 20px;">
                <div style="display: flex; align-items: center;">
                    ${M1.displayToHTML()}
                    <span style="margin: 0 10px;">${operator}</span>
                    ${M2.displayToHTML()}
                    <span style="margin: 0 10px;">= </span>
                    <div class="matrix-answer ${hidden_class}" id="answer_${i+1}">${answer.displayToHTML()}</div>
                </div>

                <div class="matrix-output-toggle-box">
                    <label class="switch">
                        <input class="answer-toggle" type="checkbox" id="reveal_${i+1}" ${checked_value}>
                        <span class="slider round"></span>
                    </label>
                </div>

                <button class="copy-button" id="copy_${i+1}" expression="${latex_expression}" title="Copy as LaTeX">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M9 4H6a1 1 0 0 0-1 1v15a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-3M9 3h6v4H9V3z"/></svg>
                </button>
            </div><br>`;
        }
    }
    
    for (let i=0; i<amount; i++) {
        
        const answerToggle = (document.querySelector(`#reveal_${i+1}`) as HTMLInputElement);
        answerToggle.addEventListener('change', (event: Event) => {
            revealAnswer(i+1);
        })
        const copyButton = (document.querySelector(`#copy_${i+1}`) as HTMLInputElement);
        copyButton.addEventListener('click', async (event) => { 
            event.preventDefault(); // Prevent default behavior
            await copyExpression(copyButton.getAttribute('expression')!);
        });

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

const handleRevealAnswer = (event: Event) => {
    
    const target = event.target as HTMLInputElement;
    if (target.checked) {
        revealAnswerAll();
    } else {
        hideAnswerAll();
    }
};



(document.querySelector('#submit')as HTMLButtonElement)!.addEventListener('click', () => displayExercise());

const revealAll = (document.querySelector('#reveal_all') as HTMLInputElement);

revealAll.addEventListener('change', handleRevealAnswer);
