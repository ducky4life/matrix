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
            break;
        case 1: // difference
            const answer = difference;
            break;
        case 2: // product
            const answer = product;
            break;
        default: // default to product
            const answer = product;
            break;
    }
}
