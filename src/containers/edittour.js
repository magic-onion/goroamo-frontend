import React from 'react'
import {connect } from 'react-redux'
import { getEditTour }  from '../actions/tours'
import LocationEditor from '../components/LocationEditor'
import Loader from '../components/loader'
class EditTourContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tourLoaded: false
    }
  }

  componentDidMount() {
    this.props.getEditTour(this.props.match.params.id)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.tours.editTour.id !== this.props.tours.editTour.id) {
      this.setState({tourLoaded: true})
    }
  }

  get locations() {
    if (this.state.tourLoaded && this.props.tours.editTour.locations.length) {
      return this.props.tours.editTour.locations.map( (loc, i) =>{
        return <LocationEditor location={loc} key={i}/>
      })
    }
  }

  get tourInfo() {
    if (this.state.tourLoaded) {
      return (
        <>
          <div className="edit-tour-info">
            <p className="edit-tour-headline">Name: {this.props.tours.editTour.name}</p>
            <p className="edit-tour-headline">Location: {this.props.tours.editTour.location}</p>
            <p className="edit-tour-headline">Distance: {this.props.tours.editTour.distance}</p>
            <p className="edit-tour-headline">Duration: {this.props.tours.editTour.duration}</p>
          </div>
          {this.locations}
        </>
      )
    }
  }


  render() {
    console.log(this.state.tourLoaded)
    return(
      <>
      {this.state.tourLoaded ? this.tourInfo : <Loader/>}
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    tours: state.tours
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getEditTour: (param) => dispatch(getEditTour(param))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTourContainer)
