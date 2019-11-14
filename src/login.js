import React from 'react'
import { connect } from 'react-redux'
import { createNewUser, userLogin } from './actions/user'
import NewUser from './components/NewUser'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      newUser: false,
      error: ""
    }


    this.handleChange = this.handleChange.bind(this)
    this.loginUser = this.loginUser.bind(this)
    this.renderUserCreator = this.renderUserCreator.bind(this)
    this.cheating = this.cheating.bind(this)
  }

  cheating(e) {
    this.props.createNewUser(this.state.username, this.state.password)
  }

  handleChange(e) {
    this.setState({[e.target.id]: e.target.value})
  }

  loginUser(e) {
    if (this.state.username.length === 0 || this.state.password.length === 0) {
      e.preventDefault()
      this.setState({error: "you must enter a valid username and password", username: "", password: ""})
    }
    else {
      e.preventDefault()
      this.props.userLogin(this.state.username, this.state.password)
    }
  }

  renderUserCreator(e) {
    this.setState({newUser: true})
  }

  renderLogin() {
    this.setState({newUser: false})
  }

  get errorMessage() {
    if (this.state.error.length > 0 ) {
      return (
        <div className="login-error">
          <p>{this.state.error}</p>
        </div>
      )
    }
  }


  get loginForm() {
    return (
      <div className="login-container">
        <form className="login-form">

          <img className="login-logo" src={require('./assets/logo-side.png')} alt="GoRoamo-logo"></img>
          {this.errorMessage}
          <input
            className="login-input"
            value={this.state.username}
            onChange={e => this.handleChange(e)}
            placeholder="Username"
            type="text"
            id="username"
          />
          <input
            className="login-input"
            value={this.state.password}
            onChange={e => this.handleChange(e)}
            placeholder="Password"
            type="password"
            id="password"
          />
          <button className="login-button" onClick={e => this.loginUser(e)}> Login </button>
          <button onClick={e=>this.cheating(e)}>cheating</button>
          <button className="create-user-button" onClick={e=> this.renderUserCreator(e)}> Create New Account </button>

        </form>
      </div>
    )
  }


  render() {
    return(
      <div className="app-container">
      {this.state.newUser ? <NewUser renderLogin={this.renderLogin}/> : this.loginForm}
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
    createNewUser: (username, password) => dispatch(createNewUser(username, password)),
    userLogin: (username, password) => dispatch(userLogin(username, password))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);
