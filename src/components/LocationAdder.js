import React, {useState} from 'react'
import Script from 'react-load-script';
import SearchBar from '../SearchBar'
import API_KEY from '../environment'
const url = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`

class LocationAdder extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      funFact1: '',
      funFact2: '',
      funFact3: '',
      description: ''
    }
  }

  handleChange(e) {
    this.setState({[e.target.id]: e.target.value})
  }

  handleSaveLocation(e) {
    fetch('http://localhost:3000/api/v1/locations', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        tour_id: this.props.tourId,
        location: {
          name: this.props.addresses.formatted_address,
          latitude: this.props.addresses.geometry.location.lat(),
          longitude: this.props.addresses.geometry.location.lng(),
          funfact1: this.state.funFact1,
          funfact2: this.state.funFact2,
          funfact3: this.state.funFact3,
          image: this.state.image,
          user_id: 1,
        }
      })
    })
    .then(r=>r.json())
    .then(console.log)
  }

  // t.string :name
  //     t.string :description
  //     t.string :longitude
  //     t.string :latitude
  //     t.string :funfact1
  //     t.string :funfact2
  //     t.string :funfact3
  //     t.string :image
  //     t.belongs_to :user

  render() {
    console.log(this.props.addresses)
    return (
      <div className="location-adder">
        <input onChange={e=>this.handleChange(e)} className="drag-drop" type="file" placeholder="upload file"></input>
        <p>{this.props.addresses.formatted_address} (map placeholder)</p>
        <div>
          <p>fun facts</p>
          <input onChange={e=>this.handleChange(e)} id="funFact1"></input>
          <input onChange={e=>this.handleChange(e)} id="funFact2"></input>
          <input onChange={e=>this.handleChange(e)} id="funFact3"></input>
          </div>
        <textarea rows="10" cols="30" defaultValue="description" id="description"></textarea>
        <button onClick={e=>this.handleSaveLocation(e)}>save</button>
      </div>
    )
  }

}

export default LocationAdder
