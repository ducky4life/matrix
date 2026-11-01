import { Frac, TextFrac } from "./frac_matrix.js";
import { commonHCF, getCoeff, isSquareNumber } from "./utils.js";

export class Surd {
    rational: number;
    sqrt_coeff: number;
    sqrt: number;
    denominator: number;

    constructor(r=0, c=1, s=0, d=1) {
        this.rational = r;
        this.sqrt_coeff = c;
        this.sqrt = s;
        this.denominator = d;
    }

    getSign() {
        return (this.sqrt_coeff > 0 ? 1 : -1);
    }

    displayToNumber() {
        return (this.rational + this.sqrt_coeff*Math.sqrt(this.sqrt))/this.denominator;
    }

    displayNumeratorToString(): string {
        let rational_part: string = this.rational.toString();
        let surd_part: string = " " + getCoeff(this.sqrt_coeff, true) + "&#8730;" + this.sqrt;

        if (this.rational == 0) {
            rational_part = "";
            surd_part = getCoeff(this.sqrt_coeff, false, false) + "&#8730;" + this.sqrt;
        }

        return `${rational_part}${surd_part}`;
    }

    displaySurdPartToHTML(): string {
        return `<math>
        <msqrt>
            <mn>${this.sqrt}</mn>
        </msqrt>
        </math>`;
    }

    displayToHTML() {

        if (this.sqrt_coeff == 0 || this.sqrt == 0) {
            let F = new Frac(this.rational, this.denominator).simplify();
            return F.displayToHTML();
        }
        
        let T: TextFrac = new TextFrac(this.displayNumeratorToString(), this.denominator.toString());
        return T.displayToHTML();
    }

    simplify() {
        let coeff = this.sqrt_coeff;
        let surd_part = this.sqrt;
        let rational_part = this.rational;
        let denom = this.denominator;

        // simplify surd

        console.log(surd_part)
        if (isSquareNumber(surd_part)) {
            surd_part = 0;
            coeff = coeff * Math.sqrt(surd_part);
        }
        else {
            for (let i = this.sqrt - 1; i > 3; i--) {
                if (this.sqrt % i == 0 && isSquareNumber(i)) {
                    coeff = coeff * Math.sqrt(i);
                    surd_part = this.sqrt/i;
                    break;
                }
            }

            console.log(this.rational, coeff, this.denominator);
            // simplify denominator
            let cHCF = commonHCF([this.rational, coeff, this.denominator]);
            if (cHCF != 1) {
                rational_part = rational_part / cHCF;
                coeff = coeff / cHCF;
                denom = denom / cHCF;
            }
        }


        return new Surd(rational_part, coeff, surd_part, denom);
    }
}