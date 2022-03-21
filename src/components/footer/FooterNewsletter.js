import PropTypes from 'prop-types';
import React from 'react';
import SubscribeEmail from './sub-components/SubscribeEmail';

const FooterNewsletter = ({
  spaceBottomClass,
  spaceLeftClass,
  sideMenu,
  colorClass,
  widgetColorClass,
}) => {
  return (
    <div
      className={`footer-widget ${spaceBottomClass ? spaceBottomClass : ''} ${
        sideMenu ? 'ml-ntv5' : spaceLeftClass ? spaceLeftClass : ''
        } ${widgetColorClass ? widgetColorClass : ''}`}
    >
      <div className='footer-title'>
        <h3>SUBSCRIBE</h3>
      </div>
      <div className={`subscribe-style ${colorClass ? colorClass : ''}`}>
        <p>Get E-mail updates about our latest shop and special offers.</p>
        {/* subscribe email */}
        <SubscribeEmail mailchimpUrl='//devitems.us11.list-manage.com/subscribe/post?u=6bbb9b6f5827bd842d9640c82&amp;id=05d85f18ef' />
        <div className='footer-list footer-social-link mt-15'>
         
          <a
            href='https://www.facebook.com/UTSAV-Plasto-TECH-103541168509428/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src='/assets/img/zigaaroo-Icons/facebook.png'
              alt='logo'
              className='img-fluid ml-1 mr-1'
              style={{ width: 25, height: 25 }}
            />
          </a>
        
          {/* <a
            href='https://www.instagram.com/al_aroma.leafs?r=nametag'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src='/assets/img/zigaaroo-Icons/instagram.png'
              alt='logo'
              className='img-fluid ml-1 mr-1'
              style={{ width: 30, height: 30 }}
            />
          </a> */}
          {/* <a href='https://twitter.com/AlaromaLeafs?s=09' target='_blank' rel='noopener noreferrer'>
            <img
              src='/assets/img/zigaaroo-Icons/twitter.png'
              alt='logo'
              className='img-fluid ml-1 mr-1'
              style={{ width: 25, height: 25 }}
            />
          </a> */}
          <a href='https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&source=mailto&to=utsavplastotech@gmail.com' target='_blank' rel='noopener noreferrer'>
            <img
              src='/assets/img/zigaaroo-Icons/ggmail.jpeg'
              alt='logo'
              className='img-fluid ml-1 mr-1'
              style={{ width: 25, height: 25, borderRadius: '100%' }}
            />
          </a>

          <a
            href='https://youtube.com/channel/UCgARKYgNWTFzzEp0CRjTa0w'
            target='_blank'
            rel='noopener noreferrer'
          >
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
  );
};

FooterNewsletter.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceLeftClass: PropTypes.string,
  colorClass: PropTypes.string,
  widgetColorClass: PropTypes.string,
};

export default FooterNewsletter;
