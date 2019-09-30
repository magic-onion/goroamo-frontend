import React from 'react'
import { connect } from 'react-redux'
import { saveAllLocs } from '../actions/locations'

class SaveTourButton extends React.Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    let tourObj = {
      locations: this.props.tours.locations
    }
    console.log(tourObj)
    this.props.saveAllLocs(tourObj)
  }


  render() {
    console.log(this.props.tours.locations)
    return(
      <div className="save-tour-button" onClick={e=>this.handleSubmit(e)}>
        <p>Click here to save your tour </p>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    tours: state.tours,
    user: state.user.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveAllLocs: (obj) => dispatch(saveAllLocs(obj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveTourButton)
