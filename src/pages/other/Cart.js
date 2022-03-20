/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
import PropTypes from 'prop-types';
import React, { Fragment, useEffect } from 'react';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import MetaTags from 'react-meta-tags';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import LayoutOne from '../../layouts/LayoutOne';
import {
  deletecart,


 fetchcarts,
  updateCart
} from '../../redux/actions/cartActions';
import { fetchspecificproduct } from '../../redux/actions/productActions';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
import './style.css';

const Cart = ({ location }) => {
  const dispatch = useDispatch();

  const { addToast } = useToasts();
  useEffect(() => {
    document.oncontextmenu = function (e) {
      if (e.button == 2) {
        e.preventDefault();
        return false;
      }

    }
  }, [])

 


 



  const dataReducer = useSelector((state) => state.cartData);
  const dataReducer1 = useSelector((state) => state.cartData.cartPrice.order);

  const { pathname } = location;


 
 
  const globalSearch = () => {
    dispatch(fetchspecificproduct("", "", "", ""));
  }

  
  
  
  const dispatch1 = (cartItem) => {
    dispatch(
      updateCart(
        cartItem.productId,
        cartItem.variantId,
        cartItem.quantity + 1,
        addToast,
        ""
      )
    );
  };
  const dispatch2 = (cartItem) => {
    dispatch(
      updateCart(
        cartItem.productId,
        cartItem.variantId,
        cartItem.quantity - 1,
        addToast,
        ""
      )
    );
  };
  useEffect(() => {
    dispatch(fetchcarts(addToast, 0));
   
  }, []);

 
  return (
    <Fragment>
      <MetaTags>
        <title>Utsav Plasto Tech | Cart</title>
        <meta
          name='description'
          content='Utsav Plasto Tech | Cart'
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Cart
      </BreadcrumbsItem>


      <LayoutOne headerTop='visible'>
        {/* breadcrumb */}
        <Breadcrumb />
      
        <div className='cart-main-area pt-90 pb-100'>
          <div className='container'>
            {dataReducer.cartItems1 && dataReducer.cartItems1.length >= 1 ? (
              <Fragment>
                <h3 className='cart-page-title'>Your cart items</h3>
                <div className='row'>
                  <div className='col-12'>
                    <div className='table-content table-responsive cart-table-content'>
                      <table>
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Unit Price</th>
                            <th>Qty</th>
                            <th>Subtotal</th>
                            <th>action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dataReducer.cartItems1.length > 0 &&
                            dataReducer.cartItems1.map((cartItem, key) => {
                              return (
                                <tr key={key}>
                                  <td className='product-thumbnail'>
                                    <Link
                                      to={
                                        process.env.PUBLIC_URL +
                                        '/product/' +
                                        cartItem.slug
                                      }
                                    >
                                      {cartItem.imageUrls.length > 0 ? (
                                        <img
                                        style={{height:"92px",
                                        objectFit:"contain"}}
                                          src={`https://api.utsavplastotech.com${cartItem.imageUrls[0]}`}
                                          alt=''
                                          className='img-fluid'
                                        />
                                      ) : (
                                          <img style={{ width: "100%" }}
                                            src={
                                              process.env.PUBLIC_URL +
                                              '/assets/img/externalimages/no-image-available.jpg'
                                            }
                                            alt='false-image'
                                            className='default-img'
                                          />
                                        )}
                                    </Link>
                                  </td>

                                  <td className='product-name'>
                                    <Link
                                      to={
                                        process.env.PUBLIC_URL +
                                        '/product/' +
                                        cartItem.slug
                                      }
                                    >
                                      {cartItem.title}
                                    </Link>
                                    {cartItem.variant1.value != undefined ? (
                                      <div className='cart-item-variation'>
                                        <span>
                                          Weight: {cartItem.variant1.value.split('(')[0]}
                                        </span>
                                      </div>
                                    ) : (
                                        ''
                                      )}
                                    {cartItem.variant2.value != undefined ? (
                                      <div className='cart-item-variation'>
                                        <span>
                                          Size: {cartItem.variant2.value}
                                        </span>
                                      </div>
                                    ) : (
                                        ''
                                      )}
                                  </td>

                                  <td className='product-price-cart'>
                                    {cartItem.price !== null ? (
                                      <Fragment>
                                        <span>₹
{cartItem.price}</span>
                                      </Fragment>
                                    ) : (
                                        ' '
                                      )}
                                  </td>

                                  <td className='product-quantity'>
                                    <div className='cart-plus-minus'>
                                      <button
                                        className='dec qtybutton'
                                        onClick={() => dispatch2(cartItem)}
                                        disabled={
                                          cartItem.quantity === 1 ? true : false
                                        }
                                      >
                                        -
                                      </button>
                                      <input
                                        className='cart-plus-minus-box'
                                        type='text'
                                        value={cartItem.quantity}
                                        readOnly
                                      />
                                      <button
                                        className='inc qtybutton'
                                        onClick={() => dispatch1(cartItem)}
                                      >
                                        +
                                      </button>
                                    </div>
                                  </td>
                                  <td className='product-subtotal'>
                                    ₹

                                    {cartItem.price !== null
                                      ? parseFloat(cartItem.price * cartItem.quantity).toFixed(2)
                                      : ' '}
                                  </td>

                                  <td className='product-remove'>
                                    <button
                                      onClick={() =>
                                        dispatch(
                                          deletecart(
                                            cartItem.productId,
                                            cartItem.variantId,
                                            addToast
                                          )
                                        )
                                      }
                                    >
                                      <i className='fa fa-times'></i>
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-lg-12'>
                    <div className='cart-shiping-update-wrapper' style={{ paddingBottom: 0 }}>
                      <div className="row">
                        <div className="col-md-6">
                          <div className='cart-shiping-update' onClick={() => globalSearch()}>
                            <Link style={{ backgroundColor: '#00295F', color: '#fff' }} to={process.env.PUBLIC_URL + '/shop?page=1'}>
                              Continue Shopping
                        </Link>
                          </div>
                        </div>
                        <div className="col-md-2"></div>
                        <div className="col-md-4">


                          <div className='grand-totall'>
                            <div className='title-wrap'>
                              <h4 className='cart-bottom-title section-bg-gary-cart'>
                                Cart Total
                        </h4>
                            </div>
                            <h5>
                              <span></span>
                            </h5>
                            <h4 className='grand-totall-title'>
                              Sub Total<span>₹
{dataReducer1 ? parseFloat(dataReducer1.total).toFixed(2) : 0}</span>
                            </h4>

                            <h4 className='grand-totall-title'>
                              Delivery Charges{' '}
                              <span>₹{dataReducer1 ? (dataReducer1.deliveryCharges).toFixed(2) : 0}</span>
                            </h4>
                        
                            <h4 className='grand-totall-title'>
                              Grand Total{' '}
                              <span>₹
{dataReducer1 ? dataReducer1.grandTotal.toFixed(2) : 0}</span>
                            </h4>
                            <div className='cart-shiping-update'>
                              <Link style={{ backgroundColor: '#00295F', color: '#fff' }} to={process.env.PUBLIC_URL + '/checkout2'}>
                                Proceed to Checkout
                        </Link>
                            </div>
                          </div>
                        </div>

                      </div>


                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className='col-lg-8 col-md-12'>

                  </div>
                  <div className='col-lg-4 col-md-12'>
                  </div>
                </div>
              </Fragment>
            ) : (
                <div className='row'>
                  <div className='col-lg-12'>
                    <div className='item-empty-area text-center'>
                      <div className='item-empty-area__icon mb-30'>
                        <i className='pe-7s-cart'></i>
                      </div>
                      <div className='item-empty-area__text'>
                        No items found in cart <br />{' '}
                        <Link to={process.env.PUBLIC_URL + '/shop?page=1'}>Shop Now</Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
          </div>

        


        </div>
      </LayoutOne>
    </Fragment >
  );
};

Cart.propTypes = {
  addToCart: PropTypes.func,
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  decreaseQuantity: PropTypes.func,
  location: PropTypes.object,
  deleteAllFromCart: PropTypes.func,
  deleteFromCart: PropTypes.func,
};

export default Cart;
