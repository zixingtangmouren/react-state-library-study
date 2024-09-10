/**
 * redux 的大致实现
 */

export function createStore(reducer) {
  let currentState;
  let listenerList = [];

  function getState() {
    return currentState;
  }

  function dispatch(action) {
    currentState = reducer(currentState, action);

    for (let i = 0; i < listenerList.length; i++) {
      const listener = listenerList[i];
      listener();
    }
  }

  function subscribe(listener) {
    listenerList.push(listener);
  }

  const store = {
    getState,
    dispatch,
    subscribe,
  };

  return store;
}

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
