import React from 'react'
import { connect } from 'react-redux'
import { savingLocation, saveInitialLoc } from '../actions/locations'


class LocationAdder extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      funFact1: '',
      funFact2: '',
      funFact3: '',
      description: ''
    }

    this.saveLocToState = this.saveLocToState.bind(this)
    this.handleStoreLocation = this.handleStoreLocation.bind(this)
  }

  componentDidMount() {
    let initializeObj = {
      tour_id: this.props.tourId,
      location: {
        name: this.props.placeObj.formatted_address,
        latitude: this.props.placeObj.geometry.location.lat(),
        longitude: this.props.placeObj.geometry.location.lng(),
        funfact1: this.state.funFact1,
        funfact2: this.state.funFact2,
        funfact3: this.state.funFact3,
        description: this.state.description,
        image: this.state.image,
        user_id: this.props.user.user.id
      }
    }
    this.props.saveInitialLoc(initializeObj)
  }

  handleChange(e) {
    this.setState({[e.target.id]: e.target.value})
  }

  handleStoreLocation(e) {
    let saveLoc = {
      tour_id: this.props.tourId,
      location: {
        name: this.props.placeObj.formatted_address,
        latitude: this.props.placeObj.geometry.location.lat(),
        longitude: this.props.placeObj.geometry.location.lng(),
        funfact1: this.state.funFact1,
        funfact2: this.state.funFact2,
        funfact3: this.state.funFact3,
        description: this.state.description,
        image: this.state.image,
        user_id: this.props.user.user.id
      }
    }
    this.saveLocToState(saveLoc)
  }

  saveLocToState(obj) {
    this.props.savingLocation(obj)
  }



  render() {
    console.log(this.props.addresses)
    return (
      <div className="location-adder" onBlur={(e) => this.handleStoreLocation(e)}>
        <input onChange={e=>this.handleChange(e)} className="drag-drop" type="file" placeholder="upload file"></input>
        <p>{this.props.placeObj.formatted_address} (map placeholder)</p>
        <div>
          <p>fun facts</p>
          <input onChange={e=>this.handleChange(e)} id="funFact1"></input>
          <input onChange={e=>this.handleChange(e)} id="funFact2"></input>
          <input onChange={e=>this.handleChange(e)} id="funFact3"></input>
          </div>
        <textarea onChange={e=>this.handleChange(e)} rows="10" cols="30" defaultValue="description" id="description"></textarea>
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
    savingLocation: (obj) => dispatch(savingLocation(obj)),
    saveInitialLoc: (obj) => dispatch(saveInitialLoc(obj))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(LocationAdder)







// handleSaveLocation(e) {
//
  // let locObj = {
  //   tour_id: this.props.tourId,
  //   location: {
  //     name: this.props.addresses.formatted_address,
  //     latitude: this.props.addresses.geometry.location.lat(),
  //     longitude: this.props.addresses.geometry.location.lng(),
  //     funfact1: this.state.funFact1,
  //     funfact2: this.state.funFact2,
  //     funfact3: this.state.funFact3,
  //     image: this.state.image,
  //     user_id: this.props.user,
  //   }
  // }
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
