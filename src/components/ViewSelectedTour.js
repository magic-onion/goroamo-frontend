import React from 'react'
// import Marker from '../components/Marker'
// import LocationViewSelectedTour from './LocationViewSelectedTour'
import Script from 'react-load-script'
import ViewSelectedLocation from './ViewSelectedLocation'
import API_KEY from '../environment'
const url = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`

class ViewSelectedTour extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      mount: false,
      window: false,
      focusedLocation: {}
    }

    this.clicking = this.clicking.bind(this)
    this.scriptLoader = this.scriptLoader.bind(this)
  }

  clicking(e, obj) {
    this.setState({window: true, focusedLocation: obj})
  }



  get locations() {
    if (this.props.location.state.locations.length) {
      let locationsArray = this.props.location.state.locations.map( (el) => ({...el, latitude: parseFloat(el.latitude), longitude: parseFloat(el.longitude)}))
      let waypoints = []
      let directionService = new window.google.maps.DirectionsService();
      let directionsDisplay = new window.google.maps.DirectionsRenderer({suppressMarkers: true});
      directionsDisplay.setMap(this.tourMap)
      if (locationsArray.length > 2) {
        waypoints = locationsArray.slice(1,-1).map( (el) => {
          return {location: new window.google.maps.LatLng(el.latitude, el.longitude), stopover: true}
        })
      }

      let startLat = parseFloat(this.props.location.state.locations[0].latitude)
      let startLng = parseFloat(this.props.location.state.locations[0].longitude)
      let endLat = parseFloat(this.props.location.state.locations[this.props.location.state.locations.length-1].latitude)
      let endLng = parseFloat(this.props.location.state.locations[this.props.location.state.locations.length-1].longitude)
      let start = new window.google.maps.LatLng(startLat, startLng)
      let end = new window.google.maps.LatLng(endLat, endLng)
      let request = {
        origin: start,
        destination: end,
        waypoints: waypoints,
        travelMode: 'WALKING'
      }
      directionService.route(request, function(response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response)
        }
      })




      return this.props.location.state.locations.map( (loc, i) => {
        let marker = new window.google.maps.Marker({
          position: {lat: parseFloat(loc.latitude), lng: parseFloat(loc.longitude)},
          map: this.tourMap
          })
        marker.addListener('click', (e)=>this.clicking(e, loc))
        return null

      })
    }
    return <p>no locations saved!</p>
  }

  get focusedLocation() {
    return <ViewSelectedLocation location={this.state.focusedLocation}/>
  }

  componentDidMount() {
    if (window.google) {
      this.tourMap = new window.google.maps.Map(document.getElementById('map-3'), {
        center: {lat: 43.650, lng: -79.384},
        zoom: 14
      })
      this.setState({mount: true})
    }
    else {
      return (
        <>
        {this.script}
        </>
      )
    }
  }

  get script() {
    return (
      <Script
      url= { url }
      onLoad={this.scriptLoader}
      />
    )
  }

  scriptLoader() {
    this.tourMap = new window.google.maps.Map(document.getElementById('map-3'), {
      center: {lat: 43.650, lng: -79.384},
      zoom: 14
    })
    this.setState({mount: true})
  }

  render() {
    return (
      <div className="viewing-tour-container">

        <div style={{width: 400, height: 400, margin: 50}} id="map-3">
          {this.state.mount ? this.locations : null}
        </div>
        {this.state.window ? this.focusedLocation : null}
      </div>
    )
  }
}

export default ViewSelectedTour
