// const socket = io('http://localhost:8100');
const socket = io('http://localhost:8200',{transports: ['websocket']});


const form = document.getElementById('send_container');
const msgContent = document.getElementById('send-msg');
const msgBox = document.querySelector(".container");

const nameV = prompt("Enter your name to enter");
socket.emit('new-user-joined', nameV);

const appendE = (Message, position) =>{
    const msgElement = document.createElement('div');
    msgElement.innerText= Message;
    msgElement.classList.add('msg');
    msgElement.classList.add(position);
    msgBox.append(msgElement);
};

form.addEventListener('submit', e=>{
    e.preventDefault();
    const msg = msgContent.value;
    appendE(`You: ${msg}`, 'right');
    socket.emit('send-text', msg);
    msgContent.value = '';
})

socket.on('user-joined', Name =>{
    appendE(`${Name} joined the chat`, 'left');
});

socket.on('receive-text', data =>{
    appendE(`${data.name}: ${data.message}`, 'left');
})

socket.on('left-chat', name=>{
    appendE(`${name} left the chat`, 'left');
})