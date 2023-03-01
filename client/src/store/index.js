import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducer';
import thunk from 'redux-thunk'; //para trabajar asincrono
import {composeWithDevTools} from 'redux-devtools-extension'
//instalar todo


export const store = createStore(
   rootReducer,
   composeWithDevTools(applyMiddleware(thunk)), //nos va a permitir trabajar con acciones asíncronas dentro de Redux.
);