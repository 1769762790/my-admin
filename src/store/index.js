import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from 'redux-thunk'
import reducer from './reducers'

// 开启redux 调试
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(reduxThunk)
);
const store = createStore(reducer, enhancer)

export default store