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
      newUser: false
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
    e.preventDefault()
    this.props.userLogin(this.state.username, this.state.password)
  }

  renderUserCreator(e) {
    this.setState({newUser: true})
  }



  get loginForm() {
    return (
      <div className="login-container">

      <form className="login-form">
      <img className="login-logo" src={require('./assets/logo-side.png')} alt="GoRoamo-logo"></img>
      <input
      className="login-input"
      value={this.state.username}
      onChange={e => this.handleChange(e)}
      placeholder="username"
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
      <>
      {this.state.newUser ? <NewUser/> : this.loginForm}
      </>
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
