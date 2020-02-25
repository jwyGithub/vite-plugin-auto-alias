import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import style from './App.module.scss'
import Chat from './Chat/Chat.js'
import Actions from './Actions/Actions.js'
import My from '../views/My/My.js'
import ChatInfo from './Chat/ChatInfo/ChatInfo.js'
import Login from './Login/Login'
import Reg from './Reg/Reg'
import store from '../store/store'

export default class App extends Component {
    constructor(props) {
        super(props)
        store.subscribe(this.storeChange)
    }
    render() {
        return (
            <div className={ style.app }>
                <Switch>
                    <Route exact path="/chat" component={ Chat } />
                    <Route path="/chat/chatinfo" component={ ChatInfo } />
                    <Route path="/actions" component={ Actions } />
                    <Route path="/my" component={ My } />
                    <Route path="/login" component={ Login } />
                    <Route path="/reg" component={ Reg } />
                    <Redirect exact from="/" to="/login" />
                    {/* <Route component={NoPage} /> */ }
                </Switch>
                { store.getState().isShowFooter ? <Footer /> : '' }

            </div>
        )
    }
    storeChange = () => {
        this.setState(store.getState())
    }
    componentDidMount() {

        let { pathname } = this.props.history.location
        if (pathname === "/login" || pathname === "/reg") {
            const action = {
                type: "isShowFooter"
            }
            store.dispatch(action)
        }

    }
}
