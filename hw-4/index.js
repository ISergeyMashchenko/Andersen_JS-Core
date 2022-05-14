const isString = (str) => {
    if (typeof str !== 'string') {
        return false;
    }

    return true;
};

const concatStrings = (str2, separator = '') => {
    let str = str2;
    const separate = isString(separator) ? separator : '';

    return function func(str2) {
        if (!isString(str2)) {
            return str;
        }

        str += separate + str2;

        return func;
    };
};

const isValid = (num) => {
    if (typeof num !== 'number' || typeof num === 'bigint') {
        return false;
    }

    return true;
};

class Calculator {
    constructor(firstValue, secondValue) {
        if (!isValid(firstValue) || !isValid(secondValue)) {
            throw new Error('');
        }

        this.firstValue = firstValue;
        this.secondValue = secondValue;
    }

    setX = (num) => {
        if (!isValid(num)) {
            throw new Error('');
        }

        this.firstValue = num;
    }

    setY = (num) => {
        if (!isValid(num)) {
            throw new Error('');
        }

        this.secondValue = num;
    }

    logSum = () => {
        console.log(this.firstValue + this.secondValue);
    }

    logMul = () =>  {
        console.log(this.firstValue * this.secondValue);
    }

    logSub = () =>  {
        console.log(this.firstValue - this.secondValue);
    }

    logDiv = () =>  {
        if (this.secondValue === 0) {
            throw new Error('Cannot divide by 0');
        }

        console.log(this.firstValue / this.secondValue);
    }
}