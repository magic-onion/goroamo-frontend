import React from 'react';
import Script from 'react-load-script'
import './App.css';
import { Route } from "react-router-dom";
import Login from './login'
import CreateTour from './containers/CreateTour'
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

  componentDidMount() {
    console.log('hi')
    let config = {
      method: 'get',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
    fetch('http://localhost:3000/api/v1/profile', config)
    .then(r=>r.json())
    .then(p => {
      this.setState({userId: p.user.id})
    })

  }
  render() {
    return (
      <div>
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
          < Route path="/tours/:id" component={ViewSelectedTour} />
          < Route path="/view-tours/"
            render={(props) => <ViewTour {...props} coords={this.state.coords} />}
            />

        </div>
      </div>
    );
  }
}

export default App;

//how to find tours in your area?

//shows a map with current location marked
//shows nearby tours
//get current location
//
