const bookmark = document.querySelector('[data-bookmark]');
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equal]');
const deleteButton = document.querySelector('[data-delete]');
const clearAllButton = document.querySelector('[data-clear-all]');
const switchSignButton = document.querySelector('[data-switch-sign]');
const previousValue = document.querySelector('[data-previous-operand');
const currentValue = document.querySelector('[data-current-operand]');
const memorySave = document.querySelector('[data-ms]');
const memoryClear = document.querySelector('[data-mc]');
const memoryRead = document.querySelector('[data-mr]');
const memoryMinus = document.querySelector('[data-memory-minus]');
const memoryPlus = document.querySelector('[data-memory-plus]');
const memoryValue = document.querySelector('#memory-value');

class Calculator {
    constructor(previousValue, currentValue, memoryValue) {
        this.previousValue = previousValue;
        this.currentValue = currentValue;
        this.memoryDisplay = memoryValue;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) {
            return;
        }

        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    switchSign() {
        this.currentOperand = this.currentOperand - (this.currentOperand * 2);
    }


    chooseOperation(operation) {
        if (this.currentOperand === '') {
            return;
        }

        if (this.previousOperand !== '') {
            this.compute();
        }

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentOperand);

        if (isNaN(prev) || isNaN(curr)) {
            return;
        }

        switch (this.operation) {
            case '+':
                computation = prev + curr;
                break;
            case '-':
                computation = prev - curr;
                break;
            case '*':
                computation = prev * curr;
                break;
            case '÷':
                if (curr === 0) {
                    computation = `Can't divide by 0`
                    break;
                }

                computation = prev / curr;
                break;

            default:
                return;
        }

        this.currentOperand = parseFloat(Number(computation).toFixed(8)).toString();
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;

        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentValue.innerText = this.getDisplayNumber(this.currentOperand);

        if (this.operation != null) {
            this.previousValue.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousValue.innerText = '';
        }
    }

    updateMemory() {
        if (this.memoryValue) {
            this.memoryDisplay.innerText = this.memoryValue;
        } else {
            this.memoryDisplay.innerText = '0';
        }
    }

    saveMemory() {
        const minus = this.isNegative ? '-' : '';
        const newMemoryValue = parseFloat(minus + this.currentOperand);

        if (isNaN(newMemoryValue)) {
            return;
        }

        this.memoryValue = newMemoryValue;
    }

    readMemory() {
        this.currentOperand = this.memoryValue !== undefined ? this.memoryValue : this.currentOperand;
    }

    clearMemory() {
        this.memoryValue = undefined;
    }

    operationMemory(o) {
        if (o === 'plus') {
            this.memoryValue += +this.curVal;
        } else {
            this.memoryValue -= +this.curVal;
        }
    }
}

const calculator = new Calculator(previousValue, currentValue, memoryValue);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

clearAllButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

switchSignButton.addEventListener('click', button => {
    calculator.switchSign();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});

memorySave.addEventListener('click', () => {
    calculator.saveMemory();
    calculator.updateMemory();
});

memoryClear.addEventListener('click', () => {
    calculator.clearMemory();
    calculator.updateMemory();
});

memoryRead.addEventListener('click', () => {
    calculator.readMemory();
    calculator.updateDisplay();
});

memoryMinus.addEventListener('click', () => {
    calculator.operationMemory('minus');
    calculator.updateMemory();
});

memoryPlus.addEventListener('click', () => {
    calculator.operationMemory('plus');
    calculator.updateMemory();
});