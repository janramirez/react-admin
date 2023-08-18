import React, { Component } from "react";
import Wrapper from "../Wrapper";
import axios from "axios";
import { User } from "../../classes/user";
import { Link } from "react-router-dom";
import Paginator from "../components/Paginator";

class Users extends Component {
  state = {
    users: [],
  };

  page = 1;
  last_page = 0;

  componentDidMount = async () => {
    const response = await axios.get(`users?page=${this.page}`);

    this.setState({
      users: response.data.data,
    });

    this.last_page = response.data.meta.last_page;
  };

  delete = async (id: number) => {
    if(window.confirm('Are you sure you want to delete this user?')) {
      await axios.delete(`users/${id}`);

      this.setState({
        users: this.state.users.filter((u: User) => u.id !== id)
      })
    }
  }

  handlePageChange = async (page: number) => {
    this.page = page;

    await this.componentDidMount();
  }

  render() {
    return (
      <Wrapper>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <div className="btn-toolbar mb-2 mb-md-0">
            <Link
              to={"/users/create"}
              className="btn btn-sm btn-outline-secondary"
            >
              Add
            </Link>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map((user: User) => {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>
                      {user.first_name} {user.last_name}
                    </td>
                    <td>{user.email}</td>
                    <td>{user.role.name}</td>
                    <td>
                      <div className="btn-group mr-2">
                        <Link
                        to={`/users/${user.id}/edit`}
                          className="btn btn-sm btn-outline-secondary"
                        >
                          Edit
                        </Link>
                        <a
                          href="#"
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => this.delete(user.id)}
                        >
                          Delete
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <Paginator lastPage={this.last_page} handlePageChange={this.handlePageChange} />
      </Wrapper>
    );
  }
}

export default Users;
