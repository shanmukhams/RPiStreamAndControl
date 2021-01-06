import React, { Component } from 'react';
import './Video.css'



class WebRTC extends Component {
    render() {
        return (
            <div>
                <h1>WebRTC</h1>
               

                    <iframe title="iframe src" src={'http://raspberrypi:8888/'} height='800px' width='840px' frameBorder='0'></iframe>
 
                </div>
        );
    }
}

export default WebRTC;

