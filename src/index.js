import React from 'react';
import ReactDOM from 'react-dom';


//引入路由
import {BrowserRouter, Route } from 'react-router-dom'


//默认css样式
import 'antd/dist/antd.css'
import './index.css';
// import './assets/js/rem'

//主界面
import App from './views/App'


ReactDOM.render(
    <BrowserRouter>
        <Route component={App} />
    </BrowserRouter>,
    document.getElementById('root'));

