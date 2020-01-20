import React from 'react'
import { connect } from 'react-redux'

function ProfileWidget(props) {
  return (
    <div className="profile-details">
      <img src={props.user.avatar} alt="profile"/>
      <p>First Name: {props.user.first_name}</p>
      <hr className="profile-viewer-line"/>

      <p>Last Name: {props.user.last_name}</p>
      <hr className="profile-viewer-line"/>

      <p>E-mail: {props.user.email}</p>
      <hr className="profile-viewer-line"/>

      <p>Hometown: {props.user.location}</p>

    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user.user
  }
}

export default connect(mapStateToProps, null)(ProfileWidget)
