
function Marker(props) {
  console.log(props)
  let marker = new window.google.maps.Marker({
    position: {lat: props.lat, lng: props.lng},
    map: props.map
  })
  // let infoWindow = new window.google.maps.InfoWindow({
  //           content: `<div>${props.location.name}</div>`
  //         });
  // marker.addListener('click', infoWindow.open(props.map, marker))
  return null
}

export default Marker

// var infowindow = new google.maps.InfoWindow({
//           content: contentString
//         });
//
//         var marker = new google.maps.Marker({
//           position: uluru,
//           map: map,
//           title: 'Uluru (Ayers Rock)'
//         });
//         marker.addListener('click', function() {
//           infowindow.open(map, marker);
//         });
//       }
