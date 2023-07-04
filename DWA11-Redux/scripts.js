const MAX_NUMBER = 9;
const MIN_NUMBER = -4;

const number = document.querySelector('[data-number]');
const subtract = document.querySelector('[data-subtract]');
const add = document.querySelector('[data-add]');
const reset = document.querySelector('[data-reset]');

function reducer(state = 0, action) {
  switch(action.type) {
    case 'addHandler':
      return state + 1;
    
    case 'subtractHandler':
      return state - 1;
  
    case 'resetHandler':
      return state = 0
  };
};

const store = Redux.createStore(reducer)

add.addEventListener('click', (e) => {

  if (number.value <= MAX_NUMBER) {
    store.dispatch({ type: 'addHandler'})
    subtract.disabled = false;
  }else{
    add.disabled = true;
  }
})

subtract.addEventListener('click', (e) => {
  

  if (number.value >= MIN_NUMBER) {
    store.dispatch({ type: 'subtractHandler'})
    add.disabled = false;
  }else {
    subtract.disabled = true;
  }

})

reset.addEventListener('click', (e) => {
  store.dispatch({ type: 'resetHandler'})
  alert('The counter has been reset!!!')

  add.disabled = false;
  subtract.disabled = false;
})

store.subscribe(() => {
  console.log(store.getState())
  number.value = store.getState()
})