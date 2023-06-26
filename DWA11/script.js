const MAX_NUMBER = 30;
const MIN_NUMBER = -5;
  
const number = document.querySelector('[data-number]');
const subtract = document.querySelector('[data-subtract]');
const add = document.querySelector('[data-add]');
const reset = document.querySelector('[data-reset]')

const subtractHandler = () => {

  const newValue = parseInt(number.value) - 1;
  number.value = newValue;

  if (newValue <= MIN_NUMBER) {
    subtract.disabled = true;
  }

  if (add.disabled === true) {
    add.disabled = false;
  }
}

const addHandler = () => {

  const newValue = parseInt(number.value) + 1;
  number.value = newValue;

  if (subtract.disabled === true) {
    subtract.disabled = false;
  }
    
  if (newValue >= MAX_NUMBER) {
    add.disabled = true;
  }
}




const resetHandler = () => {

  number.value = 0;
  alert('The counter has been reset!!!')

  if (subtract.disabled === true) {

    subtract.disabled = false;

  };

  if (add.disabled === true) {

    add.disabled = false;
  };

} 





subtract.addEventListener('click', subtractHandler);
add.addEventListener('click', addHandler);
reset.addEventListener('click', resetHandler);


