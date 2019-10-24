import React from 'react'
import { connect } from 'react-redux'
import Loader from '../components/loader'
import ProfileWidget from '../components/ProfileWidget'
import ProfileEditor from '../components/ProfileEditor'

class ProfileViewer extends React.Component {

  get profileInfo() {
    if (this.props.user.user.id === undefined) {
      return <Loader/>
    }
    else return (
      <div className="profile-viewer">
        <button>edit my profile</button>
        <ProfileWidget/>
        <ProfileEditor user={this.props.user.user}/>
      </div>
    )
  }

  render() {
    console.log(this.props.user)
    return (

      <>
      {this.profileInfo}
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, null)(ProfileViewer)
