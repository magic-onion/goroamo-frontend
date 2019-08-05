import React from 'react'
import { Link } from 'react-router-dom'
import TourInfo from './TourInfo'

class CurrentTours extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tours: [],
      toursLoaded: false
    }
  }

  componentDidMount() {
    console.log('firing')
    fetch('http://localhost:3000/api/v1/users/1/my-tours', {
      method: 'get',
      headers: {
        'content-type': 'application/json',
        'Authorization': `bearer ${localStorage.getItem('token')}`
      }
    })
    .then(r=>r.json())
    .then(p => {
      this.setState({tours: p, toursLoaded: true})
    })
  }

  get tourInfo() {
    if (this.state.toursLoaded) {
      return this.state.tours.map( (el,i) => <TourInfo key={i} tour={el.tour} locations={el.locations}/>)
    }
    return
  }
  render() {
    return (
      <div className="dashboard-table">
        <span>Current Tours</span>
        <Link to="/create-tour/" className="dashboard-create-link">Create New Tour</Link>
        <table>
          <thead>
            <tr>
              <th className="dashboard-table-headers">Tour</th>
              <th className="dashboard-table-headers">Date Created</th>
              <th className="dashboard-table-headers">Locations</th>
              <th className="dashboard-table-headers">Duration</th>
              <th className="dashboard-table-headers">distance</th>
              <th className="dashboard-table-headers">User Completions</th>
              <th className="dashboard-table-headers">Edit Tour</th>
            </tr>
          </thead>
          <tbody>
            {this.tourInfo}
          </tbody>
        </table>
      </div>

    )
  }
}

export default CurrentTours






//
// <tfoot>
// <tr>
// <td>Sum</td>
// <td>$180</td>
// </tr>
// </tfoot>
