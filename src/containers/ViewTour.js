import React from 'react'
import ToursContainer from './ToursContainer'
import ListView from './ListView'

class ViewTour extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      mapViewSelected: true,
      tours: {}
    }
 }

 componentDidMount() {
   let config = {
     headers: {
       'content-type': 'application/json',
       'Authorization': `Bearer ${localStorage.getItem('token')}`
     }
   }
   fetch('http://localhost:3000/api/v1/tours', config)
   .then(r=>r.json())
   .then(p => {
     this.setState({tours: p})
     console.log(p)
   })
 }

 handleSelect(e) {
   if (this.state.mapViewSelected && e.target.id === "list-view") {
     this.setState({mapViewSelected: false})
   }
   if (!this.state.mapViewSelected && e.target.id === "map-view") {
     this.setState({mapViewSelected: true})
   }
 }

 render() {
   console.log(this.props)
   return (
     <div>
      <span onClick={e=>this.handleSelect(e)} className={this.state.mapViewSelected ? "active-1" : "inactive-1"} id="map-view" >Map View</span>
      <span onClick={e=>this.handleSelect(e)} className={this.state.mapViewSelected ? "inactive-1" : "active-1"} id="list-view">List View</span>
      {this.state.mapViewSelected ? <ToursContainer {...this.props} coords={this.props.coords} /> : <ListView tours={this.state.tours}/> }
     </div>
   )
 }
}

export default ViewTour
