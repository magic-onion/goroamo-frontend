import React from 'react'
import { connect } from 'react-redux'
import { editTourPatchReq } from '../actions/tours'

class SaveEditedTourButton extends React.Component {
  constructor(props) {
    super(props)

    this.handlePatchReq = this.handlePatchReq.bind(this)
  }

  handlePatchReq() {
    console.log(this.props.tours.editTour)
    this.props.editTourPatchReq(this.props.tours.editTour, this.props.tours.editTour.id)
  }


  render() {
    console.log(this.props)
    return (
      <div>
        <button onClick={e=>this.handlePatchReq(e)}>Save Tour Again</button>
      </div>
    )
  }
}

const mapStateToProps = state  => {
  return {
    tours: state.tours
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editTourPatchReq: (obj, str) => dispatch(editTourPatchReq(obj, str))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveEditedTourButton)
