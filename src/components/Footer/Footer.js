import React, { Component } from 'react'
import styles from './Footer.module.scss'
import { NavLink } from "react-router-dom";

export default class footer extends Component {
    render() {
        return (
            <div className={styles.footer}>
                <ul>
                    <li>
                        <NavLink to="/home" activeClassName={styles.my2}>
                            <i></i><p>首页</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/chat" activeClassName={styles.my2}>
                            <i></i><p>对话</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/actions" activeClassName={styles.my2}>
                            <i></i><p>动态</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/my" activeClassName={styles.my2}>
                            <i></i><p>我的</p>
                        </NavLink>
                    </li>
                </ul>
            </div>
        )
    }
}
