var io = require('socket.io-client'),
const cv = require('opencv4nodejs');
socket = io.connect('localhost:4000');

socket.on('connect', () => { 
        console.log("socket connected"); 
        socket.send('Hello');
        socket.emit('image','hello! from event')
});

  
socket.on('imagedata', data => {
    console.log(data);
});

socket.on('greetings', data => {
    console.log(data);
});

