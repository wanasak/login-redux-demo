import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { configureFakeBackend, store } from './_helpers';
import { App } from './App';
import registerServiceWorker from './registerServiceWorker';

// setup fake backend
configureFakeBackend();


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root')
);

registerServiceWorker();
