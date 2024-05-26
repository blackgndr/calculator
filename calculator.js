const display = document.getElementById('display');
const numbers = document.querySelectorAll('#numbers button');
const operations = document.querySelectorAll('#operations button');
const equals = document.getElementById('equals');
const clear = document.getElementById('clear');
const backspace = document.getElementById('backspace');
const dot = document.getElementById('dot');

let firstOperand = '';
let secondOperand = '';
let currentOperation = null;
let shouldResetScreen = false;

function updateDisplay(content) {
    if(shouldResetScreen) {
        resetScreen();
    }
    display.textContent += content;
}

function resetScreen() {
    display.textContent = '';
    shouldResetScreen = false;
}

function clearDisplay() {
    display.textContent = '';
    firstOperand = '';
    secondOperand = '';
    currentOperation = null;
}

function deleteLastCharacter() {
    if (display.textContent === 'Are you crazy?!') {
        clearDisplay();
    } else {
    display.textContent = display.textContent.slice(0, -1);
    };
}

function handleOperation(operation) {
    if (currentOperation !== null) {
        calculate();
    }
    firstOperand = display.textContent;
    currentOperation = operation;
    shouldResetScreen = true;
}

function calculate() {
    if (currentOperation === null || shouldResetScreen) return;
    secondOperand = display.textContent;
    const result = operate(currentOperation, firstOperand, secondOperand);
    if (result === 'Are you crazy?!') {
        display.textContent = 'Are you crazy?!';
    } else {
        display.textContent = roundResult(result);
    }
    currentOperation = null;
}

function operate(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case 'x':
            return a * b;
        case '/':
            if (b === 0) {
              return 'Are you crazy?!';
            } else {
              return a / b;
            };
        default:
            return null;
    }
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

numbers.forEach((number) => {
    if (number === backspace) return;  
    number.addEventListener('click', () => updateDisplay(number.textContent));
});

operations.forEach((operation) => {
    operation.addEventListener('click', () => handleOperation(operation.textContent));
});

equals.addEventListener('click', calculate);
clear.addEventListener('click', clearDisplay);
backspace.addEventListener('click', deleteLastCharacter);
dot.addEventListener('click', () => {
    if (!display.textContent.includes('.')) {
        updateDisplay('.');
    }
});






