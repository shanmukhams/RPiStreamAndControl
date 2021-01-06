//const cv = require('opencv4nodejs');

const PiCamera = require('pi-camera');
const path = require('path')
const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const SerialPort = require('serialport');
const PORT = process.env.PORT || 4000;

const app = express();
const server = http.createServer(app)
app.use(cors());

const io = socketio(server);

const Readline = require('@serialport/parser-readline');
const port = new SerialPort('/dev/ttyACM0', { baudRate: 9600 });
const gpsport = new SerialPort('/dev/ttyUSB0', { baudRate: 115200 });


port.on("open", () => {
    console.log('Arduino: serial port open');
})
        
gpsport.on("open", function () {
    console.log('HAT: Serial communication open');
})

const myCamera = new PiCamera({
  mode: 'photo',
  width: 640,
  height: 480
});

FPS = 10
pv = ""

io.on('connect', (socket) => {
    console.log('a user connected')

    socket.on('arduinopins',(data)=>{
        console.log(data)
        port.write(data.toString(), (err) => {
            if (err) {
                return console.log('Error on write: ', err.message);
            }

            console.log('message written');
            
            
            op=""
           
            
            
            port.on('data', function(data) {
                op+=data.toString();
                
            });
            setTimeout(()=>{
                socket.emit('arduinores', op)
                op = ""
                
                },1000); 
                op = ""
         });
    })
    
    socket.on('gps', (a)=>{
        pat = /[^\d.]+/g
        alist = []
        gpsport.write("AT+CGPSINFO");
        gpsport.write('\r');
        gpsport.on('data', function(data) {
            alist = data.toString().split(pat)
            
            console.log("Received data: " + alist[1],alist[2]);
            socket.emit('gpsc',alist[1],alist[2])
        });
    });

    socket.on('imagedata', (data)=>{
        
        a = 1
        console.log('imagedata '+data)
        
        if(pv == data){
            io.emit('samecontrol')
        }
        else{
             pv=data
            var refreshIntervalId = setInterval(()=>{
                myCamera.snapDataUrl()
			  .then((result) => {
				// Your picture was captured
				const image = result.toString('base64');
                a+=1
                console.log(a)
                console.log(pv)
				console.log(image.substring(0,8))
				socket.emit('image', image)
                 if(pv!="Websockets"){
                     a=1
                     console.log("closing....")
                    clearInterval(refreshIntervalId);
                }
			  })
			  .catch((error) => {
				 // Handle your error
			  });
            }, 1000/FPS)
        }
        
        
    })
    
    
})


server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
