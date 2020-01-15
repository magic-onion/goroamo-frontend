import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllTours } from '../actions/tours'
import {  getToursByUser } from '../actions/user'
import TourInfo from './TourInfo'

class CurrentTours extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tours: [],
      toursLoaded: false,
    }

  }

  componentDidMount() {
    // this.props.getAllTours()
    this.props.getToursByUser(this.props.user.user.id)
    this.setState({toursLoaded: true})
  }

  get tourInfo() {
    if (this.props.tours.tours) {

      return this.props.tours.tours.map( (el,i) => {
        return (
          <>
          <hr key ={i+1} className="table-line"/>
          <TourInfo key={i} tour={el.tour} locations={el.locations}/>
          </>
        )
      })
    }
    return null
  }


  render() {
    return (
      <>
      <div className="dashboard-table">
        <span className="dashboard-headline">Current Tours</span>
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
            {this.state.toursLoaded ? this.tourInfo : null}
          </tbody>
        </table>
      </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    tours: state.tours,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllTours: () => dispatch(getAllTours()),
    getToursByUser: id => dispatch(getToursByUser(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentTours)

















// <div  className="dashboard-create-link-div">
// <img className="create-tour-link-img" src={require(`../assets/plus-icon.png`)} alt="hi"></img>
// <Link className="dashboard-create-link" to="/create-tour/">Create New Tour</Link>
// </div>
