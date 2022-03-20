import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { multilanguage } from 'redux-multilanguage';
import { setCurrency } from '../../redux/actions/currencyActions';
import LanguageCurrencyChanger from './sub-components/LanguageCurrencyChanger';
import './style.css';
const HeaderTop = ({
  currency,
  setCurrency,
  currentLanguageCode,
  dispatch,
  borderStyle,
}) => {
  return (
    <div
      className={`header-top-wap justify-content-between ${
        borderStyle === 'fluid-border' ? 'border-bottom' : ''
        }`}
    >
      <div className="row">
        <div className="col-md-9 col-sm-6 col-12">
          <LanguageCurrencyChanger
            currency={currency}
            setCurrency={setCurrency}
            currentLanguageCode={currentLanguageCode}
            dispatch={dispatch}
          />
        </div>
        <div className="col-md-3 col-sm-6 col-12 mr-cl-5">

          <div className='footer-list footer-social-lin'>
            {/* <a href='//www.facebook.com' target='_blank' rel='noopener noreferrer'>
          <img
            src='/assets/img/zigaaroo-Icons/twitter.png'
            alt='logo'
            className='img-fluid ml-1 mr-1'
            style={{ width: 25, height: 25 }}
          />
        </a> */}

            <a href='https://www.facebook.com/alaroma.leafs' target='_blank' rel='noopener noreferrer'>
              <img
                src='/assets/img/zigaaroo-Icons/facebook.png'
                alt='logo'
                className='img-fluid ml-1 mr-1'
                style={{ width: 25, height: 25 }}

              />
            </a>
         

            <a href='https://www.instagram.com/al_aroma.leafs/?r=nametag' target='_blank' rel='noopener noreferrer'>
              <img
                src='/assets/img/zigaaroo-Icons/instagram.png'
                alt='logo'
                className='img-fluid ml-1 mr-1'
                style={{ width: 30, height: 30 }}
              />
            </a>
            <a href='https://twitter.com/AlaromaLeafs?s=09' target='_blank' rel='noopener noreferrer'>
              <img
                src='/assets/img/zigaaroo-Icons/twitter.png'
                alt='logo'
                className='img-fluid ml-1 mr-1'
                style={{ width: 25, height: 25 }}
              />
            </a>
            <a href='https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&source=mailto&to=utsavplastotech@gmail.com' target='_blank' rel='noopener noreferrer'>
              <img
                src='/assets/img/zigaaroo-Icons/ggmail.jpeg'
                alt='logo'
                className='img-fluid ml-1 mr-1'
                style={{
                  width: 25, height: 25, borderRadius: '100%'
                }}
              />
            </a>

            {/* <a href='https://login.yahoo.com/?.src=ym&lang=en-US&done=https%3A%2F%2Fcompose.mail.yahoo.com%2F%3FTo%3Dmailto%253AInfo%2540miniapprals.com' target='_blank' rel='noopener noreferrer'>
          <img
            src='/assets/img/zigaaroo-Icons/yahoo.png'
            alt='logo'
            className='img-fluid ml-1 mr-1'
            style={{ width: 25, height: 25, borderRadius: '100%' }}
          />
        </a> */}
            <a href='https://www.youtube.com/' target='_blank' rel='noopener noreferrer'>
              <img
                src='/assets/img/zigaaroo-Icons/youtube.png'
                alt='logo'
                className='img-fluid ml-1 mr-1'
                style={{ width: 25, height: 25 }}
              />
            </a>
          </div>
        </div>
      </div>



    </div>
  );
};

HeaderTop.propTypes = {
  borderStyle: PropTypes.string,
  setCurrency: PropTypes.func,
  currency: PropTypes.object,
  currentLanguageCode: PropTypes.string,
  dispatch: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    currency: state.currencyData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrency: (currencyName) => {
      dispatch(setCurrency(currencyName));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(multilanguage(HeaderTop));
