import { getRandomNumber, Matrix2, Matrix3, roundNumber } from "./matrix.js";
export class Vector2 {
    constructor(a = 0, b = 0) {
        this.a1 = a;
        this.b1 = b;
    }
    equals(V, allow_error = false) {
        if (this.a1 == V.a1 && this.b1 == V.b1) {
            return true;
        }
        else if (allow_error && numberRoughlyEquals(this.a1, V.a1) && numberRoughlyEquals(this.b1, V.b1)) {
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
        const a1 = roundNumber(this.a1, digits);
        const b1 = roundNumber(this.b1, digits);
        return new Vector2(a1, b1);
    }
    getElement(row) {
        if (row == 1) {
            return this.a1;
        }
        return this.b1;
    }
    getElementName(row) {
        if (row == 1) {
            return "a1";
        }
        return "b1";
    }
    isIntegerVector() {
        if (Number.isInteger(this.a1) && Number.isInteger(this.b1)) {
            return true;
        }
        return false;
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
        if (this.magnitude() == 0 || V.magnitude() == 0) {
            return 0;
        }
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
        if (V.magnitude() == 0) {
            return new Vector2();
        }
        const mag = this.dotProduct(V) / V.magnitude();
        return V.getUnitVector().scale(mag);
    }
    projectionMagnitude(project_onto) {
        if (project_onto.magnitude() == 0) {
            return 0;
        }
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
    equals(V, allow_error = false) {
        if (this.a1 == V.a1 && this.b1 == V.b1 && this.c1 == V.c1) {
            return true;
        }
        else if (allow_error && numberRoughlyEquals(this.a1, V.a1) && numberRoughlyEquals(this.b1, V.b1) && numberRoughlyEquals(this.c1, V.c1)) {
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
            <div class="matrix-container vector-container">
                <div class="vector">
                    <div class="matrix-elements">${this.a1}</div>
                    <div class="matrix-elements">${this.b1}</div>
                    <div class="matrix-elements">${this.c1}</div>
                </div>
            </div>`);
    }
    displayToBasisComponent(add_brackets = false) {
        const i_coeff = getCoeff(this.a1, false);
        const j_coeff = getCoeff(this.b1, true);
        const k_coeff = getCoeff(this.c1, true);
        if (add_brackets) {
            return `(${i_coeff}i` + ` ${j_coeff}j` + ` ${k_coeff}k)`;
        }
        return `${i_coeff}i` + ` ${j_coeff}j` + ` ${k_coeff}k`;
    }
    displayToFormat(HTML = true, add_brackets = false) {
        if (HTML) {
            return this.displayToHTML();
        }
        return this.displayToBasisComponent(add_brackets);
    }
    roundElements(digits = 2) {
        const a1 = roundNumber(this.a1, digits);
        const b1 = roundNumber(this.b1, digits);
        const c1 = roundNumber(this.c1, digits);
        return new Vector3(a1, b1, c1);
    }
    getElement(row) {
        if (row == 1) {
            return this.a1;
        }
        else if (row == 2) {
            return this.b1;
        }
        return this.c1;
    }
    getElementName(row) {
        if (row == 1) {
            return "a1";
        }
        else if (row == 2) {
            return "b1";
        }
        return "c1";
    }
    isIntegerVector() {
        if (Number.isInteger(this.a1) && Number.isInteger(this.b1) && Number.isInteger(this.c1)) {
            return true;
        }
        return false;
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
        if (this.magnitude() == 0 || V.magnitude() == 0) {
            return 0;
        }
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
        if (V.magnitude() == 0) {
            return new Vector3();
        }
        const mag = this.dotProduct(V) / V.magnitude();
        return V.getUnitVector().scale(mag);
    }
    projectionMagnitude(project_onto) {
        if (project_onto.magnitude() == 0) {
            return 0;
        }
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
        const vectorFromPlane = P.p1.getVectorTo(this);
        const mag = vectorFromPlane.dotProduct(unitNormalVector);
        return unitNormalVector.scale(mag);
    }
    getVectorToProjectionOnPlane(P) {
        const normalProjection = this.getNormalProjectionToPlane(P);
        return this.minus(normalProjection);
    }
}
export class Plane {
    constructor(p1 = new Vector3(), p2 = new Vector3(), p3 = new Vector3()) {
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
    }
    displayToHTML(vectorHTMLFormat = true) {
        return `<div style="display: flex; align-items: center; flex-direction: column;">
            <div style="display: flex; align-items: center;">
                <p style="padding-top: 0;">p1:</p>
                <div style="padding-left: 10px;">${this.p1.displayToFormat(vectorHTMLFormat)}</div>
            </div>
            <div style="display: flex; align-items: center;">
                <p style="padding-top: 0;">p2:</p>
                <div style="padding-left: 10px;">${this.p2.displayToFormat(vectorHTMLFormat)}</div>
            </div>
            <div style="display: flex; align-items: center;">
                <p style="padding-top: 0;">p3:</p>
                <div style="padding-left: 10px;">${this.p3.displayToFormat(vectorHTMLFormat)}</div>
            </div>
        </div>`;
    }
    equals(P) {
        const cross1 = this.normalVector();
        const cross2 = P.normalVector();
        return cross1.isParallel(cross2);
    }
    normalVector() {
        const p1 = this.p1;
        const p2 = this.p2;
        const p3 = this.p3;
        const V1 = p1.getVectorTo(p2);
        const V2 = p1.getVectorTo(p3);
        return V1.crossProduct(V2);
    }
}
export function getCoeff(num, with_sign = false, with_space = true) {
    let coeff = Math.abs(num).toString();
    let sign = "-";
    let space = " ";
    if (!with_space) {
        space = "";
    }
    if (num >= 0 && with_sign) {
        sign = "+";
    }
    else if (num >= 0) {
        sign = "";
    }
    if (Math.abs(num) == 1) {
        coeff = "";
    }
    return sign + space + coeff;
}
export function numberRoughlyEquals(num1, num2, digits = 2) {
    return roundNumber(num1, digits) == roundNumber(num2, digits);
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
export function getRandomVector2(max = 10) {
    const a1 = getRandomNumber(max);
    const b1 = getRandomNumber(max);
    const V = new Vector2(a1, b1);
    return V;
}
export function getRandomVector3(max = 10) {
    const a1 = getRandomNumber(max);
    const b1 = getRandomNumber(max);
    const c1 = getRandomNumber(max);
    const V = new Vector3(a1, b1, c1);
    return V;
}
export function getRandomPlane(max = 10) {
    let p1 = getRandomVector3(max);
    let p2 = getRandomVector3(max);
    let p3 = getRandomVector3(max);
    let V1 = p1.getVectorTo(p2);
    let V2 = p1.getVectorTo(p3);
    while (V1.isParallel(V2)) {
        p1 = getRandomVector3(max);
        V1 = p1.getVectorTo(p2);
        V2 = p1.getVectorTo(p3);
    }
    return new Plane(p1, p2, p3);
}
export function getAnswerVector(V1, V2, operation, P = new Plane()) {
    switch (operation) {
        case 0:
            return V1.add(V2);
        case 1:
            return V1.minus(V2);
        case 3:
            return V1.crossProduct(V2);
        case 5:
            return V1.getUnitVector();
        case 7:
            return V1.projectOnto(V2);
        case 12:
            return V1.getNormalProjectionToPlane(P);
        case 13:
            return V1.getVectorToProjectionOnPlane(P);
        default:
            return V1.add(V2);
    }
}
export function getAnswerNumber(V1, V2, operation, P = new Plane()) {
    switch (operation) {
        case 2:
            return V1.dotProduct(V2);
        case 4:
            return V1.magnitude();
        case 6:
            return V1.includedAngleInDegrees(V2);
        case 8:
            return V1.projectionMagnitude(V2);
        case 9:
            return volumeOfTetrahedron(V1, V2, P.p1, P.p2);
        case 10:
            return V1.angleWithPlaneInDegrees(P);
        case 11:
            return V1.isCoplanarWith(P) ? 1 : 0;
        default:
            return V1.dotProduct(V2);
    }
}
export function volumeOfTetrahedron(V1, V2, V3, V4) {
    const V = V1;
    const A = V2;
    const B = V3;
    const C = V4;
    const ABC = new Plane(A, B, C);
    const AB = A.getVectorTo(B);
    const AC = A.getVectorTo(C);
    const triangleArea = 0.5 * AB.crossProduct(AC).magnitude();
    const height = V.getNormalProjectionToPlane(ABC).magnitude();
    console.log(triangleArea);
    console.log(height);
    return height * triangleArea / 3;
}
export function generateVectorExercise(exercise_type, max = 10) {
    let V1 = getRandomVector3(max);
    let V2 = getRandomVector3(max);
    let P = getRandomPlane(max);
    let answerVector = getAnswerVector(V1, V2, exercise_type, P);
    // while (!answerVector.isIntegerVector()) {
    //     V1 = getRandomVector3(max);
    //     V2 = getRandomVector3(max);
    //     P = getRandomPlane(max);
    //     answerVector = getAnswerVector(V1, V2, exercise_type, P);
    // }
    const generated_exercise = {
        V1: V1,
        V2: V2,
        P: P,
        answer: answerVector
    };
    return generated_exercise;
}
export function generateNumberExercise(exercise_type, max = 10) {
    let V1 = getRandomVector3(max);
    let V2 = getRandomVector3(max);
    let P = getRandomPlane(max);
    let answer = getAnswerNumber(V1, V2, exercise_type, P);
    const generated_exercise = {
        V1: V1,
        V2: V2,
        P: P,
        answer: answer
    };
    return generated_exercise;
}
// const testVector1 = new Vector3(2, 3, 1)
// const testVector2 = new Vector3(0, -2, 4)
// const testVector3 = new Vector3(3, 1, -2)
// const AB = testVector1.getVectorTo(testVector2);
// const AC = testVector1.getVectorTo(testVector3);
// const V = new Vector3(4, 0, 8)
// const AV = testVector1.getVectorTo(V);
// const ABC = new Plane(A, B, C);
// console.log(AB.crossProduct(AC))
// console.log(AV.angleWithPlaneInDegrees(ABC));
// const A = new Vector3(-2, -5, 0)
// const B = new Vector3(-1, 1, 1)
// const C = new Vector3(1, -5, -3)
// const D = new Vector3(4, 4, -3)
// const AB = A.getVectorTo(B);
// const BC = B.getVectorTo(C);
// const AD = A.getVectorTo(D);
// const ABC = new Plane(A, B, C)
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
// const ABC = new Plane(A, B, C);
// console.log(AB.crossProduct(AC).getUnitVector())
// console.log(D.getNormalProjectionToPlane(ABC).roundElements())
// console.log(D.getVectorToProjectionOnPlane(ABC).roundElements())
// const A1 = new Vector3(2,1,-12);
// const B1 = new Vector3(8,-5,12);
// const C1 = new Vector3(-5,-4,2);
// const D1 = new Vector3(-4,-17,12);
// const P = new Plane(A1, B1, D1)
// const DA = D1.getVectorTo(A1)
// const DB = D1.getVectorTo(B1);
// const CA = C1.getVectorTo(A1);
// console.log(DA.crossProduct(DB))
// console.log(DA.crossProduct(DB).getUnitVector())
// console.log(CA.dotProduct(DA.crossProduct(DB).getUnitVector()))
// console.log(C1.getNormalProjectionToPlane(P));
// const A1 = new Vector3(1,-3,3);
// const B1 = new Vector3(-2,-7,2);
// const C1 = new Vector3(0,1,2);
// const V1 = new Vector3(10,8,-4);
// console.log(volumeOfTetrahedron(V1, A1, B1, C1));
