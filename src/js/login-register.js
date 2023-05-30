const register = document.querySelector(".header__register");
const log = document.querySelector(".header__log");
const loginForm = document.querySelector(".login__form");
const registerLink = document.getElementById('register');
const loginLink = document.getElementById('log-in');
const logInBtn = document.getElementById('log-btn');
const registerBtn = document.getElementById('register-btn');

register.addEventListener('click', () => {
  loginForm.style.visibility = 'visible';
  registerBtn.style.visibility = 'visible';
  //logInBtn.classList.add('disabled');
  registerLink.style.color = 'red'
  
  if (registerBtn.style.visibility === 'visible'){
    logInBtn.style = 'hidden';
    loginLink.style.color = 'white';
  }});

log.addEventListener('click', () => {
  loginForm.style.visibility = 'visible';
  logInBtn.style.visibility = 'visible';
 // registerBtn.classList.add('disabled');
  loginLink.style.color = 'red';

if (logInBtn.style.visibility === 'visible'){
  registerBtn.style.visibility = 'hidden';
  registerLink.style.color = 'white';
}
});