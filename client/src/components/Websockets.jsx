import React, { Component } from 'react';
import './Video.css'


class Websockets extends Component {
   
    
    render() {
        return (
            <div>
                <h1>Websockets</h1>
                <img id="image" alt={''} key={this.props.imagesrc} src={this.props.imagesrc}></img>
                </div>
        );
    }
}

export default Websockets;

