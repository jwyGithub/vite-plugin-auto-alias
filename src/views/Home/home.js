import React, { Component } from 'react'
import styles from './home.module.scss'
import store from '../../store/store'
import { GetFriends ,getUserInfo} from '../../requests/requests'



export default class home extends Component {
    render() {
        return (
            <div className={styles.home}>
                <div className={styles.top}>
                    <h3>通讯录</h3>
                    <i onClick={this.addFriend}></i>
                </div>
                <ul>
                    {
                        store.getState().FriendLists.list ?
                            store.getState().FriendLists.list.map(item =>
                                <li key={item._id} onClick={this.getInfo.bind(null, item.openid)}>
                                    <img src={item.detail.icon} alt="头像" />
                                    <span>{item.name}</span>
                                </li>
                            )
                            : ""
                    }
                </ul>
            </div>
        )
    }
    //添加朋友
    addFriend = ()=>{
        this.props.history.push({ pathname: '/home/search' })
    }

    getInfo = (id) => {
        store.dispatch(getUserInfo(id))
        this.props.history.push({ pathname: '/detail' })
    }
    componentDidMount() {
        store.dispatch(GetFriends(store.getState().openid))
    }

}
