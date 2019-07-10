import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import Markee from './components/Marker'
import API_KEY from './environment'



export class SimpleMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: '',
      query: ''
    }
    this.options = {}
    this.autocomplete = new window.google.maps.places.Autcomplete(document.getElementById('auto'), this.options)
  }


  handleInput(e) {
    this.setState({[e.target.name]: e.target.value})
    let options = {}
    this.autocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById('auto'),
      options,
    );
    function handlePlaceSelect() {
      let addressObject = this.autocomplete.getPlace();
      let address = addressObject.address_components;
      console.log(addressObject)
    }
    this.autocomplete.addListener('place_changed', this.handlePlaceSelect);





  }

  render() {
    return (
      <div>
        <input name="query" onChange={e=>this.handleInput(e)} id="auto"></input>
        <button>add location</button>
      </div>
    );
  }
}

export default GoogleApiWrapper({apiKey: API_KEY})(SimpleMap)





// <Marker onClick={this.onMarkerClick}
// name={'Current location'} />

// <InfoWindow onClose={this.onInfoWindowClose}>
// <div>
// <h1>map</h1>
// </div>
// </InfoWindow>

// <Map style={{width: '50%', height: '50%'}} google={this.props.google} zoom={14} intialCenter={{lat: 43.6533055, lng: -79.4018915}}>
// </Map>
