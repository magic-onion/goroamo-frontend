import React from 'react'

function Marker(props) {
  let marker = new window.google.maps.Marker({
    position: {lat: props.lat, lng: props.lng},
    map: props.map
  })
  return null
}

export default Marker
