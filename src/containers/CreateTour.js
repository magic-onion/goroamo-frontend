import React from 'react'
import Script from 'react-load-script'
import SearchBar from '../SearchBar'
import Marker from '../components/Marker'
import LocationAdder from '../components/LocationAdder'
import TourWidget from '../components/TourWidget'
import API_KEY from '../environment'
const url = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`
//this component will
//contain a search bar with autocomplete

  //write the seaarch bar into the t
//when an address is added, it displays a marker on map, and info about the place
//the marker should be numbered according to which location is set
//should prompt for a tour name and description
//component to make a post request to new Tour
//route to match
//route to create new location

class CreateTour extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      name: '',
      location: '',
      distance: '',
      duration: '',
      counter: 0,
      tourSelected: false,
      query: '',
      locations: [],
      tourId: 0
    }

    this.handleAdd = this.handleAdd.bind(this)
    this.handleScriptLoad = this.handleScriptLoad.bind(this)
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this)
  }
  handleAdd() {
    console.log(this.state)

    fetch('http://localhost:3000/api/v1/tours', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        tour: {
          name: this.state.name,
          address: this.state.address,
          user_id: 1
        }
      })
    })
    .then(r=>r.json())
    .then(console.log)
  }

  handleChange(e) {
    this.setState({query: e.target.value})

  }

  increment(e) {
    let addressObject = this.autocomplete.getPlace()
    addressObject.lat = addressObject.geometry.location.lat()
    addressObject.lng = addressObject.geometry.location.lng()
    this.setState({
      locations: [...this.state.locations, addressObject]
    })
    let newCounter = this.state.counter + 1
    this.setState({counter: newCounter}, () => console.log(this.state.counter))
  }


  get numberOfLocations() {
    let mapper = []
    for (let i = 1; i <= this.state.counter; i++) {
      mapper.push(i)
    }
    return mapper
  }

  handleScriptLoad() {
    console.log("create tours script")
    let options = []
    this.map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 43.650, lng: -79.384},
      zoom: 14
    })
    this.autocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),
      options,
    );

    // Fire Event when a suggested name is selected
    this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
  }

  handlePlaceSelect() {
    let addressObject = this.autocomplete.getPlace()
  }

  get tourWidget() {
    return(
      <div>
      <input onChange={e=>this.handleTourChange(e)} id="name" placeholder="Name of the Tour" value={this.state.name}></input>
      <input onChange={e=>this.handleTourChange(e)} id="location" placeholder="Location of the Tour"value={this.state.location}></input>
      <input onChange={e=>this.handleTourChange(e)} id="distance" placeholder="Total Distance"value={this.state.distance}></input>
      <input onChange={e=>this.handleTourChange(e)} id="duration" type="number" placeholder="Aprroximate Duration of Tour" value={this.state.duration}></input>
      <button onClick={e=>this.handleSaveTour(e)}>postrequesttotours</button>
      </div>
    )
  }

  get tourInfo() {
    return(
      <div>
        <span>{this.state.name}</span>
        <span>{this.state.location}</span>
        <span>distance: {this.state.distance}</span>
        <span>duration: {this.state.duration}</span>
      </div>
    )
  }

  handleSaveTour(e) {
    this.setState({tourSelected: true})
    fetch('http://localhost:3000/api/v1/tours', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        tour: {
          name: this.state.name,
          location: this.state.location,
          distance: this.state.distance,
          duration: this.state.duration,
          user_id: 1

        }
      })
    })
    .then(r=>r.json())
    .then(p => (
      this.setState({tourId: p.id})
    ))

  }

  handleTourChange(e) {
    this.setState({[e.target.id]: e.target.value})
  }

  get currentTour() {
    if (this.state.tourId) {
      return (
        <div>
          <span>{this.state.name}</span>
          <p>{this.state.location}</p>
        </div>
      )
    }
    return null
  }

  get marker() {
    let markers
    console.log('firing markers getter')
    if (this.state.locations.length) {
      return this.state.locations.map((obj, i) => <Marker lat={obj.lat} lng={obj.lng} key={i} map={this.map}/>)
    }
    return null
  }

  componentDidMount() {
    this.handleScriptLoad()
  }


  render() {
    return(
      <div>
        <h1>Create a Tour</h1>
        {!this.state.tourSelected ? this.tourWidget : this.currentTour}
        <input className="search-bar" id="autocomplete" placeholder="search for a location to add" hinttext="Search City" value={this.state.query} onChange={e=>this.handleChange(e)}
        ></input>
        <button onClick={e=> this.increment(e)}>add location</button>
        {this.state.locations.length ? this.state.locations.map((addressObj, i) => <LocationAdder key={i} addresses={addressObj} tourId={this.state.tourId}/> ) : null }
        <button>Save Tour</button>
        <div id="map">
          {this.marker}
        </div>
      </div>
    )
  }
}

export default CreateTour

//post request to save Locations
//post request to save Tours
//spacing styling?
