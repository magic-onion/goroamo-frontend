import React from 'react'
import Script from 'react-load-script'
import { connect } from 'react-redux'
import { savingLocation, saveInitialLoc } from '../actions/locations'


class LocationAdder extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      name: '',
      funFact1: '',
      funFact2: '',
      funFact3: '',
      description: '',
      uploaded: false,
      image: "",
      thumbnail: "",
      widget: {},
      locObj: {},
      position: this.props.index

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
        user_id: this.props.user.id,
        position: this.state.position
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
        thumbnail: this.state.thumbnail,
        user_id: this.props.user.id,
        position: this.state.position.toString()
      }
    }
    this.saveLocToState(saveLoc)
  }

  saveLocToState(obj) {
    this.props.savingLocation(obj)
  }

  get img() {
    return <img className="location-adder-thumbnail" alt={this.state.image} src={this.state.thumbnail}/>
  }



  render() {
    console.log(this.state.position, this.props.index)
    return (
      <>
      <Script
        url="https://widget.cloudinary.com/v2.0/global/all.js"
        onLoad={this.handleCloud}
      />
      <div className="location-adder" onBlur={(e) => this.handleStoreLocation(e)}>
        <div className="location-adder-img-container">
        {this.state.uploaded ? this.img : <button className="cloudinary-upload-button" onClick={this.openWidget} id="upload_widget">Add an Image!</button>}
        </div>
          <div className="location-editing-form">
            <div className="location-adder-name-address">
              <input className="location-adder-form" onChange={e=>this.handleChange(e)} id="name" placeholder="Name of Location"></input>
              <span>Address: {this.props.placeObj.formatted_address}</span>
            </div>
            <div className="location-adder-fun-facts">
              <span>Fun Facts:</span>
              <input className="location-adder-form" onChange={e=>this.handleChange(e)} id="funFact1"></input>
              <input className="location-adder-form" onChange={e=>this.handleChange(e)} id="funFact2"></input>
              <input className="location-adder-form" onChange={e=>this.handleChange(e)} id="funFact3"></input>
            </div>
            <div className="location-adder-description">
            <textarea onChange={e=>this.handleChange(e)} rows="7" cols="40" placeholder="description" id="description"></textarea>
            </div>
            <div className="single-location-removal" onClick={(key)=>this.props.handleRemove(this.props.index, this.state.address)}><span className="removal-icon">x</span></div>
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
    saveInitialLoc: (obj) => dispatch(saveInitialLoc(obj))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(LocationAdder)
