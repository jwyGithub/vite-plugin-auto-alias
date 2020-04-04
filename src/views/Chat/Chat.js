import React, { Component } from 'react'
import styles from './Chat.module.scss'
import Cell from "../../components/Cell/Cell.js";
import axios from 'axios'

export default class Chat extends Component {

    state = {
        data: [
        ]
    }


    render() {
        return (
            <div className={styles.chat}>
                <ul>
                    {
                        this.state.data.map(item =>
                            <li key={item.openid}><Cell data={item} userInfo={this.getUserinfo} msgInfo={this.getMsginfo.bind(item.openid)} /></li>
                        )
                    }
                </ul>
            </div>
        )
    }

    componentDidMount() {
        axios({
            url: "http://localhost:3001/react/chat"
        }).then(res => {
            this.setState({ data: res.data.data })
        })
    }

    getUserinfo = (data, event) => {
        event.preventDefault()
        console.log('获取用户信息', data)
    }

    getMsginfo = (id) => {
        console.log('获取聊天信息', id)
        this.props.history.push({ pathname: "/chat/chatinfo", query: { id:id } })
    }
}
