import React from 'react'
import {connect } from 'react-redux'
import { getEditTour }  from '../actions/tours'

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

  render() {
    console.log(this.props)
    return(
      <>
      <p>{this.state.tourLoaded ?  this.props.tours.editTour.name  : null}</p>
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
    getEditTour: (param) => dispatch(getEditTour(param))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTourContainer)
