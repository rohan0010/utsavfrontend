import PropTypes from 'prop-types';
import React, { Fragment, useState, useEffect } from 'react';
import MetaTags from 'react-meta-tags';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import Pagination from 'react-js-pagination';
import LayoutOne from '../../layouts/LayoutOne';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
import ShopProducts from '../../wrappers/product/ShopProducts';
import { useSelector, useDispatch } from 'react-redux';
import ShopSidebar from '../../wrappers/product/ShopSidebar';
import ShopTopbar from '../../wrappers/product/ShopTopbar';
import {
  fetchspecificproduct,
  searchglobalproduct,
  filterProduct,
  searchproduct,
  sortproduct,
  sortbasedonprice,
  callApi
} from '../../redux/actions/productActions';
import { useToasts } from 'react-toast-notifications';
import { useHistory } from 'react-router-dom';
const ShopGridStandard1 = ({ location }) => {
  const [layout, setLayout] = useState('grid three-column');
  const dataReducer = useSelector((state) => state.productData);
  const history = useHistory();
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const [activePage, setActivePage] = useState(1);
  useEffect(() => {
    document.oncontextmenu = function (e) {
      if (e.button == 2) {
        e.preventDefault();
        return false;
      }

    }
  }, [])
  const { pathname } = location;
  const [ locationKeys, setLocationKeys ] = useState([])
  // const history = useHistory()
  const getQueryVariable = (variable) => {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] === variable) { return pair[1]; }
    }
    return (false);
  }
  useEffect(() => {
    return history.listen(location => {
      if (history.action === 'PUSH') {
        setLocationKeys([ location.key ])
      }
  
      if (history.action === 'POP') {
        if (locationKeys[1] === location.key) {
          setLocationKeys(([ _, ...keys ]) => keys)
              
            handlePageChange1( getQueryVariable('page'))
          // Handle forward event
  
        } else {
          setLocationKeys((keys) => [ location.key, ...keys ])
        
          handlePageChange1( getQueryVariable('page'))
          // Handle back event
  
        }
      }
    })
  }, [ locationKeys,history])
  const handlePageChange1 = (pageNumber) => {
      // console.log("dd",pageNumber)
      // let currentUrlParams = new URLSearchParams(window.location.search);
      // currentUrlParams.set('page', pageNumber);
      // history.push(window.location.pathname + "?" + currentUrlParams.toString());
      setActivePage(parseInt(pageNumber));
      // handleClick()
      // window.location.reload()
    };
  const getLayout = (layout) => {
    setLayout(layout);
  };

  useEffect(() => {
    // if(activePage===1)
    // {
    //   let currentUrlParams = new URLSearchParams(window.location.search);
    //   currentUrlParams.set('page', 1);
    //   history.push(window.location.pathname + "?" + currentUrlParams.toString());
    // }
    handlePageChange1( getQueryVariable('page'))

    if (dataReducer.paginationcase === 6) {
      dispatch(
        searchglobalproduct(dataReducer.searchglobaltitle, activePage, addToast)
      );
    } else if (dataReducer.paginationcase === 4) {
      dispatch(
        filterProduct(
          dataReducer.catandsubcat.categoryid,
          dataReducer.catandsubcat.subcategoryid,
          dataReducer.variantvalue,
          dataReducer.variantname,
          dataReducer.searchglobaltitle,
          addToast,
          activePage
        )
      );
    } else if (dataReducer.paginationcase === 3) {
      dispatch(
        searchproduct(
          dataReducer.searchtitle,
          dataReducer.catandsubcat.categoryid,
          dataReducer.catandsubcat.subcategoryid,
          activePage,
          addToast
        )
      );
    } else if (dataReducer.paginationcase === 2) {
      dispatch(
        sortproduct(
          dataReducer.sorttype,
          dataReducer.catandsubcat.categoryid,
          dataReducer.catandsubcat.subcategoryid,
          dataReducer.variantname,
          dataReducer.variantvalue,
          dataReducer.searchtitle,
          dataReducer.searchglobaltitle,
          addToast,
          activePage
        )
      );
    } else if (dataReducer.paginationcase === 5) {
      dispatch(
        sortbasedonprice(
          dataReducer.catandsubcat.categoryid,
          dataReducer.catandsubcat.subcategoryid,
          dataReducer.lowerprice,
          dataReducer.higherprice,
          addToast,
          activePage
        )
      );
    } else if (dataReducer.paginationcase === 3) {
      dispatch(
        searchproduct(
          dataReducer.searchtitle,
          dataReducer.catandsubcat.categoryid,
          dataReducer.catandsubcat.subcategoryid,
          activePage,
          addToast
        )
      );
    } else if (dataReducer.paginationcase === 2) {
      dispatch(
        sortproduct(
          dataReducer.sorttype,
          dataReducer.catandsubcat.categoryid,
          dataReducer.catandsubcat.subcategoryid,
          dataReducer.variantname,
          dataReducer.variantvalue,
          dataReducer.searchtitle,
          dataReducer.searchglobaltitle,
          dataReducer.lowerprice,
          dataReducer.higherprice,
          addToast,
          activePage
        )
      );
    } else if (dataReducer.paginationcase === 5) {
      dispatch(
        sortbasedonprice(
          dataReducer.catandsubcat.categoryid,
          dataReducer.catandsubcat.subcategoryid,
          dataReducer.lowerprice,
          dataReducer.higherprice,
          addToast,
          activePage
        )
      );
    } else {
      dispatch(
        fetchspecificproduct(
          dataReducer.catandsubcat.categoryid,
          dataReducer.catandsubcat.subcategoryid,
          dataReducer.catandsubcatslug.cslug,
          dataReducer.catandsubcatslug.sslug,
          activePage
        )
      );
    }
    dispatch(callApi(false))
  }, [activePage,dataReducer.call]);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set('page', pageNumber);
    history.push(window.location.pathname + "?" + currentUrlParams.toString());
  };

  return (
    <Fragment>
      <MetaTags>
        <title>Utsav Plasto Tech | Shop Page</title>
        <meta
          name='description'
          content='Utsav Plasto Tech | Shop Page'
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        SHOP
      </BreadcrumbsItem>

      <LayoutOne headerTop='visible'>
        {/* breadcrumb */}
        <Breadcrumb />
        <div className='shop-area pt-95 pb-100'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-3 order-2 order-lg-1'>
                {/* shop sidebar */}
                <ShopSidebar sideSpaceClass='mr-30' />
              </div>
              <div className='col-lg-9 order-1 order-lg-2'>
                {/* shop topbar default */}
                <ShopTopbar getLayout={getLayout} />

                {/* shop page content default */}
                <ShopProducts layout={layout} products={dataReducer.product} />
                {/* shop product pagination */}

                <div className='row'>
                  <div className='col-3 m-auto'>
                    <div
                      className='pro-pagination-style active text-center mt-100'
                      style={{
                        display:
                          dataReducer.productcount === 0 ? 'none' : 'flex',
                      }}
                    >
                      <div className='row'>
                        <div
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                          }}
                        >
                          <Pagination
                              hideDisabled
                              activePage={parseInt(activePage)}
                              itemsCountPerPage={16}
                              disabledClass={true}
                              hideFirstLastPages={true}
 
                              totalItemsCount={dataReducer.productcount}
                              // totalItemsCount={total}
                              pageRangeDisplayed={5}
                              // hideNavigation
                              onChange={handlePageChange}
                             pageContainerClass='mb-0 mt-0'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

ShopGridStandard1.propTypes = {
  location: PropTypes.object,
  products: PropTypes.array,
};

export default ShopGridStandard1;
