import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Video from './components/Video'
import SideBand from './components/Sidebar'
import MapContainer from './components/Maps'
import io from 'socket.io-client'
let socket = io(`http://raspberrypi:4000`)
 
export class App extends Component{

  state = {
    showType: 'WebRTC',
    user: [],
    imagesrc: 'z',
    arduinores: '',
    lat:"",
    lng:""
  }

  //Choosing between WebRTC or Websockets
  handleShowType = (showType) => {
    this.setState(showType)
    socket.emit(`imagedata`, showType.showType)
  }

  //Move Camera up or down
  handleCameraMovement = (dir) =>{
    socket.emit('arduinopins', dir)
  }

  //Move Camera up or down
  handleCarMovement = (dir) => {
    socket.emit('arduinopins', dir)
  }
  
  //Get GPS info
  handleGPS = (dir) =>{
    socket.emit('gps', dir)
  }

  componentDidMount() {    
    socket.on(`connect`, data => {
      this.setState({
        user: [...this.state.user, data]
      })
    })

    socket.on(`image`, imagesrc => {
      this.setState({imagesrc:`${imagesrc}`})
    })
    
    socket.on(`arduinores`, op => {
      console.log('in camera response')
      console.log(op)
      if(op!="")
      {
        this.setState({arduinores:`${op}`})
      }
    })
    
    socket.on('gpsc', (lat, long) => {
    
      if(lat!=="")
      {
        var co = {}
        lat = parseInt(lat.substring(0,2)) + parseFloat(lat.substring(2,lat.length))/(60)
        long = parseInt(long.substring(0,3)) + parseFloat(long.substring(3,long.length))/(60)
        console.log(lat, long)
  
       
        this.setState({lat:`${lat}`})
        this.setState({lng:`${long}`})
       
      }
      
    })
  }

  render(){
    return(
      <div>
        <Navbar />
        <div className="row" style={{marginRight : "0px"}}>
          <div className="col-2">
            <SideBand handleShowType = {this.handleShowType}/>
          </div>
          <div className="col-10">
            <div className="row">
              <div className="col-7 ">
                <Video value={this.state.showType} imagesrc={this.state.imagesrc}/>
                <br/>
                <br/>
                <br/>
                <br/>
                {this.state.arduinores}
              </div>
              <div className="col-5">
                <div className="container">
                  <h1 style={{textAlign:"center", marginTop: "2vh"}}>Camera Movement</h1>
                  <div style={{textAlign:"center"}}>           
                    <button className="btn btn-info" onClick = {() => this.handleCameraMovement(5)}>Up</button>&nbsp;&nbsp;&nbsp;
                    <button className="btn btn-info" onClick = {()=>this.handleCameraMovement(6)}>Down</button>
                  </div> 
                </div>

                <div className="container">
                  <h1 style={{textAlign:"center", marginTop: "2vh"}}>Car Control</h1>
                  <div style={{textAlign:"center"}}>            
                    <button type="button" className="btn btn-info" onClick = {() => this.handleCarMovement(1)}><i className="fa fa-angle-double-up"></i></button>
                    <div style={{ marginTop: "2vh"}}>
                      <button type="button" className="btn btn-info" onClick = {() => this.handleCarMovement(2)}><i className="fa fa-angle-double-left"></i></button> &nbsp; &nbsp; 
                      <button type="button" className="btn btn-info" onClick = {() => this.handleCarMovement(3)}><i className="fa fa-angle-double-down"></i></button>&nbsp; &nbsp;
                      <button type="button" className="btn btn-info" onClick = {() => this.handleCarMovement(4)}><i className="fa fa-angle-double-right"></i></button><br/><br/>
                    </div>
                  </div> 
                </div>
                
                <div style={{overflow: "hidden"}}>
                  <h1 style={{textAlign:"center", marginTop: "2vh"}}>GPS Info&nbsp;&nbsp;
                    <span >            
                      <button className="btn btn-info" onClick={()=>this.handleGPS(6)}><i className="fa fa-repeat"></i></button><br/>
                    </span>
                  </h1>
                  <p>clieck on refresh and then click on map to get updated coordinates</p>
                 <MapContainer co={this.state.co} lng={this.state.lng} lat={this.state.lat} />
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}



export default App;
