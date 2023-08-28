import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { User } from "../../classes/user";
import { Role } from "../../classes/role";

class Nav extends Component {

  state = {
    user: new User(0,'', '', '', new Role(), []),
    redirect: false
  }

  componentDidMount = async () => {
    const response = await axios.get('user');

    const userData: User = response.data.data;

    this.setState({
      user: userData
    })
  }

  handleClick = () => {
    localStorage.clear();

    this.setState({
      redirect: true
    })
  }

  render() {

    if(this.state.redirect){
      return <Navigate to={'/login'} />
    }

    return (
      <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#">
          Company Name
        </a>

        <ul className="my-2 my-md-0 mr-md-3">
            <Link to={'/profile'} className="p-2 text-white">
              {this.state.user.first_name} {this.state.user.last_name}
            </Link>
            <a className="p-2 text-white" href="#" onClick={this.handleClick}>
              Sign out
            </a>
        </ul>
      </nav>
    );
  }
}

export default Nav;
