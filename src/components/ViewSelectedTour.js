import React from 'react'
// import Marker from '../components/Marker'
// import LocationViewSelectedTour from './LocationViewSelectedTour'
import { connect } from 'react-redux'
import { getSingleTour } from '../actions/tours'
import { sendUserLocation } from '../actions/user'
import Script from 'react-load-script'
import ViewSelectedLocation from './ViewSelectedLocation'
import Loader from './loader'
import LocationSelector from './locationSelector'
import API_KEY from '../environment'
const url = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`
let directionService, directionsDisplay, markers


class ViewSelectedTour extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      mapMounted: false,
      window: false,
      tourLoaded: false,
      tourStarted: false,
      focusedLocation: {},
      tour: {},
      directionService: {},
      directionsDisplay: {},
      markers: []
    }

    this.clicking = this.clicking.bind(this)
    this.scriptLoader = this.scriptLoader.bind(this)
    this.startTour = this.startTour.bind(this)
  }

  componentDidMount() {
    this.props.getSingleTour(this.props.match.params.id)
    this.props.sendUserLocation()
  }

  componentDidUpdate(prevProps) {
    // console.log(prevProps.tours.focusedTour.id, this.props.tours.focusedTour.id)
    if (prevProps.tours.focusedTour.id !== this.props.tours.focusedTour.id) {
      this.setState({tourLoaded: true})
    }
  }



  scriptLoader() {
    this.tourMap = new window.google.maps.Map(document.getElementById('map-3'), {
      center: {lat: 44.999013, lng: -93.24663629999999},
      zoom: 14
    })
    let directionService = new window.google.maps.DirectionsService();
    let directionsDisplay = new window.google.maps.DirectionsRenderer({suppressMarkers: true});
    directionsDisplay.setMap(this.tourMap)
    this.setState({mapMounted: true, directionService: directionService, directionsDisplay: directionsDisplay})

  }

  clicking(e, obj) {
    this.setState({window: true, focusedLocation: obj})
  }

  get newLocations() {
    if (this.state.tourLoaded && this.state.mapMounted) {
      console.log("hello in true value")
      if (this.state.tourLoaded && this.props.tours.focusedTour.locations.length) {
      let locationsArray = this.props.tours.focusedTour.locations.map( (el) => ({...el, latitude: parseFloat(el.latitude), longitude: parseFloat(el.longitude)}))
      let waypoints = []
      directionService = new window.google.maps.DirectionsService();
      directionsDisplay = new window.google.maps.DirectionsRenderer({suppressMarkers: true});
      directionsDisplay.setMap(this.tourMap)
      if (locationsArray.length > 2) {
        waypoints = locationsArray.slice(1,-1).map( (el) => {
        return {location: new window.google.maps.LatLng(el.latitude, el.longitude), stopover: true}
        })
      }
      let startLat = parseFloat(this.props.tours.focusedTour.locations[0].latitude)
      let startLng = parseFloat(this.props.tours.focusedTour.locations[0].longitude)
      let endLat = parseFloat(this.props.tours.focusedTour.locations[this.props.tours.focusedTour.locations.length-1].latitude)
      let endLng = parseFloat(this.props.tours.focusedTour.locations[this.props.tours.focusedTour.locations.length-1].longitude)
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
          console.log(this)
          directionsDisplay.setDirections(response)
        }
      })
      markers = []
      return this.props.location.state.locations.map( (loc, i) => {
        let marker = new window.google.maps.Marker({
            position: {lat: parseFloat(loc.latitude), lng: parseFloat(loc.longitude)},
            map: this.tourMap
        })
        marker.addListener('click', (e)=>this.clicking(e, loc))
        markers.push(marker)
          return null
        console.log(markers)
      })
    }
    }
      return <p>no locations saved!</p>
  }

startTour(e) {
  console.log(directionService, directionsDisplay)
  for (let i=0; i < markers.length; i++) {
    console.log(markers[i])
    markers[i].setVisible(false)
    console.log(markers[i])
  }
  console.log(markers)

  directionsDisplay.setDirections({})
  let start = new window.google.maps.LatLng(this.props.user.coords[0], this.props.user.coords[1])
  let endLat = parseFloat(this.state.focusedLocation.latitude)
  let endLng = parseFloat(this.state.focusedLocation.longitude)
  let end = new window.google.maps.LatLng(endLat, endLng)
  let request = {
    origin: start,
    destination: end,
    travelMode: 'WALKING'
  }
  directionService.route(request, function(response, status) {
    if (status === 'OK') {
      console.log(response)
      directionsDisplay.setDirections(response)
    }
  })
  let marker = new window.google.maps.Marker({
    position: {lat: endLat, lng: endLng},
    map: this.tourMap
  })

}



  get focusedLocation() {
    return (
      <>
      <LocationSelector location={this.state.focusedLocation}/>
      <button onClick={(e)=>this.startTour(e)}>Start tour here?</button>
      </>
    )
  }


  render() {
    console.log(this.props)
    return (
      <>
      <Script
      url= { url }
      onLoad={this.scriptLoader}
      />
      <div className="viewing-tour-container">
        {this.script}
        {this.state.tourLoaded ? this.newLocations : <Loader/>}
        <div style={{width: 400, height: 400, margin: 50}} id="map-3">
        </div>
        {this.state.window ? this.focusedLocation : null}
      </div>
      </>
    )
  }
}

// {this.state.mount ? this.locations : null}
const mapStateToProps = state => {
  return {
    user: state.user,
    tours: state.tours
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleTour: (param) => dispatch(getSingleTour(param)),
    sendUserLocation: () => dispatch(sendUserLocation())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewSelectedTour)

//this component should fetch a single tours
//display the map with directions between the tour
//give the user the ability to slect a location to start the tour from
//display basic information about every location
//display walking directions between them and their tour
//once they start the tour, they can go back and look at all of the locations,
//new join for hascompletelocations?



// get locations() {
//   if (this.props.location.state.locations.length) {
    // let locationsArray = this.props.location.state.locations.map( (el) => ({...el, latitude: parseFloat(el.latitude), longitude: parseFloat(el.longitude)}))
    // let waypoints = []
    // let directionService = new window.google.maps.DirectionsService();
    // let directionsDisplay = new window.google.maps.DirectionsRenderer({suppressMarkers: true});
    // directionsDisplay.setMap(this.tourMap)
    // if (locationsArray.length > 2) {
    //   waypoints = locationsArray.slice(1,-1).map( (el) => {
    //     return {location: new window.google.maps.LatLng(el.latitude, el.longitude), stopover: true}
    //   })
    // }
//
//     let startLat = parseFloat(this.props.location.state.locations[0].latitude)
//     let startLng = parseFloat(this.props.location.state.locations[0].longitude)
//     let endLat = parseFloat(this.props.location.state.locations[this.props.location.state.locations.length-1].latitude)
//     let endLng = parseFloat(this.props.location.state.locations[this.props.location.state.locations.length-1].longitude)
//     let start = new window.google.maps.LatLng(startLat, startLng)
//     let end = new window.google.maps.LatLng(endLat, endLng)
//     let request = {
//       origin: start,
//       destination: end,
//       waypoints: waypoints,
//       travelMode: 'WALKING'
//     }
//     directionService.route(request, function(response, status) {
//       if (status === 'OK') {
//         directionsDisplay.setDirections(response)
//       }
//     })
//
  //   return this.props.location.state.locations.map( (loc, i) => {
  //     let marker = new window.google.maps.Marker({
  //       position: {lat: parseFloat(loc.latitude), lng: parseFloat(loc.longitude)},
  //       map: this.tourMap
  //       })
  //     marker.addListener('click', (e)=>this.clicking(e, loc))
  //     return null
  //
  //   })
  // }
  // return <p>no locations saved!</p>
// }
