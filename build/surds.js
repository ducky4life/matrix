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
        let rational_part = this.rational.toString();
        let surd_part = "";
        if (this.rational == 0) {
            rational_part = "";
            if (this.sqrt > 0) {
                surd_part = "&#8730;" + this.getInsideSurd();
            }
            else if (this.sqrt < 0) {
                surd_part = "-&#8730;" + this.getInsideSurd();
            }
        }
        else {
            if (this.sqrt > 0) {
                surd_part = " + &#8730;" + this.getInsideSurd();
            }
            else if (this.sqrt < 0) {
                surd_part = " - &#8730;" + this.getInsideSurd();
            }
        }
        return `${rational_part}${surd_part}`;
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
