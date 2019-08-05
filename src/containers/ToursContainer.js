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
