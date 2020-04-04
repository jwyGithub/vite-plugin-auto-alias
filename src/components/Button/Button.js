import React, { Component } from 'react'
import styles from './Button.module.scss'

export default class Button extends Component {
    render() {
        return (
            <div className={styles.btn}>
                <button style={{width:this.props.width}} onClick={this.props.handleclick.bind()}>{this.props.title}</button>
            </div>
        )
    }
}
