import React, { Component } from 'react'
import styles from './Detail.module.scss'
import Back from '../Back/Back'
import UserInfo from '../UserInfo/UserInfo'
import store from '../../store/store'
import { OtherID } from '../../store/actionCreators'


class Detail extends Component {
    render() {
        return (
            <div className={styles.detail}>
                <Back back={this.back} title="详情" />
                <UserInfo userinfo={store.getState().userinfo} />
                <div className={styles.btns}>
                    <button className={styles.tosend} onClick={this.tosend}>发起对话</button>
                </div>
            </div>
        )
    }

    // 返回
    back = () => {
        this.props.history.goBack()
    }

    tosend = () => {
        store.dispatch(OtherID(store.getState().userinfo.openid))
        this.props.history.push({ pathname: '/chat/chatinfo' })
    }

}
export default Detail