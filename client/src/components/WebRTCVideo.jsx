import React, { Component } from 'react';
import './Video.css'


class WebRTC extends Component {
    render() {
        return (
            <div>
                <h1>WebRTC</h1>
               
                    <iframe src="http://raspberrypi:8888/" height='600px' width='810px' frameBorder='0'></iframe>
                
                </div>
        );
    }
}

export default WebRTC;

