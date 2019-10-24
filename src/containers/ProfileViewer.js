import React from 'react'
import { connect } from 'react-redux'
import Loader from '../components/loader'
import ProfileWidget from '../components/ProfileWidget'

class ProfileViewer extends React.Component {


  render() {
    console.log(this.props.user)
    return (
      <div className="profile-viewer">
        <button>edit my profile</button>
        <ProfileWidget/>
      </div>

    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, null)(ProfileViewer)
