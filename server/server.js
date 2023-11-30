const http = require('http');
const express = require('express')
const socketIO = require('socket.io');
const fs = require('fs');
const app = express()

// const server = http.createServer((req,res)=>{
//     fs.readFile(__dirname+'/index.html',(err,data)=>{
//         res.writeHead(200);
//         res.end(data)
//     })
// });

app.get('/', (req,res)=>{
    res.sendFile(__dirname+'/index.html')
})
const server = http.Server(app);
server.listen(5001, function(){
    console.log("server listening on 5001")
});

const io = socketIO(server);
let sockets = []

io.on('connection', function(socket){
    sockets.push(socket)
    // socket.emit('greeting-from-server',{greeting:"Hello Client"});
    // socket.on('greeting-from-client',(message)=>{
    //     console.log(message);
    // })

    socket.on('message', function(message){
        for(let i=0;i<sockets.length;i++){
            sockets[i].send(message);
        }
    });

    socket.on('disconnect', function(){
        console.log("socket is disconnected");
        for (var i = 0; i < sockets.length; i++) {
            if (sockets[i].id === socket.id) {
                sockets .splice(i, 1);
            }
}
        console.log('The socket disconnected. There are ' +
sockets.length + ' connected sockets');

    })
})