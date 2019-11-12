import React from 'react'
import Script from 'react-load-script'
import { connect } from 'react-redux'
import { updateProfile } from '../actions/user'

class ProfileEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      first_name: props.user.first_name,
      last_name: props.user.last_name,
      location: props.user.location,
      email: props.user.email,
      avatar: props.user.avatar,
      password: "",
      passwordVerify: "",
      uploaded: false,
      image: "",
      widget: null,
      error: "",


    }

    this.handleChange = this.handleChange.bind(this)
    this.handleCloud = this.handleCloud.bind(this)
    this.openWidget = this.openWidget.bind(this)
  }

  handleCloud() {
    let myWidget = window.cloudinary.createUploadWidget({
      cloudName: 'goroamo',
      uploadPreset: 'preset_test'}, (error, result) => {
        if (!error && result && result.event === "success") {
          console.log('Done! Here is the image info: ', result.info);
          //transform image here
          let urlThumbnail = `https://res.cloudinary.com/goroamo/image/upload/w_90,h_90,c_fill,g_face,r_max/${result.info.public_id}.jpeg`
          this.setState({...this.state, uploaded: true, avatar: urlThumbnail, image: result.info.url})
        }
      })
    this.setState({widget: myWidget})
  }

  openWidget() {
    this.state.widget.open()
  }

  handleChange(e) {
    this.setState({[e.target.id]: e.target.value})
  }

  editUser() {
    let userObj = {
      user: {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        location: this.state.location,
        email: this.state.email,
        avatar: this.state.avatar,
        password: this.state.password
      }
    }
    this.props.updateProfile(userObj, this.props.user.id)
  }

  get avatarButton() {
    if (this.state.uploaded) {
      return (
        <div>
          <img src={this.state.avatar} alt="profile"/>
          <button className="profile-editor-button" onClick={this.openWidget} id="upload_widget">Edit Profile Picture</button>
        </div>
      )

    }
    return <button className="profile-editor-button" onClick={this.openWidget} id="upload_widget">Edit Profile Picture</button>
  }

  get editForm() {
    return (
      <>
      <Script
        url="https://widget.cloudinary.com/v2.0/global/all.js"
        onLoad={this.handleCloud}
      />
      <div className="profile-editor">
        <span>First Name:</span>
        {this.avatarButton}
        <input className="profile-editor-input" type="text" id="first_name" onChange={e=>this.handleChange(e)} value={this.state.first_name}/>

        <span>Last Name:</span>
        <input className="profile-editor-input" type="text" id="last_name" onChange={e=>this.handleChange(e)} value={this.state.last_name}/>

        <span>E-mail:</span>
        <input className="profile-editor-input" type="text" id="email" onChange={e=>this.handleChange(e)} value={this.state.email}/>

        <span>Location:</span>
        <input className="profile-editor-input" type="text" id="location" onChange={e=>this.handleChange(e)} value={this.state.location}/>
        <p>New Password:</p>
        <span>Password</span>
        <input className="profile-editor-input" type="password" id="password" onChange={e=>this.handleChange(e)} value={this.state.password}/>

        <span>Confirm Password:</span>
        <input className="profile-editor-input" type="password" id="passwordVerify" onChange={e=>this.handleChange(e)} value={this.state.passwordVerify}/>

        <button className="profile-editor-button" onClick={e=>this.editUser(e)}>Save changes</button>
      </div>
      </>
    )
  }

  render() {
    return (
    <>
    {!!this.props.user.id ? this.editForm : null}
    </>
    )
  }
}

const mapStateToProps = state => {
  return {
    tours: state.tours
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateProfile: (obj, number) => dispatch(updateProfile(obj, number))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditor)


//first last username email avatar location email password passwordVerify
