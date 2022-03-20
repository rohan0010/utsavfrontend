/* eslint-disable jsx-a11y/alt-text */
import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import Rating from "./sub-components/ProductRating";
import ProductModal from "./ProductModal";
import {  useDispatch } from 'react-redux';
import { fetchproductbyid } from "../../redux/actions/productActions";
import { deletewishlist } from "../../redux/actions/wishlistActions";


const ProductGridSingle = ({
  product,
  sliderClassName,
  spaceBottomClass
}) => {
  const dispatch = useDispatch();

  const { addToast } = useToasts();

  const addToWishlist = (productId, addToast) => {
    dispatch(deletewishlist(productId, addToast))
  }


  const callRedux = (productid) => {

    dispatch(fetchproductbyid(productid))
  }

  const [modalShow, setModalShow] = useState(false);


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
            <button onClick={() => callRedux(product.productId)}>
              <Link to={{ pathname: process.env.PUBLIC_URL + "/product/" + product.slug, aboutProps: { productid: product.productId } }}>
                {product.imageUrls.length>0&&product.imageUrls[0]!==null ? (
                  <img
                  style={{
                   
                    height:"170px",
                    objectFit:"contain"
                  }}
                    src={`https://api.utsavplastotech.co.in${product.imageUrls[0]}`}
                    className="default-img"
                  />
                ) : (
                    <img
                      src={
                        process.env.PUBLIC_URL + "/assets/img/externalimages/no-image-available.jpg"
                      }
                      className="default-img"
                    />
                  )}
                {product.imageUrls.length > 1&&product.imageUrls[1]!==null ? (
                  <img
                  style={{
                   
                    height:"170px",
                    objectFit:"contain"
                  }}
                    className="hover-img"
                    src={`https://api.utsavplastotech.co.in${product.imageUrls[1]}`}
                  />
                ) : (
                    <img
                      src={
                        process.env.PUBLIC_URL + "/assets/img/externalimages/no-image-available.jpg"
                      }
                      className="hover-img"
                    />
                  )}
              </Link>
            </button>
            {/* <div className="product-action w-100">
              <div className="pro-same-action pro-wishlist w-50">
                <button
                  onClick={() => addToWishlist(product.productId, addToast)}
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
          <div className="product-content text-center">
            <h3 className="text-secondary">
              <Link to={{ pathname: process.env.PUBLIC_URL + "/product/" + product.slug, aboutProps: { productid: product.productId } }}>
                <div class="text-capitalize">{product.title}</div>
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
            ₹{(product.variants[0].price+product.variants[0].tax).toString().split('.')[1]===undefined?(product.variants[0].price+product.variants[0].tax):(product.variants[0].price+product.variants[0].tax).toFixed(2)}

              <span className="old">
              ₹{product.variants !== undefined ? (product.variants[0].mrp) : null}
              </span>
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

ProductGridSingle.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItem: PropTypes.object,
  compareItem: PropTypes.object,
  currency: PropTypes.object,
  product: PropTypes.object,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  wishlistItem: PropTypes.object
};

export default ProductGridSingle;
