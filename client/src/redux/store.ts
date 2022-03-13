import { combineReducers } from "redux";
import { conversationsReducer, userReducer } from "./reducers";
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const reducers = combineReducers({ conversations: conversationsReducer, user: userReducer });

const store = createStore(reducers, {}, compose(applyMiddleware(thunk)));

export default store;
