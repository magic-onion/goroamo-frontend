import React from 'react'
import { connect } from 'react-redux'
import { saveSingleLocation } from '../actions/tours'


class LocationAdder extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      funFact1: '',
      funFact2: '',
      funFact3: '',
      description: ''
    }
  }

  handleChange(e) {
    this.setState({[e.target.id]: e.target.value})
  }

  // handleSaveLocation(e) {
  //
  //   let locObj = {
  //     tour_id: this.props.tourId,
  //     location: {
  //       name: this.props.addresses.formatted_address,
  //       latitude: this.props.addresses.geometry.location.lat(),
  //       longitude: this.props.addresses.geometry.location.lng(),
  //       funfact1: this.state.funFact1,
  //       funfact2: this.state.funFact2,
  //       funfact3: this.state.funFact3,
  //       image: this.state.image,
  //       user_id: this.props.user,
  //     }
  //   }
  //   fetch('http://localhost:3000/api/v1/locations', {
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application/json',
  //       'Authorization': `Bearer ${localStorage.getItem('token')}`
  //     },
  //     body: JSON.stringify({
  //       tour_id: this.props.tourId,
  //       location: {
  //         name: this.props.addresses.formatted_address,
  //         latitude: this.props.addresses.geometry.location.lat(),
  //         longitude: this.props.addresses.geometry.location.lng(),
  //         funfact1: this.state.funFact1,
  //         funfact2: this.state.funFact2,
  //         funfact3: this.state.funFact3,
  //         image: this.state.image,
  //         user_id: 1,
  //       }
  //     })
  //   })
  //   .then(r=>r.json())
  //   .then(console.log)
  // }

  render() {
    console.log(this.props.addresses)
    return (
      <div className="location-adder">
        <input onChange={e=>this.handleChange(e)} className="drag-drop" type="file" placeholder="upload file"></input>
        <p>{this.props.addresses.formatted_address} (map placeholder)</p>
        <div>
          <p>fun facts</p>
          <input onChange={e=>this.handleChange(e)} id="funFact1"></input>
          <input onChange={e=>this.handleChange(e)} id="funFact2"></input>
          <input onChange={e=>this.handleChange(e)} id="funFact3"></input>
          </div>
        <textarea rows="10" cols="30" defaultValue="description" id="description"></textarea>
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
    saveSingleLocation: (obj) => dispatch(saveSingleLocation(obj)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(LocationAdder)
