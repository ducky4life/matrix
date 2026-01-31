export class Matrix2 {
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
                <div class="matrix-2">
                    <div>${this.a}</div><div>${this.b}</div>
                    <div>${this.c}</div><div>${this.d}</div>
                </div>
            </div>`);
    }
    add(M) {
        return new Matrix2(this.a + M.a, this.b + M.b, this.c + M.c, this.d + M.d);
    }
    minus(M) {
        return new Matrix2(this.a - M.a, this.b - M.b, this.c - M.c, this.d - M.d);
    }
    multiply(M) {
        return new Matrix2(this.a * M.a + this.b * M.c, this.a * M.b + this.b * M.d, this.c * M.a + this.d * M.c, this.c * M.b + this.d * M.d);
    }
    determinant() {
        return (this.a * this.d - this.b * this.c);
    }
}
export class Matrix3 {
    constructor(a1 = 0, a2 = 0, a3 = 0, b1 = 0, b2 = 0, b3 = 0, c1 = 0, c2 = 0, c3 = 0) {
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
    display() {
        return ([this.a1, this.a2, this.a3, this.b1, this.b2, this.b3, this.c1, this.c2, this.c3]);
    }
    displayToString() {
        return (`[${this.a1}, ${this.a2}, ${this.a3}, ${this.b1}, ${this.b2}, ${this.b3}, ${this.c1}, ${this.c2}, ${this.c3}]`);
    }
    displayToLaTeX() {
        return (`\\begin{pmatrix}${this.a1} & ${this.a2} & ${this.a3} \\\\ ${this.b1} & ${this.b2} & ${this.b3} \\\\ ${this.c1} & ${this.c2} & ${this.c3} \\end{pmatrix}`);
    }
    displayToHTML() {
        return (`
            <div class="matrix-container">
                <div class="matrix-3">
                    <div>${this.a1}</div><div>${this.a2}</div><div>${this.a3}</div>
                    <div>${this.b1}</div><div>${this.b2}</div><div>${this.b3}</div>
                    <div>${this.c1}</div><div>${this.c2}</div><div>${this.c3}</div>
                </div>
            </div>`);
    }
    add(M) {
        return new Matrix3(this.a1 + M.a1, this.a2 + M.a2, this.a3 + M.a3, this.b1 + M.b1, this.b2 + M.b2, this.b3 + M.b3, this.c1 + M.c1, this.c2 + M.c2, this.c3 + M.c3);
    }
    minus(M) {
        return new Matrix3(this.a1 - M.a1, this.a2 - M.a2, this.a3 - M.a3, this.b1 - M.b1, this.b2 - M.b2, this.b3 - M.b3, this.c1 - M.c1, this.c2 - M.c2, this.c3 - M.c3);
    }
    multiply(M) {
        return new Matrix3(this.a1 * M.a1 + this.a2 * M.b1 + this.a3 * M.c1, this.a1 * M.a2 + this.a2 * M.b2 + this.a3 * M.c2, this.a1 * M.a3 + this.a2 * M.b3 + this.a3 * M.c3, this.b1 * M.a1 + this.b2 * M.b1 + this.b3 * M.c1, this.b1 * M.a2 + this.b2 * M.b2 + this.b3 * M.c2, this.b1 * M.a3 + this.b2 * M.b3 + this.b3 * M.c3, this.c1 * M.a1 + this.c2 * M.b1 + this.c3 * M.c1, this.c1 * M.a2 + this.c2 * M.b2 + this.c3 * M.c2, this.c1 * M.a3 + this.c2 * M.b3 + this.c3 * M.c3);
    }
    determinant() {
        return (this.a1 * (this.b2 * this.c3 - this.b3 * this.c2) -
            this.a2 * (this.b1 * this.c3 - this.b3 * this.c1) +
            this.a3 * (this.b1 * this.c2 - this.b2 * this.c1));
    }
    minor(row, column) {
        const rows = ["a", "b", "c"];
        const columns = ["1", "2", "3"];
        const submatrix_rows = [];
        const submatrix_columns = [];
        for (let i = 0; i < 3; i++) {
            if (rows[i] != row) {
                submatrix_rows.push(rows[i]);
            }
            if (columns[i] != column) {
                submatrix_columns.push(columns[i]);
            }
        }
        const a1 = this[submatrix_rows[0] + submatrix_columns[0]];
        const a2 = this[submatrix_rows[0] + submatrix_columns[1]];
        const b1 = this[submatrix_rows[1] + submatrix_columns[0]];
        const b2 = this[submatrix_rows[1] + submatrix_columns[1]];
        const submatrix = new Matrix2(a1, a2, b1, b2);
        return submatrix.determinant();
    }
    cofactor(row, column) {
        const element = row + column;
        const even_elements = ["a1", "a3", "b2", "c1", "c3"];
        let coefficient;
        if (even_elements.includes(element)) {
            coefficient = 1;
        }
        else {
            coefficient = -1;
        }
        console.log(coefficient);
        return this.minor(row, column) * coefficient;
    }
}
export function getRandomMatrix2(max = 10) {
    max = max + 1;
    const a = Math.floor(Math.random() * max);
    const b = Math.floor(Math.random() * max);
    const c = Math.floor(Math.random() * max);
    const d = Math.floor(Math.random() * max);
    const M = new Matrix2(a, b, c, d);
    return M;
}
export function getRandomMatrix3(max = 10) {
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
    const M = new Matrix3(a1, a2, a3, b1, b2, b3, c1, c2, c3);
    return M;
}
