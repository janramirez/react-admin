import React, { Component, SyntheticEvent } from 'react'
import Wrapper from '../Wrapper'
import axios from 'axios'
import { Role } from '../../classes/role'
import { Navigate } from 'react-router-dom'

export default class UserCreate extends Component {

    state = {
        roles: [],
        redirect: false
    }
    first_name = '';
    last_name = '';
    email = '';
    role_id = 0;

    componentDidMount = async () => {
        const response = await axios.get('roles');

        this.setState({
            roles: response.data.data
        });
    }

    submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.post('users', {
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            role_id: this.role_id,
        });

        this.setState({
            redirect: true
        });

    }

  render() {
    if(this.state.redirect) {
        return <Navigate to={'/users'}/>
    }

    return (
      <Wrapper>
        <form action="" onSubmit={this.submit}>
            <div className="form-group">
                <label htmlFor="first_name">First Name</label>
                <input type="text" name="first_name" className="form-control" onChange={e => this.first_name = e.target.value}/>
            </div>

            <div className="form-group">
                <label htmlFor="last_name">Last Name</label>
                <input type="text" name="last_name" className="form-control" onChange={e => this.last_name = e.target.value}/>
            </div>
            
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="text" name="email" className="form-control" onChange={e => this.email = e.target.value}/>
            </div>
            
            <div className="form-group">
                <label htmlFor="role_id">Role</label>
                <select name="role_id" className="form-control" onChange={e => this.role_id = parseInt(e.target.value)}>
                    <option value="">Select Role</option>
                    {this.state.roles.map(
                        (role: Role) => {
                            return (
                                <option key={role.id} value={role.id}>{role.name}</option>
                            )
                        }
                    )}
                </select>
            </div>

            <button className="btn btn-outline-secondary">Save</button>
        </form>
      </Wrapper>
    )
  }
}
