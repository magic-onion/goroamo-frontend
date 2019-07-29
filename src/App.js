import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Login from './login'
import AddLocation from './addLocation'
import SearchBar from './SearchBar'
import CreateTour from './containers/CreateTour'
import Dashboard from './containers/Dashboard'
import Home from './containers/Home'
import Sidebar from './containers/Sidebar'
import ToursContainer from './containers/ToursContainer'

function App() {
  const addresses = []
  let coords = []

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
    do_something(position.coords.latitude, position.coords.longitude);
  });
}

function do_something(lat, lng) {
  coords.push(lat, lng)
  console.log(coords)
}

  return (
    <Router>
    <Sidebar/>
      <div className="container">
        <Login/>
        <ToursContainer coords={coords} />
        <Route path="/" exact component={Home} />
        <Route path="/create-tour/" component={CreateTour} />
        <Route path="/profile/" component={Dashboard} />
        <Route path="/analytics/" component={Home} />
        <Route path="/view-tours/" component={ToursContainer} coords={coords}/>

      </div>
    </Router>
  );
}

export default App;

//how to find tours in your area?

//shows a map with current location marked
//shows nearby tours
//get current location
//
