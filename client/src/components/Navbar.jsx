import React, { Component } from 'react';
import './Navbar.css'


class Navbad extends Component {
    state = {}
    render() {
        return (<div>
            <nav style={{ backgroundColor: "rgb(35, 35, 36)", padding: "10px" }}>
                <span className="logo">Control and Stream</span>
            </nav>


        </div >);
    }
}

export default Navbad;