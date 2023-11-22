// store.js

import { legacy_createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Store

const initStore = {
  idUser: '',
  nom: '',
  prenom: '',
  role: '',
  token: '',
  login: false
};

// Actions creators

const setIdUser = (value) => ({
  type: "setIdUser",
  payload: value,
});

const setNom = (value) => ({
  type: "setNom",
  payload: value,
});

const setPrenom = (value) => ({
  type: "setPrenom",
  payload: value,
});

const setRole = (value) => ({
  type: "setRole",
  payload: value,
});

const setToken = (value) => ({
  type: "setToken",
  payload: value,
});

const setLogin = (value) => ({
  type: "setLogin",
  payload: value,
});

// Reducer
const rootReducers = (state = initStore, action) => {
  switch (action.type) {
    case "setIdUser":
      return {
        ...state,
        idUser: action.payload,
      };
    case "setNom":
      return {
        ...state,
        nom: action.payload,
      };
    case "setPrenom":
      return {
        ...state,
        prenom: action.payload,
      };
    case "setRole":
      return {
        ...state,
        role: action.payload,
      };
    case "setToken":
      return {
        ...state,
        token: action.payload,
      };
    case "setLogin":
      return {
        ...state,
        login: action.payload,
      };
    default:
      return state;
  }
};

// Create the Redux store
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);
const store = legacy_createStore(persistedReducer, composeWithDevTools());
const persistor = persistStore(store);

export { store, persistor, setIdUser, setNom, setPrenom, setRole, setToken, setLogin };
