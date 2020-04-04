import React, { Component } from 'react'
import styles from './Back.module.scss'
import { withRouter } from 'react-router-dom'

class Back extends Component {
    render() {
        return (
            <div className={styles.back}>
                <i onClick={this.handelclick}></i>
                <h3>{this.props.title}</h3>
            </div>
        )
    }
    handelclick = () => {
        this.props.history.go(-1)
    }

}

export default withRouter(Back)