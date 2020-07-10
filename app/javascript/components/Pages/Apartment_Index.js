import React from "react"


class ApartmentIndex extends React.Component {
  render () {
    return (
      <React.Fragment>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Street</th>
              <th scope="col">City</th>
              <th scope="col">State</th>
              <th scope="col">Zip Code</th>
              <th scope="col">Country</th>
            </tr>
          </thead>
          <tbody>
        { this.props.apartments.map((apartment, index) => {
        console.log("LOOK", apartment);
        
        return(
          <tr key={ index }>
            <th scope="row"><a href = {`/apartmentindex/${apartment.id}`}>{ apartment.street }</a></th>
            <td>{ apartment.city }</td>
            <td>{ apartment.state }</td>
            <td>{ apartment.zipcode }</td>
            <td>{ apartment.country }</td>
          </tr>
          )
        })}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default ApartmentIndex