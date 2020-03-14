
import React from 'react';
import Script from 'react-load-script'
import './App.css';
import './styles/sidebar.css'
import './styles/create.css'
import './styles/viewtours.css'
import './styles/login.css'
import './styles/topbar.css'
import './styles/dashboard.css'
import './styles/edit.css'
import './styles/profile.css'
import './styles/loader.css'
import './styles/maps.css'
import './styles/takingtour.css'
import './styles/newuser.css'
import './styles/notfound.css'
import './styles/about.css'
import { connect } from 'react-redux'
import { getProfile, sendUserLocation } from './actions/user'
// import { makeMap } from './actions/tours'
// import Dashboard from './containers/Dashboard'
import NotFound from './components/NotFound'
import About from './components/About'
import { Route, Switch } from "react-router-dom";
import Login from './login'
import TopBar from './containers/TopBar'
import CreateTour2 from './containers/CreateTour2'
import ProfileViewer from './containers/ProfileViewer'
import Home from './containers/Home'
import Sidebar from './containers/Sidebar'
import ViewTour from './containers/ViewTour'
import ViewSelectedTour from './components/ViewSelectedTour'
import EditTourContainer from './containers/edittour'
import TouristSidebar from './containers/TouristSidebar'
import API_KEY from './environment'
const url = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`

require('dotenv').config()

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      addresses: [],
      coords: [],
      userId: 0
    }
    this.handleScriptLoad = this.handleScriptLoad.bind(this)
  }

  handleScriptLoad() {
    this.props.sendUserLocation()
  }

  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.props.getProfile()
    }
    this.props.sendUserLocation()
  }

  get loggedIn() {
    if (localStorage.getItem('token') && this.props.user.user.status === "guide") {
      return (
        <div className="app-container">
          <TopBar/>
          <div className="sidebar-and-app-layout">
            <Sidebar/>
            <div className="container">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/create-tour/" component={CreateTour2} />
              <Route path="/profile/" component={ProfileViewer} />
              <Route path="/analytics/" component={Home} />
              <Route path="/tours/:id" component={ViewSelectedTour} />
              <Route path="/edit/:id" component={EditTourContainer}/>
              <Route path="/about/" component={About}/>

              <Route path="/view-tours/"
                render={(props) => <ViewTour {...props} coords={this.state.coords} />}
              />
              <Route component={NotFound} />
            </Switch>
          </div>
          </div>
        </div>
      )
    }
    if (localStorage.getItem('token') && this.props.user.user.status === "tourist") {
      return (
        <div className="app-container">
          <TopBar/>
          <div className="sidebar-and-app-layout">
            <TouristSidebar/>
            <div className="container">
            <Switch>
              <Route path="/" exact component={ProfileViewer} />
              <Route path="/profile/" component={ProfileViewer} />
              <Route path="/about/" component={About}/>
              <Route path="/tours/:id" component={ViewSelectedTour} />
              <Route path="/view-tours/"
                render={(props) => <ViewTour {...props} coords={this.state.coords} />}
              />
              <Route component={NotFound} />
            </Switch>
          </div>
          </div>
        </div>
      )
    }
    else {
      return (
        <>
        <Switch>
          <Login/>
          <Route component={NotFound} />
          </Switch>
        </>
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
