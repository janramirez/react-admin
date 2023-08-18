import React, { Component, SyntheticEvent } from "react";
import Wrapper from "../Wrapper";
import axios from "axios";
import { Permission } from "../../classes/permission";
import { Navigate } from "react-router-dom";

export default class RoleCreate extends Component {
  state = {
    permissions: [],
    redirect: false,
  };

  selected: number[] = [];
  name = '';

  componentDidMount = async () => {
    const res = await axios.get("permissions");

    this.setState({
      permissions: res.data.data,
    });
  };

  check = (id: number) => {
    if(this.selected.filter(s => s === id).length > 0) {
        this.selected = this.selected.filter(s => s !== id);
        return;
    }
    this.selected.push(id);
  }

  submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.post('roles', {
        name: this.name,
        permisions: this.selected
    })

    this.setState({
        redirect: true
    })

    console.log(this.selected)
  }

  render() {

    if(this.state.redirect) {
        return <Navigate to={'/roles'} />
    }

    return (
      <Wrapper>
        <form onSubmit={this.submit}>
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">
              Name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                onChange={e => this.name = e.target.value}
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Permissions</label>
            <div className="col-sm-10">
              {this.state.permissions.map((p: Permission) => {
                return (
                  <div className="form-check form-check-inline col-3" key={p.id}>
                    <input type="checkbox" className="form-check-input" value={p.id} onChange={e => this.check(p.id)}/>
                    <label className="form-check-label">{p.name}</label>
                  </div>
                );
              })}
            </div>
          </div>

          <button className="btn btn-outline-secondary">Save</button>
        </form>
      </Wrapper>
    );
  }
}