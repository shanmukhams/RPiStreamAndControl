import React, { Component } from 'react';
import './Video.css'

console.log(process.env.webrtcip)
class WebRTC extends Component {
    render() {
        return (
            <div>
                <h1>WebRTC</h1>
               
                    <iframe src="http://raspberrypi:8888/" height='800px' width='840px' frameBorder='0'></iframe>
                
                </div>
        );
    }
}

export default WebRTC;

