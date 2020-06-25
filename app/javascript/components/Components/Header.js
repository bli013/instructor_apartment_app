import React from "react"


class Header extends React.Component {

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
        <div class="jumbotron">
          <h1 class="display-3">Apartment Management App</h1>
          <p class="lead">This is an app you can browse and manage apartment listings</p>
          {current_user &&
            <p>Welcome, { current_user.name }</p>
          }
        </div>

        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <div class="collapse navbar-collapse" >
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/apartmentindex">Apartments</a>
              </li>
              {!logged_in &&
                <li>
                  <a class="nav-link" href={sign_in_route}>Sign In</a>
                </li>}
              {!logged_in &&
                <li>
                  <a class="nav-link" href="/users/sign_up">Sign Up</a>
                </li>}
              {logged_in &&
                <li>
                  <a class="nav-link" href="/mylistings">My Listings</a>
                </li>}
              {logged_in &&
                <li>
                  <a class="nav-link" href="/newform">New Apartment</a>
                </li>}
              {logged_in &&
                <li>
                <a class="nav-link" href={edit_user_route}>Edit Your Account</a>
                </li>}
              {logged_in &&
                <li>
                  <a class="nav-link" href={sign_out_route}>Sign Out</a>
                </li>}
            </ul>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default Header