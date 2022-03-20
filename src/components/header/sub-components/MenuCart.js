import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deletecart } from '../../../redux/actions/cartActions';

const MenuCart = () => {
  const dispatch = useDispatch();
  const dataReducer = useSelector((state) => state.cartData);
  const dataReducer1 = useSelector((state) => state.cartData.cartPrice);

  const [grandTotal, setGrandTotal] = useState(0);

  
  const deletefromcart = (productId, variantId) => {
    dispatch(deletecart(productId, variantId));
  };

  useEffect(() => {
    // init1();
    if (dataReducer1!== undefined) {
      setGrandTotal(dataReducer1!==undefined&&dataReducer1.order!==undefined?dataReducer1.order.grandTotal:0);
    }
  }, [dataReducer.cartItems1.length, dataReducer1]);

  return (
    <div className='shopping-cart-content'>
      {dataReducer.cartItems1 && dataReducer.cartItems1.length > 0 ? (
        <Fragment>
          <ul>
            {dataReducer.cartItems1.map((cartItem, key) => {
              return (
                <li className='single-shopping-cart' key={key}>
                  <div className='shopping-cart-img'>
                    <Link
                      to={
                        process.env.PUBLIC_URL +
                        '/product/' +
                        cartItem.slug
                      }
                    >
                      {cartItem.imageUrls !== undefined ? (
                        <img
                        style={{height:"70px",
                      objectFit:"contain"}}
                          src={`https://api.utsavplastotech.com${cartItem.imageUrls[0]}`}
                          alt=''
                          className='img-fluid'
                        />
                      ) : null}
                    </Link>
                  </div>
                  <div className='shopping-cart-title'>
                    <h4>
                      <Link
                        to={
                          process.env.PUBLIC_URL +
                          '/product/' +
                          cartItem.slug
                        }
                      >
                        {' '}
                        {cartItem.title}{' '}
                      </Link>
                    </h4>
                    <h6> Qty: {cartItem.quantity} Price: {cartItem.price.toFixed(2)}</h6>
                    

                    <span>
                      {cartItem.variantName && cartItem.value ? (
                        <div className='cart-item-variation'>
                          <span>Variant Name {cartItem.variantName}</span>
                          <span>value: {cartItem.value}</span>
                        </div>
                      ) : (
                          ''
                        )}
                    </span>
                  </div>
                  <div className='shopping-cart-delete'>
                    <button
                      onClick={() =>
                        deletefromcart(cartItem.productId, cartItem.variantId)
                      }
                    >
                      <i className='fa fa-times-circle' />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className='shopping-cart-total'>
            <h4>
              Total :{' '}
              <span className='shop-total'>₹
{grandTotal.toFixed(2)}</span>
            </h4>
          </div>
          <div className='shopping-cart-btn btn-hover text-center'>
            <Link className='default-btn' to={process.env.PUBLIC_URL + '/cart'}>
              view cart
            </Link>
          </div>
        </Fragment>
      ) : (
          <p className='text-center'>No items added to cart</p>
        )}
    </div>
  );
};

MenuCart.propTypes = {
  cartData: PropTypes.array,
  currency: PropTypes.object,
  deleteFromCart: PropTypes.func,
};

export default MenuCart;
