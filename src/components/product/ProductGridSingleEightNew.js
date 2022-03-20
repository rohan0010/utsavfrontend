import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchproductbyid } from '../../redux/actions/productActions';
import './style.css';
import Rating from './sub-components/ProductRating';

const ProductGridSingleEightNew = ({
  product,
  sliderClassName,
  spaceBottomClass,
}) => {
  const dispatch = useDispatch();

  const callRedux = (productid, pslug) => {
    dispatch(fetchproductbyid(productid, pslug));
  };

  return (
    <Fragment>
      <div
        className={`col-xl-4 col-md-4 col-sm-5 col-12 mb-5 ${
          sliderClassName ? sliderClassName : ''
          }`}
      >
        <div
          className={`product-wrap ${spaceBottomClass ? spaceBottomClass : ''}`}
        >
          <div className='card p-1'>
            <div className='row'>
              <div className='col-6'>
                <button
                  onClick={() => callRedux(product.productId, product.slug)}
                >
                  <Link
                    to={{
                      pathname:
                        process.env.PUBLIC_URL + '/product/' + product.slug,
                      aboutProps: { productid: product.productId },
                    }}
                  >
                    {product.imageUrls.length > 0&&product.imageUrls[0]!==null ? (
                      <img
                      style={{height:"181px",
                      width:"268px",
                      objectFit:"contain"}}
                        src={`https://api.utsavplastotech.com${product.imageUrls[0]}`}
                        alt='product-img'
                        className='img-fluid'
                      />
                    ) : (
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            '/assets/img/externalimages/no-image-available.jpg'
                          }
                          className='img-fluid'
                          alt='product-img'
                        />
                      )}
                  </Link>
                </button>
              </div>
              <div
                className='col-6 product-discription'
                style={{ cursor: 'pointer' }}
              >
                <h4>
                  <div className='text-capitalize'>{product.title}</div>
                </h4>
                <h5 style={{ color: '#00295F' }}>
                  <strike>₹
{product.variants[0].mrp} </strike>- ₹
{(product.variants[0].price+product.variants[0].tax).toString().split('.')[1]===undefined?(product.variants[0].price+product.variants[0].tax):(product.variants[0].price+product.variants[0].tax).toFixed(2)}

                </h5>
                {product.averageRating && product.averageRating > 0 ? (
                  <div className='product-rating'>
                    <Rating ratingValue={product.averageRating} />
                  </div>
                ) : (
                    ''
                  )}
                {/* <img className="img-fluid shoping-icon-style" src="/assets/img/icon-img/shoppinkart.png" alt="" /> */}
                <span
                  onClick={() => callRedux(product.productId, product.slug)}
                >
                  <Link
                    to={{
                      pathname:
                        process.env.PUBLIC_URL + '/product/' + product.slug,
                      aboutProps: { productid: product.productId },
                    }}
                  >
                    <button
                      className='btn mt-10'
                      style={{
                        borderRadius: 0,
                        backgroundColor: '#00295F',
                        color: 'white',
                      }}
                    >
                      View
                    </button>
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

ProductGridSingleEightNew.propTypes = {
  product: PropTypes.object,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

export default ProductGridSingleEightNew;
