import React from 'react'
import { connect } from 'react-redux'
import {makeMap, createNewTour } from '../actions/tours'
import AddLocationToTour from './addLocationToTour'

//WHEN DO YOU DRAW MARKERS
class CreateTour2 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tourCreated: false,
      name: "",
      location: "",
      distance: "",
      duration: "",
      markers: []
    }

    this.handleTourChange = this.handleTourChange.bind(this)
    this.handleSavetour = this.handleSaveTour.bind(this)
    this.makeMarkers = this.makeMarkers.bind(this)
  }


  handleTourChange(e) {
    this.setState({[e.target.id]: e.target.value})
  }

  handleSaveTour(e) {
    this.setState({tourCreated: true})
    let tourObj = {
      tour: {
        name: this.state.name,
        location: this.state.location,
        distance: this.state.distance,
        user_id: this.props.user.user.id,
        duration: this.state.duration
      }
    }
    this.props.createNewTour(tourObj)

  }

  get createTourWidget() {
    return (
      <>
      <h2 className="create-tour-headline">Create a New Tour</h2>
      <div className="create-tour-form">
        <input className="create-tour-input" onChange={e=>this.handleTourChange(e)} id="name" placeholder="Name of the Tour" value={this.state.name}></input>
        <input className="create-tour-input" onChange={e=>this.handleTourChange(e)} id="location" placeholder="Location of the Tour"value={this.state.location}></input>
        <input className="create-tour-input" onChange={e=>this.handleTourChange(e)} id="distance" placeholder="Total Distance"value={this.state.distance}></input>
        <input className="create-tour-input" onChange={e=>this.handleTourChange(e)} id="duration" type="number" placeholder="Aprroximate Duration of Tour" value={this.state.duration}></input>
        <button className="create-tour-button" onClick={e=>this.handleSaveTour(e)}>Submit</button>
      </div>
    </>
    )
  }

  get currentTour() {
    return(
      <>
        <h1>{this.state.name}</h1>
      </>
    )
  }

  makeMarkers() {
    //Maybe but probably not the right way to go
    for (let el of this.state.markers) {
      el.setMap(null)
    }
    let marksArray = []
    this.props.tours.locations.map((loc) => {
      let marker = new window.google.maps.Marker({
        position: {lat: loc.location.latitude, lng: loc.location.longitude},
        map: this.props.tours.testMap
      })
      marksArray.push(marker)
    })
    this.setState({markers: marksArray})
  }

  get markers() {
    return this.props.tours.locations.map ((loc) => {
      let marker = new window.google.maps.Marker({
        position: {lat: loc.location.latitude, lng: loc.location.longitude},
        map: this.props.tours.testMap
      })
      return null
    })
  }
  render() {
    return(
      <>
      {!this.state.tourCreated ? this.createTourWidget : this.currentTour}
      {this.state.tourCreated? <AddLocationToTour tourId={this.props.tours.createdTour.id}/> : null}
      {this.markers}
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateTour2)
