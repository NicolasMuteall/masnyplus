// store.js

import { legacy_createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Store

const initStore = {
  idUser: '', // Par défaut, 0 si aucune valeur n'est trouvée
  nom: '',
  prenom: '',
  role: '',
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
    default:
      return state;
  }
};

// Create the Redux store
const persistConfig = {
  key: 'root', // La clé racine pour le stockage local
  storage, // Utilisez le stockage local (vous pouvez changer cela en sessionStorage ou tout autre stockage)
};

const persistedReducer = persistReducer(persistConfig, rootReducers);
const store = legacy_createStore(persistedReducer, composeWithDevTools());
const persistor = persistStore(store);

export { store, persistor, setIdUser, setNom, setPrenom, setRole };
