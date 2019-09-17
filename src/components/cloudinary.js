import React from 'react'
// import { connect } from 'react-redux'
// import CLOUDINARY_URL from '../environment'
// import Script from 'react-load-script'

// import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';


class Cloudinary extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      uploaded: false,
      image: "",
      widget: {}
    }
    this.handleCloud = this.handleCloud.bind(this)
    this.openWidget = this.openWidget.bind(this)
  }

  handleCloud() {
    let myWidget = window.cloudinary.createUploadWidget({
      cloudName: 'goroamo',
      uploadPreset: 'preset_test'}, (error, result) => {
        if (!error && result && result.event === "success") {
          console.log('Done! Here is the image info: ', result.info);
          this.setState({uploaded: true, image: result.info.thumbnail_url})
        }
      })
    this.setState({widget: myWidget})
  }

  openWidget() {
    this.state.widget.open()
  }

  get img() {
      return <img alt="alt" src={this.state.image}/>
  }

  componentDidUpdate() {
    if (this.state.uploaded) {
      this.props.saveImg(this.props.name, this.state.image)
    }
  }

  render() {
    console.log(this.props, this.state)
    return (
      <div>

        {this.state.uploaded ? this.img : <button onClick={this.openWidget} id="upload_widget">Upload Files</button>}
      </div>
    )
  }

}

export default Cloudinary







// <input id="upload_widget" type="file" onChange={(e) => this.handleUpload(e)}></input>
