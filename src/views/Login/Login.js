import React, { Component } from 'react';
import styles from './Login.module.scss'
import axios from 'axios'
import { Button, message } from 'antd'
import store from '../../store/store'
import { ShowFooter, OpenID } from '../../store/actionCreators'

import socket from '../../utils/io'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ""
        }

    }
    render() {
        return (
            <div className={styles.login}>
                <div className={styles.login_logo}>
                    <section>
                        <img src={require('./imgs/logo.png')} alt="logo" />
                    </section>
                </div>
                <div className={styles.login_body}>
                    <section>
                        <ul>
                            <li>
                                <input
                                    type="text"
                                    className={styles.account}
                                    defaultValue={this.state.username}
                                    onChange={e => this.setState({ username: e.target.value })}
                                    placeholder="手机/邮箱" />
                            </li>
                            <li>
                                <input
                                    type="password"
                                    className={styles.pwd}
                                    defaultValue={this.state.password}
                                    onChange={e => this.setState({ password: e.target.value })}
                                    placeholder="密码" />
                            </li>
                        </ul>
                        <a href="true" className={styles.forget}>忘记密码？</a>
                        <div className={styles.third}>
                            <a href="true" className={styles.qq}>
                                <i></i>
                                <span>QQ</span>
                            </a>
                            <a href="true" className={styles.wechat}>
                                <i></i>
                                <span>微信</span>
                            </a>
                        </div>
                        <Button type="primary" onClick={this.login}>登陆</Button>
                        <Button type="primary" onClick={this.reg}>注册</Button>
                    </section>
                </div>

            </div >
        );
    }

    login = () => {
        let { username, password } = this.state
        //  邮箱正则
        let mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{ 2,})+$/;
        // 手机正则
        let telReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
        // let telReg = /^\d{3}$/;
        if (mailReg.test(username) || telReg.test(username)) {
            axios({
                url: `http://localhost:3001/react/login`,
                method: "post",
                data: {
                    username: username,
                    password: password
                }
            }).then(res => {
                let { msg } = res.data
                if (res.data.code === 200 && res.data.msg === "登陆成功") {
                    //发送当前登录用户信息以及socketid给服务端
                    socket.emit("loginInfo", { socketid: socket.id, openid: res.data.openid })
                    //修改footer状态
                    store.dispatch(ShowFooter())
                    store.dispatch(OpenID(res.data.openid))
                    //跳转至首页
                    this.props.history.push({ pathname: "/home", query: res.data.openid })
                } else {
                    message.info(msg)
                }
            });
        } else {
            message.warning("请输入正确的邮箱或者手机号");
        }
    }
    //注册
    reg = () => {
        this.props.history.push('/reg')
    }
}

export default Login;