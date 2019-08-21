import React from 'react'
import CurrentTours from '../components/CurrentTours'
import ProfileWidget from '../components/ProfileWidget'
import { connect } from 'react-redux'

class Dashboard extends React.Component {


  render() {
    console.log(this.props.thing.thing)
    return (
      <div>
      <CurrentTours/>
      <ProfileWidget/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    thing: state.tours
  }
}

export default connect(mapStateToProps, null)(Dashboard)
