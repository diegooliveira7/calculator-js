const result = document.querySelector(".result-calc");
const buttons = document.querySelectorAll(".buttons-calc button");

let currentNumber = "";
let firstNumber = null;
let firstOperand = null;
operator = null;
let restart = false;
let verifi = false;

function updateResult() {
    result.innerText = currentNumber == "" ? "0" : currentNumber.toString().replace(".", ",") ;
}

function addDigit(buttonText){
    if ((buttonText === ',') && currentNumber.includes(",")) return;

    if (currentNumber && !firstNumber) {
        currentNumber += buttonText;
        return this.updateResult();
    } else if (firstNumber && operator) {
        currentNumber += buttonText;
        return this.updateResult();
    }
    currentNumber = buttonText;
    updateResult();
}

function setOperator(buttonText) {
    if (!currentNumber) return;
    if (!operator) {
        firstNumber = currentNumber;
        currentNumber = "";
    } else if (operator) {
        this.calculator();
    }
    operator = buttonText;
}

function calculator() {
    firstNumber = firstNumber.toString().replace(",", ".");
    currentNumber = currentNumber.replace(",", ".");
    switch (this.operator) {
        case "+":
            currentNumber = parseFloat(firstNumber) + parseFloat(currentNumber);
            break;
        case "-":
            currentNumber = parseFloat(firstNumber) - parseFloat(currentNumber);
            break;
        case "x":
            currentNumber = parseFloat(firstNumber) * parseFloat(currentNumber);
            break;
        case "/":
            currentNumber = parseFloat(firstNumber) / parseFloat(currentNumber);
            break;
        default:
            return;
    }
    this.updateResult();
    firstNumber = currentNumber;
    operator = null;
}

function percentage() {
    let result = parseFloat(currentNumber) / 100;

    if (["+", "-"].includes(operator)) {
        result = result * (firstOperand || 1);
    }

    if (result.toString().split(".")[1]?.length > 5) {
        result = result.toFixed(5).toString();
    }

    currentNumber = result.toString();
    this.updateResult();
}

buttons.forEach((button) => {
    button.addEventListener("click", ()=>{
        const buttonText = button.innerText;
        if (/^[0-9,]+$/.test(buttonText)) {
            addDigit(buttonText);
        } else if (["+", "-", "x", "/"].includes(buttonText)) {
            setOperator(buttonText);
        } else if (["="].includes(buttonText)) {
            if (operator && currentNumber && firstNumber) this.calculator();
        } else if (["C"].includes(buttonText)) {
            currentNumber = "";
            firstNumber = "";
            firstOperand = null;
            operator = null;
            this.updateResult();
        } else if ("±".includes(buttonText)) {
            if (currentNumber) {
                currentNumber = currentNumber * (-1);
            }
            this.updateResult();
        } else if ("%".includes(buttonText)) {
            this.percentage();
        }
    });
});


