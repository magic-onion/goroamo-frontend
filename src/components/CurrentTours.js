import React from 'react'
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
    .then(p => (
      console.log(p),
      this.setState({tours: p, toursLoaded: true})
    ))
  }

  get tourInfo() {
    console.log(this.state.tours)
    if (this.state.toursLoaded) {
      return this.state.tours.map( (el,i) => <TourInfo key={i} tour={el.tour} locations={el.locations}/>)
    }
    return
  }
  render() {
    return (
      <div>
      <table>
      <thead>
      <tr>
      <th>Tour</th>
      <th>Date Created</th>
      <th>Locations</th>
      <th>Duration</th>
      <th>distance</th>
      <th>User Completions</th>
      <th>Edit Tour</th>
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
