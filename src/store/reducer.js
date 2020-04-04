import { FOOTER_STATUS, SHOW_FOOTER, USER_INFO, ACTION_LIST, OPEN_ID, GET_FRIENDS_LISTS, ADD_INFO, ADD_BOOK ,OTHER_ID} from './actionTypes'
const defaultState = {
    // 当前socket用户id标识
    openid: "",
    // 其他socket用户id标识
    otherid: "",
    isShowFooter: true,
    // 用户基本信息
    userinfo: {},
    actionList: [],
    FriendLists: {},
    //添加用户的结果
    addStatus: ""
}
export default (state = defaultState, action) => {  //就是一个方法函数
    // switch (action.type) {
    //     case FOOTER_STATUS:
    //         var newState = JSON.parse(JSON.stringify(state))
    //         newState.isShowFooter = false
    //         return newState
    //     case SHOW_FOOTER:
    //         var newState = JSON.parse(JSON.stringify(state))
    //         newState.isShowFooter = true
    //         return newState
    //     default:
    //         break;
    // }
    if (action.type === FOOTER_STATUS) {
        let newState = JSON.parse(JSON.stringify(state))
        newState.isShowFooter = false
        return newState
    }
    if (action.type === SHOW_FOOTER) {
        let newState = JSON.parse(JSON.stringify(state))
        newState.isShowFooter = true
        return newState
    }
    //获取用户信息
    if (action.type === USER_INFO) {
        let newState = JSON.parse(JSON.stringify(state))
        newState.userinfo = action.data
        return newState
    }
    //添加用户信息
    if (action.type === ADD_INFO) {
        let newState = JSON.parse(JSON.stringify(state))
        newState.userinfo = action.data
        return newState
    }
    //添加用户的结果
    if (action.type === ADD_BOOK) {
        let newState = JSON.parse(JSON.stringify(state))
        newState.addStatus = action.data
        return newState
    }

    if (action.type === ACTION_LIST) {
        let newState = JSON.parse(JSON.stringify(state))
        newState.actionList = action.data
        return newState
    }
    if (action.type === OPEN_ID) {
        let newState = JSON.parse(JSON.stringify(state))
        newState.openid = action.data
        return newState
    }
    if (action.type === OTHER_ID) {
        let newState = JSON.parse(JSON.stringify(state))
        newState.otherid = action.data
        return newState
    }
    if (action.type === GET_FRIENDS_LISTS) {
        let newState = JSON.parse(JSON.stringify(state))
        newState.FriendLists = action.data
        return newState
    }
    return state
}