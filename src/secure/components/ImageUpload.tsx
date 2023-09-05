import axios from "axios";
import React, { Component } from "react";
import constants from "../../constants";

export default class ImageUpload extends Component<{
  value: string;
  imageChanged: any;
}> {
  image = "";
  upload = async (files: FileList | null) => {
    if (files === null) return;

    const data = new FormData();
    data.append("image", files[0]);

    const res = await axios.post(`${constants.BASE_URL}/upload`, data);

    this.image = res.data.url;

    this.props.imageChanged(this.image);
  };

  render() {
    return (
      <div>
        <div className="input-group">
          <input
            type="text"
            name="image"
            className="form-control"
            value={(this.image = this.props.value)}
            onChange={(e) => {
              this.image = e.target.value;
              this.props.imageChanged(this.image);
            }}
          />
          <div className="input-group-append">
            <label className="btn btn-primary">
              Upload{" "}
              <input
                type="file"
                hidden
                onChange={(e) => this.upload(e.target.files)}
              />
            </label>
          </div>
        </div>
      </div>
    );
  }
}
