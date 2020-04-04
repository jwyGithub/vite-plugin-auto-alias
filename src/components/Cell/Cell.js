import React, { Component } from 'react'
import { Avatar, Badge } from 'antd';
import styles from "./Cell.module.scss";
import propTypes from 'prop-types'
export default class Cell extends Component {

    static defaultProps = {
        data: [],
        useInfo:()=>{},
        msgInfo:()=>{}
    };
    static propTypes = {
        data: propTypes.object,
        //获取用户信息
        userInfo:propTypes.func,
        msgInfo:propTypes.func
    };

    render() {
        let {data,userInfo,msgInfo} = this.props
        return (
            <div className={styles.cell}>
                <Badge count={data.unread} onClick={userInfo.bind(null,data)}>
                    <Avatar shape="square" icon="user" size={45} src={data.iconpath}/>
                </Badge>
                <div className={styles.con} onClick={msgInfo.bind(null,data)}>
                    <h3>{data.name}</h3>
                    <p>{data.lastmsg}</p>
                </div>
                <p className={styles.date}>{data.time}</p>
            </div>
        )
    }

}

