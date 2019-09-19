import React from 'react'
import Script from 'react-load-script'
import { connect } from 'react-redux'
import { savingLocation, saveInitialLoc, saveImg } from '../actions/locations'
// import Cloudinary from './cloudinary'


class LocationAdder extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      name: "Name of Location",
      funFact1: '',
      funFact2: '',
      funFact3: '',
      description: '',
      uploaded: false,
      image: "",
      thumbnail: "",
      widget: {},
      locObj: {}
    }

    this.saveLocToState = this.saveLocToState.bind(this)
    this.handleStoreLocation = this.handleStoreLocation.bind(this)
    this.handleCloud = this.handleCloud.bind(this)
    this.openWidget = this.openWidget.bind(this)
  }

  componentDidMount() {
    let initializeObj = {
      tour_id: this.props.tourId,
      location: {
        name: this.props.placeObj.formatted_address,
        address: this.props.placeObj.formatted_address,
        latitude: this.props.placeObj.geometry.location.lat(),
        longitude: this.props.placeObj.geometry.location.lng(),
        funfact1: this.state.funFact1,
        funfact2: this.state.funFact2,
        funfact3: this.state.funFact3,
        description: this.state.description,
        image: this.state.image,
        thumbnail: this.state.thumbnail,
        user_id: this.props.user.user.id
      }
    }
    this.props.saveInitialLoc(initializeObj)
  }

  openWidget() {
    this.state.widget.open()
  }

  handleCloud() {
    let myWidget = window.cloudinary.createUploadWidget({
      cloudName: 'goroamo',
      uploadPreset: 'preset_test'}, (error, result) => {
        if (!error && result && result.event === "success") {
          console.log('Done! Here is the image info: ', result.info);
          //transform image here
          // let urlThumbnail = `https://res.cloudinary.com/goroamo/image/upload/w_400,h_400,c_crop,g_face,r_max/${result.info.public_id}.jpeg`
          this.setState({...this.state, uploaded: true, thumbnail: result.info.thumbnail_url, image: result.info.url})
        }
      })
    this.setState({widget: myWidget})
  }


  handleChange(e) {
    this.setState({[e.target.id]: e.target.value})
  }

  handleStoreLocation(e) {
    let saveLoc = {
      tour_id: this.props.tourId,
      location: {
        name: this.state.name,
        address: this.props.placeObj.formatted_address,
        latitude: this.props.placeObj.geometry.location.lat(),
        longitude: this.props.placeObj.geometry.location.lng(),
        funfact1: this.state.funFact1,
        funfact2: this.state.funFact2,
        funfact3: this.state.funFact3,
        description: this.state.description,
        image: this.state.image,
        thumbnmail: this.state.thumbnail,
        user_id: this.props.user.user.id
      }
    }
    console.log(saveLoc)
    this.saveLocToState(saveLoc)
  }

  saveLocToState(obj) {
    this.props.savingLocation(obj)
  }

  get img() {
    return <img className="location-adder-thumbnail" alt={this.state.image} src={this.state.thumbnail}/>
  }



  render() {
    return (
      <>
      <Script
        url="https://widget.cloudinary.com/v2.0/global/all.js"
        onLoad={this.handleCloud}
      />
      <div className="location-adder" onBlur={(e) => this.handleStoreLocation(e)}>
        {this.state.uploaded ? this.img : <button className="cloudinary-upload-button" onClick={this.openWidget} id="upload_widget">Add an Image!</button>}
          <div className="location-editing-form">
            <span>Address: {this.props.placeObj.formatted_address}</span>
            <input className="location-adder-form" onChange={e=>this.handleChange(e)} id="name" value={this.state.name}></input>
            <p>fun facts</p>
            <input className="location-adder-form" onChange={e=>this.handleChange(e)} id="funFact1"></input>
            <input className="location-adder-form" onChange={e=>this.handleChange(e)} id="funFact2"></input>
            <input className="location-adder-form" onChange={e=>this.handleChange(e)} id="funFact3"></input>
            <textarea onChange={e=>this.handleChange(e)} rows="10" cols="30" defaultValue="description" id="description"></textarea>
          </div>
      </div>
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
    savingLocation: (obj) => dispatch(savingLocation(obj)),
    saveInitialLoc: (obj) => dispatch(saveInitialLoc(obj)),
    saveImg: (locName, imgUrl) => dispatch(saveImg(locName, imgUrl))
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
