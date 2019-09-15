import React from 'react'
import CLOUDINARY_URL from '../environment'
import Script from 'react-load-script'

import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';


class Cloudinary extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      uploaded: false,
      image: ""
    }
    this.handleCloud = this.handleCloud.bind(this)
  }

  handleCloud() {
    let myWidget = window.cloudinary.createUploadWidget({
      cloudName: 'goroamo',
      uploadPreset: 'preset_test'}, (error, result) => {
        if (!error && result && result.event === "success") {
          console.log('Done! Here is the image info: ', result.info);
          this.setState({uploaded: true, image: result.info.thumbnail_url})
        }
      }
    )

    document.getElementById("upload_widget").addEventListener("click", function(){
        myWidget.open();
      }, false);
  }

  get img() {
    if (this.state.uploaded) {
      return (
        <img src={this.state.image}/>
      )
    }
    return null
  }
  render() {
    return (
      <div>
      <Script
        url="https://widget.cloudinary.com/v2.0/global/all.js"
        onLoad={this.handleCloud}
      />
        <button id="upload_widget">Upload Files</button>
        {this.img}
      </div>
    )
  }

}

export default Cloudinary







// <input id="upload_widget" type="file" onChange={(e) => this.handleUpload(e)}></input>
