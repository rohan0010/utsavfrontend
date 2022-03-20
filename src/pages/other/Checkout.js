import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import MetaTags from 'react-meta-tags';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { getDiscountPrice } from '../../helpers/product';
import LayoutOne from '../../layouts/LayoutOne';
import { fetchcarts } from '../../redux/actions/cartActions';
import { fetchApi } from '../../services/api';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
import './style.css';
import { signout } from '../../auth/index';

const Checkout = ({ location, cartItems, currency }) => {
  const dispatch = useDispatch();
 const[show,setshow]=useState(false)
  const { addToast } = useToasts();
  useEffect(() => {
    document.oncontextmenu = function (e) {
      if (e.button == 2) {
        e.preventDefault();
        return false;
      }

    }
  }, [])
  const { pathname } = location;
  let cartTotalPrice = 0;

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);

  const [orderid, setorderid] = useState('');

  
  useEffect(() => {
    var order = localStorage.getItem('order');
    if(order!==null&&JSON.parse(order).orderType==="order")
    {
      var order1 = JSON.parse(order);
      order1.paymentMode="online"
      order1.transactionId=localStorage.getItem("transaction")
       fetchApi('/userdash/orderNow', order1, {}, true, 'post')
      .then((response) => {
        if (response.data.message === 'Access denied') {
          addToast('Session Expired Please Login Again ', { appearance: 'error', autoDismiss: true });
                  
           setTimeout(function(){  signout(() => { }) }, 2000);
        }
        // console.log("Response", response.data);
        if (response.data.message === 'success') {
          setshow(true)
          dispatch(fetchcarts(addToast));
  
          addToast('Order Placed', {
            appearance: 'success',
            autoDismiss: true,
          });
          setorderid(response.data.txnId);
          localStorage.removeItem("order")
          localStorage.removeItem("transaction")
          setShow1(true);
        } else {
          alert(response.data.message)
  
          addToast(response.data.message, {
            appearance: 'error',
            autoDismiss: true,
          });
          localStorage.removeItem("order")
          localStorage.removeItem("transaction")
        }
      })
      .catch((err) => console.log('error ->', err));
    }
    if(order!==null&&JSON.parse(order).orderType==="buynow")
    {
      var order1 = JSON.parse(order);
      order1.paymentMode="online"
      order1.transactionId=localStorage.getItem("transaction")
       fetchApi('/userdash/buyNow', order1, {}, true, 'post')
      .then((response) => {
        if (response.data.message === 'Access denied') {
          addToast('Session Expired Please Login Again ', { appearance: 'error', autoDismiss: true });
                  
           setTimeout(function(){  signout(() => { }) }, 2000);
        }
        // console.log("Response", response.data);
        if (response.data.message === 'success') {
          setshow(true)
          dispatch(fetchcarts(addToast));
  
          addToast('Order Placed', {
            appearance: 'success',
            autoDismiss: true,
          });
          setorderid(response.data.txnId);
          localStorage.removeItem("order")
          localStorage.removeItem("transaction")
          setShow1(true);
        } else {
          alert(response.data.message)
  
          addToast(response.data.message, {
            appearance: 'error',
            autoDismiss: true,
          });
          localStorage.removeItem("order")
          localStorage.removeItem("transaction")
        }
      })
      .catch((err) => console.log('error ->', err));
    }
  }, [addToast,dispatch]);

  return (
    <Fragment>
      <MetaTags>
        <title>Utsav Plasto Tech | Checkout</title>
        <meta
          name='description'
          content='Utsav Plasto Tech | Checkout'
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Checkout
      </BreadcrumbsItem>
      {show===false?(<div className='flone-preloader-wrapper'>
      <span className="mr-20" style={{  "position":"absolute",
    "height": window.innerHeight ,
    "width": window.innerWidth,

    "left":"50%",
    // "top":"50%",
    "marginTop":"50px" ,
    "marginLeft":- (window.innerHeight/3) }}>Please Do Not Reload or Navigate From this page</span>
      <span style={{  "position":"absolute",
    "height": window.innerHeight ,
    "width": window.innerWidth,

    "left":"50%",
    // "top":"50%",
    "marginTop":"30px" ,
    "marginLeft":- window.innerHeight/3 }}>Please Wait While We Process  Your Order</span>

            <div className='flone-preloader'>
              <span></span>
              <span></span>
            </div>
          </div>):null}
      <Modal
        show={show1}
        onHide={handleClose1}
        size='sm'
        centred
        backdrop="static"
        className='modal-custom-style'
      >
        <Modal.Header >
          <Modal.Title>Your Order has been Placed</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='modal-style'>
            <i class='fa fa-check-circle h1'></i>
            <div className='mt-10'>Order Id: {orderid}</div>
            <Link to="/my-orders">
            <center><button className="mt-10" style={{ backgroundColor: '#00295F', border: '1px solid #00295F', color: '#FFFFFF', padding: '5px 10px' }}>Ok</button></center>
          </Link>
          </div>
        </Modal.Body>
      </Modal>
      <LayoutOne headerTop='visible'>
        {/* breadcrumb */}
        <Breadcrumb />
        <div className='checkout-area pt-95 pb-100'>
          <div className='container'>
            {cartItems && cartItems.length >= 1 ? (
              <div className='row'>
                <div className='col-lg-7'>
                  <div className='billing-info-wrap'>
                    <h3>Billing Details</h3>
                    <div className='row'>
                      <div className='col-lg-6 col-md-6'>
                        <div className='billing-info mb-20'>
                          <label>First Name</label>
                          <input type='text' />
                        </div>
                      </div>
                      <div className='col-lg-6 col-md-6'>
                        <div className='billing-info mb-20'>
                          <label>Last Name</label>
                          <input type='text' />
                        </div>
                      </div>
                      <div className='col-lg-12'>
                        <div className='billing-info mb-20'>
                          <label>Company Name</label>
                          <input type='text' />
                        </div>
                      </div>
                      <div className='col-lg-12'>
                        <div className='billing-select mb-20'>
                          <label>Country</label>
                          <select>
                            <option>Select a country</option>
                            <option>Azerbaijan</option>
                            <option>Bahamas</option>
                            <option>Bahrain</option>
                            <option>Bangladesh</option>
                            <option>Barbados</option>
                          </select>
                        </div>
                      </div>
                      <div className='col-lg-12'>
                        <div className='billing-info mb-20'>
                          <label>Street Address</label>
                          <input
                            className='billing-address'
                            placeholder='House number and street name'
                            type='text'
                          />
                          <input
                            placeholder='Apartment, suite, unit etc.'
                            type='text'
                          />
                        </div>
                      </div>
                      <div className='col-lg-12'>
                        <div className='billing-info mb-20'>
                          <label>Town / City</label>
                          <input type='text' />
                        </div>
                      </div>
                      <div className='col-lg-6 col-md-6'>
                        <div className='billing-info mb-20'>
                          <label>State / County</label>
                          <input type='text' />
                        </div>
                      </div>
                      <div className='col-lg-6 col-md-6'>
                        <div className='billing-info mb-20'>
                          <label>Postcode / ZIP</label>
                          <input type='text' />
                        </div>
                      </div>
                      <div className='col-lg-6 col-md-6'>
                        <div className='billing-info mb-20'>
                          <label>Phone</label>
                          <input type='text' />
                        </div>
                      </div>
                      <div className='col-lg-6 col-md-6'>
                        <div className='billing-info mb-20'>
                          <label>Email Address</label>
                          <input type='text' />
                        </div>
                      </div>
                    </div>

                    <div className='additional-info-wrap'>
                      <h4>Additional information</h4>
                      <div className='additional-info'>
                        <label>Order notes</label>
                        <textarea
                          placeholder='Notes about your order, e.g. special notes for delivery. '
                          name='message'
                          defaultValue={''}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className='col-lg-5'>
                  <div className='your-order-area'>
                    <h3>Your order</h3>
                    <div className='your-order-wrap gray-bg-4'>
                      <div className='your-order-product-info'>
                        <div className='your-order-top'>
                          <ul>
                            <li>Product</li>
                            <li>Total</li>
                          </ul>
                        </div>
                        <div className='your-order-middle'>
                          <ul>
                            {cartItems.map((cartItem, key) => {
                              const discountedPrice = getDiscountPrice(
                                cartItem.price,
                                cartItem.discount
                              );
                              const finalProductPrice = (
                                cartItem.price * currency.currencyRate
                              ).toFixed(2);
                              const finalDiscountedPrice = (
                                discountedPrice * currency.currencyRate
                              ).toFixed(2);

                              discountedPrice != null
                                ? (cartTotalPrice +=
                                  finalDiscountedPrice * cartItem.quantity)
                                : (cartTotalPrice +=
                                  finalProductPrice * cartItem.quantity);
                              return (
                                <li key={key}>
                                  <span className='order-middle-left'>
                                    {cartItem.name} X {cartItem.quantity}
                                  </span>{' '}
                                  <span className='order-price'>
                                    {discountedPrice !== null
                                      ? currency.currencySymbol +
                                      (
                                        finalDiscountedPrice *
                                        cartItem.quantity
                                      ).toFixed(2)
                                      : currency.currencySymbol +
                                      (
                                        finalProductPrice * cartItem.quantity
                                      ).toFixed(2)}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        <div className='your-order-bottom'>
                          <ul>
                            <li className='your-order-shipping'>Shipping</li>
                            <li>Free shipping</li>
                          </ul>
                        </div>
                        <div className='your-order-total'>
                          <ul>
                            <li className='order-total'>Total</li>
                            <li>
                              {currency.currencySymbol +
                                cartTotalPrice.toFixed(2)}
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className='payment-method'></div>
                    </div>
                    <div className='place-order mt-25'>
                      <button className='btn-hover'>Place Order</button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
                <div className='row'>
                  <div className='col-lg-12'>
                    <div className='item-empty-area text-center'>
                      <div className='item-empty-area__icon mb-30'>
                        <i className='pe-7s-cash'></i>
                      </div>
                      <div className='item-empty-area__text'>
                        No items found in cart to checkout <br />{' '}
                        <Link to={process.env.PUBLIC_URL + '/shop?page=1'}>Shop Now</Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

Checkout.propTypes = {
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData,
  };
};

export default connect(mapStateToProps)(Checkout);
