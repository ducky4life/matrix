import { Matrix3, getRowName, getColumnName } from "./matrix.js";
export class AugmentedRow3 {
    constructor(a1 = 0, a2 = 0, a3 = 0, a4 = 0) {
        this.a1 = a1;
        this.a2 = a2;
        this.a3 = a3;
        this.a4 = a4;
    }
    scale(num) {
        return new AugmentedRow3(num * this.a1, num * this.a2, num * this.a3, num * this.a4);
    }
}
export class AugmentedMatrix3 {
    constructor(a1 = 0, a2 = 0, a3 = 0, a4 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, c1 = 0, c2 = 0, c3 = 0, c4 = 0) {
        this.a1 = a1;
        this.a2 = a2;
        this.a3 = a3;
        this.a4 = a4;
        this.b1 = b1;
        this.b2 = b2;
        this.b3 = b3;
        this.b4 = b4;
        this.c1 = c1;
        this.c2 = c2;
        this.c3 = c3;
        this.c4 = c4;
    }
    equals(M) {
        if (this.a1 == M.a1 && this.a2 == M.a2 && this.a3 == M.a3 && this.b1 == M.b1 && this.b2 == M.b2 && this.b3 == M.b3 && this.c1 == M.c1 && this.c2 == M.c2 && this.c3 == M.c3 && this.a4 == M.a4 && this.b4 == M.b4 && this.c4 == M.c4) {
            return true;
        }
        return false;
    }
    getElement(row, column) {
        const row_name = getRowName(row);
        const column_name = getColumnName(column);
        const element = this[row_name + column_name];
        return element;
    }
    getElementName(row, column) {
        const row_name = getRowName(row);
        const column_name = getColumnName(column);
        return row_name + column_name;
    }
    display() {
        return ([this.a1, this.a2, this.a3, this.a4, this.b1, this.b2, this.b3, this.b4, this.c1, this.c2, this.c3, this.c4]);
    }
    displayToString() {
        return (`[${this.a1}, ${this.a2}, ${this.a3}, ${this.a4}, ${this.b1}, ${this.b2}, ${this.b3}, ${this.b4}, ${this.c1}, ${this.c2}, ${this.c3}, ${this.c4}]`);
    }
    getCoefficientMatrix() {
        return new Matrix3(this.a1, this.a2, this.a3, this.b1, this.b2, this.b3, this.c1, this.c2, this.c3);
    }
    hasUniqueSolution() {
        return this.getCoefficientMatrix().isInvertible();
    }
    getSolution() {
        if (this.hasUniqueSolution()) {
            const inverseCoeffMatrix = this.getCoefficientMatrix().inverse();
            return ([
                this.a4 * inverseCoeffMatrix.a1 + this.b4 * inverseCoeffMatrix.a2 + this.c4 * inverseCoeffMatrix.a3,
                this.a4 * inverseCoeffMatrix.b1 + this.b4 * inverseCoeffMatrix.b2 + this.c4 * inverseCoeffMatrix.b3,
                this.a4 * inverseCoeffMatrix.c1 + this.b4 * inverseCoeffMatrix.c2 + this.c4 * inverseCoeffMatrix.c3
            ]);
        }
        else {
            console.log("system does not have only one unique solution");
            return ([]);
        }
    }
    getAugmentedRow(row) {
        let augmentedRowArray = [];
        for (let i = 1; i <= 4; i++) {
            augmentedRowArray.push(this.getElement(row, i));
        }
        return arrayToAugmentedRow3(augmentedRowArray);
    }
}
export function arrayToAugmentedRow3(augmentedRowArray) {
    return new AugmentedRow3(augmentedRowArray[0], augmentedRowArray[1], augmentedRowArray[2], augmentedRowArray[3]);
}
