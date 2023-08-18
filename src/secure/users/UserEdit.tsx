import React, { Component, PropsWithRef, SyntheticEvent } from 'react'
import Wrapper from '../Wrapper'
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Role } from '../../classes/role';
import { User } from '../../classes/user';

export function withRouter(Children: any){
    return(props: any)=>{
        const match = {params: useParams()};
        return <Children {...props} match= {match}/>
    }
}

class UserEdit extends React.Component<PropsWithRef<any>> {
    state = {
        roles: [],
        id: 0,
        first_name: '',
        last_name: '',
        email: '',
        role_id: 0,
        redirect: false,
    }
    id = 0;
    first_name = '';
    last_name = '';
    email = '';
    role_id = 0;
    
    componentDidMount = async () => {
        this.id = this.props.match.params.id;

        const fetchRoles = await axios.get('roles');

        const fetchUser = await axios.get(`users/${this.id}`);

        const user: User = fetchUser.data.data;

        this.setState({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role_id: user.role.id,
            roles: fetchRoles.data.data
        });
    }

submit = async (e: SyntheticEvent) => {
    e.preventDefault();

        await axios.put(`users/${this.id}`, {
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
        return <Navigate to={'/users'} />
    }

    return (
      <Wrapper>
        <form action="" onSubmit={this.submit}>
            <div className="form-group">
                <label htmlFor="first_name">First Name</label>
                <input 
                 type="text" 
                 name="first_name" 
                 className="form-control" 
                 defaultValue={this.first_name = this.state.first_name} 
                 onChange={e => this.first_name = e.target.value}
                />
            </div>

            <div className="form-group">
                <label htmlFor="last_name">Last Name</label>
                <input 
                 type="text" 
                 name="last_name" 
                 className="form-control" 
                 defaultValue={this.last_name = this.state.last_name} 
                 onChange={e => this.last_name = e.target.value}/>
            </div>
            
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                 type="text" 
                 name="email" 
                 className="form-control" 
                 defaultValue={this.email = this.state.email} 
                 onChange={e => this.email = e.target.value}
                />
            </div>
            
            <div className="form-group">
                <label htmlFor="role_id">Role</label>
                <select 
                 name="role_id" 
                 className="form-control" 
                 value={this.role_id = this.state.role_id} 
                 onChange={e => {
                    this.role_id = parseInt(e.target.value);
                    this.setState({
                        role_id: this.role_id
                    });
                }}
                 >
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

export default withRouter(UserEdit);