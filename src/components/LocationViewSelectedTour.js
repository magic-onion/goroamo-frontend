import React from 'react'

class LocationViewSelectedTour extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <p>{this.props.location.name}</p>
      </div>
    )
  }
}

export default LocationViewSelectedTour
