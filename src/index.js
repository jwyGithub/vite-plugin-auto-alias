import React from 'react';
import ReactDOM from 'react-dom';
// import vconsole from 'vconsole'
import store from './store/store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from './store/store'
//引入路由
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux';

//默认css样式
import 'antd/dist/antd.css'
import './index.css';
// import './assets/js/rem'

//主界面
import App from './views/App'

// new vconsole()


ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <Route component={App} />
            </BrowserRouter>
        </PersistGate>
    </Provider>,
    document.getElementById('root'));

