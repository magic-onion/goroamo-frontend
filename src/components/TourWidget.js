import React from 'react'

class TourWidget extends React.Component {
constructor(props) {
  super(props)

  this.state = {
    name: '',
    location: '',
    distance: '',
    duration: 0
    }
  }

  handleChange(e) {
    this.setstate({[e.target.id]: e.target.value})
  }


  render() {
    return (
      <div>
      <input onChange={e=>this.handleChange(e)} id="name" placeholder="Name of the Tour" value={this.state.name}></input>
      <input onChange={e=>this.handleChange(e)} id="location" placeholder="Location of the Tour"value={this.state.location}></input>
      <input onChange={e=>this.handleChange(e)} id="distance" placeholder="Total Distance"value={this.state.distance}></input>
      <input onChange={e=>this.handleChange(e)} id="duration" placeholder="Aprroximate Duration of Tour" value={this.state.duration}></input>
      <button>postrequesttotours</button>
      </div>
    )
  }
}

export default TourWidget
