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
    isSameDirectionAs(V) {
        return (this.dotProduct(V) > 0);
    }
    isDiffDirectionAs(V) {
        return (this.dotProduct(V) < 0);
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
    displayToBasisComponent() {
        const i_coeff = getCoeff(this.a1, false);
        const j_coeff = getCoeff(this.b1, true);
        const k_coeff = getCoeff(this.c1, true);
        return `${i_coeff}i` + ` ${j_coeff}j` + ` ${k_coeff}k`;
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
            return (this.a1 == 0 && (new Vector2(V.b1, V.c1)).isParallel(new Vector2(this.b1, this.c1)));
        }
        else if (V.b1 == 0) {
            return (this.b1 == 0 && (new Vector2(V.a1, V.c1)).isParallel(new Vector2(this.a1, this.c1)));
        }
        else if (V.c1 == 0) {
            return (this.c1 == 0 && (new Vector2(V.a1, V.b1)).isParallel(new Vector2(this.a1, this.b1)));
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
    isSameDirectionAs(V) {
        return (this.dotProduct(V) > 0);
    }
    isDiffDirectionAs(V) {
        return (this.dotProduct(V) < 0);
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
    angleWithPlaneInDegrees(P) {
        const normalVector = P.normalVector();
        const dot_product = this.dotProduct(normalVector);
        if (dot_product != 0) {
            const angle = 90 - this.includedAngleInDegrees(normalVector);
            return (Math.abs(angle));
        }
        return 0;
    }
    isCoplanarWith(P) {
        const normalVector = P.normalVector();
        return (this.isPerpendicularTo(normalVector));
    }
    getNormalProjectionToPlane(P) {
        const unitNormalVector = P.normalVector().getUnitVector();
        const mag = this.dotProduct(unitNormalVector);
        return unitNormalVector.scale(mag);
    }
    getVectorToProjectionOnPlane(P) {
        const normalProjection = this.getNormalProjectionToPlane(P);
        return this.minus(normalProjection);
    }
}
export class Plane {
    constructor(V1 = new Vector3(), V2 = new Vector3()) {
        this.V1 = V1;
        this.V2 = V2;
    }
    equals(P) {
        const cross1 = this.normalVector();
        const cross2 = P.normalVector();
        return cross1.isParallel(cross2);
    }
    normalVector() {
        return this.V1.crossProduct(this.V2);
    }
}
export function getCoeff(num, with_sign = false) {
    let coeff = Math.abs(num).toString();
    let sign = "-";
    if (num >= 0 && with_sign) {
        sign = "+";
    }
    else if (num >= 0) {
        sign = "";
    }
    if (Math.abs(num) == 1) {
        coeff = "";
    }
    return sign + " " + coeff;
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
export function volumeOfIncludedTetrahedron(V1, V2, V3) {
    const VA = V1;
    const VB = V2;
    const VC = V3;
    const VBC = new Plane(VB, VC);
    const triangleArea = 0.5 * VB.crossProduct(VC).magnitude();
    const height = VA.getNormalProjectionToPlane(VBC).magnitude();
    console.log(triangleArea);
    console.log(height);
    return height * triangleArea / 3;
}
export function volumeOfTetrahedron(V1, V2, V3, V4) {
    const V = V1;
    const A = V2;
    const B = V3;
    const C = V4;
    const VA = V.getVectorTo(A);
    const VB = V.getVectorTo(B);
    const VC = V.getVectorTo(C);
    return volumeOfIncludedTetrahedron(VA, VB, VC);
}
// const testVector1 = new Vector3(2, 3, 1)
// const testVector2 = new Vector3(0, -2, 4)
// const testVector3 = new Vector3(3, 1, -2)
// const AB = testVector1.getVectorTo(testVector2);
// const AC = testVector1.getVectorTo(testVector3);
// const V = new Vector3(4, 0, 8)
// const AV = testVector1.getVectorTo(V);
// const ABC = new Plane(AB, AC)
// console.log(AB.crossProduct(AC))
// console.log(AV.angleWithPlaneInDegrees(ABC));
// const A = new Vector3(-2, -5, 0)
// const B = new Vector3(-1, 1, 1)
// const C = new Vector3(1, -5, -3)
// const D = new Vector3(4, 4, -3)
// const AB = A.getVectorTo(B);
// const BC = B.getVectorTo(C);
// const AD = A.getVectorTo(D);
// const ABC = new Plane(AB, BC)
// console.log(AB.crossProduct(BC).getUnitVector())
// console.log(AB.crossProduct(AD).getUnitVector())
// console.log(AD.isCoplanarWith(ABC));
// const A = new Vector3(-6, 7, -2)
// const B = new Vector3(-1, -13, 3)
// const C = new Vector3(9, -3, -12)
// const D = new Vector3(5, -1, 0)
// const E = new Vector3(0, 9, 0)
// const AB = A.getVectorTo(B);
// const AC = A.getVectorTo(C);
// const AD = A.getVectorTo(D);
// const BD = B.getVectorTo(D);
// const ABC = new Plane(AB, AC);
// console.log(AB.crossProduct(AC).getUnitVector())
// console.log(BD.getNormalProjectionToPlane(ABC).roundElements())
// console.log(D.getVectorToProjectionOnPlane(ABC).roundElements())
// const A1 = new Vector3(3, -4, 5);
// const B1 = new Vector3(5, -8, -7);
// const C1 = new Vector3(7, 0, -1);
// const V1 = new Vector3(24, -13, 2);
// console.log(volumeOfTetrahedron(V1, A1, B1, C1));
