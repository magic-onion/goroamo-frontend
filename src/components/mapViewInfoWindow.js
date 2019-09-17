import React from 'react'
import { Link } from 'react-router-dom'

class MapViewInfoWindow extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let linkString = `/tours/${this.props.tour.tour.id}`
    return (
      <div>
        <p>Name: {this.props.tour.tour.name}</p>
        <Link to={{
          pathname: linkString,
          state: {
            tour: this.props.tour.tour,
            locations: this.props.tour.locations
          }
        }}>View</Link>
      </div>
    )
  }


}

export default MapViewInfoWindow
