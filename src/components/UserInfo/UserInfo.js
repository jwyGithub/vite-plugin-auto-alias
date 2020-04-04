import React, { Component } from 'react'
import styles from './UserInfo.module.scss'
import propTypes from 'prop-types'

export default class UserInfo extends Component {
    static defaultProps = {
        userinfo: {
            "icon": "https://img2.woyaogexing.com/2020/03/06/3f2933f0af5741e3aadb6fa0554adeb0!400x400.jpeg",
            "name": "6412",
            "wechatid": "anhao5452"
        },
        // detail: () => { },
        // msgInfo: () => { }
    };
    static propTypes = {
        userinfo: propTypes.object,

        //获取用户信息
        // userInfo: propTypes.func,
        // detail: propTypes.func
    };
    render() {
        // let detail = this.props.userinfo.detail ? this.props.userinfo : this.defaultProps.userinfo
        let { detail } = this.props.userinfo 
        return (
            detail ?
                <div className={styles.userinfo}>
                    <div className={styles.left}>
                        <img src={detail.icon} alt="头像" />
                    </div>
                    <div className={styles.center}>
                        <p>{detail.name}</p>
                        <span>微信号：{detail.wechatid}</span>
                    </div>
                    <div className={styles.right} style={{ display: this.props.isshow ? 'block' : 'none' }}>
                        <i></i>
                        <i></i>
                    </div>
                </div>

                : ""
        )
    }

}
