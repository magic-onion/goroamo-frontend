import React from 'react'
import { connect } from 'react-redux'
import Marker from '../components/Marker'
import LocationAdder from '../components/LocationAdder'

class Creator extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      
    }
  }




  render() {
    return (
      <div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Creator)


//this component
//has a form that creates a tour
//post request to the db
//creates several forms that use autocomplete search bar to
//render the location adder components
//post request to the db for locations

//renders markers on a map for each location
