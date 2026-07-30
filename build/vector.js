import { Matrix2, Matrix3, roundNumber } from "./matrix.js";
export class Vector2 {
    constructor(a = 0, b = 0) {
        this.a1 = a;
        this.b1 = b;
    }
    equals(V) {
        if (this.a1 == V.a1 && this.b1 == V.b1) {
            return true;
        }
        return false;
    }
    display() {
        return [this.a1, this.b1];
    }
    displayToString() {
        return `[${this.a1}, ${this.b1}]`;
    }
    displayToHTML() {
        return (`
            <div class="matrix-container">
                <div class="vector">
                    <div class="matrix-elements">${this.a1}</div>
                    <div class="matrix-elements">${this.b1}</div>
                </div>
            </div>`);
    }
    roundElements(digits = 2) {
        const a1 = Number(this.a1.toFixed(digits));
        const b1 = Number(this.b1.toFixed(digits));
        return new Vector2(a1, b1);
    }
    add(V) {
        return new Vector2(this.a1 + V.a1, this.b1 + V.b1);
    }
    minus(V) {
        return new Vector2(this.a1 - V.a1, this.b1 - V.b1);
    }
    getVectorTo(V) {
        return V.minus(this);
    }
    magnitude(round = false) {
        const mag = Number(Math.sqrt(this.a1 * this.a1 + this.b1 * this.b1));
        if (round) {
            return roundNumber(mag, 2);
        }
        return mag;
    }
    scale(scalar) {
        return new Vector2(this.a1 * scalar, this.b1 * scalar);
    }
    isParallel(V) {
        if (V.a1 == 0) {
            return (this.a1 == 0);
        }
        else if (V.b1 == 0) {
            return (this.b1 == 0);
        }
        return (this.a1 / V.a1 == this.b1 / V.b1);
    }
    dotProduct(V) {
        const dot_product = this.a1 * V.a1 + this.b1 * V.b1;
        return dot_product;
    }
    isPerpendicularTo(V) {
        return (this.dotProduct(V) == 0);
    }
    includedAngleInRadians(V) {
        const cos_theta = this.dotProduct(V) / (this.magnitude() * V.magnitude());
        return Math.acos(cos_theta);
    }
    includedAngleInDegrees(V) {
        return (this.includedAngleInRadians(V) * 180 / Math.PI);
    }
    getUnitVector() {
        const mag = this.magnitude();
        return new Vector2(this.a1 / mag, this.b1 / mag);
    }
    projectOnto(V) {
        const mag = this.dotProduct(V) / V.magnitude();
        return V.getUnitVector().scale(mag);
    }
    projectionMagnitude(project_onto) {
        return Math.abs(this.dotProduct(project_onto) / project_onto.magnitude());
    }
    crossProductMagnitude(V) {
        const M = vectorToMatrix2(this, V);
        return Math.abs(M.determinant());
    }
}
export class Vector3 {
    constructor(a = 0, b = 0, c = 0) {
        this.a1 = a;
        this.b1 = b;
        this.c1 = c;
    }
    equals(V) {
        if (this.a1 == V.a1 && this.b1 == V.b1 && this.c1 == V.c1) {
            return true;
        }
        return false;
    }
    display() {
        return [this.a1, this.b1, this.c1];
    }
    displayToString() {
        return `[${this.a1}, ${this.b1}, ${this.c1}]`;
    }
    displayToHTML() {
        return (`
            <div class="matrix-container">
                <div class="vector">
                    <div class="matrix-elements">${this.a1}</div>
                    <div class="matrix-elements">${this.b1}</div>
                    <div class="matrix-elements">${this.c1}</div>
                </div>
            </div>`);
    }
    roundElements(digits = 2) {
        const a1 = Number(this.a1.toFixed(digits));
        const b1 = Number(this.b1.toFixed(digits));
        const c1 = Number(this.c1.toFixed(digits));
        return new Vector3(a1, b1, c1);
    }
    add(V) {
        return new Vector3(this.a1 + V.a1, this.b1 + V.b1, this.c1 + V.c1);
    }
    minus(V) {
        return new Vector3(this.a1 - V.a1, this.b1 - V.b1, this.c1 - V.c1);
    }
    getVectorTo(V) {
        return V.minus(this);
    }
    magnitude(round = false) {
        const mag = Math.sqrt(this.a1 * this.a1 + this.b1 * this.b1 + this.c1 * this.c1);
        if (round) {
            return roundNumber(mag, 2);
        }
        return mag;
    }
    scale(scalar) {
        return new Vector3(this.a1 * scalar, this.b1 * scalar, this.c1 * scalar);
    }
    isParallel(V) {
        if (V.a1 == 0) {
            return (this.a1 == 0);
        }
        else if (V.b1 == 0) {
            return (this.b1 == 0);
        }
        else if (V.c1 == 0) {
            return (this.c1 == 0);
        }
        return (this.a1 / V.a1 == this.b1 / V.b1 && this.a1 / V.a1 == this.c1 / V.c1);
    }
    dotProduct(V) {
        const dot_product = this.a1 * V.a1 + this.b1 * V.b1 + this.c1 * V.c1;
        return dot_product;
    }
    isPerpendicularTo(V) {
        return (this.dotProduct(V) == 0);
    }
    includedAngleInRadians(V) {
        const cos_theta = this.dotProduct(V) / (this.magnitude() * V.magnitude());
        return Math.acos(cos_theta);
    }
    includedAngleInDegrees(V) {
        return (this.includedAngleInRadians(V) * 180 / Math.PI);
    }
    getUnitVector() {
        const mag = this.magnitude();
        return new Vector3(this.a1 / mag, this.b1 / mag, this.c1 / mag);
    }
    projectOnto(V) {
        const mag = this.dotProduct(V) / V.magnitude();
        return V.getUnitVector().scale(mag);
    }
    projectionMagnitude(project_onto) {
        return Math.abs(this.dotProduct(project_onto) / project_onto.magnitude());
    }
    crossProduct(V) {
        const crossProductMatrix = getCrossProductMatrix(this, V);
        const i = crossProductMatrix.cofactor(1, 1);
        const j = crossProductMatrix.cofactor(1, 2);
        const k = crossProductMatrix.cofactor(1, 3);
        return new Vector3(i, j, k);
    }
}
export function vectorToMatrix2(V1, V2) {
    return new Matrix2(V1.a1, V2.a1, V1.b1, V2.b1);
}
export function vectorToMatrix3(V1, V2, V3) {
    return new Matrix3(V1.a1, V2.a1, V3.a1, V1.b1, V2.b1, V3.b1, V1.c1, V2.c1, V3.c1);
}
export function getCrossProductMatrix(V1, V2) {
    return new Matrix3(1, 1, 1, V1.a1, V1.b1, V1.c1, V2.a1, V2.b1, V2.c1);
}
const testVector1 = new Vector2(3, 4);
const testVector2 = new Vector2(1, 0);
console.log(testVector1.crossProductMagnitude(testVector2));
