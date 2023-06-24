
//this is a node server which will handle socket io connections
var io = require('socket.io')(8200);


const users = {};

//io.on is socket.io instance which is listener for multiple socket connections through out the network
//socket.on is a listener for every individual connnection through out the network
io.on('connection', (socket) =>{
    socket.on('new-user-joined', name => {
        console.log("new user joined", name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    })

    socket.on('send-text', message =>{
        socket.broadcast.emit('receive-text', {message: message, name: users[socket.id]});
    })

    socket.on('disconnect', ()=>{
        socket.broadcast.emit('left-chat', users[socket.id]);
        delete users[socket.id];
    })
})

