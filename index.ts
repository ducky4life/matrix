class Matrix {
    a: number;
    b: number;
    c: number;
    d: number;

    constructor(a=0,b=0,c=0,d=0) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
    }

    display(): Array<number> {
        return([this.a,this.b,this.c,this.d]);
    }

    displayToString(): string {
        return(`[${this.a}, ${this.b}, ${this.c}, ${this.d}]`)
    }

    displayToLaTeX(): string {
        return(`\\begin{matrix}${this.a} & ${this.b} \\\\ ${this.c} & ${this.d} \\end{matrix}`)
    }

    displayToHTML(): string {
        return(`
            <div class="matrix-container">
                <div class="matrix">
                    <div>${this.a}</div><div>${this.b}</div>
                    <div>${this.c}</div><div>${this.d}</div>
                </div>
            </div>`)
    }

    add(M: Matrix): Matrix {
        return new Matrix(this.a+M.a, this.b+M.b, this.c+M.c, this.d+M.d);
    }

    minus(M: Matrix): Matrix {
        return new Matrix(this.a-M.a, this.b-M.b, this.c-M.c, this.d-M.d);
    }

    multiply(M: Matrix): Matrix {
        return new Matrix(this.a*M.a+this.b*M.c, this.a*M.b+this.b*M.d, this.c*M.a+this.d*M.c, this.c*M.b+this.d*M.d);
    }
}

function getRandomMatrix(max: number = 10) {
    max = max + 1;
    const a = Math.floor(Math.random() * max);
    const b = Math.floor(Math.random() * max);
    const c = Math.floor(Math.random() * max);
    const d = Math.floor(Math.random() * max);

    const M = new Matrix(a,b,c,d);
    return M;
}

function generateExercise(type: number = 2, max: number = 10) {
    const M1 = getRandomMatrix(max);
    const M2 = getRandomMatrix(max);

    const sum = M1.add(M2); // type == 0
    const difference = M1.minus(M2); // type == 1
    const product = M1.multiply(M2); // type == 2

    let ex_type = 2;
    let answer = new Matrix(0,0,0,0);
    let operator = '*';

    // if random: choose
    if (type == 3) {
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

    const generated_exercise: { M1: Matrix; M2: Matrix; answer: Matrix; ex_type: number; operator: string } = {
        M1: M1,
        M2: M2,
        answer: answer,
        ex_type: ex_type,
        operator: operator,
    };
    return generated_exercise;
}

function displayExercise(type: number = 2, max: number = 10) {
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
        const exercise = generateExercise(type, max);
        const M1 = exercise['M1'];
        const M2 = exercise['M2'];
        const answer = exercise['answer'];
        const ex_type = exercise['ex_type'];
        const operator = exercise['operator'];

        const expression = M1.displayToString() + operator + M2.displayToString() + " = " + answer.displayToString();
        const latex_expression = M1.displayToLaTeX() + " $" + operator + "$ " + M2.displayToLaTeX()  + " $=$ " + answer.displayToLaTeX();
        console.log(expression);
        if (latex_mode.checked) {
            output.innerHTML += latex_expression + '<br>';
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
                <div>
                    <label class="switch">
                        <input class="answer-toggle" type="checkbox" id="reveal_${i+1}" onclick="revealAnswer(${i+1})" ${checked_value}>
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>`;
        }
    }
}

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

(document.querySelector('#submit')as HTMLButtonElement)!.addEventListener('click', () => displayExercise(2, 10));

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
