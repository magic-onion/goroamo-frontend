import React from 'react'
import { connect } from 'react-redux'

class LocationSelector extends React.Component {
  constructor (props) {
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

export default LocationSelector
