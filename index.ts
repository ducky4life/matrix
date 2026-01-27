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
        return([a,b,c,d]);
    }

    displayToString(): string {
        return(`[${a}, ${b}, ${c}, ${d}]`)
    }

    add(M: Matrix): Matrix {
        return Matrix(a+M.a, b+M.b, c+M.c, d+M.d);
    }

    minus(M: Matrix): Matrix {
        return Matrix(a-M.a, b-M.b, c-M.c, d-M.d);
    }

    multiply(M: Matrix): Matrix {
        return Matrix(a*M.a+b*M.c, a*M.b+b*M.d, c*M.a+d*M.c, c*M.b+d*M.d);
    }
}

function getRandomMatrix(max: number = 10) {
    const a = Math.floor(Math.random() * max);
    const b = Math.floor(Math.random() * max);
    const c = Math.floor(Math.random() * max);
    const d = Math.floor(Math.random() * max);

    const M = new Matrix(a,b,c,d);
    return M;
}

function generateExercise(type: number = 2; max: number = 10) {
    const M1 = getRandomMatrix(max);
    const M2 = getRandomMatrix(max);

    const sum = M1.add(M2); // type == 0
    const difference = M1.minus(M2); // type == 1
    const product = M1.multiply(M2); // type == 2

    // if random: choose
    if (type == 3) {
        const ex_type = Math.floor(Math.random() * 2);
    }
    else {
        const ex_type = type;
    }

    switch (ex_type) {
        case 0: // sum
            const answer = sum;
            const operator = '+';
            break;
        case 1: // difference
            const answer = difference;
            const operator = '-';
            break;
        case 2: // product
            const answer = product;
            const operator = '*';
            break;
        default: // default to product
            const answer = product;
            const operator = '*'
            break;
    }

    const generated_exercise: Record<string, Matrix|number|string> = {
        'M1': M1,
        'M2': M2,
        'answer': answer,
        'ex_type': ex_type,
        'operator': operator;
    };
    return generated_exercise;
}

function displayExercise(type: number = 2, max: number = 10) {
    const amount: string = (document.querySelector('#amount') as HTMLTextAreaElement).value;
    if (!amount) {
        const num_amount: number = 1;
    }
    else {
        const num_amount: number = Number(amount);
        if (num_amount == NaN) {
            num_amount = 1;
        }
    }
    for (let i=0; i<num_amount; i++) {
        const exercise = generateExercise(type, max);
        const M1 = exercise['M1'];
        const M2 = exercise['M2'];
        const answer = exercise['answer'];
        const ex_type = exercise['ex_type'];
        const operator = exercise['operator'];

        const expression = M1.displayToString() + operator + M2.displayToString;
        output.innerHTML += `<h3>${expression}</h3><br>`;
    }
}
