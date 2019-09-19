import React, { Component } from 'react'
import Script from 'react-load-script';
import LocationDetail from './components/LocationDetail'
import API_KEY from './environment'
const url = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`


// Import React Scrit Libraray to load Google object

class Search extends Component {
  // Define Constructor
  constructor(props) {
    super(props);

    // Declare State
    this.state = {
      city: '',
      query: ''
    };

    // Bind Functions
    this.handleScriptLoad = this.handleScriptLoad.bind(this);
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
    this.handleAddLocation = this.handleAddLocation.bind(this);

  }

  handleScriptLoad() {
    var options = {};

    // Initialize Google Autocomplete
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),
      options,
    );
    this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
  }



  handleChange(e) {
    this.setState({
      query: e.target.value
    })
  }

  handlePlaceSelect() {
    // Extract City From Address Object
    let addressObject = this.autocomplete.getPlace();
    let address = addressObject.address_components;
    // Check if address is valid
    if (address) {
      // Set State
      this.setState(
        {
          city: address[0],
          query: addressObject.formatted_address,
        }
      );
    }
  }

  handleAddLocation() {
  if (this.state.query.length) {
    let addressObject = this.autocomplete.getPlace();
    this.props.addresses.push(addressObject)


    fetch('http://localhost:3000/api/v1/locations', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        location: {
          name: addressObject.name,
          description: addressObject.website,
          longitude: '',
          latitude: '',
          address1: addressObject.formatted_address,
          address2: addressObject.formatted_address,
          city: "",
          region: '',
          country: 'Canada',
          placeid: addressObject.place_id,
          postcode: '',
          user_id: 1,

        },
        tour_id: 1
      })

    })
    .then(r=>r.json())
    .then(console.log)
    this.setState({
      city: '',
      query: ''
    })
  }
  }

  get locations() {
    if (this.props.addresses !== undefined) {
      return this.props.addresses.map((obj, i) =>  <LocationDetail key={i} address={obj.formatted_address}/>)
    }
    return <p>no locations yet</p>
  }

  render() {
    return (
      <div>
        <Script
          url= { url }
          onLoad={this.handleScriptLoad}
        />
        <input className="search-bar" id="autocomplete" placeholder="" hinttext="Search City" value={this.state.query} onChange={e=>this.handleChange(e)}
        ></input>
        {this.locations}
        <button onClick={e=> this.handleAddLocation(e)}>Add Location</button>
        <button>Save Tour</button>
      </div>
    );
  }
}

export default Search;
