import React from "react"
import { Redirect } from "react-router-dom"


class MyListings extends React.Component {
  constructor(props){
    super(props)
    this.state={
      success: false,
      editable: null
    }
  }

  handleDelete = (id) => {
  fetch(`http://localhost:3000/apartments/${id}`, {
    method: 'DELETE',
     headers: {
       'Content-Type': 'application/json'
       }
     }
   ).then((response) => {
     if(response.ok){
       alert("this profile is deleted")
       this.setState({ success: true })
       return this.props.getApartments()
     }
   })
  }

  handleEdit = (id) => {
    if(this.state.editable == id){
      this.setState({ editable: null })
      let street = this.street.value
      let city = this.city.value
      let state = this.states.value
      let zipcode = this.zipcode.value
      let country = this.country.value
      let apartment = { street: street, city: city, state: state, zipcode: zipcode, country: country}
      this.handleUpdate(apartment, id)
    }else{
   this.setState({
     editable: id
   })}
 }

  handleUpdate = (apartment, id) => {
    fetch(`http://localhost:3000/apartments/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify({apartment: apartment}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
        this.setState({ success: true })
        return this.props.getApartments()
      })
  }



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
        return(
          <tr key={ index }>
            {(this.state.editable == `${ apartment.id }`)?
              <th scope="row">
              <input type='text'
                ref={input => this.street = input}
                defaultValue={ apartment.street }/>
              </th>:
              <th scope="row">
                <a href = {`/apartmentindex/${apartment.id}`}>{ apartment.street }</a>
              </th>}
            {(this.state.editable == `${ apartment.id }`)?
              <td><input type='text'
                ref={input => this.city = input}
                defaultValue={ apartment.city }/></td>:
              <td>{ apartment.city }</td>}
            {(this.state.editable == `${ apartment.id }`)?
              <td><input type='text'
                ref={input => this.states = input}
                defaultValue={ apartment.state }/></td>:
              <td>{ apartment.state }</td>}
            {(this.state.editable == `${ apartment.id }`)?
              <td><input type='text'
                ref={input => this.zipcode = input}
                defaultValue={ apartment.zipcode }/></td>:
              <td>{ apartment.zipcode }</td>}
            {(this.state.editable == `${ apartment.id }`)?
              <td><input type='text'
                ref={input => this.country = input}
                defaultValue={ apartment.country }/></td>:
              <td>{ apartment.country }</td>}
            <td>
            <button type="button" class="btn btn-danger btn-sm"
              onClick={() => this.handleDelete(`${ apartment.id }`)}
              style={{margin:"0 0.5em"}}>
              Delete</button>
            <button type="button" class="btn btn-info btn-sm"
              onClick={() => this.handleEdit(`${ apartment.id }`)}
              style={{margin:"0 0.5em"}}>
              {(this.state.editable == `${ apartment.id }`)? 'Submit' : 'Edit'}</button>
            </td>
          </tr>
          )
        })}
          </tbody>
        </table>
        { this.state.success && <Redirect to="/mylistings"/> }
      </React.Fragment>
    );
  }
}

export default MyListings