import React from "react"
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Redirect } from "react-router-dom"


class NewApartment extends React.Component {
  constructor(props){
        super(props)
        this.state = {
          success: false,
          form:{
            street: '',
            city: '',
            state: '',
            zipcode:'',
            country:''
          }
        }
      }
 handleChange = (event) => {
        let { form } = this.state
        form[event.target.name] = event.target.value
        this.setState({ form: form })
      }

 handleSubmit = (event) => {
        event.preventDefault()
        this.props.handleSubmit(this.state.form)
        this.setState({ success: true })
      }

  render(){
    return(
      <>
        <Form>
            <FormGroup style={{width: "30rem", margin:"0.5rem 2rem"}}>
                <Label htmlFor="street" id="street">Street</Label>
                    <Input
                        type="string"
                        name="street"
                        onChange={ this.handleChange }
                        value={ this.state.form.street }
                    />
                <Label htmlFor="city" id="city">City</Label>
                        <Input
                            type="string"
                            name="city"
                            onChange={ this.handleChange }
                            value={ this.state.form.city }
                        />
                <Label htmlFor="state" id="state">State</Label>
                        <Input
                            type="string"
                            name="state"
                            onChange={ this.handleChange }
                            value={ this.state.form.state }
                        />
                <Label htmlFor="zipcode" id="country">Zip Code</Label>
                          <Input
                            type="string"
                            name="zipcode"
                            onChange={ this.handleChange }
                            value={ this.state.form.zipcode }
                        />
                <Label htmlFor="country" id="country">Country</Label>
                          <Input
                            type="string"
                            name="country"
                            onChange={ this.handleChange }
                            value={ this.state.form.country }
                        />
            </FormGroup>
            <button type="button" id="submit" class="btn btn-outline-primary"
              style={{margin:"1rem 8rem"}}
              onClick={ this.handleSubmit }>
              Create a New Apartment Profile
            </button>
              { this.state.success && <Redirect to="/apartmentindex"/> }
        </Form>
      </>
    )
  }



}

export default NewApartment