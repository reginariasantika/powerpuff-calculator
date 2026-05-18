let currentInput = '0';
let previousInput = '';
let operator = null;
let shouldResetDisplay = false;
let expression = '';

const display = document.getElementById('display');
const expressionEl = document.getElementById('expression');

function updateDisplay() {
    let formatted = currentInput;
    if (!currentInput.includes('.') && !isNaN(currentInput)) {
        const num = parseFloat(currentInput);
        if (Math.abs(num) < 1e15) {
            formatted = num.toLocaleString('en-US', { maximumFractionDigits: 8 });
        }
    }
    display.textContent = formatted;
    display.classList.toggle('shrink', formatted.length > 9);
}

function updateExpression() {
    expressionEl.textContent = expression;
}

function getOperatorSymbol(op) {
    const symbols = { '+': '+', '-': '−', '*': '×', '/': '÷' };
    return symbols[op] || op;
}

function appendNumber(num) {
    if (shouldResetDisplay) {
        currentInput = num;
        shouldResetDisplay = false;
    } else {
        if (currentInput === '0' && num !== '0') {
            currentInput = num;
        } else if (currentInput !== '0') {
            if (currentInput.replace(/[^0-9]/g, '').length < 9) {
                currentInput += num;
            }
        }
    }
    updateDisplay();
}

function appendDecimal() {
    if (shouldResetDisplay) {
        currentInput = '0.';
        shouldResetDisplay = false;
    } else if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    updateDisplay();
}

function setOperator(op) {
    if (operator && !shouldResetDisplay) {
        performCalculation();
    }
    previousInput = currentInput;
    operator = op;
    shouldResetDisplay = true;
    expression = formatNumber(previousInput) + ' ' + getOperatorSymbol(op);
    updateExpression();
    clearActiveOperator();
    highlightActiveOperator(op);
}

function clearActiveOperator() {
    document.querySelectorAll('.btn.op').forEach(btn => btn.classList.remove('active'));
}

function highlightActiveOperator(op) {
    const symbols = { '/': '÷', '*': '×', '-': '−', '+': '+' };
    document.querySelectorAll('.btn.op').forEach(btn => {
        if (btn.textContent === symbols[op]) {
            btn.classList.add('active');
        }
    });
}

function formatNumber(numStr) {
    const num = parseFloat(numStr);
    if (isNaN(num)) return numStr;
    return num.toLocaleString('en-US', { maximumFractionDigits: 8 });
}

function performCalculation() {
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(curr)) return;

    let result;
    switch (operator) {
        case '+': result = prev + curr; break;
        case '-': result = prev - curr; break;
        case '*': result = prev * curr; break;
        case '/':
            if (curr === 0) {
                currentInput = 'Error';
                operator = null;
                previousInput = '';
                expression = '';
                updateDisplay();
                updateExpression();
                return;
            }
            result = prev / curr;
            break;
        default: return;
    }

    const resultStr = parseFloat(result.toPrecision(10)).toString();
    currentInput = resultStr;
    operator = null;
    previousInput = '';
    shouldResetDisplay = true;
}

function calculate() {
    if (!operator || shouldResetDisplay) return;

    expression = formatNumber(previousInput) + ' ' + getOperatorSymbol(operator) + ' ' + formatNumber(currentInput) + ' =';
    updateExpression();

    clearActiveOperator();

    showPaywall();
}

function clearAll() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    shouldResetDisplay = false;
    expression = '';
    clearActiveOperator();
    updateDisplay();
    updateExpression();
    document.querySelector('.btn.fn:first-child').textContent = 'AC';
}

function toggleSign() {
    if (currentInput === '0' || currentInput === 'Error') return;
    if (currentInput.startsWith('-')) {
        currentInput = currentInput.slice(1);
    } else {
        currentInput = '-' + currentInput;
    }
    updateDisplay();
}

function percent() {
    const num = parseFloat(currentInput);
    if (isNaN(num)) return;
    currentInput = (num / 100).toString();
    updateDisplay();
}

function showPaywall() {
    document.getElementById('paywall').classList.add('show');
}

function closePaywall() {
    document.getElementById('paywall').classList.remove('show');
    expression = '';
    updateExpression();
}

function redirectToStripe() {
    window.open('https://buy.stripe.com/test_00g00000000000000000', '_blank');
}

document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
    else if (e.key === '.') appendDecimal();
    else if (e.key === '+') setOperator('+');
    else if (e.key === '-') setOperator('-');
    else if (e.key === '*') setOperator('*');
    else if (e.key === '/') { e.preventDefault(); setOperator('/'); }
    else if (e.key === 'Enter' || e.key === '=') calculate();
    else if (e.key === 'Escape') clearAll();
    else if (e.key === '%') percent();
    else if (e.key === 'Backspace') {
        if (currentInput.length > 1) {
            currentInput = currentInput.slice(0, -1);
        } else {
            currentInput = '0';
        }
        updateDisplay();
    }
});
