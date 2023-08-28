import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { User } from "../../classes/user";
import { Role } from "../../classes/role";
import { connect } from "react-redux";
import axios from "axios";

class Nav extends Component<{ user: User }> {

  state = {
    redirect: false
  }

  handleClick = async () => {
    // localStorage.clear();
    await axios.post('logout', {});

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
              {this.props.user.name}
            </Link>
            <a className="p-2 text-white" href="#" onClick={this.handleClick}>
              Sign out
            </a>
        </ul>
      </nav>
    );
  }
}
// @ts-ignore
export default connect(state => ({ user: state.user }))(Nav);
