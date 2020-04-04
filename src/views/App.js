import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import style from './App.module.scss'
import Footer from '../components/Footer/Footer'

import Chat from './Chat/Chat.js'
import Actions from './Actions/Actions.js'
import My from '../views/My/My.js'
import ChatInfo from './Chat/ChatInfo/ChatInfo.js'
import Login from './Login/Login'
import Reg from './Reg/Reg'
import Home from './Home/home'
import Detail from "../components/Detail/Detail";
import Search from '../components/Search/Search'
import Info from './Info/Info'
import store from '../store/store'
import { FooterStatus, ShowFooter } from '../store/actionCreators'


class App extends Component {
    constructor(props) {
        super(props)
        store.subscribe(this.storeChange)
    }
    render() {
        return (
            <div className={style.app}>
                <Switch>
                    <Route exact path="/chat" component={Chat} />
                    <Route path="/chat/chatinfo" component={ChatInfo} />
                    <Route path="/actions" component={Actions} />
                    <Route path="/my" component={My} />
                    <Route path="/login" component={Login} />
                    <Route path="/reg" component={Reg} />
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/home/search" component={Search} />
                    <Route path="/home/search/userinfo" component={Info} />
                    <Route path="/detail" component={Detail} />
                    <Redirect exact from="/" to="/login" />
                </Switch>
                {store.getState().isShowFooter ? <Footer /> : ''}
            </div>
        )
    }
    storeChange = () => {
        this.setState(store.getState())
    }
    componentDidMount() {
        // 监听路由变化
        this.props.history.listen((props) => {
            let { pathname } = props
            console.log(`当前路由是${pathname}`)
            if (pathname === "/login" || pathname === "/reg" || pathname === '/detail' || pathname === '/chat/chatinfo' || pathname === '/addfriends') {
                store.dispatch(FooterStatus())
            } else {
                store.dispatch(ShowFooter())
            }
        })
    }






}

export default App