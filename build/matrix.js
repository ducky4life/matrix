export class Matrix2 {
    constructor(a = 0, b = 0, c = 0, d = 0) {
        this.a1 = a;
        this.a2 = b;
        this.b1 = c;
        this.b2 = d;
    }
    display() {
        return ([this.a1, this.a2, this.b1, this.b2]);
    }
    displayToString() {
        return (`[${this.a1}, ${this.a2}, ${this.b1}, ${this.b2}]`);
    }
    displayToLaTeX() {
        return (`\\begin{pmatrix}${this.a1} & ${this.a2} \\\\ ${this.b1} & ${this.b2} \\end{pmatrix}`);
    }
    displayToHTML() {
        return (`
            <div class="matrix-container">
                <div class="matrix-2">
                    <div>${this.a1}</div><div>${this.a2}</div>
                    <div>${this.b1}</div><div>${this.b2}</div>
                </div>
            </div>`);
    }
    add(M) {
        return new Matrix2(this.a1 + M.a1, this.a2 + M.a2, this.b1 + M.b1, this.b2 + M.b2);
    }
    minus(M) {
        return new Matrix2(this.a1 - M.a1, this.a2 - M.a2, this.b1 - M.b1, this.b2 - M.b2);
    }
    multiply(M) {
        return new Matrix2(this.a1 * M.a1 + this.a2 * M.b1, this.a1 * M.a2 + this.a2 * M.b2, this.b1 * M.a1 + this.b2 * M.b1, this.b1 * M.a2 + this.b2 * M.b2);
    }
    determinant() {
        return (this.a1 * this.b2 - this.a2 * this.b1);
    }
    minor(row, column) {
        const element = getRowName(3 - row) + getColumnName(3 - column);
        return (this[element]);
    }
    cofactor(row, column) {
        let coefficient = 1;
        if ((row + column) % 2 != 0) {
            coefficient = -1;
        }
        return (this.minor(row, column) * coefficient);
    }
    isInvertible() {
        if (this.determinant() == 0) {
            return false;
        }
        return true;
    }
    transpose() {
        return new Matrix2(this.a1, this.b1, this.a2, this.b2);
    }
    adjoint() {
        return new Matrix2(this.b2, -this.a2, -this.b1, this.a1);
    }
    inverse() {
        const detScalingMatrix = scalarToMatrix2(this.determinant());
        return detScalingMatrix.multiply(this.adjoint());
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
        const row_name = getRowName(row);
        const rows = ["a", "b", "c"];
        const columns = [1, 2, 3];
        const submatrix_rows = [];
        const submatrix_columns = [];
        for (let i = 0; i < 3; i++) {
            if (rows[i] != row_name) {
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
        const element = getRowName(row) + getColumnName(column);
        const even_elements = ["a1", "a3", "b2", "c1", "c3"];
        let coefficient;
        if (even_elements.includes(element)) {
            coefficient = 1;
        }
        else {
            coefficient = -1;
        }
        return this.minor(row, column) * coefficient;
    }
    isInvertible() {
        if (this.determinant() == 0) {
            return false;
        }
        return true;
    }
    transpose() {
        return new Matrix3(this.a1, this.b1, this.c1, this.a2, this.b2, this.c2, this.a3, this.b3, this.c3);
    }
    adjoint() {
        const cofactorArray = [];
        for (let row = 1; row <= 3; row++) {
            for (let column = 1; column <= 3; column++) {
                const elementCofactor = this.cofactor(row, column);
                cofactorArray.push(elementCofactor);
            }
        }
        const cofactorMatrix = new Matrix3(cofactorArray[0], cofactorArray[1], cofactorArray[2], cofactorArray[3], cofactorArray[4], cofactorArray[5], cofactorArray[6], cofactorArray[7], cofactorArray[8]);
        return cofactorMatrix.transpose();
    }
    inverse() {
        const detScalingMatrix = scalarToMatrix3(this.determinant());
        return detScalingMatrix.multiply(this.adjoint());
    }
}
export function scalarToMatrix2(scalar) {
    return new Matrix2(scalar, 0, 0, scalar);
}
export function scalarToMatrix3(scalar) {
    return new Matrix3(scalar, 0, 0, 0, scalar, 0, 0, 0, scalar);
}
export function getRowName(row) {
    switch (row) {
        case 1:
            return "a";
        case 2:
            return "b";
        case 3:
            return "c";
        default:
            return "a";
    }
}
export function getColumnName(column) {
    return column.toString();
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
export function getAnswerMatrix(M1, M2, operation) {
    switch (operation) {
        case 0:
            return M1.add(M2);
        case 1:
            return M1.minus(M2);
        case 2:
            return M1.multiply(M2);
        default:
            return M1.multiply(M2);
    }
}
