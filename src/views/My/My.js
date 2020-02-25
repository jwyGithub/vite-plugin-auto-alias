import React, { Component } from 'react'
import styles from './My.module.scss'
import UserInfo from './UserInfo/UserInfo'
import axios from 'axios'
// import store from '../../store/store'

export default class My extends Component {
    constructor(props){
        super(props)
        this.state = {
            userinfo: {}
        }
    }
    
    render() {
        return (
            <div className={ styles.my }>
                <div className={ styles.top }>
                    <UserInfo userinfo={ this.state.userinfo ? this.state.userinfo : "" } detail={ this.detail } />
                </div>
                <ul>
                    <li>
                        <i></i>
                        <p>支付</p>
                    </li>
                    <li>
                        <i></i>
                        <p>收藏</p>
                    </li>
                    <li>
                        <i></i>
                        <p>相册</p>
                    </li>
                    <li>
                        <i></i>
                        <p>卡包</p>
                    </li>
                    <li>
                        <i></i>
                        <p>表情</p>
                    </li>
                    <li>
                        <i></i>
                        <p>设置</p>
                    </li>
                </ul>
            </div>
        )
    }

    componentDidMount() {
        // 获取用户信息
        axios({
            url: "http://localhost:3001/react/userinfo",
        }).then((res) => {
            this.setState({
                userinfo: res.data.msg
            })

        })
    }

    detail = () => {
        console.log('进入详情界面')
    }

    getUserinfo = () => {
        console.log('进入用户信息界面')
    }
}
