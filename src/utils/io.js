import io from 'socket.io-client'

var socket = io('http://zjcloud.tk:3001');//链接服务端

socket.on('connect', function () {
    console.log(`socket已连接`)
    // let socketID = localStorage.getItem("idObj")
    // console.log(socketID)
    // socket.emit("chat message", { socketid: socket.id, openid: socketID })
})


socket.on('from message', function (msg) {
    console.log(msg)
});

socket.on('disconnect', function () {
    console.log(socket.id)
    socket.emit("discon", { id: socket.id })
});




export default socket





