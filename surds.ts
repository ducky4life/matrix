import { TextFrac } from "./frac_matrix.js";

export class Surd {
    // (rational + sqrt(abs(sqrt)))/denominator
    // if sqrt < 0 then rational - sqrt
    rational: number;
    sqrt: number;
    denominator: number;

    constructor(r=0, s=0, d=1) {
        this.rational = r;
        this.sqrt = s;
        this.denominator = d;
    }

    getSurdSign(): number {
        return (this.sqrt >= 0 ? 1 : -1);
    }

    getInsideSurd(): number {
        return Math.abs(this.sqrt);
    }

    displayToNumber() {
        return (this.rational + this.getSurdSign()*Math.sqrt(this.getInsideSurd()))/this.denominator;
    }

    displayNumeratorToString(): string {
        let surd_part: string = "";

        if (this.sqrt > 0) {
            surd_part = " + &#8730;" + this.getInsideSurd();
        }
        else if (this.sqrt < 0) {
            surd_part = " - &#8730;" + this.getInsideSurd();
        }

        return `${this.rational}${surd_part}`;
    }

    displaySurdPartToHTML(): string {
        return `<math>
        <msqrt>
            <mn>${this.getInsideSurd()}</mn>
        </msqrt>
        </math>`;
    }

    displayToHTML() {
        let T: TextFrac = new TextFrac(this.displayNumeratorToString(), this.denominator.toString());
        return T.displayToHTML();
    }
}