import React from 'react'
import { connect } from 'react-redux'

class NewUser extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      location : "",
      password: "",
      passwordVerify: ""
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    })
  }


  render() {
    return(
      <div className="new-user">
        <input type="text" id="firstName" placeholder="first name"/>
        <input type="text" id="lastName" placeholder="last name"/>
        <input type="text" id="username" placeholder="username"/>
        <input type="text" id="email" placeholder="email"/>
        <input type="text" id="location" placeholder="location"/>
        <input type="text" id="password" placeholder="password"/>
        <input type="text" id="passwordVerify" placeholder="confirm password"/>
        <button>Get Started</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, null)(NewUser)
