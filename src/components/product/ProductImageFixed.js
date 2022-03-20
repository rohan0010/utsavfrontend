/* eslint-disable jsx-a11y/alt-text */
import PropTypes from "prop-types";
import React from "react";

const ProductImageFixed = ({ product }) => {
  return (
    <div className="product-large-image-wrapper">
      <div className="product-fixed-image">

        {product.imageUrls !== undefined&&product.imageUrls[0]!==null ? (<img
          src={`https://api.utsavplastotech.co.in${product.imageUrls[0]}`}
          className="img-fluid"
        />) : (<img
          src={`../../../public/assets/img/externalimages/no-image-available.jpg`}
          className="img-fluid"
        />)}

      </div>
    </div>
  );
};



export default ProductImageFixed;
