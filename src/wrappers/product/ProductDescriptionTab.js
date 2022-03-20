import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { useSelector } from 'react-redux';
import ReactHtmlParser from 'react-html-parser'

import ReactStars from "react-rating-stars-component";
import { useToasts } from "react-toast-notifications";
import { fetchApi } from "../../services/api";
// import Rating from "../../components/product/sub-components/ProductRating";
import { Button, Modal } from "react-bootstrap";
import "./style.css";
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { signout } from '../../auth/index';

const ProductDescriptionTab = ({ spaceBottomClass, product }) => {
  const { addToast } = useToasts();

  // console.log("Product", product);
  const dataReducer = useSelector((state) => state.productData);

  const [show1, setShow1] = useState(false);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  var userEmail;

  const [email, setEmail] = useState("");

  const init = async () => {
    userEmail = await localStorage.getItem("useremail");
    init1();
    // console.log("useremail", userEmail);
    setEmail(userEmail);
  };

  const [Rating12, setRating] = useState({
    review: "",
    rating: 0,
  });

  const [updateRating, setUpdateRating] = useState({
    review1: "",
    rating1: 0,
  });

  const [ratings, setRatings] = useState([]);
  const [ratingsown, setRatingsown] = useState([]);


  const [formshow, setFormShow] = useState(true);

  const { review, rating } = Rating12;

  const { review1, rating1 } = updateRating;
  var rev = []
  var rev1 = []
  const init1 = async () => {
    let obj = {
      productId: product.productId,
    };
    rev = []
    rev1 = []
    return fetchApi("/userdash/loadReviews", obj, {}, false, "post")
      .then((response) => {
        
        // console.log("rohanjha", response.data)
        if (response.data.reviews.length >= 0) {
          for (var i = 0; i < response.data.reviews.length; i++) {
            if (response.data.reviews[i].userId.userEmail === userEmail) {
              if (response.data.reviews[i].isPublished === false) {
                rev1.push(response.data.reviews[i])

              }

              setFormShow(false);
            }
            if (response.data.reviews[i].isPublished == true) {
              rev.push(response.data.reviews[i])
            }

          }
          setRatingsown(rev1)
          setRatings(rev);
        } else {
          // addToast("No Review Exist", {
          //   appearance: "error",
          //   autoDismiss: true,
          // });
        }
      })
      .catch((err) => console.log("error ->", err));
  };

  const updateRatings = (reviewId) => {
    localStorage.setItem("reviewId", reviewId);
    handleShow1();
    init2();
  };

  const init2 = async () => {
    let reviewId = await localStorage.getItem("reviewId");
    let obj = {
      productId: product.productId,
      reviewId: reviewId,
    };
    return fetchApi("/userdash/getreviewById", obj, {}, true, "post")
      .then((response) => {
        if (response.data.review.length > 0) {
          setUpdateRating({
            review1: response.data.review[0].review,
            rating1: parseInt(response.data.review[0].rating),
          });
        } else {
          // addToast(response.data.message, { appearance: "error", autoDismiss: true });
        }
      })
      .catch((err) => console.log("error ->", err));
  };

  useEffect(() => {
    setRatings([])
    setFormShow(true)
    init();
  }, [dataReducer]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setRating({ ...rating });

    let obj = {
      review: review,
      productId: product.productId,
      rating: rating,
    };
    // console.log("Obj", obj);

    return fetchApi("/userdash/addReview", obj, {}, true, "post")
      .then((response) => {
        if (response.data.message === 'Access denied') {
          addToast('Session Expired Please Login Again ', { appearance: 'error', autoDismiss: true });
                  
           setTimeout(function(){  signout(() => { }) }, 2000);
        }
        // console.log("Response", response.data.message);
        if (response.data.message === "success") {
          addToast("Added Review review is under process", {
            appearance: "success",
            autoDismiss: true,
          });
          setFormShow(false)
          init1();
        } else {
          addToast(response.data.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      })
      .catch((err) => console.log("error ->", err));
  };
  const ratingChanged = (newRating) => {
    // console.log("new Rating", newRating);
    setRating({ ...Rating12, rating: newRating });
  };

  const handleSubmit1 = async (event) => {
    event.preventDefault();
    setUpdateRating({ ...updateRating });

    let reviewId1 = await localStorage.getItem("reviewId");

    let obj = {
      review: updateRating.review1,
      productId: product.productId,
      reviewId: reviewId1,
      rating: updateRating.rating1,
    };
    // console.log("Obj", obj);

    return fetchApi("/userdash/editReview", obj, {}, true, "post")
      .then((response) => {
        // console.log("Response", response.data.message);
        if (response.data.message === "success") {
          addToast("Updated Review Successfully", {
            appearance: "success",
            autoDismiss: true,
          });
          init1();
        } else {
          addToast(response.data.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      })
      .catch((err) => console.log("error ->", err));
  };
  const ratingChanged1 = (newRating) => {
    // console.log("new Update Rating", newRating);
    setUpdateRating({ ...updateRating, rating1: newRating });
  };

  const destroyRating = (reviewId) => {
    let obj = {
      productId: product.productId,
      reviewId: reviewId,
    };
    return fetchApi("/userdash/deleteReview", obj, {}, true, "post")
      .then((response) => {
        // console.log("Response", response.data.message);
        if (response.data.message === "success") {
          addToast("Review Removed Successfully", {
            appearance: "success",
            autoDismiss: true,
          });
          init1();
          setFormShow(true);
        } else {
          addToast(response.data.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      })
      .catch((err) => console.log("error ->", err));
  };

  return (
    <div className={`description-review-area ${spaceBottomClass}`}>
      <div className="container">
        <div className="description-review-wrapper">
          <Tab.Container defaultActiveKey="productDescription">
            <Nav variant="pills" className="description-review-topbar">
              <Nav.Item>
                <Nav.Link eventKey="additionalInfo">
                  Additional Information
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="productDescription">Description</Nav.Link>
              </Nav.Item>
             
            </Nav>
            <Tab.Content className="description-review-bottom">
              <Tab.Pane eventKey="additionalInfo">
                <div className="product-anotherinfo-wrapper">
                  <ul>
                    <li>
                      <span>Weight</span>{" "}
                      {product.additionalInformation !== undefined
                        ? product.additionalInformation.Weight
                        : ""}
                    </li>
                    {/* <li>
                      <span>Dimensions</span>{" "}
                      {product.additionalInformation !== undefined
                        ? product.additionalInformation.Dimensions
                        : ""}
                    </li> */}
                    {/* <li>
                      <span>Materials</span>{" "}
                      {product.additionalInformation !== undefined
                        ? product.additionalInformation.Materials
                        : ""}
                    </li> */}
                    {/* <li>
                      <span>Skin Type</span>{" "}
                      {product.additionalInformation !== undefined
                        ? product.additionalInformation.OtherInfo
                        : ""}
                    </li> */}
                  </ul>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="productDescription">
                {ReactHtmlParser(product.description)}
              </Tab.Pane>
          
            </Tab.Content>
          </Tab.Container>
        </div>
      </div>
    </div >
  );
};

ProductDescriptionTab.propTypes = {
  productFullDesc: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

export default ProductDescriptionTab;
