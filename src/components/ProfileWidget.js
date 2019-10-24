import React from 'react'
import { connect } from 'react-redux'

function ProfileWidget(props) {
  console.log(props.user)
  return (
    <div>
    <img src={props.user.avatar}/>
    <p>First Name: {props.user.first_name}</p>
    <p>Last Name: {props.user.last_name}</p>

    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user.user
  }
}

export default connect(mapStateToProps, null)(ProfileWidget)
