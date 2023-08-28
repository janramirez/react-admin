import React, { Component, SyntheticEvent } from "react";
import Wrapper from "../Wrapper";
import axios from "axios";
import { User } from "../../classes/user";

export default class Profile extends Component {
    state = {
        first_name: '',
        last_name: '',
        email: '',
    }
    first_name = '';
    last_name = '';
    email = '';
    password = '';
    password_confirm = '';

    componentDidMount = async () => {
        const response = await axios.get('user');

        const user: User = response.data.data;

        this.setState({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
        })
    }

    updateInfo = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            await axios.put('users/info', {
                first_name: this.first_name,
                last_name: this.last_name,
                email: this.email,
            })
            
        } catch (error: any) {
            throw new Error(`Failed to update user info: ${error.message}`);
        }
    }

    updatePassword = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.put('users/password', {
            password: this.password,
            password_confirm: this.password_confirm
        });

    }

    render() {
        return (
            <Wrapper>
                <h2>Account Information</h2>

                <hr />
{/* Profile Information Form */}
                <form onSubmit={this.updateInfo}>
                    <div className="form-group">
                        <label>First Name</label>
                        <input
                            type="text"
                            name="first_name"
                            defaultValue={this.first_name = this.state.first_name}
                            className="form-control"
                            onChange={e => this.first_name = e.target.value}
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input
                            type="text"
                            name="last_name"
                            defaultValue={this.last_name = this.state.last_name}
                            className="form-control"
                            onChange={e => this.last_name = e.target.value}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="text"
                            name="email"
                            defaultValue={this.email = this.state.email}
                            className="form-control"
                            onChange={e => this.email = e.target.value}
                        />
                    </div>

                    <button className="btn btn-outline-secondary">Save</button>
                </form>

                <h2 className="mt-4">Change Password</h2>
                <hr />
{/* Password update form */}
                <form onSubmit={this.updatePassword}>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            onChange={e => this.password = e.target.value}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password Confirm</label>
                        <input
                            type="password"
                            name="password_confirm"
                            className="form-control"
                            onChange={e => this.password_confirm = e.target.value}
                        />
                    </div>

                    <button className="btn btn-outline-secondary">Save</button>
                </form>
            </Wrapper>
        );
    }
}
