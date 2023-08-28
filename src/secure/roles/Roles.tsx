import React, { Component } from "react";
import Wrapper from "../Wrapper";
import axios from "axios";
import { Role } from "../../classes/role";
import { Link } from "react-router-dom";
import Deleter from "../components/Deleter";
import { connect } from "react-redux";
import { User } from "../../classes/user";

class Roles extends Component<{ user: User }> {
  state = {
    roles: [],
  };

  componentDidMount = async () => {
    const res = await axios.get("roles");

    this.setState({
      roles: res.data.data,
    });
  };

  handleDelete = async (id: number) => {
    this.setState({
      roles: this.state.roles.filter((r: Role) => r.id !== id),
    });
  };

  actions = (id: number) => {
    if (this.props.user.canEdit("roles")) {
        return (
            <div className="btn-group mr-2">
                <Link
                    to={`/roles/${id}/edit`}
                    className="btn btn-sm btn-outline-secondary"
                >
                    Edit
                </Link>
                <Deleter
                    id={id}
                    endpoint={"roles"}
                    handleDeleter={this.handleDelete}
                />
            </div>
        );
    }
};

  render() {
    let addButton = null;

    if (this.props.user.canEdit("roles")) {
        addButton = (
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <div className="btn-toolbar mb-2 mb-md-0">
            <Link
              to={"/roles/create"}
              className="btn btn-sm btn-outline-secondary"
            >
              Add
            </Link>
          </div>
        </div>
        );
    }

    return (
      <Wrapper>

        {addButton}

        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.roles.map((role: Role) => {
                return (
                  <tr key={role.id}>
                    <td>{role.id}</td>
                    <td>{role.name}</td>
                    <td>{this.actions(role.id)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Wrapper>
    );
  }
}

// @ts-ignore
export default connect(state => ({ user: state.user }))(Roles);
