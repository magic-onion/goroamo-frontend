import React from 'react'
import Script from 'react-load-script'
import API_KEY from '../environment'
const url = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`

class ToursContainer extends React.Component {
  constructor(props) {
    super(props)

    this.handleScriptLoad = this.handleScriptLoad.bind(this)
  }

  handleScriptLoad() {
    console.log("tourscontainer script")
    if (this.props.coords.length) {
      console.log(this.props.coords)
      this.map = new window.google.maps.Map(document.getElementById("map-container"), {
        center: {lat: this.props.coords[0], lng: this.props.coords[1]},
        zoom: 14,

      })
    }
  }

  componentDidMount() {
    this.handleScriptLoad()
  }

  render() {
    console.log(this.props.coords)
    return (
        <div style={{width: 400, height: 400, margin: 50}} id="map-container">
        </div>
    )
  }

}

export default ToursContainer


// <Script
// url= { url }
// onLoad={this.handleScriptLoad}
// />
// <div id="map">
