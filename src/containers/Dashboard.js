import React from 'react'
// import { Link } from 'react-router-dom'
import CurrentTours from '../components/CurrentTours'
import ProfileViewer from './ProfileViewer'
// import ProfileWidget from '../components/ProfileWidget'

import { connect } from 'react-redux'

class Dashboard extends React.Component {


  render() {
    return (
      <>
        <CurrentTours/>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    tours: state.tours
  }
}

export default connect(mapStateToProps, null)(Dashboard)
