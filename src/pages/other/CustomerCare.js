import PropTypes from 'prop-types';
import React, { Fragment,useEffect } from 'react';
import MetaTags from 'react-meta-tags';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import LayoutOne from '../../layouts/LayoutOne';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
import { Link } from 'react-router-dom';

const Contact = ({ location }) => {
  const { pathname } = location;
  useEffect(() => {
    document.oncontextmenu = function (e) {
      if (e.button == 2) {
        e.preventDefault();
        return false;
      }

    }
  }, [])
  return (
    <Fragment>
      <MetaTags>
        <title>Utsav Plasto Tech | Customer Care </title>
        <meta
          name='description'
          content='Utsav Plasto Tech | Customer Care'
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Customer Care
      </BreadcrumbsItem>
      <LayoutOne headerTop='visible'>
        {/* breadcrumb */}
        <Breadcrumb />
        <div className='contact-area pt-100 pb-100'>
          <div className='container'>
            <div className='row'>
              <div class='col'>
                {' '}
                <Link to={process.env.PUBLIC_URL + '/contact'}>
                  <button
                    className='cart-btn-button btn-block mt-10'
                    style={{ borderRadius: 0 }}
                    type='submit'
                  >
                    <span style={{ color: 'white' }}>Contact Us</span>
                  </button>
                </Link>
              </div>
              <div class='col'>
                {' '}
                <Link to={process.env.PUBLIC_URL + '/return'}>
                  <button
                    className='cart-btn-button btn-block mt-10'
                    style={{ borderRadius: 0 }}
                    type='submit'
                  >
                    <span style={{ color: 'white' }}>Return</span>
                  </button>
                </Link>
              </div>
              <div class='col'>
                {' '}
                <Link to={process.env.PUBLIC_URL + '/faq'}>
                  <button
                    className='cart-btn-button btn-block mt-10'
                    style={{ borderRadius: 0 }}
                    type='submit'
                  >
                    <span style={{ color: 'white' }}>FAQ</span>
                  </button>
                </Link>
              </div>
              <div class='col'>
                {' '}
                <Link to={process.env.PUBLIC_URL + '/privacy'}>
                  <button
                    className='cart-btn-button btn-block mt-10'
                    style={{ borderRadius: 0 }}
                    type='submit'
                  >
                    <span style={{ color: 'white' }}>Privacy Note</span>
                  </button>
                </Link>
              </div>
            </div>

            <div class='row'>
              <div class='col'>
                {' '}
                <Link to={process.env.PUBLIC_URL + '/shipping'}>
                  <button
                    className='cart-btn-button btn-block mt-10'
                    style={{ borderRadius: 0 }}
                    type='submit'
                  >
                    <span style={{ color: 'white' }}>Shipping</span>
                  </button>
                </Link>
              </div>
              <div class='col'>
                {' '}
                <Link to={process.env.PUBLIC_URL + '/policy'}>
                  <button
                    className='cart-btn-button btn-block mt-10'
                    style={{ borderRadius: 0 }}
                    type='submit'
                  >
                    <span style={{ color: 'white' }}>Policies</span>
                  </button>
                </Link>
              </div>
              <div class='col'>
                {' '}
                <Link to={process.env.PUBLIC_URL + '/careers'}>
                  <button
                    className='cart-btn-button btn-block mt-10'
                    style={{ borderRadius: 0 }}
                    type='submit'
                  >
                    <span style={{ color: 'white' }}>Careers</span>
                  </button>
                </Link>
              </div>
              <div class='col'>
                {' '}
                <Link to={process.env.PUBLIC_URL + '/affliateprogram'}>
                  <button
                    className='cart-btn-button btn-block mt-10'
                    style={{ borderRadius: 0 }}
                    type='submit'
                  >
                    <span style={{ color: 'white' }}>Affliate Program</span>
                  </button>
                </Link>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col text-center">
              <b style={{ fontSize: 20 }}>Contact us</b> <br />
              <p>+919773601129</p>
                        <p><b>Address: <br /></b> UTSAV PLASTO TECH<br />  Plot No,119 Pocket-A, Ecotech-6 Gautam Budh Nagar (U.P)

K-149, Site-V,UPSIDC,Kasna, Greater Noida uttar pradesh 201308,India </p>
                        <b>Email: <h4 style={{ color: '#062A5A' }}> <a href='https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&source=mailto&to=utsavplastotech@gmail.com' target='_blank' rel='noopener noreferrer'><u>utsavplastotech@gmail.com</u></a></h4></b>

              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

Contact.propTypes = {
  location: PropTypes.object,
};

export default Contact;
