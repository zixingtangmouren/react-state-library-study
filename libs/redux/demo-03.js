/**
 * 中间的应用
 */

import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';

// 告诉 store 如何更新 state
function reducer(state = { num: 0 }, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { num: state.num + 1 };
    case 'DECREMENT':
      return { num: state.num - 1 };
    default:
      return state;
  }
}

// 实现一个 middleware
function logger({ getState }) {
  return (next) => (action) => {
    console.log('dispatching', action);
    let result = next(action);
    console.log('next state', getState());
    return result;
  };
}

const store = createStore(reducer, applyMiddleware(logger, thunk));

store.subscribe(() => {
  document.getElementById('num').innerText = store.getState().num;
});

const increment = () => ({ type: 'INCREMENT' });
const decrement = () => ({ type: 'DECREMENT' });
const decrementAsync = () => (dispatch) => {
  setTimeout(() => {
    dispatch(decrement());
  }, 2000);
};

document.getElementById('increment').addEventListener('click', () => {
  store.dispatch(increment());
});

document.getElementById('decrement').addEventListener('click', () => {
  store.dispatch(decrement());
});

document.getElementById('decrementAsync').addEventListener('click', () => {
  store.dispatch(decrementAsync());
});
