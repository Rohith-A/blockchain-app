// import createSagaMiddleware from "@redux-saga/core";
// import { configureStore } from "@reduxjs/toolkit";
// import { appReducer } from "../reducer/appReducer";

// const sagaMiddleware = createSagaMiddleware();

// const store = configureStore({
//   reducer: appReducer,
//   middleware: [sagaMiddleware],
// });

// export default store;

/**
  @desc createStore is used for creating a store for our redux
  @desc applyMiddleware is used for applying some middleware to redux, in this case we gonna using redux-saga
*/
import { legacy_createStore as createStore, applyMiddleware } from 'redux' 

// composeWithDevTools is tools that gonna be connecting our application for debugging the redux into the browser
import { composeWithDevTools } from 'redux-devtools-extension'

// This is the middleware that we gonna use redux-saga
import createSagaMiddleware from 'redux-saga'

// This is the root saga that will contain our sagas, or I should say model? XD
import rootSaga from '../saga/saga'

// This will be contain our reducer for the application
import { appReducer } from '../reducer/appReducer'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    appReducer,
  {},
  composeWithDevTools(applyMiddleware(sagaMiddleware))
)

// Run redux-saga
sagaMiddleware.run(rootSaga)

export default store