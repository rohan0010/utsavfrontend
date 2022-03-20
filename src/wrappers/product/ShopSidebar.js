import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import ShopSearch from '../../components/product/ShopSearch';
import { setActiveSort } from '../../helpers/product';
import {
  filterProduct,
  sortbasedonprice,
  callApi
} from '../../redux/actions/productActions';
import { fetchApi } from '../../services/api';
import './style.css';


const ShopSidebar = ({ sideSpaceClass }) => {
  const dispatch = useDispatch();
  const getQueryVariable = (variable) => {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
  }
  const { addToast } = useToasts();

  const [lowerprice, setLowerPrice] = useState(0);

  const [higherprice, setHigherPrice] = useState(0);

  const [varinats, setVariants] = useState([]);
  const [varinatsArray1, setVariantsArray1] = useState([]);
  const dataReducer = useSelector((state) => state.productData);

  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
  const init = () => {
    return fetchApi('/variant/findAllVariants', null, {}, false, 'post')
      .then((response) => {
        if (response.data.result.length > 0) {
          let _vars = response.data.result.reverse();
          if (window.location.href.includes("kimono") || window.location.href.includes("scarves") ||
            window.location.href.includes("kaftans") || window.location.href.includes("mask") || window.location.href.includes("accessories")) {
            _vars.pop()
          }
          _vars.pop()

          setVariants(_vars);
        } else {
          addToast(response, { appearance: 'warning', autoDismiss: true });
        }
      })
      .catch((err) => console.log('error ->', err));
  };

  useEffect(() => {
    init();
  }, [dataReducer.catandsubcat.subcategoryid]);

  return (
    <div className={`sidebar-style ${sideSpaceClass ? sideSpaceClass : ''}`}>
      {/* shop search */}
      <ShopSearch />

      {/* filter by categories */}
      <div className='sidebar-widget'>
        <div className='sidebar-widget-list mt9-30'>
          {varinats.map((v, i) => {
            return (
              <div key={v + '' + i} className="ulOuter">
                <ul key={i} className='mt-5 account-selector__listing'>
                  <li className='mt-2 fixed-li'>
                    <h4 className='pro-sidebar-title'>Weight</h4>
                  </li>
                
                  {v.value.map((c, key) => {
                    return (
                      <li key={key} className='mt-2'>
                        <div className='sidebar-widget-list-left'>
                          {i==0?(   <button
                            onClick={(e) => {
                             let like=true
                            let i=  varinatsArray1.indexOf(c)
                            if(i==-1)
                            {
                              varinatsArray1.push(c)
                              like=false
                            }
                            else
                            {
                              varinatsArray1.splice(i,1)
                            }
                            if(varinatsArray1.length===0)
                            {

                            dispatch(
                              filterProduct(
                                dataReducer.catandsubcat.categoryid,
                                dataReducer.catandsubcat.subcategoryid,
                                null,
                                null,
                                dataReducer.searchglobaltitle,
                                addToast,
                                parseInt(getQueryVariable('page'))
                              )
                            );
                            dispatch(callApi(true))
                          }

                            else
                            {
                              dispatch(
                                filterProduct(
                                  dataReducer.catandsubcat.categoryid,
                                  dataReducer.catandsubcat.subcategoryid,
                                  varinatsArray1,
                                 varinatsArray1,
                                  dataReducer.searchglobaltitle,
                                  addToast,
                                  parseInt(getQueryVariable('page'))
                                  )
                              );
                              dispatch(callApi(true))
                            }
                            
                              setActiveSort(e,like);
                              // setlike0(!like0)
                            }}
                          >
                            <span className='checkmark' /> {v.variantName === "Color" ? c.split("(")[0] : c}
                          </button>):(   <button
                            onClick={(e) => {
                              let like=true
                              let i=  varinatsArray1.indexOf(c)
                              if(i==-1)
                              {
                                varinatsArray1.push(c)
                                like=false
                              }
                              
                              else
                              {
                                varinatsArray1.splice(i,1)
                              }
                              if(varinatsArray1.length===0)
                              {
                                dispatch(
                                  filterProduct(
                                    dataReducer.catandsubcat.categoryid,
                                    dataReducer.catandsubcat.subcategoryid,
                                    null,
                                    null,
                                    dataReducer.searchglobaltitle,
                                    addToast,
                                    parseInt(getQueryVariable('page'))
                                    )
                                );
                                dispatch(callApi(true))
                                  }
                                else
                                {
                                  dispatch(
                                    filterProduct(
                                      dataReducer.catandsubcat.categoryid,
                                      dataReducer.catandsubcat.subcategoryid,
                                      varinatsArray1,
                                     varinatsArray1,
                                      dataReducer.searchglobaltitle,
                                      addToast,
                                      parseInt(getQueryVariable('page'))
                                      )
                                  );
                                  dispatch(callApi(true))
                                }
                             
                                setActiveSort(e,like);
                            }}
                          >
                            <span className='checkmark' /> {v.variantName === "Color" ? c.split("(")[0] : c}
                          </button>)}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
        <div style={{ width: '70%', position: 'relative', margin: '0' }} className='row mt-10'>
          <h5 style={{ display: 'block', width: '100%', marginBottom: '14px', fontSize: '16px', fontWeight: '500', color: '#333', marginTop: "20px" }}>Price Filter</h5>
          <div className='col-md-5' style={{ padding: '0', marginRight: '10px' }}>
            <input
              type='number'
              className='price_filter'
              placeholder='Min'
              min='1'
              max='10000'
              onChange={(e) => setLowerPrice(e.target.value)}
              // onBlur={() =>
              //   dispatch(
              //     sortbasedonprice(
              //       dataReducer.catandsubcat.categoryid,
              //       dataReducer.catandsubcat.subcategoryid,

              //       lowerprice===''?0 : lowerprice,
              //       higherprice===''?1000000:higherprice,
              //       addToast,
              //       1
              //     )
              //   )
              // }
              required
            />
          </div>
          <div className='col-md-5' style={{ padding: '0', marginRight: '10px' }}>
            <input
              type='number'
              className='price_filter'
              placeholder='Max'
              min='1'
              max='10000'
              onChange={(e) => {setHigherPrice(e.target.value)
                let searchParams = new URLSearchParams(window.location.search);
                searchParams.set('page',1)
                        let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + searchParams.toString();
                        window.history.pushState({path: newurl}, '', newurl);
                dispatch(
                  sortbasedonprice(
                    dataReducer.catandsubcat.categoryid,
                    dataReducer.catandsubcat.subcategoryid,
                    lowerprice===''?0 : lowerprice,
                    e.target.value===''?1000000:e.target.value,
                    addToast,
                    1
                  )
                )
              }}
              onBlur={() =>{
                let searchParams = new URLSearchParams(window.location.search);
                searchParams.set('page',1)
                        let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + searchParams.toString();
                        window.history.pushState({path: newurl}, '', newurl);
                dispatch(
                  sortbasedonprice(
                    dataReducer.catandsubcat.categoryid,
                    dataReducer.catandsubcat.subcategoryid,
                    lowerprice===''?0 : lowerprice,
                    higherprice===''?1000000:higherprice,
                    addToast,
                    1
                  )
                )
                  }
              }
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  let searchParams = new URLSearchParams(window.location.search);
                  searchParams.set('page',1)
                          let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + searchParams.toString();
                          window.history.pushState({path: newurl}, '', newurl);
                  dispatch(
                    sortbasedonprice(
                      dataReducer.catandsubcat.categoryid,
                      dataReducer.catandsubcat.subcategoryid,
  
                      lowerprice===''?0 : lowerprice,
                      higherprice===''?1000000:higherprice,
                      addToast,
                      1
                    )
                  )
                }
              }}
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

ShopSidebar.propTypes = {
  getSortParams: PropTypes.func,
  products: PropTypes.array,
  sideSpaceClass: PropTypes.string,
};

export default ShopSidebar;
