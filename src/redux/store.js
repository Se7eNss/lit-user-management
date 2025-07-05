import {createStore} from 'redux';
import {employeeReducer} from './reducers/employeeSlice';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn('Could not load state from localStorage', e);
    return undefined;
  }
};
const persistedState = loadState();

export const store = createStore(
  employeeReducer,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
  } catch (e) {
    console.warn('Could not save state to localStorage', e);
  }
};

store.subscribe(() => {
  saveState(store.getState());
});
