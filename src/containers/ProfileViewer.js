import React from 'react'
import { connect } from 'react-redux'
import Loader from '../components/loader'
import ProfileWidget from '../components/ProfileWidget'
import ProfileEditor from '../components/ProfileEditor'

class ProfileViewer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      editing: false
    }

    this.toggleEditing = this.toggleEditing.bind(this)
  }

  toggleEditing(e) {
    let editState = !this.state.editing
    this.setState({editing: editState})
  }

  get profileInfo() {
    if (this.props.user.user.id === undefined) {
      return <Loader/>
    }
    else return (
      <div className="profile-viewer">
        <button onClick={e=>this.toggleEditing(e)}>{this.state.editing ? "go back" : "edit my profile"}</button>
        {this.state.editing ? <ProfileEditor user={this.props.user.user}/> : <ProfileWidget/>}
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
