import React, { Component } from 'react'
import styles from './Header.module.scss'

export default class Header extends Component {
    render() {
        return (
            <div className={styles.header}>
                <i></i>
                <h3>对话</h3>
            </div>
        )
    }
}
