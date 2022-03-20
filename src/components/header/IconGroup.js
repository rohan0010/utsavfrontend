import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { fetchApi } from '../../services/api';
import { isAuthenticated, signout } from '../../auth/index';
import {
  searchglobalproduct
} from '../../redux/actions/productActions';
import './style.css';
import MenuCart from './sub-components/MenuCart';

const IconGroup = ({ iconWhiteClass }) => {
  const { addToast } = useToasts();

  const dataReducer1 = useSelector((state) => state.wishlistData);

  const dataReducer = useSelector((state) => state.cartData);

  const dispatch = useDispatch();

  const [search, setSearch] = useState('');

  const [redirectToReferrer, setReiderect] = useState(false);
  const [fullName, setFullName] = useState('');

  const handleClick = (e) => {
    e.currentTarget.nextSibling.classList.toggle('active');
  };

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      '#offcanvas-mobile-menu'
    );
    offcanvasMobileMenu.classList.add('active');
  };

  const search1 = () => {
    if (search.length < 3) {
      addToast('Title Length should be greater than or equal to 3', {
        appearance: 'warning',
        autoDismiss: true,
      });
    } else {
      dispatch(searchglobalproduct(search, 1, addToast));
      setReiderect(true);
    }
  };

  const redirecttoshop = () => {
    if (redirectToReferrer) {
      return <Redirect to={'/shop?page=1'} />;
    }
  };



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
    if(isAuthenticated())
    init();
  }, [isAuthenticated()]);

  return (
    <div
      className={`header-right-wrap ${iconWhiteClass ? iconWhiteClass : ''}`}
    >
      <div className='same-style header-search d-none d-lg-block'>
        <button className='search-active' onClick={(e) => handleClick(e)}>
          <i className='pe-7s-search' />
        </button>
        <div className='search-content'>
          <form className='row'>
            {/* <div className="col-md-9">
              <input type="text" placeholder="Search Product by title " onChange={e => setSearch(e.target.value)} /> */}

            <div className='input-group px-2'>
              <input
                type='text'
                className='form-control col-md-10 col-lg-10'
                placeholder='Search product by title'
                onChange={(e) => setSearch(e.target.value)}
                required
              />

              <div className='input-group-prepend col-md-2 col-lg-2' style={{ paddingLeft: '0px' }}>
                <button className='input-group-text' onClick={() => search1()}>
                  <i style={{ color: 'white' }} className='pe-7s-search' />
                </button>
              </div>
            </div>
            {/* 
            </div>
            <div className="col-md-3">
              <Link to={process.env.PUBLIC_URL + "/shop"}>
                <button className="button-search" onClick={() => dispatch(searchglobalproduct(search))}>
                  <i className="pe-7s-search" />
                </button>
              </Link>
            </div> */}
          </form>
        </div>
      </div>

  


   

      {isAuthenticated() && (
        <div className="px-2 pt-1 font-weight-bold  d-none d-lg-block" style={{ backgroundColor: '#00295F', color: '#ffffff', textTransform: 'uppercase', borderRadius: '10px' }}>
          {fullName}
        </div>

      )}
      <div className='same-style mobile-off-canvas d-block d-lg-none'>
        <button
        style={{marginTop:46,display: 'flex',position:'relative',right:199,}}
          className='mobile-aside-button'
          onClick={() => triggerMobileMenu()}
        >
          <i className='pe-7s-menu' />
          <p>MENU</p>
        </button>
      </div>
      {redirecttoshop()}
    </div>
  );
};

IconGroup.propTypes = {
  iconWhiteClass: PropTypes.string,
};

export default IconGroup;
