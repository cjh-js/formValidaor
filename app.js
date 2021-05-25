const form = document.querySelector('.formjs');
const name = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');

// Common Functions
function getUpperName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function getDiv(input){
    return input.parentNode;
}

// Show Error || Success

function showErr(input, msg){
    getDiv(input).className = 'error';
    const errorMsg = getDiv(input).querySelector('small');
    errorMsg.innerText = msg;
}

function showSuc(input){
    getDiv(input).className = 'success';
}

// Check Functions

function checkRequired(inputs){
    inputs.forEach((input) => {
       if(input.value.trim() === ''){
           showErr(input, `${getUpperName(input)} is required.`);
       }
    });
}

function checkLength(input, min, max){
    if(input.value.length < min){
        showErr(input, `${getUpperName(input)} must be more than ${min} characters.`);
    } else if(input.value.length > max){
        showErr(input, `${getUpperName(input)} must be less than ${max} characters.`)
    } else{
        showSuc(input);
    }
}

function checkMail(input){
    const mail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(mail.test(input.value.trim())){
        showSuc(input);
    } else {
        showErr(input, `${getUpperName(input)} is not valid.`);
    }
}

function checkPW(pw1, pw2){
    if(pw1.value !== pw2.value){
        showErr(pw2, `Password does not match`);
    } else {
        showSuc(pw2);
    }
}

// Event Listener
form.addEventListener('submit', (e) => {
    e.preventDefault();

    checkRequired([name, email, password, password2]);
    checkLength(name, 3, 15);
    checkLength(password, 6, 20);
    checkMail(email);
    checkPW(password, password2);
});