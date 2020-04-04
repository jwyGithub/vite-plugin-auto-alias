import { UserInfo, ActionList, GetFriendsLists, AddMyBook } from '../store/actionCreators'
import axios from 'axios'
import $baseurl from '../config/server'
var url = null;
if ($baseurl.local.open) {
    url = `http://${$baseurl.local.baseUrl}:${$baseurl.local.port}`
} else if ($baseurl.http.open) {
    url = `http://${$baseurl.http.baseUrl}:${$baseurl.http.port}`
} else if ($baseurl.https.open) {
    url = `https://${$baseurl.https.baseUrl}:${$baseurl.https.port}`
}

console.log(`当前环境为${url}`)

// 获取用户信息
export const getUserInfo = (openid, name) => {
    console.log(openid)
    let requrl = null
    if (!openid) {
        requrl = `${url}/react/getuserinfo?name=${name}&type=name`
    } else {
        requrl = `${url}/react/getuserinfo?openid=${openid}&type=openid`
    }
    return (dispatch) => {
        axios({
            url: requrl
        }).then((res) => {
            dispatch(UserInfo(res.data.detail))
        })
    }
}
// 获取动态列表
export const getActionList = () => {
    return (dispatch) => {
        axios({
            url: `${url}/react/actions`
        }).then(res => {
            dispatch(ActionList(res.data.lists))
        })
    }
}
// 获取好友列表
export const GetFriends = (openid) => {
    return (dispatch) => {
        axios({
            url: `${url}/react/friends?openid=${openid}`
        }).then(res => {
            if (res.data.list) {
                dispatch(GetFriendsLists(res.data.list))
            }
        })
    }
}

//添加到通讯录
export const AddBook = (friendopenid, loginopenid, friendinfo) => {
    return (dispatch) => {
        axios({
            url: `${url}/react/addbook`,
            method: "post",
            data: {
                friendopenid, loginopenid, friendinfo
            }
        }).then(res => {
            dispatch(AddMyBook(res.data.msg))
            // console.log(res.data)
        })
    }
}
