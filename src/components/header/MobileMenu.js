import React, { useState, useEffect } from 'react';
import MobileMenuSearch from './sub-components/MobileSearch';
import MobileNavMenu from './sub-components/MobileNavMenu';
import MobileWidgets from './sub-components/MobileWidgets';
import { isAuthenticated, signout } from '../../auth/index';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { fetchApi } from '../../services/api';
import { useToasts } from 'react-toast-notifications';

const MobileMenu = () => {
  const { addToast } = useToasts();

  const [fullName, setFullName] = useState('');

  const init = async () => {
    var userId = await localStorage.getItem('userId');
    let obj = {
      userId: userId,
    };
    return fetchApi('/profile/getProfileData', obj, {}, true, 'post')
      .then((response) => {
        if (response.data.message === 'Access denied') {
          addToast('Session Expired Please Login Again ', { appearance: 'error', autoDismiss: true });
                  
           setTimeout(function(){  signout(() => { }) }, 2000);
        }
        if (response.data.info) {
          setFullName(response.data.info.firstName);

        }
      })
      .catch((err) => console.log('error ->', err));
  };

  useEffect(() => {
    const offCanvasNav = document.querySelector('#offcanvas-navigation');
    const offCanvasNavSubMenu = offCanvasNav.querySelectorAll('.sub-menu');
    const anchorLinks = offCanvasNav.querySelectorAll('dropdownMenu');
    const menuExpand = offCanvasNav.querySelectorAll('.dropdownMenu');
    for (let i = 0; i < offCanvasNavSubMenu.length; i++) {
      offCanvasNavSubMenu[i].insertAdjacentHTML(
        'beforebegin',
        "<span class='menu-expand'><i></i></span>"
      );
    }


    const numMenuExpand = menuExpand.length;
    for (let i = 0; i < numMenuExpand; i++) {
      menuExpand[i].addEventListener('click', (e) => {
        sideMenuExpand(e);
      });
    }

    for (let i = 0; i < anchorLinks.length; i++) {
      anchorLinks[i].addEventListener('click', () => {
        closeMobileMenu();
      });
    }
  });

  useEffect(() => {
    if(isAuthenticated())
    init();
  }, [isAuthenticated()]);



  const sideMenuExpand = (e) => {
    e.currentTarget.parentElement.classList.toggle('active');
  };

  const closeMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      '#offcanvas-mobile-menu'
    );
    offcanvasMobileMenu.classList.remove('active');
  };



  return (
    <div className='offcanvas-mobile-menu' id='offcanvas-mobile-menu'>
      <button
        className='offcanvas-menu-close'
        id='mobile-menu-close-trigger'
        onClick={() => closeMobileMenu()}
      >
        <i className='pe-7s-close'></i>
      </button>
      <div className='offcanvas-wrapper'>
        <div className='offcanvas-inner-content'>
          {/* mobile search */}
          <MobileMenuSearch />

          {/* mobile nav menu */}
          <MobileNavMenu/>

          {/* mobile language and currency */}
          {/* <MobileLangCurChange /> */}
          {/* Login */}
          <ul>
            {isAuthenticated() && (
              <li>


                <Button style={{ width: '100%', backgroundColor: '#00295F', color: '#fff', borderRadius: 0 }}>
                  <div className="px-2 pt-1 font-weight-bold" style={{ Color: '#00295F', textTransform: 'uppercase' }}>
                    {fullName}
                  </div>
                </Button>

              </li>
            )}
           
            {isAuthenticated() && (
              <li>
                <Link to={process.env.PUBLIC_URL + '/my-account'}>
                  <Button style={{ width: '100%', backgroundColor: '#00295F', color: '#fff', borderRadius: 0 }}>
                    MY ACCOUNT
                  </Button>

                </Link>
              </li>
            )}
            {isAuthenticated() && (
              <li>
                <Link to={process.env.PUBLIC_URL + '/my-orders'}>
                  <Button style={{ width: '100%', backgroundColor: '#00295F', color: '#fff', borderRadius: 0 }}>
                    MY ORDERS
                </Button>
                </Link>
              </li>
            )}
            {isAuthenticated() && (
              <li>
                <span onClick={() => signout(() => { })}>
                  <Button style={{ width: '100%', backgroundColor: '#00295F', color: '#fff', borderRadius: 0 }}>
                    LOGOUT
                  </Button>
                </span>
              </li>
            )}
          </ul>
          {/* <div className="px-2 pt-1 font-weight-bold" style={{ Color: '#00295F', textTransform: 'uppercase' }}>
            {fullName}
          </div> */}
          {/* mobile widgets */}
          <MobileWidgets />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
