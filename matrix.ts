export class Matrix2 {
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

export class Matrix3 {
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