import React, { Component } from 'react'
import styles from './Actions.module.scss'
import Lists from './Lists/Lists.js'
import store from '../../store/store'
import {getActionList} from '../../requests/requests'
import {connect} from 'react-redux'

class Actions extends Component {
    render() {
        return (
            <div className={styles.actions}>
                <ul className={styles.type}>
                    <li>动态广场</li>
                    <li>关注</li>
                    <li><i></i>发动态</li>
                </ul>
                {
                    this.props.actionList.map(item => {
                        return <Lists lists={item} key={item.id} />
                    })
                }
            </div>
        )
    }

    componentDidMount() {
        store.dispatch(getActionList())
    }
}
const stateToProps = (state) => {
    return {
        actionList: state.actionList
    }
}
export default connect(stateToProps, null)(Actions)
