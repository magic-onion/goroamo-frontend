import React from 'react'

class ViewSelectedLocation extends React.Component {
  render() {
    return (
      <div className="tour-location-detail">
        {this.props.location.image ? <img alt={this.props.location.image} src={this.props.location.image}/> : null}
        <p>{this.props.location.name}</p>
        <p>{this.props.location.funfact1}</p>
        <p>{this.props.location.funfact2}</p>
        <p>{this.props.location.funfact3}</p>
      </div>
    )
  }
}

export default ViewSelectedLocation
