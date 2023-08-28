import React, { Component, SyntheticEvent } from "react";
import Wrapper from "../Wrapper";
import axios from "axios";
import { User } from "../../classes/user";
import { connect } from "react-redux";
import setUser from "../../redux/actions/setUserAction";

class Profile extends Component<any> {
    state = {
        first_name: "",
        last_name: "",
        email: "",
    };
    first_name = "";
    last_name = "";
    email = "";
    password = "";
    password_confirm = "";

    updateInfo = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await axios.put("users/info", {
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
        });

        const user: User = response.data;

        this.props.setUser(user);
    };

    updatePassword = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.put("users/password", {
            password: this.password,
            password_confirm: this.password_confirm,
        });
    };

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
                            defaultValue={
                                (this.first_name = this.props.user.first_name)
                            }
                            className="form-control"
                            onChange={(e) => (this.first_name = e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input
                            type="text"
                            name="last_name"
                            defaultValue={
                                (this.last_name = this.props.user.last_name)
                            }
                            className="form-control"
                            onChange={(e) => (this.last_name = e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="text"
                            name="email"
                            defaultValue={(this.email = this.props.user.email)}
                            className="form-control"
                            onChange={(e) => (this.email = e.target.value)}
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
                            onChange={(e) => (this.password = e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password Confirm</label>
                        <input
                            type="password"
                            name="password_confirm"
                            className="form-control"
                            onChange={(e) =>
                                (this.password_confirm = e.target.value)
                            }
                        />
                    </div>

                    <button className="btn btn-outline-secondary">Save</button>
                </form>
            </Wrapper>
        );
    }
}

// @ts-ignore
export default connect((state) => ({ user: state.user }), dispatch => ({ setUser: user => dispatch(setUser(user)) }))(Profile);
