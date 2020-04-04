import Login from '../views/Login/Login'
import Reg from '../views/Reg/Reg'
import Home from '../views/Home/home'
import Detail from "../components/Detail/Detail";
import Chat from '../views/Chat/Chat.js'
import ChatInfo from '../views/Chat/ChatInfo/ChatInfo.js'
import Actions from '../views/Actions/Actions'
import My from '../views/My/My.js'


export default [
    { path: "/", name: "Login", component: Login },
    { path: "/reg", name: "Reg", component: Reg },
    { path: "/home", name: "Home", component: Home },
    { path: "/detail", name: "Detail", component: Detail },
    { path: "/chat", name: "Chat", component: Chat },
    { path: "/chatinfo", name: "ChatInfo", component: ChatInfo },
    { path: "/actions", name: "Actions", component: Actions },
    { path: "/my", name: "My", component: My }
]