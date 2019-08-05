import React from 'react'

function TourInfo(props) {
  console.log(props)
  return (
    <tr>
    <td>{props.tour ? props.tour.name : null}</td>
    <td>DATE</td>
    <td>{props.locations !== undefined ? props.locations.length : 0}</td>
    <td>{props.tour.duration}</td>
    <td>{props.tour.distance}</td>
    
    <td>{props.tour.distance}</td>

    <td><button>edit</button></td>
    </tr>
  )
}
export default TourInfo
