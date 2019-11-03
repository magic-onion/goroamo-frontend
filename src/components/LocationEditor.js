import React from 'react'
import Script from 'react-load-script'
import { connect } from 'react-redux'
import  { storeLiveEditing } from '../actions/tours'

class LocationEditor extends React.Component {
  constructor(props)  {
    super(props)

    this.state = {
      name: this.props.location.name,
      address: this.props.location.address,
      latitude: this.props.location.latitude,
      longitude: this.props.location.longitude,
      funfact1: this.props.location.funfact1,
      funfact2: this.props.location.funfact2,
      funfact3: this.props.location.funfact3,
      description: this.props.location.description,
      uploaded: false,
      id: this.props.location.id,
      image: this.props.location.image,
      thumbnail: this.props.location.image,
      widget: {},
      locObj: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleCloud = this.handleCloud.bind(this)
    this.handleStoreLocation = this.handleStoreLocation.bind(this)
    this.openWidget = this.openWidget.bind(this)

  }

  //
  // componentDidMount() {
  //   this.setState({
  //     name: this.props.location.name,
  //     address: this.props.location.address,
  //     latitude: this.props.location.latitude,
  //     longitude: this.props.location.longitude,
  //     funfact1: this.props.location.funfact1,
  //     funfact2: this.props.location.funfact2,
  //     funfact3: this.props.location.funfact3,
  //     description: this.props.location.description,
  //     id: this.props.location.id,
  //     image: this.props.location.image,
  //     thumbnail: this.props.location.image
  //
  //   })
  // }

  handleStoreLocation(e) {
    let locObj = this.state
    this.props.storeLiveEditing(locObj)
  }

  handleChange(e) {
    this.setState({[e.target.id]:  e.target.value})
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

  render() {
    return (
      <>
      <Script
        url="https://widget.cloudinary.com/v2.0/global/all.js"
        onLoad={this.handleCloud}
      />
      <div className="location-adder" onMouseLeave={(e) => this.handleStoreLocation(e)}>
        <div className="location-adder-img-container">
        {this.state.uploaded ? this.img : <button className="cloudinary-upload-button" onClick={this.openWidget} id="upload_widget">Add an Image!</button>}
        </div>
          <div className="location-editing-form">
            <div className="location-adder-name-address">
              <input className="location-adder-name-form" onChange={e=>this.handleChange(e)} id="name" placeholder="Name of Location" value={this.state.name}></input>
              <span>Address: {this.props.location.address}</span>
            </div>
            <div className="location-adder-fun-facts">
              <span>Fun Facts:</span>
              <input className="location-adder-form" onChange={e=>this.handleChange(e)} id="funfact1" value={this.state.funfact1}></input>
              <input className="location-adder-form" onChange={e=>this.handleChange(e)} id="funfact2" value={this.state.funfact2}></input>
              <input className="location-adder-form" onChange={e=>this.handleChange(e)} id="funfact3" value={this.state.funfact3}></input>
            </div>
            <div className="location-adder-description">
            <textarea onChange={e=>this.handleChange(e)} rows="7" cols="40" placeholder="description" id="description" value={this.state.description}></textarea>
            </div>
          </div>
      </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    tours: state.tours
  }
}

const mapDispatchToProps = dispatch => {
  return {
    storeLiveEditing: obj => dispatch(storeLiveEditing(obj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationEditor)
