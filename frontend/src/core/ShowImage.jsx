import React from "react";
import { API } from "../config";

const ShowImage = ({ item, url }) => {
  return (
    <div className="product-img">
      <img
        src={`${API}/${url}/photo/${item._id}`}
        alt={`${item.name}`}
        className="mb-3"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      />
    </div>
  );
};

export default ShowImage;
