import React from 'react'
import {Route} from 'react-router-dom'
import ViewSelectedTour from '../components/ViewSelectedTour'

class SelectedTour extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: false,
      viewTour: false
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleViewTour = this.handleViewTour.bind(this)
  }

  handleClick() {
    let newSelected = !this.state.selected
    this.setState({selected: newSelected})
  }

  get listItem() {
    return (
      <p onClick={this.handleClick}>{this.props.tour.name}</p>
    )
  }

  get details() {
    return (
      <div className="list-view-tour">
        <p onClick={this.handleClick}>{this.props.tour.name}</p>
        <p>{this.props.tour.distance}</p>
        <p>locations: {this.props.locations.length}</p>

      </div>
    )
  }

  get condition() {
    if (!this.state.ViewTour) {
      return this.state.selected ? this.details : this.listItem
    }
    return <ViewSelectedTour />
  }

  handleViewTour() {
    let newViewTour = !this.state.viewTour
    this.setState({ViewTour: newViewTour})
  }

  render() {
    console.log(this.props.tour)
    return (
      <div>
      {this.condition}
      <Route path='/tours/:id'
      render={(props) => <ViewSelectedTour {...props} />}
      />
      </div>
    )
  }
}

export default SelectedTour
