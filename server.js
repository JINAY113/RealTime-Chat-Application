const { Socket } = require('dgram')
const express = require('express')

const app = express()
const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000 

http.listen(PORT , () =>{
    console.log(`listening on port ${PORT} `)
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req , res) =>{
    res.sendFile(__dirname + '/index.html')
})

const io = require('socket.io')(http)

let users = {};

io.on('connection', (socket)=>{
    console.log("connected");

    socket.on('disconnect' , () =>{
        console.log('User was disconnect');
        socket.broadcast.emit('left' , users[socket.id]);
        delete users[socket.id];
    })
    socket.on('new-user-joined', name =>{
        //console.log(`${name} join`)
        users[socket.id] = name;
        console.log(users[socket.id]);
        socket.broadcast.emit('user-joined', name);
    })

    socket.on('send' , message =>{
        socket.broadcast.emit('receive',{message: message, name: users[socket.id]});
    })
    
})


