import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllTours } from '../actions/tours'
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
    this.props.getAllTours()
    this.setState({toursLoaded: true})
  }

  get tourInfo() {
        console.log(this.props.tours.tours)
      return this.props.tours.tours.map( (el,i) => <TourInfo key={i} tour={el.tour} locations={el.locations}/>)
  }
  render() {
    console.log(this.state.toursLoaded)
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
            {this.state.toursLoaded ? this.tourInfo : <div>"loading"</div>}
          </tbody>
        </table>
      </div>

    )
  }
}

const mapStateToProps = state => {
  return {
    tours: state.tours
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllTours: () => dispatch(getAllTours())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentTours)





//
// <tfoot>
// <tr>
// <td>Sum</td>
// <td>$180</td>
// </tr>
// </tfoot>
