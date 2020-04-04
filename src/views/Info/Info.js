import React, { Component } from 'react'
import Userinfo from '../../components/UserInfo/UserInfo'
import Button from '../../components/Button/Button'
import { AddBook } from '../../requests/requests'
import Back from '../../components/Back/Back'
import store from '../../store/store'
import { message } from 'antd'

export default class Info extends Component {
    render() {
        return (
            <div>
                <Back title="用户详情" />
                <Userinfo userinfo={store.getState().userinfo} />
                <Button title="添加到通讯录" width="50%" handleclick={this.handleclick} />
            </div>
        )
    }

    handleclick = () => {
        let friendopenid = store.getState().userinfo.openid
        let loginopenid = store.getState().openid
        store.dispatch(AddBook(friendopenid, loginopenid, store.getState().userinfo))
        message.info(store.getState().addStatus)
    }
}
