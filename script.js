const currentOperand = document.getElementById("currentOperand");
const previousOperand = document.getElementById("previousOperand");
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const clearButton = document.querySelector("[data-action='clear']");
const deleteButton = document.querySelector("[data-action='delete']");
const equalsButton = document.querySelector("[data-action='equals']");

let current = "";
let previous = "";
let operation = undefined;

/* Number Input */
numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        appendNumber(button.dataset.number);
        updateDisplay();
    });
});

function appendNumber(number) {
    if (number === "." && current.includes(".")) {
        return;
    }
    if (current === "0" && number !== ".") {
        current = "";
    }
    current += number;
}

/*Operation*/
operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        const selectedOperation =
            button.dataset.operation;
        if (selectedOperation === "%") {
            if (current === "") {
                return;
            }
            current =
                String(parseFloat(current) / 100);
            updateDisplay();
            return;
        }
        if (current === "") {
            return;
        }
        if (previous !== "") {
            calculate();
        }
        operation = selectedOperation;
        previous = current;
        current = "";
        updateDisplay();
    });
});

/*Calculate*/
function calculate() {
    const previousNumber =
        parseFloat(previous);
    const currentNumber =
        parseFloat(current);
    if (
        isNaN(previousNumber) ||
        isNaN(currentNumber)
    ) {
        return;
    }
    let result;
    switch (operation) {
        case "+":
            result =
                previousNumber + currentNumber;
            break;
        case "−":
            result =
                previousNumber - currentNumber;
            break;
        case "×":
            result =
                previousNumber * currentNumber;
            break;
        case "÷":
            if (currentNumber === 0) {
                current = "Error";
                previous = "";
                operation = undefined;
                return;
            }
            result =
                previousNumber / currentNumber;
            break;
    }
    current = String(result);
    previous = "";
    operation = undefined;
}

/*Equals*/
equalsButton.addEventListener("click", () => {
    if (
        previous === "" ||
        current === "" ||
        operation === undefined
    ) {
        return;
    }
    calculate();
    updateDisplay();
});

/*Clear*/
clearButton.addEventListener("click", () => {
    current = "";
    previous = "";
    operation = undefined;
    updateDisplay();
});

/*Delete*/
deleteButton.addEventListener("click", () => {
    current = current.slice(0, -1);
    updateDisplay();
});

/*Display*/
function updateDisplay() {
    currentOperand.textContent =
        current || "0";
    if (operation !== undefined) {
        previousOperand.textContent =
            `${previous} ${operation}`;
    } else {
        previousOperand.textContent =
            "";
    }
}

document.addEventListener("keydown", event => {
    const key = event.key;
    if (
        (key >= "0" && key <= "9") ||
        key === "."
    ) {
        appendNumber(key);
        updateDisplay();
    }
    if (key === "+") {
        handleKeyboardOperation("+");
    }

    if (key === "-") {
        handleKeyboardOperation("−");
    }

    if (key === "*") {
        handleKeyboardOperation("×");
    }

    if (key === "/") {
        event.preventDefault();
        handleKeyboardOperation("÷");
    }

    if (key === "Enter" || key === "=") {
        if (
            previous !== "" &&
            current !== "" &&
            operation !== undefined
        ) {
            calculate();
            updateDisplay();
        }
    }
    
    if (key === "Backspace") {
        current =
            current.slice(0, -1);
        updateDisplay();
    }
    
    if (key === "Escape") {
        current = "";
        previous = "";
        operation = undefined;
        updateDisplay();
    }
    
    if (key === "%") {
        if (current !== "") {
            current =
                String(parseFloat(current) / 100);
            updateDisplay();
        }
    }
});

function handleKeyboardOperation(selectedOperation) {
    if (current === "") {
        return;
    }
    if (previous !== "") {
        calculate();
    }
    operation = selectedOperation;
    previous = current;
    current = "";
    updateDisplay();
}

/*Display*/
updateDisplay();
