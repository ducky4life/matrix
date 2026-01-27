"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Matrix {
    constructor(a = 0, b = 0, c = 0, d = 0) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
    }
    display() {
        return ([this.a, this.b, this.c, this.d]);
    }
    displayToString() {
        return (`[${this.a}, ${this.b}, ${this.c}, ${this.d}]`);
    }
    displayToLaTeX() {
        return (`\\begin{pmatrix}${this.a} & ${this.b} \\\\ ${this.c} & ${this.d} \\end{pmatrix}`);
    }
    displayToHTML() {
        return (`
            <div class="matrix-container">
                <div class="matrix">
                    <div>${this.a}</div><div>${this.b}</div>
                    <div>${this.c}</div><div>${this.d}</div>
                </div>
            </div>`);
    }
    add(M) {
        return new Matrix(this.a + M.a, this.b + M.b, this.c + M.c, this.d + M.d);
    }
    minus(M) {
        return new Matrix(this.a - M.a, this.b - M.b, this.c - M.c, this.d - M.d);
    }
    multiply(M) {
        return new Matrix(this.a * M.a + this.b * M.c, this.a * M.b + this.b * M.d, this.c * M.a + this.d * M.c, this.c * M.b + this.d * M.d);
    }
}
function getRandomMatrix(max = 10) {
    max = max + 1;
    const a = Math.floor(Math.random() * max);
    const b = Math.floor(Math.random() * max);
    const c = Math.floor(Math.random() * max);
    const d = Math.floor(Math.random() * max);
    const M = new Matrix(a, b, c, d);
    return M;
}
function generateExercise(type = 2, max = 10) {
    const M1 = getRandomMatrix(max);
    const M2 = getRandomMatrix(max);
    const sum = M1.add(M2); // type == 0
    const difference = M1.minus(M2); // type == 1
    const product = M1.multiply(M2); // type == 2
    let ex_type = 2;
    let answer = new Matrix(0, 0, 0, 0);
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
function displayExercise(type = 2, max = 10) {
    const output = document.querySelector('#output');
    output.innerHTML = '';
    const amount = document.querySelector('#amount').value;
    type = Number(document.querySelector('#type').value);
    let num_amount = 1;
    if (!amount) {
        num_amount = 1;
    }
    else {
        num_amount = Number(amount);
        // if (num_amount == NaN) {
        //     num_amount = 1;
        // }
    }
    for (let i = 0; i < num_amount; i++) {
        const exercise = generateExercise(type, max);
        const M1 = exercise['M1'];
        const M2 = exercise['M2'];
        const answer = exercise['answer'];
        const ex_type = exercise['ex_type'];
        const operator = exercise['operator'];
        const expression = M1.displayToString() + operator + M2.displayToString() + " = " + answer.displayToString();
        console.log(expression);
        output.innerHTML += `<div style="display: inline-flex;
    align-items: center; vertical-align: middle;">
    ${M1.displayToHTML()} ${operator} ${M2.displayToHTML()} = ${answer.displayToHTML()}
    </div><br>`;
    }
}
document.querySelector('#submit').addEventListener('click', () => displayExercise(2, 10));
