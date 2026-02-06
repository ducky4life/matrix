export class Vector {
    // a1
    // b1

    a1: number;
    b1: number;

    constructor(a=0,b=0) {
        this.a1 = a;
        this.b1 = b;
    }

    display(): Array<number> {
        return [this.a1, this.b1];
    }

    displayToString(): string {
        return `[${this.a1}, ${this.b1}]`;
    }

    displayToHTML(): string{
        return(`
            <div class="matrix-container">
                <div class="vector">
                    <div>${this.a1}</div>
                    <div>${this.b1}</div>
                </div>
            </div>`)
    }

    roundElements(digits: number = 2): Vector {
        const a1 = Number(this.a1.toFixed(digits));
        const b1 = Number(this.b1.toFixed(digits));

        return new Vector(a1, b1);
    }
}

export class Matrix2 {
    // a1 a1
    // b1 b2
    a1: number;
    a2: number;
    b1: number;
    b2: number;

    constructor(a=0,b=0,c=0,d=0) {
        this.a1 = a;
        this.a2 = b;
        this.b1 = c;
        this.b2 = d;
    }

    display(): Array<number> {
        return([this.a1,this.a2,this.b1,this.b2]);
    }

    displayToString(): string {
        return(`[${this.a1}, ${this.a2}, ${this.b1}, ${this.b2}]`)
    }

    displayToLaTeX(): string {
        return(`\\begin{pmatrix}${this.a1} & ${this.a2} \\\\ ${this.b1} & ${this.b2} \\end{pmatrix}`)
    }

    displayToHTML(): string {
        return(`
            <div class="matrix-container">
                <div class="matrix-2">
                    <div>${this.a1}</div><div>${this.a2}</div>
                    <div>${this.b1}</div><div>${this.b2}</div>
                </div>
            </div>`)
    }

    roundElements(digits: number = 2): Matrix2 {
        const matrixArray = this.display();
        const roundedMatrixArray: Array<number> = [];

        matrixArray.forEach((matrixElement) => {
            roundedMatrixArray.push(Number(matrixElement.toFixed(digits)));
        })

        return arrayToMatrix2(roundedMatrixArray);
    }

    add(M: Matrix2): Matrix2 {
        return new Matrix2(this.a1+M.a1, this.a2+M.a2, this.b1+M.b1, this.b2+M.b2);
    }

    minus(M: Matrix2): Matrix2 {
        return new Matrix2(this.a1-M.a1, this.a2-M.a2, this.b1-M.b1, this.b2-M.b2);
    }

    multiply(M: Matrix2): Matrix2 {
        return new Matrix2(this.a1*M.a1+this.a2*M.b1, this.a1*M.a2+this.a2*M.b2, this.b1*M.a1+this.b2*M.b1, this.b1*M.a2+this.b2*M.b2);
    }

    determinant(): number {
        return(this.a1*this.b2 - this.a2*this.b1);
    }

    minor(row: number, column: number): number {
        // get the element with diff row and column than input element
        // if input 1 then 2, if 2 then 1
        const element = getRowName(3-row) + getColumnName(3-column);
        return((this as any)[element]);
    }

    cofactor(row: number, column: number): number {
        let coefficient = 1;
        if ((row+column)%2 != 0) {
            coefficient = -1;
        }

        return(this.minor(row, column)*coefficient)
    }

    isInvertible(): boolean {
        if (this.determinant() == 0) {
            return false;
        }
        return true;
    }

    transpose(): Matrix2 {
        return new Matrix2(
            this.a1, this.b1,
            this.a2, this.b2
        );
    }

    adjoint(): Matrix2 {
        return new Matrix2(
            this.b2, -this.a2,
            -this.b1, this.a1
        );
    }

    
    inverse(round_elements: boolean = true): Matrix2 {

        if (this.isInvertible()) {
            const detScalingMatrix: Matrix2 = scalarToMatrix2(1/this.determinant());
            const inverseMatrix: Matrix2 = detScalingMatrix.multiply(this.adjoint());
            if (round_elements) {
                return inverseMatrix.roundElements();
            }
            return inverseMatrix;
        }

        console.log("not invertible");
        return new Matrix2();
    }

    numberOfEigenvalues(): number {
        const discriminant = (this.a1 + this.b2)*(this.a1 + this.b2) - 4*(this.determinant());
        if (discriminant > 0) {
            return 2;
        }
        else if (discriminant == 0) {
            return 1;
        }
        return 0;
    }

    eigenvalues(): Array<number> {
        const discriminant = (this.a1 + this.b2)*(this.a1+ this.b2) - 4*(this.determinant());
        let eigenvalueArray: Array<number> = [];
        if (discriminant > 0) {
            eigenvalueArray = [
                ((this.a1+this.b2) + Math.sqrt(discriminant))/2,
                ((this.a1+this.b2) - Math.sqrt(discriminant))/2,
            ];
        }
        else if (discriminant == 0) {
            eigenvalueArray = [
                ((this.a1+this.b2)/2)
            ]
        }
        return eigenvalueArray;
    }

    eigenvectors(round_elements: boolean = true): Array<Vector> {

        const eigenvaluesArray = this.eigenvalues();
        let eigenvectorsArray: Array<Vector> = [];

        eigenvaluesArray.forEach((eigenvalue) => {
            let V_a1: number, V_b1: number;

            // try to get eigenvector from column 1
            V_a1 = this.a1 - eigenvalue;
            V_b1 = this.b1;

            // if (0, 0), try column 2
            if (V_a1 == 0 && V_b1 == 0) {
                V_a1 = this.a2;
                V_b1 = this.b2 - eigenvalue;
            }
            
            const eigenvector = new Vector(V_a1, V_b1);
            const simplifiedVector = simplifyEigenvector(eigenvector);
            if (round_elements) {
                eigenvectorsArray.push(simplifiedVector.roundElements());
            }
            else {
                eigenvectorsArray.push(simplifiedVector);
            }
        })

        return eigenvectorsArray;
    }

    eigenbasis(): Matrix2 {

        const eigenvectorsArray = this.eigenvectors(false);

        if (eigenvectorsArray.length == 2) {
            const eigenvector_1 = eigenvectorsArray[0];
            const eigenvector_2 = eigenvectorsArray[1];

            return new Matrix2(
                eigenvector_1.a1, eigenvector_2.a1,
                eigenvector_1.b1, eigenvector_2.b1
            );
        }

        console.log("no eigenbasis");
        return new Matrix2();
    }

    isDiagonal(): boolean {
        if (this.a2 == 0 && this.b1 == 0) {
            return true;
        }
        return false;
    }

    changeBasis(basis: Matrix2): Matrix2 {
        if (!basis.isInvertible()) { console.log("attempted to change to non-invertible basis"); }
        const basisInverse = basis.inverse();

        // basis^(-1) * matrix * basis
        return basisInverse.multiply(this.multiply(basis));
    }

    changeOfBasisExponentiation(eigenbasis: Matrix2, power: number): Matrix2 {

        if (power == 0) {
            return scalarToMatrix2(1); // identity matrix
        }

        const eigenbasisInverse = eigenbasis.inverse();

        // basis^(-1) * matrix * basis
        const changedBasis = this.changeBasis(eigenbasis).roundElements(4);

        if (changedBasis.isDiagonal()) {

            // calculate exponentiation
            const changedBasisArray: Array<number> = changedBasis.display();
            const exponentiatedArray: Array<number> = [];

            changedBasisArray.forEach((element) => {
                exponentiatedArray.push(Math.pow(element, Math.abs(power)));
            })

            const exponentiatedMatrix: Matrix2 = arrayToMatrix2(exponentiatedArray);
            
            // undo changing basis: basis * changedBasis * basis^(-1)
            const initialBasis = exponentiatedMatrix.changeBasis(eigenbasisInverse);

            if (power < 0) { // A^(-n) = (A^n)^(-1)
                return initialBasis.inverse();
            }
            return initialBasis;
        }

        console.log("matrix is not diagonal");
        return new Matrix2();
    }

    multiplicationExponentiation(power: number): Matrix2 {
        let exponentiatedMatrix: Matrix2 = this;

        if (power == 0) {
            return scalarToMatrix2(1);
        }

        for (let i=1; i<Math.abs(power); i++) {
            exponentiatedMatrix = exponentiatedMatrix.multiply(this);
        }

        if (power<0) {
            return exponentiatedMatrix.inverse();
        }

        return exponentiatedMatrix;
    }
}

// const testMatrix = new Matrix2(1,2,3,2);
// const testBasis = testMatrix.eigenbasis();

// console.log(testMatrix.eigenvectors());
// console.log(testMatrix.changeBasis(testBasis))
// console.log(testMatrix.inverse().multiply(testMatrix.inverse()).roundElements())
// console.log(testMatrix.changeOfBasisExponentiation(testBasis, 100).roundElements())
// console.log(testMatrix.multiplicationExponentiation(1000))
// console.log(testMatrix.multiply(testMatrix).multiply(testMatrix))
// console.log(new Matrix2(1, 2, 0, 1).numberOfEigenvalues());

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

    roundElements(digits: number = 2): Matrix3 {
        const matrixArray = this.display();
        const roundedMatrixArray: Array<number> = [];

        matrixArray.forEach((matrixElement) => {
            roundedMatrixArray.push(Number(matrixElement.toFixed(digits)));
        })

        return arrayToMatrix3(roundedMatrixArray);
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
    
    minor(row: number, column: number): number {
        const row_name = getRowName(row);

        const rows = ["a", "b", "c"];
        const columns = [1, 2, 3];
        
        const submatrix_rows = [];
        const submatrix_columns = [];
        for (let i=0; i<3; i++) {
            if (rows[i] != row_name) {
                submatrix_rows.push(rows[i]);
            }
            
            if (columns[i] != column) {
                submatrix_columns.push(columns[i]);
            }
        }
        
        const a1: number = (this as any)[submatrix_rows[0] + submatrix_columns[0]];
        const a2: number = (this as any)[submatrix_rows[0] + submatrix_columns[1]];
        const b1: number = (this as any)[submatrix_rows[1] + submatrix_columns[0]];
        const b2: number = (this as any)[submatrix_rows[1] + submatrix_columns[1]];
        
        const submatrix: Matrix2 = new Matrix2(a1, a2, b1, b2);
        
        return submatrix.determinant();
    }

    cofactor(row: number, column: number): number {
        const element = getRowName(row) + getColumnName(column);
        const even_elements = ["a1", "a3", "b2", "c1", "c3"];
        let coefficient: number;
        
        if (even_elements.includes(element)) {
            coefficient = 1;
        }
        else {
            coefficient = -1;
        }
        
        return this.minor(row, column)*coefficient;
    }
    
    isInvertible(): boolean {
        if (this.determinant() == 0) {
            return false;
        }
        return true;
    }
    
    transpose(): Matrix3 {
        return new Matrix3(
            this.a1, this.b1, this.c1,
            this.a2, this.b2, this.c2,
            this.a3, this.b3, this.c3
        );
    }
    
    adjoint(): Matrix3 {
        const cofactorArray: Array<number> = [];
        
        for (let row=1; row<=3; row++) {

            for (let column=1; column<=3; column++) {
                const elementCofactor = this.cofactor(row, column);
                cofactorArray.push(elementCofactor);
            }
            
        }

        const cofactorMatrix: Matrix3 = new Matrix3(
            cofactorArray[0], cofactorArray[1], cofactorArray[2],
            cofactorArray[3], cofactorArray[4], cofactorArray[5],
            cofactorArray[6], cofactorArray[7], cofactorArray[8]
        );

        return cofactorMatrix.transpose();
    }

    inverse(round_elements: boolean = true): Matrix3 {

        if (this.isInvertible()) {
            const detScalingMatrix: Matrix3 = scalarToMatrix3(1/this.determinant());
            const inverseMatrix: Matrix3 = detScalingMatrix.multiply(this.adjoint());
            if (round_elements) {
                return inverseMatrix.roundElements();
            }
            return inverseMatrix;
        }

        console.log("matrix is not invertible");
        return new Matrix3();
    }

    multiplicationExponentiation(power: number): Matrix3 {
        let exponentiatedMatrix: Matrix3 = this;

        if (power == 0) {
            return scalarToMatrix3(1);
        }

        for (let i=1; i<Math.abs(power); i++) {
            exponentiatedMatrix = exponentiatedMatrix.multiply(this);
        }

        if (power<0) {
            return exponentiatedMatrix.inverse();
        }

        return exponentiatedMatrix;
    }
}

// console.log(new Matrix3(3,2,4,5,2,4,6,3,3).multiplicationExponentiation(3000))

export function eigenvaluesToString(eigenvalues: Array<number>): string {
    let eigenvalueString = "";

    eigenvalues.forEach((eigenvalue) => {
        eigenvalueString += eigenvalue.toFixed(2);
        eigenvalueString += ", ";
    })

    return eigenvalueString.slice(0, -2);
}

export function eigenvectorsToString(eigenvectors: Array<Vector>): string {
    let eigenvectorString = "";

    eigenvectors.forEach((eigenvector) => {
        eigenvectorString += eigenvector.displayToHTML();
    })

    return eigenvectorString;
}

export function simplifyEigenvector(eigenvector: Vector): Vector {
    let a = eigenvector.a1;
    let b = eigenvector.b1;

    if (a<0 && b<0) {
        a = -a;
        b = -b;
    }

    if (a==0) {
        return new Vector(0, 1);
    }

    if (b==0) {
        return new Vector(1, 0);
    }

    // take out common factors

    const smaller = Math.min(Math.abs(a),Math.abs(b));

    for (let i=smaller; i>1; i--) {
        if (a%i == b%i && a%i == 0) {
            a = a/i;
            b = b/i;
            break;
        }
    }

    return new Vector(a, b);
}

export function scalarToMatrix2(scalar: number): Matrix2 {
    return new Matrix2(
        scalar, 0,
        0, scalar
    );
}

export function scalarToMatrix3(scalar: number) {
    return new Matrix3(
        scalar, 0, 0,
        0, scalar, 0,
        0, 0, scalar
    );
}

export function arrayToMatrix2(A: Array<number>) {
    if (A.length == 4) {
        return new Matrix2(A[0], A[1], A[2], A[3]);
    }
    console.log("length of array is not 4");
    return new Matrix2();
}

export function arrayToMatrix3(A: Array<number>) {
    if (A.length == 9) {
        return new Matrix3(
            A[0], A[1], A[2],
            A[3], A[4], A[5],
            A[6], A[7], A[8]
        );
    }
    console.log("length of array is not 9");
    return new Matrix3();
}

export function getRowName(row: number) {
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

export function getColumnName(column: number) {
    return column.toString();
}

export function getRandomMatrix2(max: number = 10) {
    max = max + 1;

    const a = Math.floor(Math.random() * max);
    const b = Math.floor(Math.random() * max);
    const c = Math.floor(Math.random() * max);
    const d = Math.floor(Math.random() * max);

    const M = new Matrix2(a,b,c,d);
    return M;
}

export function getRandomMatrix3(max: number = 10) {
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

    const M = new Matrix3(a1,a2,a3,b1,b2,b3,c1,c2,c3);
    return M;
}

export function getAnswerMatrix(M1: Matrix2|Matrix3, M2: Matrix2|Matrix3, operation: number): Matrix2|Matrix3 {

    switch (operation) {
        case 0:
            return (M1 as any).add(M2);

        case 1:
            return (M1 as any).minus(M2);

        case 2:
            return (M1 as any).multiply(M2);

        default:
            return (M1 as any).multiply(M2);

    }
}