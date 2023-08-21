import React, { Component, SyntheticEvent } from "react";
import Wrapper from "../Wrapper";
import axios from "axios";
import { Navigate } from "react-router-dom";
import ImageUpload from "../components/ImageUpload";

export default class ProductCreate extends Component {
    state = {
        image: '',
        redirect: false,
    }
  title = "";
  description = "";
  image = "";
  price = 0;

  submit = async (e:SyntheticEvent) => {
    e.preventDefault();

    await axios.post('products', {
        title: this.title,
        description: this.description,
        image: this.image,
        price: this.price,
    })

    this.setState({
        redirect: true
    })
  }

  imageChanged = (image: string) => {
    this.image = image;

    this.setState({
        image: this.image
    })
  }


  render() {
    if(this.state.redirect) {
        return <Navigate to={'/products'} />
    }
    return (
      <Wrapper>
        <form onSubmit={this.submit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              onChange={(e) => (this.title = e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              className="form-control"
              onChange={(e) => (this.description = e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="">Image</label>
            <ImageUpload value={this.image = this.state.image} imageChanged={this.imageChanged} />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              className="form-control"
              onChange={(e) => this.price = parseFloat(e.target.value)}
            />
          </div>

          <button className="btn btn-outline-secondary">Save</button>
        </form>
      </Wrapper>
    );
  }
}
