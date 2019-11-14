import React from 'react'
import { Link } from 'react-router-dom'

class NotFound extends React.Component{

  render() {
    return (
      <div className="not-found-container">
        <h2 className="not-found-headline">Not Found!</h2>
        <p className="not-found-message">Sorry, it looks like this page doesn't exist</p>
        <Link to="/profile">Visit Your Profile</Link>
        <br/>
        <Link to="/view-tours">or Check Out Some Tours!</Link>
      </div>
    )
  }
}

export default NotFound
