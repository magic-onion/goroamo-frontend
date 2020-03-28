import React from 'react'
import { connect } from 'react-redux'
import { makeMap, createNewTour, removeLocationFromStore } from '../actions/tours'
// import Marker from '../components/Marker'
import LocationAdder from '../components/LocationAdder'
import SaveTourButton from '../components/saveTourButton'

class AddLocationToTour extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: "",
      addressObj: {},
      locations: [],
      tourSavedOnce: false,
      counter: 0
    }

    this.handleChange = this.handleChange.bind(this)
    this.increment = this.increment.bind(this)
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this)
    this.handleRemove = this.handleRemove.bind(this)

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
    if (this.state.addressObj.formatted_address) {
      let locArray = this.state.locations
      let loc = this.state.addressObj
      locArray.push(loc)
      this.setState({locations: locArray})
    }
    else {
      alert("You must search for and select a location from the search bar")
    }
  }


  handlePlaceSelect() {
    let newPlace = this.autocomplete.getPlace()

    this.setState({addressObj: newPlace, query: newPlace.formatted_addreess})

  }
  handleRemove(key, address) {
    let newLocs = this.state.locations
    this.props.removeLocationFromStore(key)
    newLocs.splice(key, 1)
    this.setState({locations: newLocs})
  }

  get locations() {
    return this.state.locations.map((locObj,j) => {
      return (
        <>
          <LocationAdder placeObj={locObj} key={j} index={j} tourId={this.props.tourId} handleRemove={this.handleRemove}/>
        </>
      )
    })
  }

  get saveButton() {
    //shouldn't appear if no locations added
    //if locations added but never saved, regular saveLocButton
    //if locations added and saved once, Patch request button
  //   if (this.state.savedTourOnce) {
  //     return()
  //   }
    if (this.state.locations.length && this.state.savedTourOnce) {
      return null
    }
    return null
  }

//Need to refine adding multiple locations. What happens on misclicks?
  render() {
    return(
      <div className='tour-editing-container'>
        <div className="location-searcher">
          <span>{this.state.locations.length ? "Add another place via search" : "Search for a location here"}</span>
          <input className="search-bar" id="autocomplete" placeholder="search for a location to add" hinttext="Search City" value={this.state.query} onChange={e=>this.handleChange(e)}></input>
          <button className="location-adder-button" onClick={e=> this.increment(e)}>add</button>
        </div>
        <div id="map" style={{width: 800, height: 500, margin: 10}}>
        </div>
        {this.locations}
        {this.state.locations.length ? <SaveTourButton/> : null}
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
    createNewTour: (obj) => dispatch(createNewTour(obj)),
    removeLocationFromStore: (key) => dispatch(removeLocationFromStore(key))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddLocationToTour)
