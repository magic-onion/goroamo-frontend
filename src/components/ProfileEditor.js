import React from 'react'
import Script from 'react-load-script'

class ProfileEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState([e.target.id]: e.target.value)
  }


  render() {
    return (
      <div>
      </div>
    )
  }
}


//first last username email avatar location email password passwordVerify
