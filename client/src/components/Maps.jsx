import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
  width: '30vw',
  height: '40vh'
};

//50.91724476666667 11.568059816666667
export class MapContainer extends Component {
    state = {
        currentCenter: {
          lat:'',
          lng:''
        },
        showingInfoWindow: false,  // Hides or shows the InfoWindow
        activeMarker: {},          // Shows the active marker upon click
        selectedPlace: {}          // Shows the InfoWindow to the selected place upon a marker
      };


  onMarkerClick = (props, marker, e) =>
      this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

 
  handleMapClick= () => {
    let co = {}
    co = {
      lat:this.props.lat,
      lng:this.props.lng
    }
    this.setState({ currentCenter: co });
  };

  render() {

    return (
      
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        key={this.props.lng}
        center={this.state.currentCenter}
        onClick={this.handleMapClick}
        initialCenter = {this.state.currentCenter}
        places={this.state.markers}
      >
  
        <Marker position={{ lat: this.state.currentCenter.lat, lng: this.state.currentCenter.lng }}
          onClick={this.onMarkerClick}
          name={`lat: ${this.state.currentCenter.lat.substring(0,7)}, lng: ${this.state.currentCenter.lng.substring(0,7)}`}
        />

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
          </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBSYJZ0XporUIvDRy-AM99I5H94DdpUgCQ'
})(MapContainer);

