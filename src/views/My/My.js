import React, { Component } from 'react'
import styles from './My.module.scss'
import UserInfo from '../../components/UserInfo/UserInfo'
import {getUserInfo} from '../../requests/requests'
import store from '../../store/store'

class My extends Component {
    render() {
        return (
            <div className={styles.my}>
                <div className={styles.top}>
                    <UserInfo userinfo={store.getState().userinfo ? store.getState().userinfo : ""} detail={this.detail} />
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
        store.dispatch(getUserInfo(store.getState().openid))
    }

    detail = () => {
        console.log('进入详情界面')
    }

    getUserinfo = () => {
        console.log('进入用户信息界面')
    }
}

export default My