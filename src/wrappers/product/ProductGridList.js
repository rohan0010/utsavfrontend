import PropTypes from "prop-types";
import React, { Fragment } from "react";
import ProductGridListSingle1 from "../../components/product/ProductGridListSingle1";
import './style.css';
const ProductGrid = ({
  products,
  sliderClassName,
  spaceBottomClass
}) => {
  return (
    <Fragment>
      {products && products.length > 0 ? products.map(product => {
        return (
          <ProductGridListSingle1
            sliderClassName={sliderClassName}
            spaceBottomClass={spaceBottomClass}
            product={product}
            key={product.productId}
          />
        );
      }) : (

          <div className="ml-800 no-product-found">
            <div className="col-lg-12">
              <div className="item-empty-area text-center">
                <div className="item-empty-area__icon mb-30">
                  <i className="pe-7s-like"></i>
                </div>
                <div className="item-empty-area__text">
                  No result found for this product  <br />{" "}
                </div>
              </div>
            </div>
          </div>

        )}
    </Fragment>
  );
};

ProductGrid.propTypes = {
  products: PropTypes.array,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string
};


export default ProductGrid;
