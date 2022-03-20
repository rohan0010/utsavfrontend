import PropTypes from 'prop-types';
import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import MetaTags from 'react-meta-tags';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import LayoutOne from '../../layouts/LayoutOne';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
import { useSelector, useDispatch } from 'react-redux';
import { fetchproductbyid } from '../../redux/actions/productActions';
import {
  deletewishlist,
  fetchwishlists,
} from '../../redux/actions/wishlistActions';

const Wishlist = ({ location }) => {
  const { addToast } = useToasts();
  const { pathname } = location;
  const dispatch = useDispatch();

  const dataReducer = useSelector((state) => state.wishlistData);
  useEffect(() => {
    document.oncontextmenu = function (e) {
      if (e.button == 2) {
        e.preventDefault();
        return false;
      }

    }
  }, [])
  useEffect(() => {
    dispatch(fetchwishlists());
  }, [dispatch]);

  const callRedux = (productid, pslug) => {
    dispatch(fetchproductbyid(productid, pslug));
  };

  return (
    <Fragment>
      <MetaTags>
        <title>Utsav Plasto Tech | Wishlist</title>
        <meta
          name='description'
          content='Utsav Plasto Tech | Wishlist'
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Wishlist
      </BreadcrumbsItem>

      <LayoutOne headerTop='visible'>
        {/* breadcrumb */}
        <Breadcrumb />
        <div className='cart-main-area pt-90 pb-100'>
          <div className='container'>
            {dataReducer.wishlistItems1 &&
              dataReducer.wishlistItems1.length >= 1 ? (
                <Fragment>
                  <h3 className='cart-page-title'>Your wishlist items</h3>
                  <div className='row'>
                    <div className='col-12'>
                      <div className='table-content table-responsive cart-table-content'>
                        <table>
                          <thead>
                            <tr>
                              <th>Image</th>
                              <th>Product Name</th>
                              <th>Subtext</th>
                              <th>View Product</th>
                              <th>action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {dataReducer.wishlistItems1.map(
                              (wishlistItem, key) => {
                                return (
                                  <tr key={key}>
                                    <td className='product-thumbnail'>
                                      <button
                                        onClick={() =>
                                          callRedux(
                                            wishlistItem.productId,
                                            wishlistItem.slug
                                          )
                                        }
                                      >
                                        <Link
                                          to={
                                            process.env.PUBLIC_URL +
                                            '/product/' +
                                            wishlistItem.slug
                                          }
                                        >
                                          {wishlistItem.imageUrls[0] !==
                                            undefined ? (
                                              <img
                                                className='img-fluid'
                                                src={`https://api.utsavplastotech.co.in${wishlistItem.imageUrls[0]}`}
                                                alt='img-alt'
                                              />
                                            ) : (
                                              <img
                                                className='img-fluid'
                                                src={`../../assets/img/externalimages/no-image-available.jpg`}
                                                alt='img-alt'
                                              />
                                            )}
                                        </Link>
                                      </button>
                                    </td>

                                    <td className='product-name'>
                                      {wishlistItem.title}
                                    </td>

                                    <td className='product-price-cart'>
                                      {wishlistItem.subtext}
                                    </td>

                                    <td className='product-wishlist-cart'>
                                      <button
                                        onClick={() =>
                                          callRedux(
                                            wishlistItem.productId,
                                            wishlistItem.slug
                                          )
                                        }
                                      >
                                        <Link
                                          to={`${process.env.PUBLIC_URL}/product/${wishlistItem.slug}`}
                                        >
                                          <span style={{ color: 'white' }}>
                                            View Product
                                        </span>
                                        </Link>
                                      </button>
                                    </td>
                                    <td className='product-remove'>
                                      <button
                                        onClick={() =>
                                          dispatch(
                                            deletewishlist(
                                              wishlistItem.productId,
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
                              }
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-lg-12'>
                      <div className='cart-shiping-update-wrapper'>
                        <div className='cart-shiping-update'>
                          <Link to={process.env.PUBLIC_URL + '/shop?page=1'}>
                            Continue Shopping
                        </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </Fragment>
              ) : (
                <div className='row'>
                  <div className='col-lg-12'>
                    <div className='item-empty-area text-center'>
                      <div className='item-empty-area__icon mb-30'>
                        <i className='pe-7s-like'></i>
                      </div>
                      <div className='item-empty-area__text'>
                        No items found in wishlist <br />{' '}
                        <Link to={process.env.PUBLIC_URL + '/'}>Add Items</Link>
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

Wishlist.propTypes = {
  addToCart: PropTypes.func,
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object,
  deleteAllFromWishlist: PropTypes.func,
  deleteFromWishlist: PropTypes.func,
  wishlistItems: PropTypes.array,
};

export default Wishlist;
