import React, { Component } from 'react';
import styles from './Reg.module.scss'
import { Button, message } from 'antd'
import axios from 'axios'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tel: "",
            pwd: "",
            code: "",
            name: ""
        }
    }
    render() {
        return (
            <div className={styles.login}>
                <ul>
                    <li>
                        <input
                            type="text"
                            placeholder="请输入姓名"
                            defaultValue={this.state.name}
                            onChange={e => this.setState({ name: e.target.value })}
                        />
                    </li>
                    <li>
                        <input
                            type="text"
                            placeholder="请输入手机号"
                            defaultValue={this.state.tel}
                            onChange={e => this.setState({ tel: e.target.value })}
                        />
                    </li>
                    <li>
                        <input
                            type="text"
                            placeholder="请输入密码"
                            defaultValue={this.state.pwd}
                            onChange={e => this.setState({ pwd: e.target.value })}
                        />
                    </li>
                    <li>
                        <input
                            type="text"
                            placeholder="请输入验证码"
                            defaultValue={this.state.code}
                            onChange={e => this.setState({ code: e.target.value })}
                        />
                    </li>

                </ul>
                <Button type="primary" onClick={this.reg}>注册</Button>
            </div>
        );
    }
    reg = () => {
        let { tel, pwd, code, name } = this.state
        if (!tel) {
            message.warning("请输入手机号")
            return
        }
        if (!pwd) {
            message.warning("请输入密码")
            return
        }
        if (!code) {
            message.warning("请输入验证码")
            return
        }
        //  邮箱正则
        let mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{ 2,})+$/;
        // 手机正则
        let telReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
        // let telReg = /^\d{3}$/;
        if (telReg.test(tel) || mailReg.test(tel)) {
            this.getRegData(tel, pwd, name)
        } else {
            message.warning("请输入正确的邮箱或者手机号")
            return
        }
    }

    getRegData = (tel, pwd, name) => {
        axios({
            url: `http://zjcloud.tk:3001/react/reg`,
            method: "post",
            data: {
                username: tel,
                password: pwd,
                name: name
            }
        }).then(res => {
            if (res.data.code === 200 && res.data.msg === "注册成功") {
                message.info(res.data.msg)
                this.props.history.push('/login')
            } else {
                message.warning(res.data.msg)
            }
        })
    }

}

export default Login;