import PropTypes from 'prop-types';
import React from 'react';

const LanguageCurrencyChanger = ({
  currency,
  setCurrency,
  currentLanguageCode,
  dispatch,
}) => {
  return (
    <div className='language-currency-wrap p-3'>
      <div className='same-language-currency'>
        <p className="text-white">Welcome To Utsav Plasto Tech</p>
      </div>
    </div>
  );
};

LanguageCurrencyChanger.propTypes = {
  setCurrency: PropTypes.func,
  currency: PropTypes.object,
  currentLanguageCode: PropTypes.string,
  dispatch: PropTypes.func,
};

export default LanguageCurrencyChanger;
