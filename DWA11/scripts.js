const MAX_NUMBER = 30;
const MIN_NUMBER = -5;

const number = document.querySelector('[data-number]');
const subtract = document.querySelector('[data-subtract]');
const add = document.querySelector('[data-add]');
const reset = document.querySelector('[data-reset]');

const subtractHandler = () => {
  const newValue = parseInt(number.value) - 1;
  number.value = newValue;

  if (newValue <= MIN_NUMBER) {
    subtract.disabled = true;
  }

  if (add.disabled === true) {
    add.disabled = false;
  }
};

const addHandler = () => { 
  const newValue = parseInt(number.value) + 1;
  number.value = newValue;

  if (subtract.disabled === true) {
    subtract.disabled = false;
  }

  if (newValue >= MAX_NUMBER) {
    add.disabled = true;
  }
};

const resetHandler = () => {
  number.value = 0;
  alert('The counter has been reset!!!');

  if (subtract.disabled === true) {
    subtract.disabled = false;
  }

  if (add.disabled === true) {
    add.disabled = false;
  }
};

let clickCount = 0; 

add.addEventListener('click', () => {
  clickCount++;
  if (clickCount === 1) {
    store.dispatch({ type: ActionTypes.ADD });
    clickCount = 0; // Reset click count after dispatching action
  }
});

subtract.addEventListener('click', subtractHandler);
reset.addEventListener('click', resetHandler);

// Redux store
const createStore = (reducer) => {
  let state;
  const subscribers = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    subscribers.forEach((subscriber) => subscriber());
  };

  const subscribe = (subscriber) => {
    subscribers.push(subscriber);
    return () => {
      const index = subscribers.indexOf(subscriber);
      if (index !== -1) {
        subscribers.splice(index, 1);
      }
    };
  };

  dispatch({}); // Initialize state

  return {
    getState,
    dispatch,
    subscribe,
  };
};

// Initial state
const initialState = {
  counter: 0,
};

// Action types
const ActionTypes = {
  ADD: 'ADD',
  SUBTRACT: 'SUBTRACT',
  RESET: 'RESET',
};

// Reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD:
      return {
        ...state,
        counter: state.counter + 1,
      };
    case ActionTypes.SUBTRACT:
      return {
        ...state,
        counter: state.counter - 1,
      };
    case ActionTypes.RESET:
      return {
        ...state,
        counter: 0,
      };
    default:
      return state;
  }
};

// Create the store
const store = createStore(reducer);

// Subscribe to state changes
store.subscribe(() => {
  const currentState = store.getState();
  console.log(currentState);
});

console.log('Initial state:', store.getState());
store.dispatch({ type: ActionTypes.ADD });
console.log('State after dispatch:', store.getState());

console.log('Initial state:', store.getState());
store.dispatch({ type: ActionTypes.ADD });
console.log('State after dispatch:', store.getState());

console.log('Initial state:', store.getState());
store.dispatch({ type: ActionTypes.SUBTRACT });
console.log('State after dispatch:', store.getState());

console.log('Initial state:', store.getState());
store.dispatch({ type: ActionTypes.RESET });
console.log('State after dispatch:', store.getState());
