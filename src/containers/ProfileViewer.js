import React from 'react'
import { connect } from 'react-redux'
import Loader from '../components/loader'

class ProfileViewer extends React.Component {


  render() {
    console.log(this.props.user.user)
    return (
      <div className="profile-viewer">
        <p>hi {this.props.user.user ? this.props.user.user.username : null}</p>
      </div>

    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user
  }
}

export default connect(mapStateToProps, null)(ProfileViewer)
