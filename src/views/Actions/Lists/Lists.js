import React, { Component } from 'react'
import styles from './Lists.module.scss'
import propTypes from 'prop-types'


export default class Lists extends Component {

    static defaultProps = {
        lists: [],
    };
    static propTypes = {
        data: propTypes.object,
    };

    render() {
        let { action } = this.props.lists
        return (
            <div className={ styles.lists }>
                <div className={ styles.top }>
                    <img src={ action.usericon } alt="用户头像" />
                    <span>{ action.nickname }</span>
                    <input type="button" defaultValue="关注" />
                    <i></i>
                </div>
                <div className={ styles.bot }>
                    <div className={ styles.title }>
                        <p>{ action.content.title }</p>
                    </div>
                    <div className={ styles.con }>
                        {
                            action.content.imgs.map(item => {
                                return <img src={ item.url } alt="内容图片" key={ item.id } />
                            })
                        }
                    </div>
                    <div className={ styles.buttons }>
                        <p><i></i>{ action.commentSum }</p>
                        <p><i></i>{ action.assistSum }</p>
                    </div>
                    <div className={ styles.comment }>
                        <ul>
                            {
                                action.comment.map(item => {
                                    return <li key={ item.id }><span>品论人:</span><p>{ item.con }</p></li>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
