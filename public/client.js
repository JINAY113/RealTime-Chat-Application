const socket = io()

const  from = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

const name = prompt("enter your name");

socket.emit('new-user-joined', name);

const append =(message, position) =>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

from.addEventListener('submit', (e) =>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}` , 'right');
    socket.emit('send' , message);
    messageInput.value = "";
})


socket.on('user-joined' , name =>{
    append(`${name} joined the chat`, 'right-new')
})

socket.on('receive' , data =>{
    append(`${data.name} : ${data.message}`, 'left')
})

socket.on('left', name =>{
    append(`${name} left the chat`, 'left-new');
})