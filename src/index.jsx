import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit';
import repoReducer from "./repoState";
import repoSaga from './repoSaga';

const saga = createSagaMiddleware();
const store = configureStore({
    reducer:{
        repos:repoReducer
    },
    middleware:()=>[saga]
});
saga.run(repoSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
         <App />
    </Provider>
);



