let display = document.querySelector('.content');

let operation = 0;
let number;
let firstNumber = 0;
let secondNumber = 0;
let decimal = false;
let factor = 1;
let enterFirst = false;
let enterSecond = false;

document.addEventListener('click', (e) => {
    console.log(e.target);
    console.log(e.target.id);
    // display.innerHTML = e.target.id;
    
    operations(e.target.id);
});

function operations(id) {
    switch (id) {
        case "clear":
            console.clear();
            display.innerHTML = '';
            operation = 0;
            decimal = false;
            firstNumber = 0;
            secondNumber = 0; 
            factor = 1;
            enterFirst = enterSecond = false;
            break;
        case "mod":
            display.innerHTML = ''; 
            operation = 5;
            decimal = false;
            factor = 1;
            break;
        case "del":
            backsp();
            break;
        case "div":
            display.innerHTML = ''; 
            operation = 4;
            decimal = false;
            factor = 1;
            break;
        case "mul":
            display.innerHTML = ''; 
            operation = 3;
            decimal = false;
            factor = 1;
            break;
        case "sub":
            display.innerHTML = ''; 
            decimal = false;
            operation = 2;
            factor = 1;
            break;
        case "add":
            display.innerHTML = ''; 
            decimal = false;
            operation = 1;
            factor = 1;
            break;
        case "equal":
            answer();
            break;
        case "dot":
            display.innerHTML += ".";
            decimal = true;
            break;
        case "":
            break;
        default:
            numberKey(id);
            break;
    }
}

function numberKey(id) {
    display.innerHTML += id;
    number = parseInt(id);
    
    
    if(operation === 0) {
        enterFirst = true;
        if(!decimal) {
            firstNumber = firstNumber * 10 + number;
        } else {
            factor *= 10;
            firstNumber = firstNumber + number / factor;
        }
        
        
    } else {
        if (operation !== 0) {
            enterSecond = true;
            if(!decimal) {
                secondNumber = secondNumber * 10 + number;
            } else {
                factor *= 10;
                secondNumber = secondNumber + number / factor;
            }
        }  
    }
    
}

function backsp() {
    
    if(!decimal) {
        if(firstNumber !== 0 && operation === 0) {
            firstNumber = parseInt(firstNumber / 10);
            if(firstNumber !== 0) display.innerHTML = firstNumber;
            else display.innerHTML = '';
        } else if(secondNumber !== 0 && operation !== 0) {
            secondNumber = parseInt(secondNumber / 10);
            if(secondNumber !== 0) display.innerHTML = secondNumber;
            else display.innerHTML = '';
        }
    } else {
        if(firstNumber !== 0 && operation === 0) {
            firstNumber = firstNumber * factor;
            factor = factor / 10;
            if(factor === 1) {
                decimal = false;
                backsp();
            } else {
                firstNumber = setDecimal(firstNumber);
                display.innerHTML = firstNumber;
                
            }
        } else if(secondNumber !== 0 && operation !== 0) {
            secondNumber = secondNumber * factor;
            factor = factor / 10;
            if(factor === 1) {
                decimal = false;
                backsp();
            } else {
                secondNumber = setDecimal(secondNumber);
                display.innerHTML = secondNumber;
            }
        }
    }
}

function setDecimal(globNumber) {
    let temp;
    temp = globNumber / 10;
    temp = parseInt(temp);
    globNumber = temp / factor;
    return globNumber;
}

function answer() {
    let answers = 0;
    if(enterFirst && enterSecond){
        factor = 1;
        switch (operation) {
            case 1:
                answers = firstNumber + secondNumber;
                break;
            case 2:
                answers = firstNumber - secondNumber;
                break;
            case 3:
                answers = firstNumber * secondNumber;
                break;
            case 4:
                answers = firstNumber / secondNumber;
                break;
            case 5:
                answers = firstNumber % secondNumber;
                break;
        }
        enterFirst = false;
        enterSecond = false;
    } else return;
    
    
    display.innerHTML = answers;
    console.log(answers);
    operation = 0;
    firstNumber = answers;
    enterFirst = true;
    secondNumber = 0;
}

//after first number if equal is clicked shows zero
//try adding booleans to check if both numbers are entered and then execute certain code else print first number
// did not work on above bug much
