let display = document.getElementById('display');
let currentOperand = '0';
let previousOperand = '';
let operation = null;
let calculatorOn = true;

function addnumber(number) {
    if (!calculatorOn) return;
    if (currentOperand === '0') {
        currentOperand = number;
    } else {
        currentOperand += number;
    }
    updatedisplay();
}

function addpoint() {
    if (!calculatorOn) return;
    if (!currentOperand.includes('.')) {
        currentOperand += '.';
    }
    updatedisplay();
}

function selectoperation(op) {
    if (!calculatorOn) return;
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        calculateresult();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
}

function calculateresult() {
    if (!calculatorOn) return;
    let result;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        case '%':
            result = (prev / 100) * current;
            break;
        default:
            return;
    }
    currentOperand = result.toString();
    operation = null;
    previousOperand = '';
    updatedisplay();
}

function deletelast() {
    if (!calculatorOn) return;
    currentOperand = currentOperand.toString().slice(0, -1);
    if (currentOperand === '') {
        currentOperand = '0';
    }
    updatedisplay();
}

function cleardisplay() {
    if (!calculatorOn) return;
    currentOperand = '0';
    previousOperand = '';
    operation = null;
    updatedisplay();
}

function updatedisplay() {
    display.innerText = currentOperand;
}

function togglecalculator() {
    calculatorOn = !calculatorOn;
    if (!calculatorOn) {
        currentOperand = '';
        display.innerText = 'OFF';
        document.getElementById('togglebutton').innerText = 'On';
        document.querySelectorAll('button').forEach(button => {
            if (button.innerText !== 'On' && button.innerText !== 'Off') {
                button.classList.add('disabled');
                button.disabled = true;
            }
        });
    } else {
        cleardisplay();
        document.getElementById('togglebutton').innerText = 'Off';
        document.querySelectorAll('button').forEach(button => {
            button.classList.remove('disabled');
            button.disabled = false;
        });
    }
}
