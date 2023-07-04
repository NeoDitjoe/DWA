// //@ts-check


import { App } from './App.js'


const initialState = {
  counter: 0,
};

/**
 * 
 * @param {*} state 
 * @param {*} action 
 * @returns 
 */
function reducer(state = initialState, action) {
  switch(action.type) {
    case 'addHandler':
      return { ...state, counter: state.counter + 1 };
    
    case 'subtractHandler':
      return { ...state, counter: state.counter - 1 };
  
    case 'resetHandler':
      return state = initialState
  };
};

export const store = Redux.createStore(reducer)

customElements.define('td-app', App)