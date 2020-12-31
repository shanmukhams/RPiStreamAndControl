import React, { Component } from 'react';
import './Navbar.css'

class SideBand extends Component {
 
    render() {
        return (<div>
            <nav className="sideBand" style={{ backgroundColor: "rgb(35, 35, 36)", padding: "10px"}}>
                <div className="row">
                    <button type="button" className="btn btn-light optionsbtn"  style={{marginTop:"40vh"}} onClick={() => this.props.handleShowType({showType:'WebRTC'})}>WebRTC</button>
                <br/>
                </div>
                <div className="row">
                    <button type="button" className="btn btn-light optionsbtn" onClick={() => this.props.handleShowType({showType:'Websockets'})}>Sockets</button>
                </div>
            </nav>
        </div >);
    }
}

export default SideBand;