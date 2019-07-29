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
    if (this.props.coords.length) {
      console.log(this.props.coords)
      this.map = new window.google.maps.Map(document.getElementById('map'), {
        center: {lat: this.props.coords[0], lng: this.props.coords[1]},
        zoom: 14
      })
    }
  }


  render() {
    return (
      <div>
      <Script
        url= { url }
        onLoad={this.handleScriptLoad}
      />
      <div id="map">
      </div>
      </div>
    )
  }
}

export default ToursContainer
