import React from 'react'
import { Link } from 'react-router-dom'
import { getSingleTour } from '../actions/tours'
import { connect } from 'react-redux'

class MapViewInfoWindow extends React.Component {

  render() {
    let linkString = `/tours/${this.props.tour.tour.id}`
    return (
      <div className="map-view-info-window">
        <p>Name: {this.props.tour.tour.name}</p>
        <p>Locations: {this.props.tour.locations.length}</p>
        <Link to={{pathname: linkString}}>View</Link>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleTour: (param) => dispatch(getSingleTour(param)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapViewInfoWindow)
