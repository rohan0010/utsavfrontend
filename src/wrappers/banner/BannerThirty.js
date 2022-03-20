import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const BannerThirty = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div
      className={`banner-area ${spaceTopClass ? spaceTopClass : ''} ${
        spaceBottomClass ? spaceBottomClass : ''
      }`}
    >
      <div className='container'>
        <div className='row'>
          <div className='col-md-5'>
            <div className='single-banner mb-30'>
              <Link to={process.env.PUBLIC_URL + '/'}>
                {/* <img
                  src={
                    process.env.PUBLIC_URL +
                    '/assets/img/banner/74.jpg'
                  }
                  alt=''
                  className='img-fluid'
                /> */}
              </Link>
            </div>
          </div>
          <div className='col-md-7'>
            <div className='single-banner mb-30'>
              <Link to={process.env.PUBLIC_URL + '/'}>
                {/* <img
                  src={
                    process.env.PUBLIC_URL +
                    '/assets/img/banner/74.jpg'
                  }
                  alt=''
                  className='img-fluid'
                /> */}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

BannerThirty.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default BannerThirty;
