import React from 'react'
import Marker from '../components/Marker'
import LocationViewSelectedTour from './LocationViewSelectedTour'
import ViewSelectedLocation from './ViewSelectedLocation'

class ViewSelectedTour extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      mount: false,
      window: false,
      focusedLocation: {}
    }

    this.clicking = this.clicking.bind(this)
  }

  clicking(e, obj) {
    this.setState({window: true, focusedLocation: obj})
  }


  get locations() {
    if (this.props.location.state.locations.length) {
      return this.props.location.state.locations.map( (loc, i) => {

        let marker = new window.google.maps.Marker({
          position: {lat: parseFloat(loc.latitude), lng: parseFloat(loc.longitude)},
          map: this.tourMap
          })

        marker.addListener('click', (e)=>this.clicking(e, loc))
        // return (
        //   <>
        //   <Marker location={loc} lat={parseFloat(loc.latitude)} lng={parseFloat(loc.longitude)} key={i} map={this.tourMap}/>
        //   </>
        // )

      })
    }
    return <p>no locations saved!</p>
  }

  get focusedLocation() {
    return <ViewSelectedLocation location={this.state.focusedLocation}/>
  }

  componentDidMount() {
    this.tourMap = new window.google.maps.Map(document.getElementById('map-3'), {
      center: {lat: 43.650, lng: -79.384},
      zoom: 14
    })
    this.setState({mount: true})
  }

  render() {
    console.log(this.state.focusedLocation)
    return (
      <div>

        <div style={{width: 400, height: 400, margin: 50}} id="map-3">
          {this.state.mount ? this.locations : null}
        </div>
        {this.state.window ? this.focusedLocation : null}
      </div>
    )
  }
}

export default ViewSelectedTour
