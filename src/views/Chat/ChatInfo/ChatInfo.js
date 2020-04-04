import React, { Component } from 'react'
import styles from './ChatInfo.module.scss'
import socket from '../../../utils/io'
import Back from '../../../components/Back/Back'
import store from '../../../store/store'

export default class ChatInfo extends Component {
    render() {
        return (
            <div className={styles.chatinfo}>
                <div className={styles.back}>
                    <Back back={this.back} title="对话" />
                </div>
                <ul>
                    <li className={styles.you}>对方消息</li>
                    <li className={styles.me}>我的消息</li>
                    <li className={styles.you}>对方消息</li>
                    <li className={styles.me}>我的消息</li>
                    <li className={styles.you}>对方消息</li>
                    <li className={styles.me}>我的消息</li>
                    <li className={styles.you}>对方消息</li>
                    <li className={styles.me}>我的消息</li>
                    <li className={styles.you}>对方消息</li>
                    <li className={styles.me}>我的消息</li>
                    <li className={styles.you}>对方消息</li>
                    <li className={styles.me}>我的消息</li>
                    <li className={styles.you}>对方消息</li>
                    <li className={styles.me}>我的消息</li>
                    <li className={styles.you}>对方消息</li>
                    <li className={styles.me}>我的消息</li>
                    <li className={styles.you}>对方消息</li>
                    <li className={styles.me}>我的消息</li>
                    <li className={styles.you}>对方消息</li>
                    <li className={styles.me}>我的消息</li>
                    <li className={styles.you}>对方消息</li>
                    <li className={styles.me}>我的消息</li>
                    <li className={styles.you}>对方消息</li>
                    <li className={styles.me}>我的消息</li>
                    <li className={styles.you}>对方消息</li>
                    <li className={styles.me}>我的消息</li>
                    <li className={styles.you}>对方消息</li>
                    <li className={styles.me}>我的消息</li>
                    <li className={styles.you}>对方消息</li> 
                </ul>

                <div className={styles.ipt}>
                    <input autoComplete="off" />
                    <button onClick={this.sub}>Send</button>
                </div>

            </div >
        )
    }
    back = () => {
        this.props.history.go(-1)
    }
    sub = () => {
        socket.emit('msg', { text: `发送给${store.getState().otherid}`, openid: store.getState().otherid });
        socket.on('chat message', function (msg) {
            console.log(msg)
        });
    }
}
