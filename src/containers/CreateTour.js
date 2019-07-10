import React from 'react'
import SearchBar from '../SearchBar'
//this component will
//contain a search bar with autocomplete
//when an address is added, it displays a marker on map, and info about the place
//the marker should be numbered according to which location is set
//should prompt for a tour name and description
//component to make a post request to new Tour
//route to match
//route to create new location

class CreateTour extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      name: '',
      description: ''
    }

    this.handleAdd = this.handleAdd.bind(this)
  }
  handleAdd() {
    console.log(this.state)

    fetch('http://localhost:3000/api/v1/tours', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        tour: {
          name: this.state.name,
          address: this.state.address,
          user_id: 1
        }
      })
    })
    .then(r=>r.json())
    .then(console.log)
  }

  handleChange(e) {
    this.setState({[e.target.id]: e.target.value})

  }


  render() {
    return(
      <div>
        <h1>Create a Tour</h1>
        <input onChange={e=>this.handleChange(e)} id="name" type="text" placeholder="Tour Name"></input>
        <input onChange={e=>this.handleChange(e)} id="description" type="content" placeholder="Description"></input>
        <button onClick={this.handleAdd}>add tour</button>
      </div>
    )
  }
}

export default CreateTour
