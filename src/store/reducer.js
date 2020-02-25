const defaultState = {
    isShowFooter: true
}
export default (state = defaultState, action) => {  //就是一个方法函数
    if (action.type === "isShowFooter") {
        let newState = JSON.parse(JSON.stringify(state))
        newState.isShowFooter = false
        return newState
    }
    return state
}