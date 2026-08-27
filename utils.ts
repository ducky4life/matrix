export function safeToFixed(num: number, digits: number = 3) {
    const sciNotation = Number(num.toString() + 'e' + digits);
    return Number(Math.round(sciNotation) + 'e-' + digits);
}

export function roundNumber(num: number, digits: number = 3): number {
    return safeToFixed(num, digits);
}

export function HCF(num1: number, num2: number) {
    if (num2 == 0) {
        return num1;
    }
    return HCF(num2, num1 % num2);
}

export function LCM(num1: number, num2: number) {
    if (num1 != 0 && num2 != 0) {
        return Math.abs(Math.abs(num1 * num2) / HCF(num1, num2));
    }
    return 0;
}

export function commonHCF(numArray: Array<number>) {
    let hcf = numArray[0];

    for (let i=1; i<numArray.length; i++) {
        hcf = HCF(hcf, numArray[i]);

        if (hcf == 1) {
            return 1;
        }
    }

    return Math.abs(hcf);
}

export function getCoeff(num: number, with_sign: boolean = false, with_space: boolean = true): string {

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

    let space = " ";
    if (!with_space || (num>=0 && !with_sign)) {
        space = "";
    }

    return sign+space+coeff;
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

export function getRandomNumberFromArray(inputArray: Array<number>): number {
    const randomIndex = Math.floor(Math.random() * inputArray.length);
    return inputArray[randomIndex];
}

export function getRandomSign(): number {
    return getRandomNumberFromArray([-1, 1]);
}

export function getRandomNumber(max: number = 10) {
    max = max + 1;

    return getRandomSign()*Math.floor(Math.random() * max);
}

export function numberRoughlyEquals(num1: number, num2: number, digits: number = 2) {
    return roundNumber(num1, digits) == roundNumber(num2, digits);
}