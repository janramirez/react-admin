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

    async componentDidMount() { // ----> [/] This one works
    // componentDidMount = async () => { // ----> [X] This one has a bug
        try {
            const response = await axios.get('user',{
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response);

        } catch (e) {
            console.log(e);
            this.setState({
                redirect: true
            });
        }
        // try{
        //     const response = await axios.get('user', {headers: {'Content-Type':'application/json'}});
    
        //     console.log(response);
        // }catch (e) {
        //     console.log(e);
        //     this.setState({
        //         redirect: true
        //     });
        // }
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
