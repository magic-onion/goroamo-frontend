import React from 'react'
import {Route} from 'react-router-dom'
import ViewSelectedTour from '../components/ViewSelectedTour'

class SelectedTour extends React.Component {

  get details() {
    return (
      <div className="list-view-single-tour">
        <div className="list-view-item">
          <span>Name:</span>
          <p><strong>{this.props.tour.name}</strong></p>
        </div>
        <div className="list-view-item">
          <span>Location:</span>
          <p><strong>{this.props.tour.location}</strong></p>
        </div>
        <div className="list-view-item">
          <span>Distance:</span>
          <p><strong>{this.props.tour.distance}</strong></p>
        </div>
        <div className="list-view-item">
          <span>No. of Locations:</span>
          <p><strong>{this.props.locations.length}</strong></p>
        </div>

      </div>
    )
  }

  render() {
    return (
      <>
        {this.details}
        <Route path='/tours/:id'
        render={(props) => <ViewSelectedTour {...props} />}
      />
      </>
    )
  }
}

export default SelectedTour
