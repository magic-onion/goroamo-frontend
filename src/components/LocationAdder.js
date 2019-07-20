import React, {useState} from 'react'
import SearchBar from '../SearchBar'

function LocationAdder(props) {

  const [locationCount, setLocations] = useState(0)

  function incrementLocations(e) {
    setLocations(locationCount => locationCount +1)
  }


  return (
    <div className="location-adder">

      <div>
      <span>fun facts</span>
        <input className="drag-drop" type="file" placeholder="upload file"/>
        <SearchBar addresses={props.addresses}/>
        <input type="text"/>
        <input type="text"/>
        <input type="text"/>
      </div>
      <textarea rows="10" cols="30" defaultValue="description"></textarea>

    </div>
  )

}

export default LocationAdder
