import React from 'react'
import Script from 'react-load-script'
import MapViewInfoWindow from '../components/mapViewInfoWindow'
import Loader from '../components/loader'
import { connect } from 'react-redux'
import { sendUserLocation } from '../actions/user'
import API_KEY from '../environment'
const url = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`

class ToursContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      focused: false,
      tourObj: {}
    }

    this.handleScriptLoad = this.handleScriptLoad.bind(this)
    this.clicking = this.clicking.bind(this)
  }

  handleScriptLoad() {

      this.map = new window.google.maps.Map(document.getElementById("map-container"), {
        center: {lat: this.props.user.coords[0], lng: this.props.user.coords[1]},
        zoom: 13,
      })

      for (let i = 0; i < this.props.tours.length; i++) {
        if (this.props.tours[i].locations.length) {
          let marker = new window.google.maps.Marker({
            position: {lat: parseFloat(this.props.tours[i].locations[0].latitude), lng: parseFloat(this.props.tours[i].locations[0].longitude)},
            map: this.map
            })
          marker.addListener('click', (e)=>this.clicking(e, this.props.tours[i]))
        }
      }

  }

  clicking(e, obj) {
    console.log("clicking")
    this.setState({focused: true, tourObj: obj})
  }

  componentDidMount() {
    this.props.sendUserLocation()
  }

  get infoWindow() {
    if (this.state.focused) {
      return (
        <MapViewInfoWindow tour={this.state.tourObj}/>
      )
    }
    return null
  }

  get Loader() {
    return null
  }

  render() {
    console.log(this.props)
    return (
      <>
      <Script
      url= { url }
      onLoad={this.handleScriptLoad}
      />
        <div style={{width: 350, height: 400, margin: 2}} id="map-container">
        </div>
      {this.infoWindow}
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sendUserLocation: () => dispatch(sendUserLocation())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToursContainer)

// {this.markers}
// {this.infoWindow}


// <div id="map">
