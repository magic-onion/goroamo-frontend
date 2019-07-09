import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import API_KEY from './environment'

const AnyReactComponent = ({ text }) =>  <div style={{
    color: 'white',
    background: 'grey',
    padding: '15px 10px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    transform: 'translate(-50%, -50%)'
  }}>
    <span>{text}</span>
  </div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 43.6533055,
      lng: -79.4018915
    },
    zoom: 15
  };

  render() {
    return (
      // Important! Always set the container height explicitl
      <div style={{ height: '40vh', width: '40%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: `${API_KEY}` }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={43.6533055}
            lng={-79.4018915}
            text={"My Marker"}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
