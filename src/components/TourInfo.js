import React from 'react'
import { NavLink } from 'react-router-dom'

function TourInfo(props) {

  let date = new Date(props.tour.created_at)
  let navString = `/edit/${props.tour.id}`

  return (
    <>
    <tr>
      <td className="dashboard-table-data">{props.tour ? props.tour.name : null}</td>
      <td className="dashboard-table-data">{date.getUTCDate()}/{date.getMonth()}/{date.getFullYear()}</td>
      <td className="dashboard-table-data">{props.locations !== undefined ? props.locations.length : 0}</td>
      <td className="dashboard-table-data">{props.tour.duration}</td>
      <td className="dashboard-table-data">{props.tour.distance}</td>

      <td className="dashboard-table-data">{props.tour.distance}</td>

      <td className="dashboard-table-data"><NavLink to={navString}>Edit</NavLink></td>
    </tr>
    </>
  )
}
export default TourInfo
