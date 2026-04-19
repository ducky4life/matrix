import { Matrix3, getRowName, getColumnName, getRandomMatrix3, getRandomNumber } from "./matrix.js";
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
    getElement(column) {
        return this["a" + column.toString()];
    }
    isZeroRow() {
        return (this.a1 == 0 && this.a2 == 0 && this.a3 == 0 && this.a4 == 0);
    }
    firstNonZeroEntryColumn() {
        if (!this.isZeroRow()) {
            for (let i = 1; i <= 4; i++) {
                if (this.getElement(i) != 0) {
                    return i;
                }
            }
        }
        console.log("row is a zero row");
        return 0;
    }
    firstNonZeroEntry() {
        return this.getElement(this.firstNonZeroEntryColumn());
    }
    add(R) {
        return new AugmentedRow3(this.a1 + R.a1, this.a2 + R.a2, this.a3 + R.a3, this.a4 + R.a4);
    }
    minus(R) {
        return new AugmentedRow3(this.a1 - R.a1, this.a2 - R.a2, this.a3 - R.a3, this.a4 - R.a4);
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
    displayToHTML() {
        return (`
            <div class="matrix-container matrix-container-3">
                <div class="matrix-3 augmented-matrix-3">
                <div class="matrix-elements">${this.a1}</div><div class="matrix-elements">${this.a2}</div><div class="matrix-elements">${this.a3}</div>|<div class="matrix-elements">${this.a4}</div>
                <div class="matrix-elements">${this.b1}</div><div class="matrix-elements">${this.b2}</div><div class="matrix-elements">${this.b3}</div>|<div class="matrix-elements">${this.b4}</div>
                <div class="matrix-elements">${this.c1}</div><div class="matrix-elements">${this.c2}</div><div class="matrix-elements">${this.c3}</div>|<div class="matrix-elements">${this.c4}</div>
                </div>
            </div>`);
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
    getFloatingSolution() {
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
    getFracSolution() {
        if (this.hasUniqueSolution()) {
            const inverseCoeffMatrix = this.getCoefficientMatrix().inverseAsFracMatrix();
            return ([
                inverseCoeffMatrix.a1.multiplyInteger(this.a4).add(inverseCoeffMatrix.a2.multiplyInteger(this.b4)).add(inverseCoeffMatrix.a3.multiplyInteger(this.c4)),
                inverseCoeffMatrix.b1.multiplyInteger(this.a4).add(inverseCoeffMatrix.b2.multiplyInteger(this.b4)).add(inverseCoeffMatrix.b3.multiplyInteger(this.c4)),
                inverseCoeffMatrix.c1.multiplyInteger(this.a4).add(inverseCoeffMatrix.c2.multiplyInteger(this.b4)).add(inverseCoeffMatrix.c3.multiplyInteger(this.c4))
            ]);
        }
        else {
            console.log("system does not have only one unique solution");
            return ([]);
        }
    }
    getSolution() {
        const fracSolution = this.getFracSolution();
        let finalSolution = [];
        fracSolution.forEach((fraction) => {
            if (fraction.isInteger()) {
                finalSolution.push(fraction.a);
            }
            else {
                finalSolution.push(fraction.displayToNumber());
            }
        });
        return finalSolution;
    }
    getAugmentedRow(row) {
        let augmentedRowArray = [];
        for (let i = 1; i <= 4; i++) {
            augmentedRowArray.push(this.getElement(row, i));
        }
        return arrayToAugmentedRow3(augmentedRowArray);
    }
    replaceRow(row, replaceWith) {
        let augmentedRowArray = [];
        for (let i = 1; i <= 3; i++) {
            if (i != row) {
                const augmentedRow = this.getAugmentedRow(i);
                augmentedRowArray.push(augmentedRow);
            }
            else {
                augmentedRowArray.push(replaceWith);
            }
        }
        return rowArrayToAugmentedMatrix3(augmentedRowArray);
    }
    swapRow(row1, row2) {
        const tempRow = this.getAugmentedRow(row1);
        return this.replaceRow(row1, this.getAugmentedRow(row2)).replaceRow(row2, tempRow);
    }
    firstGaussianElimination() {
        const R1 = this.getAugmentedRow(1);
        const R2 = this.getAugmentedRow(2);
        const R3 = this.getAugmentedRow(3);
        if (R1.firstNonZeroEntryColumn() != 1) {
            console.log("pivot of first row is not 1");
            return new AugmentedMatrix3();
        }
        let new_R2 = R2;
        let new_R3 = R3;
        if (R2.firstNonZeroEntryColumn() == 1) {
            new_R2 = gaussianEliminationRow(R1, R2);
        }
        if (R3.firstNonZeroEntryColumn() == 1) {
            new_R3 = gaussianEliminationRow(R1, R3);
        }
        let eliminatedMatrix = rowToAugmentedMatrix3(R1, new_R2, new_R3);
        if (new_R2.firstNonZeroEntryColumn() < new_R3.firstNonZeroEntryColumn()) {
            eliminatedMatrix = eliminatedMatrix.swapRow(2, 3);
        }
        return eliminatedMatrix;
    }
    secondGaussianElimination() {
        let R1 = this.getAugmentedRow(1);
        let R2 = this.getAugmentedRow(2);
        let R3 = this.getAugmentedRow(3);
        if (R2.firstNonZeroEntryColumn() != 2 && R3.firstNonZeroEntryColumn() == 2) {
            let temp = R2;
            R2 = R3;
            R3 = temp;
        }
        else if (R2.firstNonZeroEntryColumn() != 2) {
            console.log("pivot of second row is not 2");
            return new AugmentedMatrix3();
        }
        let new_R3 = R3;
        if (R3.firstNonZeroEntryColumn() == 2) {
            new_R3 = gaussianEliminationRow(R2, R3);
        }
        return rowToAugmentedMatrix3(R1, R2, new_R3);
    }
    gaussianElimination() {
        return this.firstGaussianElimination().secondGaussianElimination();
    }
}
export function HCF(num1, num2) {
    if (num2 == 0) {
        return num1;
    }
    return HCF(num2, num1 % num2);
}
export function LCM(num1, num2) {
    if (num1 != 0 && num2 != 0) {
        return Math.abs(Math.abs(num1 * num2) / HCF(num1, num2));
    }
    return 0;
}
export function getRandomAugmentedMatrix3(max = 10, ensure_unique_solution = false) {
    let coefficientMatrix = getRandomMatrix3(max);
    if (ensure_unique_solution) {
        while (!coefficientMatrix.isInvertible() || coefficientMatrix.a1 == 0 || coefficientMatrix.hasSameFirstTwoColumns()) {
            coefficientMatrix = getRandomMatrix3(max);
        }
    }
    const a4 = getRandomNumber(max);
    const b4 = getRandomNumber(max);
    const c4 = getRandomNumber(max);
    return coefficientMatrixToAugmentedMatrix3(coefficientMatrix, a4, b4, c4);
}
export function arrayToAugmentedRow3(augmentedRowArray) {
    return new AugmentedRow3(augmentedRowArray[0], augmentedRowArray[1], augmentedRowArray[2], augmentedRowArray[3]);
}
export function coefficientMatrixToAugmentedMatrix3(coefficientMatrix, a4, b4, c4) {
    return new AugmentedMatrix3(coefficientMatrix.a1, coefficientMatrix.a2, coefficientMatrix.a3, a4, coefficientMatrix.b1, coefficientMatrix.b2, coefficientMatrix.b3, b4, coefficientMatrix.c1, coefficientMatrix.c2, coefficientMatrix.c3, c4);
}
export function rowArrayToAugmentedMatrix3(augmentedRowArray) {
    if (augmentedRowArray.length != 3) {
        console.log("array length is not 3");
        return new AugmentedMatrix3();
    }
    return rowToAugmentedMatrix3(augmentedRowArray[0], augmentedRowArray[1], augmentedRowArray[2]);
}
export function rowToAugmentedMatrix3(R1, R2, R3) {
    return new AugmentedMatrix3(R1.a1, R1.a2, R1.a3, R1.a4, R2.a1, R2.a2, R2.a3, R2.a4, R3.a1, R3.a2, R3.a3, R3.a4);
}
export function gaussianEliminationRow(row1, row2) {
    const pivot1 = row1.firstNonZeroEntry();
    const pivot2 = row2.firstNonZeroEntry();
    if (row1.firstNonZeroEntryColumn() != row2.firstNonZeroEntryColumn()) {
        console.log("rows have unmatched nonzero column numbers");
    }
    // same leading coefficient
    const pivotLCM = LCM(pivot1, pivot2);
    const R1 = row1.scale(pivotLCM / pivot1);
    const R2 = row2.scale(pivotLCM / pivot2);
    // elimination
    if (R1.firstNonZeroEntry() == R2.firstNonZeroEntry()) { // subtraction
        return R1.minus(R2);
    }
    else if (R1.firstNonZeroEntry() == -R2.firstNonZeroEntry()) { // addition
        return R1.add(R2);
    }
    else {
        console.log("not same leading coefficient");
        return new AugmentedRow3();
    }
}
const testRow1 = new AugmentedRow3(0, 1, 1, 2);
const testRow2 = new AugmentedRow3(0, 2, 3, 4);
const testAugmentedMatrix = new AugmentedMatrix3(2, -1, 1, 3, 1, 1, 1, 6, 1, 2, -1, 2);
console.log(gaussianEliminationRow(testRow1, testRow2));
console.log(testAugmentedMatrix.getSolution());
console.log(testAugmentedMatrix.gaussianElimination().displayToString());
