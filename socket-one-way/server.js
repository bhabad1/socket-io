const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const mongodb = require('./lib/mongo')

const app = express();

app.get('/', (req,res)=>{
    res.sendFile(__dirname+'/index.html')
});

const server = http.Server(app);
const io = socketIO(server)
let userCount =0;

io.on('connection',(socket)=>{
    userCount++;
    let controllers = ['comments','posts'];
    for(let i=0;i<controllers.length;i++){
        require('./controllers/'+controllers[i]+'.controller')(socket);


    }
    io.emit('users.count', {count:userCount});
       socket.on('disconnect', function () {
userCount--;
           io.emit('users.count', {count:userCount});
       });
    setInterval(function () {
        socket.emit('seconds.update', {
            time: new Date()
}); }, 1000);

})

server.listen(5001, function(){
    console.log("App is listening on 5001")
})