import PropTypes from 'prop-types';
import React from 'react';
import { useToasts } from 'react-toast-notifications';
import { useDispatch } from 'react-redux';

import './style.css';
import { Link } from 'react-router-dom';
import { searchglobalproduct } from '../../redux/actions/productActions';
const HeroSliderEightSingle = ({ data, sliderClass }) => {

  const dispatch = useDispatch();
  const { addToast } = useToasts();
  return (
    <div
      className={`single-slider-2 slider-height-1 d-flex align-items-center slider-height-res hm-13-slider ${
        sliderClass ? sliderClass : ''
        }`}
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + data.image})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        objectFit:'contain',
        backgroundPosition: 'center',
        height: window.innerWidth<= 760?'15vh':'60vh',
      }}
    >
      <div className='container slider-container-style'>
        <div className='row'>
          <div className='col-xl-10 col-lg-10 col-md-10 m-auto'>
            <div className='slider-content-13 slider-animated-1'>
              <h5 className='animated'>{data.title}</h5>
              <h1
                className='animated'
                dangerouslySetInnerHTML={{ __html: data.subtitle }}
              />
           { window.innerWidth>= 760? ( <div className='slider-btn'>
                <center>
                  <Link
                    className='animated btnhover'
                    to={process.env.PUBLIC_URL + '/shop?page=1'}
                  >
                    <span
                      onClick={() =>
                        dispatch(searchglobalproduct(null, 1, addToast))
                      }
                    >
                      SHOP NOW
                  </span>
                  </Link>
                </center>

              </div>):null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

HeroSliderEightSingle.propTypes = {
  data: PropTypes.object,
  sliderClass: PropTypes.string,
};

export default HeroSliderEightSingle;
