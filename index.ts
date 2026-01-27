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

function getRandomMatrix(max) {
    const a = Math.floor(Math.random() * max);
    const b = Math.floor(Math.random() * max);
    const c = Math.floor(Math.random() * max);
    const d = Math.floor(Math.random() * max);

    const M = new Matrix(a,b,c,d);
    return M.display();
}
