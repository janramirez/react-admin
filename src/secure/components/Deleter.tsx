import axios from "axios";
import React, { Component } from "react";

export default class Deleter extends Component<{
  id: number;
  endpoint: string;
  handleDeleter: any;
}> {
  delete = async () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await axios.delete(`${this.props.endpoint}/${this.props.id}`);

      this.props.handleDeleter(this.props.id);
    }
  };

  render() {
    return (
      <div>
        <a
          href="#"
          className="btn btn-sm btn-outline-secondary"
          onClick={() => this.delete()}
        >
          Delete
        </a>
      </div>
    );
  }
}
