import { TextFrac } from "./frac_matrix.js";
export class Surd {
    constructor(r = 0, s = 0, d = 1) {
        this.rational = r;
        this.sqrt = s;
        this.denominator = d;
    }
    getSurdSign() {
        return (this.sqrt >= 0 ? 1 : -1);
    }
    getInsideSurd() {
        return Math.abs(this.sqrt);
    }
    displayToNumber() {
        return (this.rational + this.getSurdSign() * Math.sqrt(this.getInsideSurd())) / this.denominator;
    }
    displayNumeratorToString() {
        let surd_part = "";
        if (this.sqrt > 0) {
            surd_part = " + &#8730;" + this.getInsideSurd();
        }
        else if (this.sqrt < 0) {
            surd_part = " - &#8730;" + this.getInsideSurd();
        }
        return `${this.rational}${surd_part}`;
    }
    displaySurdPartToHTML() {
        return `<math>
        <msqrt>
            <mn>${this.getInsideSurd()}</mn>
        </msqrt>
        </math>`;
    }
    displayToHTML() {
        let T = new TextFrac(this.displayNumeratorToString(), this.denominator.toString());
        return T.displayToHTML();
    }
}
