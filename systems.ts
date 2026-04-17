import { Matrix2, Matrix3 } from "./matrix.js";

export class AugmentedMatrix3 {
    // a1 a2 a3 | a4
    // b1 b2 b3 | b4
    // c1 c2 c3 | c4
    
    a1: number;
    a2: number;
    a3: number;
    a4: number;
    b1: number;
    b2: number;
    b3: number;
    b4: number;
    c1: number;
    c2: number;
    c3: number;
    c4: number;
    
    constructor(a1=0,a2=0,a3=0,a4=0,b1=0,b2=0,b3=0,b4=0,c1=0,c2=0,c3=0,c4=0) {
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

    equals(M: Matrix3): boolean {
        if (this.a1 == M.a1 && this.a2 == M.a2 && this.a3 == M.a3 && this.b1 == M.b1 && this.b2 == M.b2 && this.b3 == M.b3 && this.c1 == M.c1 && this.c2 == M.c2 && this.c3 == M.c3 this.a4 == M.a4 && this.b4 == M.b4 this.c4 == M.c4) {
            return true;
        }
        return false;
    }

    getElement(row: number, column: number): number {
        const row_name = getRowName(row);
        const column_name = getColumnName(column);
        
        const element: number = (this as any)[row_name + column_name];
        return element;
    }

    getElementName(row: number, column: number): string {
        const row_name = getRowName(row);
        const column_name = getColumnName(column);

        return row_name+column_name;
    }
    
    display(): Array<number> {
        return([this.a1,this.a2,this.a3,this.a4,this.b1,this.b2,this.b3,this.b4,this.c1,this.c2,this.c3,this.c4]);
    }

    displayToString(): string {
        return(`[${this.a1}, ${this.a2}, ${this.a3}, ${this.a4}, ${this.b1}, ${this.b2}, ${this.b3}, ${this.b4}, ${this.c1}, ${this.c2}, ${this.c3}, ${this.c4}]`);
    }

    getCoefficientMatrix(): Matrix3 {
        return new Matrix3(
            this.a1, this.a2, this.a3,
            this.b1, this.b2, this.b3,
            this.c1, this.c2, this.c3
        );
    }

    hasUniqueSolution(): boolean {
        return this.getCoefficientMatrix().isInvertible();
    }
}
