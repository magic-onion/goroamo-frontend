import React from 'react'
import Script from 'react-load-script'
import { connect } from 'react-redux'

class ProfileEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      first_name: props.user.first_name,
      last_name: props.user.last_name,
      locattion: props.user.location,
      email: props.user.email,
      avatar: props.user.avatar,
      password: "",
      passwordVerify: ""

    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({[e.target.id]: e.target.value})
  }

  get editForm() {
    return (
      <div className="profile-editor">
        <input type="text" id="first_name" onChange={e=>this.handleChange(e)} value={this.state.first_name}/>
        <input type="text" id="last_name" onChange={e=>this.handleChange(e)} value={this.state.last_name}/>
        <input type="text" id="email" onChange={e=>this.handleChange(e)} value={this.state.email}/>
        <input type="text" id="location" onChange={e=>this.handleChange(e)} value={this.state.location}/>
        <p>New Password</p>
        <input type="text" id="password" onChange={e=>this.handleChange(e)} value={this.state.pasword}/>
        <input type="text" id="passwordVerify" onChange={e=>this.handleChange(e)} value={this.state.passwordVerify}/>
      </div>
    )
  }

  render() {
    console.log(!!this.props.user.id)
    return (
    <>
    {!!this.props.user.id ? this.editForm : null}
    </>
    )
  }
}

// const mapStateToProps = state => {
//   return {
//     user: state.user.user
//   }
// }

export default ProfileEditor


//first last username email avatar location email password passwordVerify
