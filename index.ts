class Matrix2 {
    // a b
    // c d
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
        return(`\\begin{pmatrix}${this.a} & ${this.b} \\\\ ${this.c} & ${this.d} \\end{pmatrix}`)
    }

    displayToHTML(): string {
        return(`
            <div class="matrix-container">
                <div class="matrix-2">
                    <div>${this.a}</div><div>${this.b}</div>
                    <div>${this.c}</div><div>${this.d}</div>
                </div>
            </div>`)
    }

    add(M: Matrix2): Matrix2 {
        return new Matrix2(this.a+M.a, this.b+M.b, this.c+M.c, this.d+M.d);
    }

    minus(M: Matrix2): Matrix2 {
        return new Matrix2(this.a-M.a, this.b-M.b, this.c-M.c, this.d-M.d);
    }

    multiply(M: Matrix2): Matrix2 {
        return new Matrix2(this.a*M.a+this.b*M.c, this.a*M.b+this.b*M.d, this.c*M.a+this.d*M.c, this.c*M.b+this.d*M.d);
    }

    determinant(): number {
        return(this.a*this.d - this.b*this.c);
    }
}

class Matrix3 {
    // a1 a2 a3
    // b1 b2 b3
    // c1 c2 c3

    a1: number;
    a2: number;
    a3: number;
    b1: number;
    b2: number;
    b3: number;
    c1: number;
    c2: number;
    c3: number;

    constructor(a1=0,a2=0,a3=0,b1=0,b2=0,b3=0,c1=0,c2=0,c3=0) {
        this.a1 = a1;
        this.a2 = a2;
        this.a3 = a3;
        this.b1 = b1;
        this.b2 = b2;
        this.b3 = b3;
        this.c1 = c1;
        this.c2 = c2;
        this.c3 = c3;
    }

    display(): Array<number> {
        return([this.a1,this.a2,this.a3,this.b1,this.b2,this.b3,this.c1,this.c2,this.c3]);
    }

    displayToString(): string {
        return(`[${this.a1}, ${this.a2}, ${this.a3}, ${this.b1}, ${this.b2}, ${this.b3}, ${this.c1}, ${this.c2}, ${this.c3}]`);
    }
    
    displayToLaTeX(): string {
        return(`\\begin{pmatrix}${this.a1} & ${this.a2} & ${this.a3} \\\\ ${this.b1} & ${this.b2} & ${this.b3} \\\\ ${this.c1} & ${this.c2} & ${this.c3} \\end{pmatrix}`);
    }

    displayToHTML(): string {
        return(`
            <div class="matrix-container">
                <div class="matrix-3">
                    <div>${this.a1}</div><div>${this.a2}</div><div>${this.a3}</div>
                    <div>${this.b1}</div><div>${this.b2}</div><div>${this.b3}</div>
                    <div>${this.c1}</div><div>${this.c2}</div><div>${this.c3}</div>
                </div>
            </div>`);
    }

    add(M: Matrix3): Matrix3 {
        return new Matrix3(this.a1+M.a1, this.a2+M.a2, this.a3+M.a3, this.b1+M.b1, this.b2+M.b2, this.b3+M.b3, this.c1+M.c1, this.c2+M.c2, this.c3+M.c3);
    }

    minus(M: Matrix3): Matrix3 {
        return new Matrix3(this.a1-M.a1, this.a2-M.a2, this.a3-M.a3, this.b1-M.b1, this.b2-M.b2, this.b3-M.b3, this.c1-M.c1, this.c2-M.c2, this.c3-M.c3);
    }

    multiply(M: Matrix3): Matrix3 { // oh god
        return new Matrix3(
            this.a1*M.a1 + this.a2*M.b1 + this.a3*M.c1,
            this.a1*M.a2 + this.a2*M.b2 + this.a3*M.c2,
            this.a1*M.a3 + this.a2*M.b3 + this.a3*M.c3,
            this.b1*M.a1 + this.b2*M.b1 + this.b3*M.c1,
            this.b1*M.a2 + this.b2*M.b2 + this.b3*M.c2,
            this.b1*M.a3 + this.b2*M.b3 + this.b3*M.c3,
            this.c1*M.a1 + this.c2*M.b1 + this.c3*M.c1,
            this.c1*M.a2 + this.c2*M.b2 + this.c3*M.c2,
            this.c1*M.a3 + this.c2*M.b3 + this.c3*M.c3
        );
    }

    determinant(): number {
        return(
            this.a1*(this.b2*this.c3-this.b3*this.c2) -
            this.a2*(this.b1*this.c3-this.b3*this.c1) +
            this.a3*(this.b1*this.c2-this.b2*this.c1)
        );
    }
}

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
            exercise = generateExercise2(type, max);
        }
        else {
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
            copyButton.addEventListener('click', (event) => { 
                event.preventDefault(); // Prevent default behavior
                copyExpression(latex_expression);
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
