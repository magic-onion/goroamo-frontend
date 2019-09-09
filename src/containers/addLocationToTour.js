import React from 'react'
import { connect } from 'react-redux'
import { makeMap, createNewTour } from '../actions/tours'
import Marker from '../components/Marker'
import LocationAdder from '../components/LocationAdder'

class AddLocationToTour extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: "",
      addressObj: {},
      locations: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.increment = this.increment.bind(this)
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this)

  }

  componentDidMount() {
    this.props.makeMap()
    let options = []
    this.autocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),
      options,
    );

    // Fire Event when a suggested name is selected
    this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
  }

  handleChange(e) {
    this.setState({query: e.target.value})
  }

  increment() {
    let locArray = this.state.locations
    let loc = this.state.addressObj
    locArray.push(loc)
    this.setState({locations: locArray})
  }


  handlePlaceSelect() {
    let newPlace = this.autocomplete.getPlace()

    this.setState({addressObj: newPlace, query: newPlace.formatted_addreess})

  }

  get locations() {
    return this.state.locations.map((i,j) => <LocationAdder addresses={i} key={j} tourId={this.props.tourId}/>)
  }


  render() {
    return(
      <div>
      <p>{this.state.locations.length ? "Add another place via search" : "Search for a location here"}</p>
        <input className="search-bar" id="autocomplete" placeholder="search for a location to add" hinttext="Search City" value={this.state.query} onChange={e=>this.handleChange(e)}></input>
        <button onClick={e=> this.increment(e)}>add location</button>
        <div id="map" style={{width: 600, height: 500, margin: 10}}>
        </div>
        {this.locations}
        {this.state.locations.length ? <p>click to save locations</p> : null}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    tours: state.tours,
    user: state.user.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    makeMap: () => dispatch(makeMap()),
    createNewTour: (obj) => dispatch(createNewTour(obj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddLocationToTour)
