import React from "react"
// import 'bootswatch/dist/united/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Header from "./Components/Header"
import MyListings from "./Pages/My_Listings"
import ApartmentIndex from "./Pages/Apartment_Index"
import ApartmentShow from "./Pages/Apartment_Show"
import NewApartment from "./Pages/New_Apartment"
import Home from "./Pages/Home"




class App extends React.Component {
  constructor(){
    super()
    this.state = {
      apartments: [],
      myApartments:[]
        }
    this.getApartments()
      }

    componentDidMount(){
      this.getApartments()
    }

    getApartments = () => {
     fetch("http://localhost:3000/apartments")
     .then((response)=>{
       if(response.status === 200){
         return(response.json())
       }
     })
     .then((apartmentsArray)=>{
       this.setState({
         apartments: apartmentsArray.apartments,
         myApartments: apartmentsArray.myApartments
        })
     })
   }

   createApartment = (newApartment) => {
    return fetch("http://localhost:3000/apartments", {
    	body: JSON.stringify(newApartment),
    	headers: {
    		"Content-Type": "application/json"
    	},
    	method: "POST"
    })
    .then((response) => {
      if(response.ok){
        return this.getApartments()
      }
    })
  }

  render () {
    const {
      logged_in,
      sign_in_route,
      sign_out_route,
      edit_user_route,
      current_user
    } = this.props

    return (
      <React.Fragment>
      <Header
        logged_in = { logged_in }
        sign_in_route = { sign_in_route }
        sign_out_route = { sign_out_route }
        edit_user_route = { edit_user_route }
        current_user = { current_user }
        myListings = { this.state.myApartments }
      />
      <Router>
        <Switch>

          <Route
            exact path="/newform/"
            render={ (props) => <NewApartment
              handleSubmit={ this.createApartment }
            /> }/>
          <Route
            exact path="/apartmentindex/:id"
            render={ (props) => <ApartmentShow {...props}
            /> } />
          <Route
            exact path="/apartmentindex/"
            render={ (props) => <ApartmentIndex
              apartments={ this.state.apartments }
              /> } />
          <Route
            exact path="/mylistings/"
            render={ (props) => <MyListings
              apartments={ this.state.myApartments }
              getApartments={ this.getApartments }
              /> } />
          <Route
            exact path="/" exact component={ Home } />
        </Switch>
      </Router>
      </React.Fragment>
    );
  }
}

export default App