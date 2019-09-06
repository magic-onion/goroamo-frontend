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
      counter: 0
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
    let newCount = this.state.counter + 1
    this.setState({counter: newCount})
    console.log(this.state.counter)
  }


  handlePlaceSelect() {
    let newPlace = this.autocomplete.getPlace()
    this.setState({addressObj: newPlace, query: newPlace.formatted_addreess})

  }

  get locations() {
    for (let i=0; i < this.state.counter; i++) {
      return (
        <LocationAdder addresses={this.state.addressObj} key={i}/>
      )
    }
  }


  render() {
    return(
      <div>
        <input className="search-bar" id="autocomplete" placeholder="search for a location to add" hinttext="Search City" value={this.state.query} onChange={e=>this.handleChange(e)}></input>
        <button onClick={e=> this.increment(e)}>add location</button>
        <div id="map" style={{width: 600, height: 500, margin: 10}}>
        </div>
        {this.locations}
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
