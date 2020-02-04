import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Header from "../components/Header/Header";
import Footer from '../components/Footer/Footer'
import style from './App.module.scss'
import Chat from './Chat/Chat.js'
import My from '../views/My/My.js'


export default class App extends Component {
    render() {
        return (
            <div className={style.app}>
                <Header />
                <Switch>
                    <Route path="/chat" component={Chat} />
                    <Route path="/my" component={My} />
                    <Redirect exact from="/" to="/chat" />
                    {/* <Route component={NoPage} /> */}
                </Switch>
                <Footer />
            </div>
        )
    }
}
