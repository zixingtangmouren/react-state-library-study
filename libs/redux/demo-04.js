/**
 * @reduxjs/toolkit 的使用
 */

import { createSlice, configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    incremented: (state) => {
      state.value += 1;
    },
    decremented: (state) => {
      state.value -= 1;
    },
    decrementAsync: (state) => {
      setTimeout(() => {
        state.value -= 1;
      }, 2000);
    },
  },
});

export const { incremented, decremented, decrementAsync } = counterSlice.actions;

const logger = (store) => (next) => (action) => {
  console.log('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  return result;
};

const store = configureStore({
  reducer: counterSlice.reducer,
  middleware: () => [logger, thunk],
});

// 可以订阅 store
store.subscribe(() => {
  document.getElementById('num').innerText = store.getState().value;
});

document.getElementById('increment').addEventListener('click', () => {
  store.dispatch(incremented());
});

document.getElementById('decrement').addEventListener('click', () => {
  store.dispatch(decremented());
});

document.getElementById('decrementAsync').addEventListener('click', () => {
  store.dispatch(decrementAsync());
});
