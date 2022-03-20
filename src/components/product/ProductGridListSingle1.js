/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { fetchproductbyid } from '../../redux/actions/productActions';
import { deletewishlist } from '../../redux/actions/wishlistActions';
import ProductModal from './ProductModal';
import Rating from './sub-components/ProductRating';

const ProductGridListSingle = ({
  product,
  sliderClassName,
  spaceBottomClass,
}) => {
  const dispatch = useDispatch();
  const dataReducer = useSelector((state) => state.wishlistData);

  const { addToast } = useToasts();

  var userEmail;

  const [email, setEmail] = useState('');
  const [show, setshow] = useState(false);
  const init = async () => {
    var productIndex = dataReducer.wishlistItems1.findIndex(
      (x) => x.productId === product.productId
    );
    if (productIndex > -1) {
      setshow(true);
    }
    if (productIndex === -1) {
      setshow(false);
    }
    setEmail(userEmail);
  };

  useEffect(() => {
    init();
  }, [dataReducer.wishlistItems1]);

  const addToWishlist = (productId, addToast) => {
    dispatch(deletewishlist(productId, addToast));
  };

  const callRedux = (productid, pslug) => {
    dispatch(fetchproductbyid(productid, pslug));
  };

  const [modalShow, setModalShow] = useState(false);


  return (
    <Fragment>
      <div
        className={`col-xl-4 col-sm-6 ${
          sliderClassName ? sliderClassName : ''
          }`}
      >
        <div
          className={`product-wrap ${spaceBottomClass ? spaceBottomClass : ''}`}
        >
          <div className='product-img'>
            <button onClick={() => callRedux(product.productId, product.slug)}>
              <Link
                to={{
                  pathname: process.env.PUBLIC_URL + '/product/' + product.slug,
                  aboutProps: { productid: product.productId },
                }}
              >
                {product.imageUrls.length>0&&product.imageUrls[0]!==null  ? (
                  <img
                    src={`https://api.utsavplastotech.com${product.imageUrls[0]}`}
                    className='default-img'
                    alt='true-image'
                  />
                ) : (
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        '/assets/img/externalimages/no-image-available.jpg'
                      }
                      alt='false-image'
                      className='default-img'
                    />
                  )}
                {product.imageUrls.length > 1&&product.imageUrls[1]!==null ? (
                  <img
                    className='hover-img'
                    src={`https://api.utsavplastotech.com${product.imageUrls[1]}`}
                  />
                ) : (
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        '/assets/img/externalimages/no-image-available.jpg'
                      }
                      alt='product-img'
                      className='hover-img'
                    />
                  )}
              </Link>
            </button>
            <div className='product-action w-100'>
              <div
                className='pro-same-action pro-wishlist w-50'
                style={{ backgroundColor: show ? 'red' : 'black' }}
              >
                <button
                  onClick={() => addToWishlist(product.productId, addToast)}
                >
                  <i className='pe-7s-like' />
                </button>
              </div>
              <div className='pro-same-action pro-quickview w-50'>
                <button onClick={() => setModalShow(true)} title='Quick View'>
                  <i className='pe-7s-look' />
                </button>
              </div>
            </div>
          </div>
          <div className='product-content text-center'>
            <h3>
              <Link
                to={{
                  pathname: process.env.PUBLIC_URL + '/product/' + product.slug,
                  aboutProps: { productid: product.productId },
                }}
              >
                <div className='text-capitalize'>{product.title}</div>
              </Link>
            </h3>
            {product.averageRating && product.averageRating > 0 ? (
              <div className='product-rating'>
                <Rating ratingValue={product.averageRating} />
              </div>
            ) : (
                ''
              )}
            <div style={{ color: '#00295F' }} className='product-price'>
              ${product.variants[0].price}
              <span className='old'>
                $
                {product.variants !== undefined
                  ? product.variants[0].mrp
                  : null}
              </span>
            </div>
          </div>
        </div>
        <div className='shop-list-wrap mb-30'>
          <div className='row'>
            <div className='col-xl-4 col-md-5 col-sm-6'>
              <div className='product-list-image-wrap'>
                <div className='product-img'>
                  <Link
                    to={{
                      pathname:
                        process.env.PUBLIC_URL + '/product/' + product.slug,
                      aboutProps: { productid: product.productId },
                    }}
                  >
                    {product.imageUrls.length > 0&&product.imageUrls[0]!==null ? (
                      <img
                        src={`https://api.utsavplastotech.com${product.imageUrls[0]}`}
                        className='default-img'
                      />
                    ) : (
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            '/assets/img/externalimages/no-image-available.jpg'
                          }
                          alt='product-img'
                          className='default-img'
                        />
                      )}
                    {product.imageUrls.length > 1&&product.imageUrls[1]!==null ? (
                      <img
                        className='hover-img'
                        src={`https://api.utsavplastotech.com${product.imageUrls[1]}`}
                      />
                    ) : (
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            '/assets/img/externalimages/no-image-available.jpg'
                          }
                          alt='product-img'
                          className='hover-img'
                        />
                      )}
                  </Link>
                </div>
              </div>
            </div>
            <div className='col-xl-8 col-md-7 col-sm-6'>
              <div className='shop-list-content'>
                <h3>
                  <div className='text-capitalize'>{product.title}</div>
                </h3>
                <div className='product-list-price'>
                  {product.variants[0].price}
                </div>
                {product.averageRating && product.averageRating > 0 ? (
                  <div className='rating-review'>
                    <div className='product-list-rating'>
                      <Rating ratingValue={product.averageRating} />
                    </div>
                  </div>
                ) : (
                    ''
                  )}
                {product.subtext ? <p>{product.subtext}</p> : ''}
              </div>
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

ProductGridListSingle.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItem: PropTypes.object,
  compareItem: PropTypes.object,
  currency: PropTypes.object,
  product: PropTypes.object,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  wishlistItem: PropTypes.object,
};

export default ProductGridListSingle;
