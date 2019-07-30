import React from 'react'

class ViewTour extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      mapViewSelected: true
    }
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
   console.log(this.state.mapViewSelected)
   return (
     <div>
      <span onClick={e=>this.handleSelect(e)} className={this.state.mapViewSelected ? "active" : "inactive"} id="map-view" >Map View</span>
      <span onClick={e=>this.handleSelect(e)} className={this.state.mapViewSelected ? "inactive" : "active"} id="list-view">List View</span>
     </div>
   )
 }
}

export default ViewTour
