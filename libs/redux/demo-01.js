/**
 * redux 的基本使用
 */

import { createStore } from 'redux';

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

const store = createStore(reducer);

store.subscribe(() => {
  document.getElementById('num').innerText = store.getState().num;
  console.log(store.getState());
});

document.getElementById('increment').addEventListener('click', () => {
  store.dispatch({ type: 'INCREMENT' });
});

document.getElementById('decrement').addEventListener('click', () => {
  store.dispatch({ type: 'DECREMENT' });
});
