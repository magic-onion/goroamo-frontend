import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './login'
import AddLocation from './addLocation'
import SearchBar from './SearchBar'
import CreateTour from './containers/CreateTour'

function App() {
  const addresses = []



  return (
    <div className="App">
      <Login/>
      <CreateTour/>
      <SearchBar addresses={addresses}/>

    </div>
  );
}

export default App;
