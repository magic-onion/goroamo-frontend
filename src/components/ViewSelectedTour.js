import React from 'react'
// import Marker from '../components/Marker'
// import LocationViewSelectedTour from './LocationViewSelectedTour'
import { connect } from 'react-redux'
import { getSingleTour, tourIsLoaded } from '../actions/tours'
import { sendUserLocation } from '../actions/user'
import Script from 'react-load-script'
import ViewSelectedLocation from './ViewSelectedLocation'
// import Loader from './loader'
import LocationSelector from './locationSelector'
import API_KEY from '../environment'
const url = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`

//next button by image upload in case app is closed
//sd

class ViewSelectedTour extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tourStarted: false,
      mapMounted: false,
      window: false,
      tourLoaded: false,
      focusedLocation: {},
      tour: {},
      directionService: {},
      directionsDisplay: {},
      markers: [],
      tourMap: {},
      maxLocs: 0,
      currentImage: "",
      images: [],
      locationCounter: 0,
      imageLoaded: false,
      widget: {},
      displayMode: "viewing"
    }

    this.clicking = this.clicking.bind(this)
    this.scriptLoader = this.scriptLoader.bind(this)
    this.startTour = this.startTour.bind(this)
    this.newLocations = this.newLocations.bind(this)
    this.nextLocation = this.nextLocation.bind(this)
    this.uploadImage = this.uploadImage.bind(this)
    this.handleCloud = this.handleCloud.bind(this)
    this.skipLocation = this.skipLocation.bind(this)
  }

  componentDidMount() {
    this.props.getSingleTour(this.props.match.params.id)
    this.props.sendUserLocation()
    if (this.props.tours.focusedTour.id) {
      this.setState({tourLoaded:true})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.tours.focusedTour.id !== this.props.tours.focusedTour.id) {
      this.setState({tourLoaded: true, maxLocs: this.props.tours.focusedTour.locations.length - 1})
      this.props.tourIsLoaded()
    }
    if (prevProps.tours.tourLoaded !== this.props.tours.tourLoaded) {
      this.newLocations()
    }
    if (prevState.mapMounted !== this.state.mapMounted) {
      this.newLocations()
    }
  }

  scriptLoader() {
    let initLat = 43.651070
    let initLng = -79.347015
    this.tourMap = new window.google.maps.Map(document.getElementById('map-3'), {
      center: {lat: initLat, lng: initLng},
      zoom: 14
    })
    this.directionsDisplay = new window.google.maps.DirectionsRenderer({suppressMarkers: true});
    this.directionsDisplay.setMap(this.tourMap)
    this.directionsService = new window.google.maps.DirectionsService();
    this.setState({mapMounted: true})

  }

  clicking(e, obj) {
    this.setState({window: true, focusedLocation: obj})
  }

  newLocations() {
    if (this.state.tourLoaded && this.state.mapMounted) {
        let locationsArray = this.props.tours.focusedTour.locations.map( (el) => ({...el, latitude: parseFloat(el.latitude), longitude: parseFloat(el.longitude)}))
        let waypoints = []
        if (locationsArray.length > 2) {
              waypoints = locationsArray.slice(1,-1).map( (el) => {
                return {location: new window.google.maps.LatLng(el.latitude, el.longitude), stopover: true}
              })
            }
        let startLat = locationsArray[0].latitude
        let startLng = locationsArray[0].longitude
        let endLat = locationsArray[locationsArray.length-1].latitude
        let endLng = locationsArray[locationsArray.length-1].longitude
        let start = new window.google.maps.LatLng(startLat, startLng)
        let end = new window.google.maps.LatLng(endLat, endLng)
        let request = {
          origin: start,
          destination: end,
          waypoints: waypoints,
          travelMode: 'WALKING'
        }
        // console.log(request, startLat,  endLat, locationsArray)
        let directionsDisplay = this.directionsDisplay
        this.directionsService.route(request, function(response, status) {
              if (status === 'OK') {
                directionsDisplay.setDirections(response)
              }
            })
        let markers = []
        locationsArray.map( (loc, i) => {
          let marker = new window.google.maps.Marker({
            position: {lat: loc.latitude, lng: loc.longitude},
            map: this.tourMap
            })
          marker.addListener('click', (e)=>this.clicking(e, loc))
          markers.push(marker)
          return null

        })
        this.setState({markers: markers})

    }
    else {

    }
  }

  startTour(e) {
    this.state.markers.map((m) => m.setMap(null))
    let locationsArray = this.props.tours.focusedTour.locations.map( (el) => ({...el, latitude: parseFloat(el.latitude), longitude: parseFloat(el.longitude)}))
    let start = new window.google.maps.LatLng(this.props.user.coords[0], this.props.user.coords[1])
    let end = new window.google.maps.LatLng(locationsArray[0].latitude, locationsArray[0].longitude)
    let markers = [[this.props.user.coords[0], this.props.user.coords[1]], [locationsArray[0].latitude, locationsArray[0].longitude]]
    let request = {
      origin: start,
      destination: end,
      waypoints: [],
      travelMode: 'WALKING'
    }
    console.log(start, end, markers, request)
    let directionsDisplay = this.directionsDisplay
    this.directionsService.route(request, function(response, status) {
      console.log(response, status)
          if (status === 'OK') {
            directionsDisplay.setDirections(response)
          }
      })
    for (let marker of markers) {
      let newMarker = new window.google.maps.Marker({
        position: {lat: marker[0], lng: marker[1]},
        map: this.tourMap
        })
    }
    console.log("ABOUT TO CHANGE STATE")
    this.setState({displayMode: "started", markers: markers})
  }

  nextLocation(e) {
    if (this.state.locationCounter !== this.state.maxLocs) {
      let counter = this.state.locationCounter
      let locationsArray = this.props.tours.focusedTour.locations.map( (el) => ({...el, latitude: parseFloat(el.latitude), longitude: parseFloat(el.longitude)}))
      let start = new window.google.maps.LatLng(locationsArray[0+counter].latitude, locationsArray[0+counter].longitude)
      let end = new window.google.maps.LatLng(locationsArray[1+counter].latitude, locationsArray[1+this.state.locationCounter].longitude)
      let markers = [[locationsArray[0+this.state.locationCounter].latitude, locationsArray[0+this.state.locationCounter].longitude], [locationsArray[1+this.state.locationCounter].latitude, locationsArray[1+this.state.locationCounter].longitude]]
      let request = {
        origin: start,
        destination: end,
        waypoints: [],
        travelMode: 'WALKING'
      }
      let gMarkers = []
      for (let marker of markers) {
        let newMarker = new window.google.maps.Marker({
          position: {lat: marker[0], lng: marker[1]},
          map: this.tourMap
          })
        gMarkers.push(newMarker)
      }
      let directionsDisplay = this.directionsDisplay
      this.directionsService.route(request, function(response, status) {
            if (status === 'OK') {
              directionsDisplay.setDirections(response)
            }
        })
        let newCounter = this.state.locationCounter + 1
        this.setState({markers: gMarkers, locationCounter: newCounter, displayMode: 'started'})
    }
    else {
      this.setState({displayMode: 'ended'})
    }

  }

  skipLocation(e) {
    //change the view mode to location
    //advance the counter
    //
    this.setState({displayMode: 'location', currentImage: false})
  }

  get controls() {
    if (this.state.displayMode === 'viewing') {
      return (
        <div className="viewing-controls-container">
        <p> This tour begins at: {this.state.tourLoaded ? this.props.tours.focusedTour.locations[0].name : null}</p>
        <button className="starting-tour-button" onClick={(e)=>this.startTour(e)}>Click Here for Directions to The Start of the Tour</button>
        </div>
      )
    }
    if (this.state.displayMode === 'started') {
      // let thumbnail = this.state.images[this.state.locationCounter]
      return (
        <div className="started-mode-controls-container">
        {this.state.currentImage ? <p>Here's the photo you took!</p> :  <p>Once you've arrived at {this.props.tours.focusedTour.locations[this.state.locationCounter].name}, take an picture of it!</p>}
        {this.state.currentImage ? <img className="view-tour-current-image" src={this.state.currentImage} alt={this.state.currentImage}/> : null }
        {this.state.currentImage ? null : <button className="view-tour-upload-image-button" onClick={e=>this.uploadImage(e)}>upload image here </button>}

          <button className="view-tour-details-button" onClick={e=>this.skipLocation(e)}>View Tour Details</button>
        </div>
      )
    }
    if (this.state.displayMode === 'location') {
      return (
        <>
        <ViewSelectedLocation location={this.props.tours.focusedTour.locations[this.state.locationCounter]} image={this.state.currentImage}/>
        <div className="location-controls-container">
          <button className="viewing-tour-next-location-button" onClick={e=>this.nextLocation(e)}>Next Location!</button>
        </div>
        </>
      )
    }
    if (this.state.displayMode === 'ended') {
      return (
        <>
        <p>Thanks for taking this tour!</p>
        <p>View the photos of your tour below</p>
          {this.simpleGallery}
        </>
      )

    }
    return null
  }

  get simpleGallery() {
    if (this.state.images.length) {
      return this.state.images.map((img, i) => {
        return <img alt={i} src={img}/>
      })
    }
    return null
  }

  uploadImage() {
    this.state.widget.open()
  }



  get focusedLocation() {
    return (
      <>
      <LocationSelector location={this.state.focusedLocation}/>
      </>
    )
  }

  handleCloud() {
    let myWidget = window.cloudinary.createUploadWidget({
      cloudName: 'goroamo',
      uploadPreset: 'preset_test'}, (error, result) => {
        if (!error && result && result.event === "success") {
          console.log('Done! Here is the image info: ', result.info);
          //transform image here
          let imageArray = this.state.images
          imageArray.push(result.info.url)
          this.setState({...this.state, currentImage: result.info.url, image: result.info.url})
        }
      })
    this.setState({widget: myWidget})
  }


  render() {
    console.log(this.state.displayMode)
    return (
      <>
      <Script
      url= { url }
      onLoad={this.scriptLoader}
      />
      <Script
        url="https://widget.cloudinary.com/v2.0/global/all.js"
        onLoad={this.handleCloud}
      />
      <div className="tour-title">
        <h3 className="tour-title-h3">{this.props.tours.focusedTour.name}</h3>
      </div>
      <div className="viewing-tour-container">
        <div style={{width: "90%", height: 700, margin: "3%"}} id="map-3">
        </div>
        {this.state.window ? this.focusedLocation : null}
        {this.controls}
      </div>
      </>
    )
  }
}

// {this.state.tourLoaded ? this.newLocations : <Loader/>}
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
    sendUserLocation: () => dispatch(sendUserLocation()),
    tourIsLoaded: () => dispatch(tourIsLoaded())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewSelectedTour)
