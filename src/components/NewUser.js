import React from 'react'
import { connect } from 'react-redux'
import { newUser } from '../actions/user'

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
      passwordVerify: "",
      error: false,
      errorMSg: ""
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit() {
    if (this.state.password === this.state.passwordVerify) {
      this.setState({error: false, errorMsg: ""})
      let userObj = {
        user: {
          first_name: this.state.firstName,
          last_name: this.state.lastName,
          avatar: "https://res.cloudinary.com/goroamo/image/upload/c_limit,h_90,w_90/v1571943153/profile-icon_zgy1da.png",
          status: "tourist",
          username: this.state.username,
          email: this.state.email,
          location: this.state.location,
          password: this.state.password
        }
      }
    this.props.newUser(userObj)

    }

    else this.setState({error: true, errorMsg: "Passwords must match"})

  }
//validation

  render() {
    console.log(this.props)
    return(
      <div className="new-user">
        <input type="text" id="firstName" placeholder="first name" onChange={e=>this.handleChange(e)}/>
        <input type="text" id="lastName" placeholder="last name" onChange={e=>this.handleChange(e)}/>
        <input type="text" id="username" placeholder="username" onChange={e=>this.handleChange(e)}/>
        <input type="text" id="email" placeholder="email" onChange={e=>this.handleChange(e)}/>
        <input type="text" id="location" placeholder="location" onChange={e=>this.handleChange(e)}/>
        <input type="text" id="password" placeholder="password" onChange={e=>this.handleChange(e)}/>
        <input type="text" id="passwordVerify" placeholder="confirm password" onChange={e=>this.handleChange(e)}/>
        <button onClick={this.handleSubmit}>Get Started</button>
        {this.state.error ? <p>{this.state.errorMsg}</p> :  false}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    newUser: (obj) => dispatch(newUser(obj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewUser)
