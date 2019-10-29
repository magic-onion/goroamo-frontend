import React from 'react'
import { connect } from 'react-redux'

function ProfileWidget(props) {
  console.log(props.user)
  return (
    <div>
    <img src={props.user.avatar}/>
    <p>First Name: {props.user.first_name}</p>
    <hr/>
    <p>Last Name: {props.user.last_name}</p>
    <p>E-mail: {props.user.email}</p>
    <p>Location: {props.user.location}</p>

    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user.user
  }
}

export default connect(mapStateToProps, null)(ProfileWidget)
