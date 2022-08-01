import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppWithReducers from "./AppWithReducers";
import AppWithRedux from "./AppWithRedux";
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from "./state/store";

ReactDOM.render(
    <Provider store={store}>
    <AppWithRedux />
    </Provider>,  document.getElementById('root')
    );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
reportWebVitals();
