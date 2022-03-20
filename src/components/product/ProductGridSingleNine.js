import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { fetchproductbyid } from "../../redux/actions/productActions";
import ProductModal from "./ProductModal";
import './style.css';
import Rating from "./sub-components/ProductRating";

const ProductGridSingleNine = ({
  product,
  sliderClassName,
  spaceBottomClass,
  colorClass
}) => {
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();

  const callRedux = (productid, pslug) => {

    dispatch(fetchproductbyid(productid, pslug))
  }


  return (
    <Fragment>
      <div
        className={`col-xl-3 col-md-3 col-sm-4 col-6 ${
          sliderClassName ? sliderClassName : ""
          }`}
      >
        <div
          className={`product-wrap ${spaceBottomClass ? spaceBottomClass : ""}`}
        >
          <div className="product-img">
            <button className="button-style" onClick={() => callRedux(product.productId, product.slug)}>
              <Link to={{ pathname: process.env.PUBLIC_URL + "/product/" + product.slug, aboutProps: { productid: product.productId } }}>

                {product.imageUrls.length > 0 && product.imageUrls[0] !== null ? (<img
                  style={{height:"181px",
                  objectFit:"contain"}}
                  src={`https://api.utsavplastotech.co.in${product.imageUrls[0]}`}
                  alt="product-img"
                  className="img-fluid default"
                />) : (<img
                  src={
                    process.env.PUBLIC_URL + "/assets/img/externalimages/no-image-available.jpg"
                  }
                  className="img-fluid default"
                  alt="product-img"
                />)}
                {product.imageUrls.length > 1 && product.imageUrls[1] != null ? (
                  <img
                    className="hover-img"
                    style={{height:"181px",
                    objectFit:"contain"}}
                    src={`https://api.utsavplastotech.co.in${product.imageUrls[1]}`}
                    alt="product-img"
                  />
                ) : (
                    ""
                  )}
              </Link>
            </button>
            {/* <div className="product-action w-100">
              <div className="pro-same-action pro-wishlist w-50">
                <button
                  onClick={() => addToWishlist(product.productId)}
                >
                  <i className="pe-7s-like" />
                </button>
              </div>
              <div className="pro-same-action pro-quickview w-50">
                <button onClick={() => setModalShow(true)} title="Quick View">
                  <i className="pe-7s-look" />
                </button>
              </div>
            </div> */}
          </div>
          <div className="product-content">
            <h3>
              <Link to={{ pathname: process.env.PUBLIC_URL + "/product/" + product.slug, aboutProps: { productid: product.productId } }}>
                <div className="text-capitalize">{product.title}</div>
              </Link>
            </h3>
            {product.averageRating && product.averageRating > 0 ? (
              <div className="product-rating">
                <Rating ratingValue={product.averageRating} />
              </div>
            ) : (
                ""
              )}
            <div className="product-price">
            ₹
{(product.variants[0].price+product.variants[0].tax).toString().split('.')[1]===undefined?(product.variants[0].price+product.variants[0].tax):(product.variants[0].price+product.variants[0].tax).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
      {/* product modal */}
      <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}

      />
    </Fragment>
  );
};

ProductGridSingleNine.propTypes = {
  product: PropTypes.object,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string,
};

export default ProductGridSingleNine;
