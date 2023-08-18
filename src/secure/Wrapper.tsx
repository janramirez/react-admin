import React, { Children, Component } from "react";
import Nav from "./components/Nav";
import Menu from "./components/Menu";
import axios from "axios";
import { Navigate } from "react-router-dom";

type Props = {
    children: React.ReactNode
}

class Wrapper extends Component<{ children: React.ReactNode }> {

    state = {
        redirect: false
    }

    componentDidMount = async () => { 
        try {
            const response = await axios.get('user');

        } catch (e) {
            console.log(e);
            this.setState({
                redirect: true
            });
        }
    }

  render() {
    if(this.state.redirect) {
        return <Navigate to={'/login'} />;
    }

    return (
      <>
        <Nav />

        <div className="container-fluid">
          <div className="row">
            <Menu />

            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                {this.props.children}
            </main>
          </div>
        </div>
      </>
    );
  }
}

export default Wrapper;
