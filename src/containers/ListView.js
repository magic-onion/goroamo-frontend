import React from 'react'
import SelectedTour from './SelectedTour'
import { Link } from 'react-router-dom'
import { getSingleTour } from '../actions/tours'
import { connect } from 'react-redux'

class ListView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tourSelected: false,
      focusedTour: {},
      searchTerm: ""
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleLink = this.handleLink.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleClick(e) {
    let newTourSelected = !this.state.tourSelected
    let tour = this.props.tours.find( (el) => {
      return el.tour.id === parseInt(e.target.id)
    })
    this.setState({tourSelected: newTourSelected, focusedTour: tour})
  }

  get tours() {
    if (this.props.tours && !this.state.searchTerm.length) {
      return this.props.tours.map((el, i) => {
        let linkString = `/tours/${el.tour.id}`
      return(
        <div className="list-view-tour-container" key={i}>
          <SelectedTour tour={el.tour} locations={el.locations}/>
          <Link className="list-view-link" onClick={ ()=> this.handleLink(el.tour.id)}to={{pathname: linkString}}>View</Link>
        </div>
        )
      })
    }

    if (this.props.tours && this.state.searchTerm.length) {
      return this.props.tours.map( (el, i) => {
        let linkString = `/tours/${el.tour.id}`
        if (el.tour.location.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
          return (
            <div className="list-view-tour-container" key={i}>
              <SelectedTour tour={el.tour} locations={el.locations}/>
              <Link className="list-view-link" onClick={ ()=> this.handleLink(el.tour.id)}to={{pathname: linkString}}>View</Link>
            </div>
          )
        }
      })
    }
    return null
  }

  handleLink(param) {
    this.props.getSingleTour(param)
  }

  handleSearch(e) {
    this.setState({searchTerm: e.target.value})
  }

  render() {
    return(
      <>
      <div className="search-tours-container">
        <span>Search by Location: </span>
        <input className="search-tours-filter" onChange={e=>this.handleSearch(e)} type="text"/>
      </div>
      <div className="list-container">
        {!this.state.tourSelected ? this.tours : <SelectedTour tour={this.state.focusedTour.tour} locations={this.state.focusedTour.locations}/> }
      </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleTour: (param) => dispatch(getSingleTour(param)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListView)

//be able to click a tour and go to its pages
// {{
//   pathname: linkString,
//   state: {
//     tour: el.tour,
//     locations: el.locations
//   }
// }
