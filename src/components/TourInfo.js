import React from 'react'

function TourInfo(props) {

  let date = new Date(props.tour.created_at)
  
  return (
    <tr>
      <td className="dashboard-table-data">{props.tour ? props.tour.name : null}</td>
      <td className="dashboard-table-data">{date.getUTCDate()}/{date.getMonth()}/{date.getFullYear()}</td>
      <td className="dashboard-table-data">{props.locations !== undefined ? props.locations.length : 0}</td>
      <td className="dashboard-table-data">{props.tour.duration}</td>
      <td className="dashboard-table-data">{props.tour.distance}</td>

      <td className="dashboard-table-data">{props.tour.distance}</td>

      <td className="dashboard-table-data"><button>edit</button></td>
    </tr>
  )
}
export default TourInfo
