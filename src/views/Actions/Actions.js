import React, { Component } from 'react'
import styles from './Actions.module.scss'
import Lists from './Lists/Lists.js'
import axios from 'axios'


export default class Actions extends Component {
    state = {
        list: []
    }
    render() {
        return (
            <div className={ styles.actions }>
                <ul className={ styles.type }>
                    <li>动态广场</li>
                    <li>关注</li>
                    <li><i></i>发动态</li>
                </ul>
                {
                    this.state.list.map(item => {
                        return <Lists lists={ item } key={ item.id } />
                    })
                }
            </div>
        )
    }

    componentDidMount() {
        axios({
            url: "http://localhost:3001/react/actions"
        }).then(res => {
            this.setState({
                list: res.data.lists
            })
        })
    }
}
