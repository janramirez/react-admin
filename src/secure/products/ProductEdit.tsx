import React, { Component, PropsWithRef, SyntheticEvent } from "react";
import Wrapper from "../Wrapper";
import axios from "axios";
import { Navigate } from "react-router-dom";
import ImageUpload from "../components/ImageUpload";
import { Product } from "../../classes/product";
import { withRouter } from "../users/UserEdit";
import constants from "../../constants";

class ProductEdit extends React.Component<PropsWithRef<any>> {
  state = {
    title: "",
    description: "",
    image: "",
    price: 0,
    redirect: false,
  };
  id = 0;
  title = "";
  description = "";
  image = "";
  price = 0;

  componentDidMount = async () => {
    this.id = this.props.match.params.id;

    const res = await axios.get(`${constants.BASE_URL}/products/${this.id}`);

    const product: Product = res.data.data;

    this.setState({
      title: product.title,
      description: product.description,
      image: product.image,
      price: product.price,
    });
  };

  submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.put(`${constants.BASE_URL}/products/${this.id}`, {
      title: this.state.title,
      description: this.state.description,
      image: this.state.image,
      price: this.state.price,
    });

    this.setState({
      redirect: true,
    });
  };

  imageChanged = (image: string) => {
    this.image = image;

    this.setState({
      image: this.image,
    });
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to={"/products"} />;
    }
    return (
      <Wrapper>
        <form onSubmit={this.submit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              defaultValue={this.state.title}
              className="form-control"
              onChange={(e) => this.setState({ title: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              className="form-control"
              defaultValue={this.state.description}
              onChange={(e) => this.setState({ description: e.target.value })}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="">Image</label>
            <ImageUpload
              value={(this.image = this.state.image)}
              imageChanged={this.imageChanged}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              value={(this.price = this.state.price)}
              className="form-control"
              onChange={(e) => this.setState({ price: e.target.value })}
            />
          </div>

          <button className="btn btn-outline-secondary">Save</button>
        </form>
      </Wrapper>
    );
  }
}

export default withRouter(ProductEdit);
