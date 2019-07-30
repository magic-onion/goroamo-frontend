import React from 'react';
import Script from 'react-load-script'
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from './login'
import AddLocation from './addLocation'
import SearchBar from './SearchBar'
import CreateTour from './containers/CreateTour'
import Dashboard from './containers/Dashboard'
import Home from './containers/Home'
import Sidebar from './containers/Sidebar'
import ToursContainer from './containers/ToursContainer'
import ViewTour from './containers/ViewTour'
import API_KEY from './environment'
const url = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`


class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      addresses: [],
      coords: []
    }
    this.handleScriptLoad = this.handleScriptLoad.bind(this)
    this.doSomething = this.doSomething.bind(this)
    this.getCoords = this.getCoords.bind(this)
  }

  handleScriptLoad() {
    console.log('scriptloaded');
    this.getCoords()
  }

  getCoords() {
    if (navigator.geolocation) {
      let coords = []
      navigator.geolocation.getCurrentPosition(function(position) {
        coords.push(position.coords.latitude);
        coords.push(position.coords.longitude);
      });
      console.log(coords)
      this.setState({coords: coords})
    }
  }

  doSomething(lat, lng) {
    this.setState({
      coords: [lat, lng]
    })
}
  render() {
    return (
      <Router>
      <Script
        url= { url }
        onLoad={this.handleScriptLoad}
      />
        <Sidebar/>
        <div className="container">
          <Login/>
          < Route path="/" exact component={Home} />
          < Route path="/create-tour/" component={CreateTour} />
          < Route path="/profile/" component={Dashboard} />
          < Route path="/analytics/" component={Home} />
          < Route path="/view-tours/"
            render={(props) => <ViewTour/>}
            />
        </div>
      </Router>
    );
  }
}

export default App;

//how to find tours in your area?

//shows a map with current location marked
//shows nearby tours
//get current location
//
