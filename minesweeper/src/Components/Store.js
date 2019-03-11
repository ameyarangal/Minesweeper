import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import UserReducer from "../Reducers/UserReducer";

const rootReducer = combineReducers({
  user: UserReducer
});

const middleware = applyMiddleware(thunk);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const Store = createStore(rootReducer, composeEnhancers(middleware));

export default Store;
