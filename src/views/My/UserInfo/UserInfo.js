import React, { Component } from 'react'
import styles from './UserInfo.module.scss'
import propTypes from 'prop-types'

export default class UserInfo extends Component {
    static defaultProps = {
        userinfo: {},
        detail: () => { },
        // msgInfo: () => { }
    };
    static propTypes = {
        userinfo: propTypes.object,

        //获取用户信息
        // userInfo: propTypes.func,
        detail: propTypes.func
    };
    render() {
        let { userinfo,detail } = this.props
        return (
            <div className={ styles.userinfo }>
                <div className={ styles.left }>
                    <img src={ userinfo.usericon } alt="头像" />
                </div>
                <div className={ styles.center }>
                    <p>{ userinfo.username }</p>
                    <span>微信号：{ userinfo.account }</span>
                </div>
                <div className={ styles.right }>
                    <i></i>
                    <i onClick={ detail.bind(null,'') }></i>
                </div>
            </div>
        )
    }

}
