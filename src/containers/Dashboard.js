import React from 'react'
import CurrentTours from '../components/CurrentTours'
import ProfileWidget from '../components/ProfileWidget'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
      <div>
        <CurrentTours/>
        <ProfileWidget/>
      </div>
    )
  }
}

export default Dashboard
