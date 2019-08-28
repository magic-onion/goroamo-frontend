import React from 'react'
import { connect } from 'react-redux'
import ToursContainer from './ToursContainer'
import ListView from './ListView'

class ViewTour extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      mapViewSelected: false
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
   console.log(this.props.tours.tours)
   return (
     <>
      <div className="list-and-map-view-selector">
        <span onClick={e=>this.handleSelect(e)} className={this.state.mapViewSelected ? "active-1" : "inactive-1"} id="map-view" >Map View</span>
        <span onClick={e=>this.handleSelect(e)} className={this.state.mapViewSelected ? "inactive-1" : "active-1"} id="list-view">List View</span>
      </div>
      {this.state.mapViewSelected ? <ToursContainer {...this.props} coords={this.props.coords} tours={this.props.tours.tours} /> : <ListView tours={this.props.tours.tours}/> }
     </>
   )
 }
}

const mapStateToProps = state => {
  return {
    tours: state.tours
  }
}

export default connect(mapStateToProps, null)(ViewTour)
