import { FOOTER_STATUS, SHOW_FOOTER, USER_INFO, ACTION_LIST, OPEN_ID, GET_FRIENDS_LISTS ,ADD_INFO,ADD_BOOK,OTHER_ID} from './actionTypes'

//定义footer的状态
export const FooterStatus = () => ({
    type: FOOTER_STATUS
})

// 修改footer的状态
export const ShowFooter = () => ({
    type: SHOW_FOOTER
})

//获取当前用户信息
export const UserInfo = (data) => ({
    type: USER_INFO,
    data
})

//直接添加用户信息
export const AddInfo = (data) => ({
    type: ADD_INFO,
    data
})

//添加到通讯录
export const AddMyBook = (data) => ({
    type: ADD_BOOK,
    data
})


// 获取动态列表
export const ActionList = (data) => ({
    type: ACTION_LIST,
    data
})

// 获取openid
export const OpenID = (data) => ({
    type: OPEN_ID,
    data
})
// 获取其他openid
export const OtherID = (data) => ({
    type: OTHER_ID,
    data
})

// 获取首页好友列表
export const GetFriendsLists = (data) => ({
    type: GET_FRIENDS_LISTS,
    data
})


