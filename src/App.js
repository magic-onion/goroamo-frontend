import React from 'react';
import Script from 'react-load-script'
import './App.css';
import './styles/sidebar.css'
import { connect } from 'react-redux'
import { getProfile, sendUserLocation } from './actions/user'
// import { makeMap } from './actions/tours'
import { Route } from "react-router-dom";
import Login from './login'
import CreateTour2 from './containers/CreateTour2'
import Dashboard from './containers/Dashboard'
import Home from './containers/Home'
import Sidebar from './containers/Sidebar'
import ViewTour from './containers/ViewTour'
import ViewSelectedTour from './components/ViewSelectedTour'
import API_KEY from './environment'
const url = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      addresses: [],
      coords: [],
      userId: 0
    }
    this.handleScriptLoad = this.handleScriptLoad.bind(this)
    this.getCoords = this.getCoords.bind(this)
  }

  handleScriptLoad() {
    this.props.sendUserLocation()
    // this.props.makeMap()
  }

  getCoords() {
    if (navigator.geolocation) {
      let coords = []
      navigator.geolocation.getCurrentPosition(function(position) {
        coords.push(position.coords.latitude);
        coords.push(position.coords.longitude);
      });
      this.setState({coords: coords})
    }
  }


  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.props.getProfile()
    }
  }

  get loggedIn() {
    if (localStorage.getItem('token')) {
      return (
        <>
        <Sidebar/>
        <div className="container">
          < Route path="/" exact component={Home} />
          < Route path="/create-tour/" component={CreateTour2} />
          < Route path="/profile/" component={Dashboard} />
          < Route path="/analytics/" component={Home} />
          < Route path="/tours/:id" component={ViewSelectedTour} />
          < Route path="/view-tours/"
            render={(props) => <ViewTour {...props} coords={this.state.coords} />}
            />

        </div>
        </>
      )
    }
    else {
      return (
        <div className="login-container">
          <Login/>
        </div>
      )
    }
  }
  render() {
    return (
      <>
      <Script
      url= { url }
      onLoad={this.handleScriptLoad}
      />
      {this.loggedIn}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    tours: state.tours,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProfile: () => dispatch(getProfile()),
    sendUserLocation: () => dispatch(sendUserLocation())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
