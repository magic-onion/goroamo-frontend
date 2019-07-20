import React from 'react'

function CurrentTours(props) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Tour</th>
            <th>Date Created</th>
            <th>Locations</th>
            <th>Duration</th>
            <th>distance</th>
            <th>User Completions</th>
            <th>Edit Tour</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>January</td>
            <td>$100</td>
          </tr>
          <tr>
            <td>February</td>
            <td>$80</td>
          </tr>
        </tbody>

<tfoot>
  <tr>
    <td>Sum</td>
    <td>$180</td>
  </tr>
</tfoot>
</table>
    </div>

  )
}

export default CurrentTours
