import React, { Component } from 'react'
import styles from './ChatInfo.module.scss'

export default class ChatInfo extends Component {
    render() {
        return (
            <div className={ styles.chatinfo }>
                <ul>
                    <li>
                        <p className="message-text text-right">
                            asdasdadas
                        </p>
                        <img src="http://img3.imgtn.bdimg.com/it/u=3140403455,2984550794&fm=26&gp=0.jpg" alt="touxiang"/>
                    </li>
                </ul >
            </div >
        )
    }
}
