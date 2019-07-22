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

function App() {
  const addresses = []



  return (
    <Router>
    <Sidebar/>
      <div className="container">
        <Login/>

        <Route path="/" exact component={Home} />
        <Route path="/create-tour/" component={CreateTour} />
        <Route path="/profile/" component={Dashboard} />
        <Route path="/analytics/" component={Home} />

      </div>
    </Router>
  );
}

export default App;


// <SearchBar addresses={addresses}/>
// <CreateTour addresses={["hello"]}/>
// <Home/>
