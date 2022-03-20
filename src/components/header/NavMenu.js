import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { multilanguage } from "redux-multilanguage";
import { fetchHigherPrice, fetchLowerPrice, fetchSearchGlobalTitle, fetchspecificproduct } from "../../redux/actions/productActions";
import { fetchApi } from '../../services/api';
import './style.css';

const NavMenu = ({ strings, menuWhiteClass, sidebarMenu, props }) => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);

  const [onlycategories, setOnlyCategories] = useState([]);

  async function fetchData2() {

    fetchApi("/category/getMegaMenu", null, {}, false, "post")
      .then((response) => {
        if (response.data.result.length > 0) {
          var arr = [];

          var arr2 = []
          var arr1 = [];

          for (var k = 0; k < response.data.result.length; k++) {
            if (response.data.result[k].subcategory.length === 0) {
              arr2.push(response.data.result[k]);
            }
          }

          for (var i = 0; i < response.data.result.length; i++) {
            if (response.data.result[i].subcategory.length > 0) {
              arr.push(response.data.result[i]);
            }
          }
          setCategories(arr);
          setOnlyCategories(arr2);
        } else {
          alert("No Category Exist");
        }
      })
      .catch((err) => console.log(err));

  }

  useEffect(() => {
    fetchData2();
  }, []);
  const callRedux = (categoryid, subcategoryid, cslug, sslug, cname) => {
    if (cname.includes("all") == true) {
      dispatch(fetchspecificproduct(categoryid, "", cslug, ""));

    }
    else {
      dispatch(fetchspecificproduct(categoryid, subcategoryid, cslug, sslug));

    }
    dispatch(fetchSearchGlobalTitle(null));
    dispatch(fetchLowerPrice(null));
    dispatch(fetchHigherPrice(null));

  }


  return (
    <div
      className={` ${
        sidebarMenu
          ? "sidebar-menu"
          : `main-menu ${menuWhiteClass ? menuWhiteClass : ""}`
        } `}
    >
      <nav>
        <ul>
          <li className="text-capitalize">
            <Link to={'/'}>
              <span style={{ fontWeight: 'bold', fontSize: 20, color: '#00295F' }}> Home </span>
            </Link>

          </li>

          
          {categories && categories.length > 0
            ? categories.map((c, index) => {
              var block;
              if (index == -1) {
                block = (
                  <span key={'span' + index}>
                    <li key={c + '' + index} className="text-capitalize">
                      <Link to="">
                        <span style={{ fontWeight: '600', fontSize: 20, color: "#00295F" }}> About </span>                             {sidebarMenu ? (
                          <span>
                            <i className="fa fa-angle-right"></i>
                          </span>
                        ) : (
                            <i className="fa fa-angle-down" />
                          )}
                      </Link>
                      <ul className="submenu">

                        <li >
                          <Link to='/customercare' >
                            <button style={{ backgroundColor: '#fff', border: 'none' }}>
                              <div className="text-capitalize">
                                Customer Care
                            </div>
                            </button>
                          </Link>
                        </li>
                        <li >
                          <Link to="/wholesale" >
                            <button style={{ backgroundColor: '#fff', border: 'none' }}>
                              <div className="text-capitalize">
                                Wholesale
                   </div>
                            </button>
                          </Link>
                        </li>
                        <li >
                          <Link to="">
                            <button style={{ backgroundColor: '#fff', border: 'none' }}>
                              <div className="text-capitalize">
                                Media
                   </div>
                            </button>
                          </Link>
                        </li>
                        <li >
                          <Link to='/careers'>
                            <button style={{ backgroundColor: '#fff', border: 'none' }}>
                              <div className="text-capitalize">
                                Employment
                   </div>
                            </button>
                          </Link>
                        </li>
                        <li >
                          <Link to='/about'>
                            <button style={{ backgroundColor: '#fff', border: 'none' }}>
                              <div className="text-capitalize">
                                About Us
                   </div>
                            </button>
                          </Link>
                        </li>

                      </ul>
                    </li>
                    <li key={index} className="text-capitalize">
                      <Link to="">
                        <span style={{ fontWeight: '600', fontSize: 20, color: "#00295F" }}> {c.categoryname}    </span>
                        {sidebarMenu ? (
                          <span>
                            <i className="fa fa-angle-right"></i>
                          </span>
                        ) : (
                            <i className="fa fa-angle-down" />
                          )}
                      </Link>
                      <ul className="submenu">
                        {c.subcategory.map((s, i) => (

                          <li key={i}>
                            {s.active == true ? (<Link to={{ pathname: process.env.PUBLIC_URL + "/store/" + c.slug + "/" + s.slug+"?page=1", aboutProps: { categoryid: c.categoryid, subcategoryid: s.categoryid } }}>
                              <button onClick={() => callRedux(c.categoryid, s.categoryid, c.slug, s.slug, s.categoryname)} style={{ backgroundColor: '#fff', border: 'none' }}>
                                <div className="text-capitalize">
                                  {s.categoryname}
                                </div>
                              </button>
                            </Link>) : null}

                          </li>
                        ))}
                      </ul>
                    </li>


                  </span>

                );
              } else {
                block = (
                  <li key={index} className="text-capitalize">
                    <Link to="">
                      <span style={{ fontWeight: '600', fontSize: 20, color: "#00295F" }}> {c.categoryname} </span>

                      {sidebarMenu ? (
                        <span>
                          <i className="fa fa-angle-right"></i>
                        </span>
                      ) : (
                          <i className="fa fa-angle-down" />
                        )}
                    </Link>
                    <ul className="submenu">
                      {c.subcategory.map((s, i) => (
                        <li key={i} className="text-capitalize">
                          {s.active == true ? (<Link to={{ pathname: process.env.PUBLIC_URL + "/store/" + c.slug + "/" + s.slug+"?page=1", aboutProps: { categoryid: c.categoryid, subcategoryid: s.categoryid } }}>
                            <button onClick={() => callRedux(c.categoryid, s.categoryid, c.slug, s.slug, s.categoryname)} style={{ backgroundColor: '#fff', border: 'none' }}>
                              <div className="text-capitalize">
                                {s.categoryname}
                              </div>
                            </button>
                          </Link>) : null}

                        </li>
                      ))}
                    </ul>
                  </li>
                );
              }
              return block;
            })
            : null}

          {onlycategories.map((o, i) => (
            <li className="text-capitalize" key={i}>
              <button onClick={() => callRedux(o.categoryid, null, o.slug, null)} style={{ backgroundColor: '#fff', border: 'none' }}>
                <Link to={{ pathname: process.env.PUBLIC_URL + "/store/" + o.slug+"?page=1", aboutProps: { categoryid: o.categoryid, subcategoryid: null } }}>
                  <div className="text-capitalize only-categories-menu">
                    <span style={{ fontWeight: '600', fontSize: 20, color: "#00295F" }}>   {o.categoryname}</span>
                  </div>
                </Link>
              </button>
            </li>
          ))
          }
          <li>

          </li>
        </ul>
      </nav>
    </div>
  );
};

NavMenu.propTypes = {
  menuWhiteClass: PropTypes.string,
  sidebarMenu: PropTypes.bool,
  strings: PropTypes.object
};

export default multilanguage(NavMenu);
