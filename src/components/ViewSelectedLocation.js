import React from 'react'

class ViewSelectedLocation extends React.Component {
  constructor(props) {
    super(props)

    this.state= {
      counter: 0
    }

    this.back = this.back.bind(this)
    this.next = this.next.bind(this)

  }

  get display() {
    if (this.state.counter === 0) {
      return (
        <>
        <p>{this.props.location.name}</p>
        {this.props.location.image.length ? <img className="tour-location-image" alt={this.props.location.image} src={this.props.location.image}/> : null }
        </>
      )


    }
    if (this.state.counter === 1) {
      return <p className="fun-fact">{this.props.location.funfact1}</p>
    }
    if (this.state.counter === 2) {
      return <p className="fun-fact">{this.props.location.funfact2}</p>
    }
    if (this.state.counter === 3) {
      return <p className="fun-fact">{this.props.location.funfact3}</p>
    }
    if (this.state.counter === 4) {
      return <p className="fun-fact">{this.props.location.description}</p>
    }
    return null
  }

  back() {
    if (this.state.counter === 0) {
      return
    }
    let newCounter = this.state.counter - 1
    this.setState({counter: newCounter})
  }

  next() {
    if (this.state.counter === 4) {
      return
    }
    let newCounter = this.state.counter + 1
    this.setState({counter: newCounter})

  }

  render() {
    console.log(this.state.counter)
    return (
      <div className="tour-location-detail">
        <span className="back-fact-button" onClick={this.back}>back</span>
        <span className="next-fact-button" onClick={this.next}>next</span>
        {this.display}
      </div>
    )
  }
}

export default ViewSelectedLocation
