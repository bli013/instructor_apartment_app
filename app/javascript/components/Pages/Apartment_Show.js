import React from "react"

class ApartmentShow extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      apartment:[],
      user:[]
    }
    this.getApartment()
  }

  componentDidMount(){
    this.getApartment()
  }

  getApartment = () => {
    const { id } = this.props.match.params
    fetch(`http://localhost:3000/apartments/${id}`)
    .then((response)=>{
     if(response.status === 200){
       return(response.json())
     }
   })
   .then((apartmentInfo)=>{
     this.setState({
       apartment: apartmentInfo.apartment,
       user: apartmentInfo.user
     })
   })
 }
  render () {
    const { apartment, user } = this.state
    return (
      <React.Fragment>
        <div class="card border-primary mb-3" style={{width: "20rem", margin:"1rem 2rem"}}>
          <div class="card-header">Address</div>
          <div class="card-body">
            <h4 class="card-title">{ apartment.street }</h4>
            <p class="card-text">{ apartment.city }, { apartment.state }, { apartment.zipcode }</p>
            <p class="card-text">{ apartment.country }</p>
          </div>
        </div>

        <div class="card border-primary mb-3" style={{width: "20rem", margin:"1rem 2rem"}}>
          <div class="card-header">Manager</div>
          <div class="card-body">
            <h4 class="card-title">{ user.name }</h4>
            <p class="card-text">Phone Number: { user.phonenumber }</p>
            <p class="card-text">Hours to contact: { user.hours }</p>
          </div>
        </div>
        <button type="button" class="btn btn-outline-primary"
          style={{margin:"1rem 9.5rem"}}
          onClick={() => window.history.back()}>
          Back
        </button>


      </React.Fragment>
    );
  }
}

export default ApartmentShow