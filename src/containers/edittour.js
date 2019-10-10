import React from 'react'
import {connect } from 'react-redux'
import { getSingleTour }  from '../actions/tours'

class EditTourContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tourLoaded: false
    }
  }

  componentDidMount() {
    this.props.getSingleTour(this.props.match.params.id)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.tours.focusedTour.id !== this.props.tours.focusedTour.id) {
      this.setState({tourLoaded: true})
    }
  }

  render() {
    console.log(this.props)
    return(
      <>
      <p>{this.state.tourLoaded ?  this.props.tours.focusedTour.name  : null}</p>
      <p></p>
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
    getSingleTour: (param) => dispatch(getSingleTour(param))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTourContainer)
