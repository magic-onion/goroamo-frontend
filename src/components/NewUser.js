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
    return(
        <form className="new-user">
        <img className="new-user-logo" src={require('../assets/logo-side.png')} alt="GoRoamo-logo"></img>
        <p className="new-user-welcome">Welcome! Please provide some information to begin</p>

          <input className="new-user-input" type="text" id="firstName" placeholder="First Name" onChange={e=>this.handleChange(e)}/>
          <input className="new-user-input" type="text" id="lastName" placeholder="Last Name" onChange={e=>this.handleChange(e)}/>
        

          <input className="new-user-input" type="text" id="username" placeholder="Username" onChange={e=>this.handleChange(e)}/>
          <input className="new-user-input" type="text" id="email" placeholder="E-mail" onChange={e=>this.handleChange(e)}/>
        
          <input className="new-user-input" type="text" id="location" placeholder="Location" onChange={e=>this.handleChange(e)}/>

          <input className="new-user-input" type="password" id="password" placeholder="Password" onChange={e=>this.handleChange(e)}/>
          <input className="new-user-input" type="password" id="passwordVerify" placeholder="Confirm Password" onChange={e=>this.handleChange(e)}/>
        
          <button onClick={this.handleSubmit}>Get Started</button>
          {this.state.error ? <p>{this.state.errorMsg}</p> :  false}
        </form>
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
