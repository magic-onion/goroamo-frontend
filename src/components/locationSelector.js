import React from 'react'

class LocationSelector extends React.Component {

  render() {
    return (
      <div>
        <p>{this.props.location.name}</p>
      </div>
    )
  }
}

export default LocationSelector
