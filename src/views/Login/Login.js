import React, { Component } from 'react';
import styles from './Login.module.scss'

class Login extends Component {
    render() {
        return (
            <div className={ styles.login }>
                <div className={ styles.login_logo }>
                    <section>
                        <img src={ require('./imgs/logo.png') } alt="logo" />
                    </section>
                </div>
                <div className={ styles.login_body }>
                    <section>
                        <ul>
                            <li>
                                <input type="text" className={ styles.account } placeholder="手机/邮箱" />
                            </li>
                            <li>
                                <input type="password" className={ styles.pwd } placeholder="密码" />
                            </li>
                        </ul>
                        <a className={ styles.forget }>忘记密码？</a>
                        <div className={ styles.third }>
                            <a href="#" className={ styles.qq }>
                                <i></i>
                                <span>QQ</span>
                            </a>
                            <a href="#" className={ styles.wechat }>
                                <i></i>
                                <span>微信</span>
                            </a>
                        </div>
                        {/* <Button button-title="登陆" onClick={ this.login }></Button> */ }
                    </section>
                </div>

            </div >
        );
    }
    componentDidMount() {
        // console.log(this.props)
    }

    login = () => {
        //  邮箱正则
        let mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{ 2,})+$/;
        // 手机正则
        let telReg = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{ 8 }$/;
        if (!mailReg.test(this.acc) || !telReg.test(this.acc)) {
            this.$axios({
                // url: `${baseUrl}/api/login`,
                method: "post",
                data: {
                    account: this.acc,
                    password: this.pwd
                }
            }).then(res => {
                if (res.data.code === 200 && res.data.msg === "登陆成功") {
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("username", this.acc)
                    this.$router.push({ name: "my" });
                } else {
                    // Toast(res.data.msg);
                }
            });
        } else {
            // Toast("请输入正确的邮箱或者手机号");
        }
    }
}

export default Login;