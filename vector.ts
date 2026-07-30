import { Matrix2, Matrix3, roundNumber } from "./matrix.js";

export class Vector2 {
    // a1
    // b1

    a1: number;
    b1: number;

    constructor(a=0,b=0) {
        this.a1 = a;
        this.b1 = b;
    }

    equals(V: Vector2): boolean {
        if (this.a1 == V.a1 && this.b1 == V.b1) {
            return true;
        }
        return false;
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
                    <div class="matrix-elements">${this.a1}</div>
                    <div class="matrix-elements">${this.b1}</div>
                </div>
            </div>`)
    }

    roundElements(digits: number = 2): Vector2 {
        const a1 = Number(this.a1.toFixed(digits));
        const b1 = Number(this.b1.toFixed(digits));

        return new Vector2(a1, b1);
    }

    add(V: Vector2): Vector2 {
        return new Vector2(this.a1+V.a1, this.b1+V.b1);
    }

    minus(V: Vector2): Vector2 {
        return new Vector2(this.a1-V.a1, this.b1-V.b1);
    }

    getVectorTo(V: Vector2): Vector2 {
        return V.minus(this);
    }

    magnitude(round: boolean = false): number {
        const mag = Number(Math.sqrt(this.a1*this.a1+this.b1*this.b1));
        if (round) {
            return roundNumber(mag, 2);
        }
        return mag;
    }

    scale(scalar: number): Vector2 {
        return new Vector2(this.a1*scalar, this.b1*scalar);
    }

    isParallel(V: Vector2): boolean {
        if (V.a1 == 0) {
            return (this.a1 == 0);
        }
        else if (V.b1 == 0) {
            return (this.b1 == 0);
        }
        return (this.a1/V.a1 == this.b1/V.b1);
    }

    dotProduct(V: Vector2): number {
        const dot_product = this.a1*V.a1 + this.b1*V.b1;
        return dot_product;
    }

    isPerpendicularTo(V: Vector2): boolean {
        return (this.dotProduct(V) == 0);
    }

    includedAngleInRadians(V: Vector2): number {
        const cos_theta = this.dotProduct(V)/(this.magnitude()*V.magnitude());
        return Math.acos(cos_theta);
    }

    includedAngleInDegrees(V: Vector2): number {
        return (this.includedAngleInRadians(V)*180/Math.PI);
    }

    getUnitVector(): Vector2 {
        const mag = this.magnitude();
        return new Vector2(this.a1/mag, this.b1/mag);
    }

    projectOnto(V: Vector2): Vector2 {
        const mag = this.dotProduct(V)/V.magnitude();
        return V.getUnitVector().scale(mag);
    }

    projectionMagnitude(project_onto: Vector2): number {
        return Math.abs(this.dotProduct(project_onto)/project_onto.magnitude());
    }

    crossProductMagnitude(V: Vector2): number {
        const M = vectorToMatrix2(this, V);
        return Math.abs(M.determinant());
    }
}

export class Vector3 {
    // a1
    // b1
    // c1

    a1: number;
    b1: number;
    c1: number

    constructor(a=0,b=0,c=0) {
        this.a1 = a;
        this.b1 = b;
        this.c1 = c;
    }

    equals(V: Vector3): boolean {
        if (this.a1 == V.a1 && this.b1 == V.b1 && this.c1 == V.c1) {
            return true;
        }
        return false;
    }

    display(): Array<number> {
        return [this.a1, this.b1, this.c1];
    }

    displayToString(): string {
        return `[${this.a1}, ${this.b1}, ${this.c1}]`;
    }

    displayToHTML(): string{
        return(`
            <div class="matrix-container">
                <div class="vector">
                    <div class="matrix-elements">${this.a1}</div>
                    <div class="matrix-elements">${this.b1}</div>
                    <div class="matrix-elements">${this.c1}</div>
                </div>
            </div>`)
    }

    roundElements(digits: number = 2): Vector3 {
        const a1 = Number(this.a1.toFixed(digits));
        const b1 = Number(this.b1.toFixed(digits));
        const c1 = Number(this.c1.toFixed(digits));

        return new Vector3(a1, b1, c1);
    }

    add(V: Vector3): Vector3 {
        return new Vector3(this.a1+V.a1, this.b1+V.b1, this.c1+V.c1);
    }

    minus(V: Vector3): Vector3 {
        return new Vector3(this.a1-V.a1, this.b1-V.b1, this.c1-V.c1);
    }

    getVectorTo(V: Vector3): Vector3 {
        return V.minus(this);
    }

    magnitude(round: boolean = false): number {
        const mag = Math.sqrt(this.a1*this.a1+this.b1*this.b1+this.c1*this.c1);
        if (round) {
            return roundNumber(mag, 2);
        }
        return mag;
    }

    scale(scalar: number): Vector3 {
        return new Vector3(this.a1*scalar, this.b1*scalar, this.c1*scalar);
    }

    isParallel(V: Vector3): boolean {
        if (V.a1 == 0) {
            return (this.a1 == 0 && (new Vector2(V.b1, V.c1)).isParallel(new Vector2(this.b1, this.c1)));
        }
        else if (V.b1 == 0) {
            return (this.b1 == 0 && (new Vector2(V.a1, V.c1)).isParallel(new Vector2(this.a1, this.c1)));
        }
        else if (V.c1 == 0) {
            return (this.c1 == 0 && (new Vector2(V.a1, V.b1)).isParallel(new Vector2(this.a1, this.b1)));
        }
        return (this.a1/V.a1 == this.b1/V.b1 && this.a1/V.a1 == this.c1/V.c1);
    }

    dotProduct(V: Vector3): number {
        const dot_product = this.a1*V.a1 + this.b1*V.b1 + this.c1*V.c1;
        return dot_product;
    }

    isPerpendicularTo(V: Vector3): boolean {
        return (this.dotProduct(V) == 0);
    }

    includedAngleInRadians(V: Vector3): number {
        const cos_theta = this.dotProduct(V)/(this.magnitude()*V.magnitude());
        return Math.acos(cos_theta);
    }

    includedAngleInDegrees(V: Vector3): number {
        return (this.includedAngleInRadians(V)*180/Math.PI);
    }

    getUnitVector(): Vector3 {
        const mag = this.magnitude();
        return new Vector3(this.a1/mag, this.b1/mag, this.c1/mag);
    }

    projectOnto(V: Vector3): Vector3 {
        const mag = this.dotProduct(V)/V.magnitude();
        return V.getUnitVector().scale(mag);
    }

    projectionMagnitude(project_onto: Vector3): number {
        return Math.abs(this.dotProduct(project_onto)/project_onto.magnitude());
    }

    crossProduct(V: Vector3): Vector3 {
        const crossProductMatrix = getCrossProductMatrix(this, V);
        const i = crossProductMatrix.cofactor(1, 1);
        const j = crossProductMatrix.cofactor(1, 2);
        const k = crossProductMatrix.cofactor(1, 3);

        return new Vector3(i, j, k);
    }
}

export function vectorToMatrix2(V1: Vector2, V2: Vector2) {
    return new Matrix2(
        V1.a1, V2.a1,
        V1.b1, V2.b1
    );
}

export function vectorToMatrix3(V1: Vector3, V2: Vector3, V3: Vector3) {
    return new Matrix3(
        V1.a1, V2.a1, V3.a1,
        V1.b1, V2.b1, V3.b1,
        V1.c1, V2.c1, V3.c1
    );
}

export function getCrossProductMatrix(V1: Vector3, V2: Vector3) {
    return new Matrix3(
        1, 1, 1,
        V1.a1, V1.b1, V1.c1,
        V2.a1, V2.b1, V2.c1
    );
}

const testVector1 = new Vector2(3, 4)
const testVector2 = new Vector2(1, 0)
console.log(testVector1.crossProductMagnitude(testVector2))