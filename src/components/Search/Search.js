import React, { Component } from 'react'
import Back from '../Back/Back'
import { Input, message } from 'antd';
import axios from 'axios'
import store from '../../store/store'
import { AddInfo } from '../../store/actionCreators'

const { Search } = Input;

export default class Add extends Component {

    constructor(props) {
        super(props)
        this.state = {
            val: ""
        }
    }

    render() {
        return (
            <div >
                <Back back={this.back} title='添加朋友' />
                <Search
                    placeholder="请输入姓名"
                    defaultValue={this.state.val}
                    onChange={e => this.setState({ val: e.target.value })}
                    onSearch={this.search}
                    enterButton />
            </div>
        )
    }


    back = () => {
        this.props.history.go(-1)
    }

    search = () => {
        axios({
            url: `http://zjcloud.tk:3001/react/search?name=${this.state.val}`
        }).then(res => {
            let { code, msg } = res.data
            if (code === 400) {
                message.info(msg)
            } else {
                store.dispatch(AddInfo(msg))
                this.props.history.push({ pathname: "/home/search/userinfo" })
            }
        })

    }
}
