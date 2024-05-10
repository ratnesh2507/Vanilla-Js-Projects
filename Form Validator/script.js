//Variables
const form = document.querySelector('#form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmpassword = document.querySelector('#confirm-password');

//Functions
function showError(input, message){
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  formControl.querySelector('small').innerHTML = message;
}

function showSuccess(input){
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

function checkEmail(input){
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(re.test(input.value.trim())){
    showSuccess(input);
  }else{
    showError(input, 'Email is not valid');
  }
}

function checkRequired(inputArr){
  inputArr.forEach(function(input){
    if (input.value.trim() === ''){
      showError(input,`${getFieldName(input)} is Required!!!`);
    }else{
      showSuccess(input);
    }
  });
}

function checkLength(input, min, max){
  if(input.value.length < min){
    showError(input, `${getFieldName(input)} must be at least ${min} characters`);
  }else if(input.value.length > max){
    showError(input, `${getFieldName(input)} must be less than ${max} characters`);
  }else{
    showSuccess(input);
  }
}

function checkPasswords(input1,input2){
  if(input1.value !== input2.value){
    showError(input2, "Passwords do not match");
  }else{
    showSuccess(input2);
  }
}

function getFieldName(input){
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
//Event Listener
form.addEventListener('submit',function(e){
  e.preventDefault();
  checkRequired([username,email,password,confirmpassword]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  if(password.value !== ''){
    checkPasswords(password,confirmpassword);
  }
});
