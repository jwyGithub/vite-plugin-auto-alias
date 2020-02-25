import React, { Component } from 'react'
import styles from './Chat.module.scss'
import Cell from "../../components/Cell/Cell.js";
// import socket from '../../utils/io'
import axios from 'axios'
export default class Chat extends Component {

    state = {
        data: [
            { id: '1', name: "向你们", msg: "asdasdasdasasdasdas", date: "14:23:41", unread: 0 },
            { id: '2', name: "向你们1", msg: "asdasdasdasasdasdas", date: "14:23:41", unread: 1 },
            { id: '3', name: "向你2", msg: "asdasdasdasasdasdas", date: "14:23:41", unread: 1 },
            { id: '4', name: "向你3", msg: "asdasdasdasasdasdas", date: "14:23:41", unread: 1 },
            { id: '5', name: "向4们", msg: "asdasdasdasasdasdas", date: "14:23:41", unread: 1 },
            { id: '6', name: "向你5们", msg: "asdasdasdasasdasdas", date: "14:23:41", unread: 1 },
            { id: '7', name: "向你5们", msg: "asdasdasdasasdasdas", date: "14:23:41", unread: 1 },
            { id: '8', name: "向你5们", msg: "asdasdasdasasdasdas", date: "14:23:41", unread: 1 },
            { id: '9', name: "向你5们", msg: "asdasdasdasasdasdas", date: "14:23:41", unread: 1 },
            { id: '10', name: "向你5们", msg: "asdasdasdasasdasdas", date: "14:23:41", unread: 1 },
            { id: '11', name: "向你5们", msg: "asdasdasdasasdasdas", date: "14:23:41", unread: 1 },
            { id: '12', name: "向你5们", msg: "asdasdasdasasdasdas", date: "14:23:41", unread: 1 },
            { id: '13', name: "向你5们", msg: "asdasdasdasasdasdas", date: "14:23:41", unread: 1 },
            { id: '14', name: "向你5们", msg: "asdasdasdasasdasdas", date: "14:23:41", unread: 1 },
        ]
    }


    render() {
        return (
            <div className={ styles.chat }>
                <ul>
                    {
                        this.state.data.map(item =>
                            <li key={ item.id }><Cell data={ item } userInfo={ this.getUserinfo } msgInfo={ this.getMsginfo } /></li>
                        )
                    }
                </ul>
            </div>
        )
    }


    getUserinfo = (data, event) => {
        event.preventDefault()
        console.log('获取用户信息', data)
    }

    getMsginfo = (data) => {
        console.log('获取聊天信息', data)
        this.props.history.push('/chat/chatinfo')
     
        axios({
            url:"http://localhost:3001/react/chat",
            method: 'post', 
            headers: {'token': '1232'},
        })


        // socket.on('mess_type', (data) => {
        //     console.log('首页_客户端收到', data)
        //     //dom 操作
        // })
    }
}
