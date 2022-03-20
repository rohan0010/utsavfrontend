/* eslint-disable jsx-a11y/alt-text */
import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { fetchproductbyid } from "../../redux/actions/productActions";
import { fetchApi } from "../../services/api";
import ProductModal from "./ProductModal";
import './style.css';
import Rating from "./sub-components/ProductRating";

const ProductGridSingleEight = ({
  product,
  sliderClassName,
  spaceBottomClass,
  colorClass
}) => {
  const [modalShow, setModalShow] = useState(false);
  const { addToast } = useToasts();


  const dispatch = useDispatch();

  const callRedux = (productid) => {

    dispatch(fetchproductbyid(productid))
    // props.history.push('/shop-grid-standard')
  }

  const addToWishlist = (productId) => {

    let obj = {
      "productId": productId
    };
    return fetchApi("/userdash/bookmarkProduct", obj, {}, true, "post")
      .then((response) => {
        if (response.data.message === 'Access denied') {
          addToast('Session Expired Please Login Again ', { appearance: 'error', autoDismiss: true });
                  
           setTimeout(function(){  signout(() => { }) }, 2000);
        }
        if (response.data.message === "bookmarked") {
          alert("Added to  Wishlist");
        } else {
          alert(response.data.message);
        }
      })
      .catch((err) => console.log("error ->", err));

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
            <button className="button-style" onClick={() => callRedux(product.productId)}>
              <Link
                to={{
                  pathname: process.env.PUBLIC_URL + "/product/" + product.slug,
                  aboutProps: { productid: product.productId },
                }}
              >
                {product.imageUrls.length > 0&&product.imageUrls[0]!==null ? (
                  <img
                    src={`https://api.utsavplastotech.com6${product.imageUrls[0]}`}
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
                    className="hover-img"
                    src={`https://api.utsavplastotech.com6${product.imageUrls[1]}`}
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
            <div className="product-action w-100">
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
            </div>
          </div>
          <div className="product-content">
            <h3>
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
              ${product.variants[0].price}
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

ProductGridSingleEight.propTypes = {
  product: PropTypes.object,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string,
};

export default ProductGridSingleEight;
