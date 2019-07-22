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
    this.setstate({[e.target.id]: e.target.value})
  }

  handleSaveLocation(e) {
    //request goes here
  }

  render() {
    return (
      <div className="location-adder">
        <span>{this.props.addresses.formatted_address}</span>
        <input onChange={e=>this.handleChange(e)} className="drag-drop" type="file" placeholder="upload file"></input>
        <span>MAP PLACEHOLDER</span>
        <div>
          <p>fun facts</p>
          <input onChange={e=>this.handleChange(e)} id="funFact1"></input>
          <input onChange={e=>this.handleChange(e)} id="funFact2"></input>
          <input onChange={e=>this.handleChange(e)} id="funFact3"></input>
          </div>
        <textarea rows="10" cols="30" defaultValue="description" id="description"></textarea>
        <button>save</button>
      </div>
    )
  }

}

export default LocationAdder
