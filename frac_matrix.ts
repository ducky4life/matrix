export class Frac {
    // a/b

    a: number;
    b: number;

    constructor(a=0,b=1) {
        this.a=a;
        this.b=b;
    }

    display(): Array<number> {
        return [this.a, this.b];
    }

    displayToNumber(): number {
        return this.a/this.b;
    }

    displayToString(): string {
        return `${this.a}/${this.b}`;
    }

    displayToHTML(): string {

        if (this.a == 0) {
            return `0`;
        }

        else if (this.b == 1) {
            return this.a.toString();
        }

        return `<math style="font-size: 3.5vh; padding-right: 1vw; margin-top: 1vh;">
            <mfrac>
            <mn>${this.a}</mn>
            <mn>${this.b}</mfrac>
        </math>`
    }

    displayToLaTeX(): string {
        return(`\\frac{${this.a}}{${this.b}}`)
    }

    add(F: Frac): Frac {
        return new Frac(this.a*F.b+this.b*F.a, this.b*F.b).simplify();
    }

    minus(F: Frac): Frac {
        return new Frac(this.a*F.b-this.b*F.a, this.b*F.b).simplify();
    }

    multiply(F: Frac): Frac {
        return new Frac(this.a*F.a, this.b*F.b).simplify();
    }

    divide(F: Frac): Frac {
        return new Frac(this.a*F.b, this.b*F.a).simplify();
    }

    inverse(): Frac {
        return new Frac(this.b, this.a).simplify();
    }

    simplify(): Frac {
        let a = this.a;
        let b = this.b;

        if (a<0 && b<0) {
            a = -a;
            b = -b;
        }

        if (a>0 && b<0) {
            a = -a;
            b = -b;
        }

        const smaller = Math.min(Math.abs(a),Math.abs(b));

        for (let i=smaller; i>1; i--) {
            if (a%i == b%i && a%i == 0) {
                a = a/i;
                b = b/i;
                break;
            }
        }

        return new Frac(a, b);
    }
}

export class FracMatrix2 {
    a1: Frac = new Frac();
    a2: Frac = new Frac();
    b1: Frac = new Frac();
    b2: Frac = new Frac();

    constructor(a: Frac = new Frac(), b: Frac = new Frac(), c: Frac = new Frac(), d: Frac = new Frac()) {
        this.a1 = a.simplify();
        this.a2 = b.simplify();
        this.b1 = c.simplify();
        this.b2 = d.simplify();
    }

    isIntegerMatrix(): boolean {
        if (this.a1.b == 1 && this.a2.b == 1 && this.b1.b == 1 && this.b2.b == 1) {
            return true;
        }
        return false;
    }

    display(): Array<Frac> {
        return([this.a1,this.a2,this.b1,this.b2]);
    }

    displayToString(): string {
        return(`[${this.a1.displayToString()}, ${this.a2.displayToString()}, ${this.b1.displayToString()}, ${this.b2.displayToString()}]`)
    }

    displayToLaTeX(): string {
        return(`\\begin{pmatrix}${this.a1.displayToLaTeX()} & ${this.a2.displayToLaTeX()} \\\\ ${this.b1.displayToLaTeX()} & ${this.b2.displayToLaTeX()} \\end{pmatrix}`)
    }

    displayToHTML(): string {
        return(`
            <div class="matrix-container">
                <div class="matrix-2">
                    <div class="matrix-elements">${this.a1.displayToHTML()}</div><div class="matrix-elements">${this.a2.displayToHTML()}</div>
                    <div class="matrix-elements">${this.b1.displayToHTML()}</div><div class="matrix-elements">${this.b2.displayToHTML()}</div>
                </div>
            </div>`)
    }

    add(M: FracMatrix2): FracMatrix2 {
        return new FracMatrix2(this.a1.add(M.a1), this.a2.add(M.a2), this.b1.add(M.b1), this.b2.add(M.b2));
    }

    minus(M: FracMatrix2): FracMatrix2 {
        return new FracMatrix2(this.a1.minus(M.a1), this.a2.minus(M.a2), this.b1.minus(M.b1), this.b2.minus(M.b2));
    }

    multiply(M: FracMatrix2): FracMatrix2 {
        return new FracMatrix2(
            (this.a1.multiply(M.a1)).add(this.a2.multiply(M.b1)),
            (this.a1.multiply(M.a2)).add(this.a2.multiply(M.b2)),
            (this.b1.multiply(M.a1)).add(this.b2.multiply(M.b1)),
            (this.b1.multiply(M.a2)).add(this.b2.multiply(M.b2))
        );
    }
}

export class FracMatrix3 {

    a1: Frac = new Frac();
    a2: Frac = new Frac();
    a3: Frac = new Frac();
    b1: Frac = new Frac();
    b2: Frac = new Frac();
    b3: Frac = new Frac();
    c1: Frac = new Frac();
    c2: Frac = new Frac();
    c3: Frac = new Frac();

    constructor(a1: Frac = new Frac(), a2: Frac = new Frac(), a3: Frac = new Frac(), b1: Frac = new Frac(), b2: Frac = new Frac(), b3: Frac = new Frac(), c1: Frac = new Frac(), c2: Frac = new Frac(), c3: Frac = new Frac(),) {
        this.a1 = a1.simplify();
        this.a2 = a2.simplify();
        this.a3 = a3.simplify();
        this.b1 = b1.simplify();
        this.b2 = b2.simplify();
        this.b3 = b3.simplify();
        this.c1 = c1.simplify();
        this.c2 = c2.simplify();
        this.c3 = c3.simplify();
    }

    isIntegerMatrix(): boolean {
        if (this.a1.b == 1 && this.a2.b == 1 && this.a3.b == 1 && this.b1.b == 1 && this.b2.b == 1 && this.b3.b == 1 && this.c1.b == 1 && this.c2.b == 1 && this.c3.b == 1) {
            return true;
        }
        return false;
    }

    display(): Array<Frac> {
        return([this.a1,this.a2,this.a3,this.b1,this.b2,this.b3,this.c1,this.c2,this.c3]);
    }

    displayToString(): string {
        return(`[${this.a1.displayToString()}, ${this.a2.displayToString()}, ${this.a3.displayToString()}, ${this.b1.displayToString()}, ${this.b2.displayToString()}, ${this.b3.displayToString()}, ${this.c1.displayToString()}, ${this.c2.displayToString()}, ${this.c3.displayToString()}]`);
    }
    
    displayToLaTeX(): string {
        return(`\\begin{pmatrix}${this.a1.displayToLaTeX()} & ${this.a2.displayToLaTeX()} & ${this.a3.displayToLaTeX()} \\\\ ${this.b1.displayToLaTeX()} & ${this.b2.displayToLaTeX()} & ${this.b3.displayToLaTeX()} \\\\ ${this.c1.displayToLaTeX()} & ${this.c2.displayToLaTeX()} & ${this.c3.displayToLaTeX()} \\end{pmatrix}`);
    }
    
    displayToHTML(): string {
        return(`
            <div class="matrix-container">
                <div class="matrix-3">
                <div class="matrix-elements">${this.a1.displayToHTML()}</div><div class="matrix-elements">${this.a2.displayToHTML()}</div><div class="matrix-elements">${this.a3.displayToHTML()}</div>
                <div class="matrix-elements">${this.b1.displayToHTML()}</div><div class="matrix-elements">${this.b2.displayToHTML()}</div><div class="matrix-elements">${this.b3.displayToHTML()}</div>
                <div class="matrix-elements">${this.c1.displayToHTML()}</div><div class="matrix-elements">${this.c2.displayToHTML()}</div><div class="matrix-elements">${this.c3.displayToHTML()}</div>
                </div>
            </div>`);
    }

    add(M: FracMatrix3): FracMatrix3 {
        return new FracMatrix3(this.a1.add(M.a1), this.a2.add(M.a2), this.a3.add(M.a3), this.b1.add(M.b1), this.b2.add(M.b2), this.b3.add(M.b3), this.c1.add(M.c1), this.c2.add(M.c2), this.c3.add(M.c3));
    }
    
    minus(M: FracMatrix3): FracMatrix3 {
        return new FracMatrix3(this.a1.minus(M.a1), this.a2.minus(M.a2), this.a3.minus(M.a3), this.b1.minus(M.b1), this.b2.minus(M.b2), this.b3.minus(M.b3), this.c1.minus(M.c1), this.c2.minus(M.c2), this.c3.minus(M.c3));
    }

    multiply(M: FracMatrix3): FracMatrix3 { // oh god even more
        return new FracMatrix3(
            (this.a1.multiply(M.a1)).add((this.a2.multiply(M.b1))).add((this.a3.multiply(M.c1))),
            (this.a1.multiply(M.a2)).add((this.a2.multiply(M.b2))).add((this.a3.multiply(M.c2))),
            (this.a1.multiply(M.a3)).add((this.a2.multiply(M.b3))).add((this.a3.multiply(M.c3))),
            (this.b1.multiply(M.a1)).add((this.b2.multiply(M.b1))).add((this.b3.multiply(M.c1))),
            (this.b1.multiply(M.a2)).add((this.b2.multiply(M.b2))).add((this.b3.multiply(M.c2))),
            (this.b1.multiply(M.a3)).add((this.b2.multiply(M.b3))).add((this.b3.multiply(M.c3))),
            (this.c1.multiply(M.a1)).add((this.c2.multiply(M.b1))).add((this.c3.multiply(M.c1))),
            (this.c1.multiply(M.a2)).add((this.c2.multiply(M.b2))).add((this.c3.multiply(M.c2))),
            (this.c1.multiply(M.a3)).add((this.c2.multiply(M.b3))).add((this.c3.multiply(M.c3)))
        );
    }
}


export function numberToFrac(integer: number): Frac {
    return new Frac(integer, 1);
}

export function scalarToFracMatrix2(scalar: Frac) {
    return new FracMatrix2(
        scalar, numberToFrac(0),
        numberToFrac(0), scalar
    );
}

export function scalarToFracMatrix3(scalar: Frac) {
    return new FracMatrix3(
        scalar, numberToFrac(0), numberToFrac(0),
        numberToFrac(0), scalar, numberToFrac(0),
        numberToFrac(0), numberToFrac(0), scalar
    );
}

// const testFrac = new Frac(2,4);
// const testFrac2 = new Frac(2,4);
// const testMatrix = new FracMatrix2(testFrac, testFrac, testFrac, testFrac);
// const testMatrix2 = new FracMatrix2(testFrac2, testFrac2, testFrac2, testFrac2);
// console.log(testFrac.simplify());
// const testMatrix = Matrix2ToFracMatrix2(new Matrix2(2,7,0,6));
// const testMatrix2 = Matrix2ToFracMatrix2(new Matrix2(6,9,4,10));
// console.log(testMatrix.multiply(testMatrix2).displayToString())