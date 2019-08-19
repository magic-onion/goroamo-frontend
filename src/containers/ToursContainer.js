import React from 'react'

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
        zoom: 13,
      })

      for (let i = 0; i < this.props.tours.length; i++) {
        if (this.props.tours[i].locations.length) {
          let marker = new window.google.maps.Marker({
            position: {lat: parseFloat(this.props.tours[i].locations[0].latitude), lng: parseFloat(this.props.tours[i].locations[0].longitude)},
            map: this.map
            })
            console.log(marker)
        }
      }


    }
  }

  componentDidMount() {
    this.handleScriptLoad()
  }

  render() {
    console.log(this.props)
    return (
      <>
        <div style={{width: 400, height: 400, margin: 50}} id="map-container">
        </div>
        {this.markers}
      </>
    )
  }

}

export default ToursContainer


// <Script
// url= { url }
// onLoad={this.handleScriptLoad}
// />
// <div id="map">
