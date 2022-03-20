import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { multilanguage } from "redux-multilanguage";
import { fetchApi } from '../../../services/api';
import { fetchspecificproduct, fetchSearchGlobalTitle, fetchLowerPrice, fetchHigherPrice } from "../../../redux/actions/productActions";
import {  useDispatch } from 'react-redux';
import InsideMenu from "./InsideMenu";

const MobileNavMenu = ({ strings, menuWhiteClass, sidebarMenu, props }) => {

  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);


  const [onlycategories, setOnlyCategories] = useState([]);

  async function fetchData2() {

    fetchApi("/category/getMegaMenu", null, {}, false, "post")
      .then((response) => {
        if (response.data.result.length > 0) {
          var arr = [];

          var arr2 = []

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


          // for(i=5;i<8;i++)
          // {
          //   if(response.data.result[i].subcategory.length>0) {
          //     arr1.push(response.data.result[i]); 
          //   }
          // } 
          // setMoreCategories(arr1);
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
    if (cname.includes("all") === true) {
      dispatch(fetchspecificproduct(categoryid, "", cslug, ""));

    }
    else {
      dispatch(fetchspecificproduct(categoryid, subcategoryid, cslug, sslug));
    }
    dispatch(fetchSearchGlobalTitle(null));
    dispatch(fetchLowerPrice(null));
    dispatch(fetchHigherPrice(null));

  }

  // const [yesMenu, setYesMenu] = useState(false);


  // const menuOpen = () => {
  //   if (yesMenu) {
  //     setYesMenu(false);
  //   } else {
  //     setYesMenu(true);
  //   }
  // }

  return (
    <nav className="offcanvas-navigation" id="offcanvas-navigation">
      <ul>
        <li className="menu-item-has-children">
          <Link to={process.env.PUBLIC_URL + "/"}>{strings["home"]}</Link>
        </li>
        {/* ------------------------------- */}
        {onlycategories.map((o, i) => (
          // <li >
          <li key={i} onClick={() => callRedux(o.categoryid, null)}>
            <Link to={{ pathname: process.env.PUBLIC_URL + "/store/" + o.slug, aboutProps: { categoryid: o.categoryid, subcategoryid: null } }}>
              {o.categoryname}
            </Link>
          </li>
          // </li>
        ))
        }
      </ul>
      <ul>
        {categories.map((c, i) => (

          <InsideMenu key={i} c={c} />
        ))}


      </ul>

      {/* ================== */}

      {/* <ul>
        {categories.map((c, i) => (
          <li key={i} className="menu-item-has-children">
            <Link to={process.env.PUBLIC_URL + "/"} className="dropdownMenu">
              {c.categoryname}
            </Link>
            <ul className="sub-menu">
              {c.subcategory.filter(opt => opt.active !== false).map((s, j) => (
                <li key={j} onClick={() => callRedux(c.categoryid, s.categoryid, c.slug, s.slug, s.categoryname)}>
                  <Link to={{ pathname: process.env.PUBLIC_URL + "/store/" + c.slug + "/" + s.slug, aboutProps: { categoryid: c.categoryid, subcategoryid: s.categoryid } }}>
                    {s.categoryname}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}

      </ul> */}


      {/* ================= */}



      {/* <ul> */}
      {/* <li className="menu-item-has-children">
          <Link to={process.env.PUBLIC_URL + "/"}>{strings["home"]}</Link>
          <ul className="sub-menu">
            <li className="menu-item-has-children">
              <Link to={process.env.PUBLIC_URL + "/"}>
                {strings["home_group_one"]}
              </Link>
              <ul className="sub-menu">

                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-fashion-seven"}>
                    {strings["home_fashion_seven"]}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-fashion-eight"}>
                    {strings["home_fashion_eight"]}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-kids-fashion"}>
                    {strings["home_kids_fashion"]}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-cosmetics"}>
                    {strings["home_cosmetics"]}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-furniture"}>
                    {strings["home_furniture"]}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-furniture-two"}>
                    {strings["home_furniture_two"]}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-furniture-three"}>
                    {strings["home_furniture_three"]}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-furniture-four"}>
                    {strings["home_furniture_four"]}
                  </Link>
                </li>
              </ul>
            </li>
            <li className="menu-item-has-children">
              <Link to={process.env.PUBLIC_URL + "/"}>
                {strings["home_group_two"]}
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-furniture-five"}>
                    {strings["home_furniture_five"]}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-furniture-six"}>
                    {strings["home_furniture_six"]}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-furniture-seven"}>
                    {strings["home_furniture_seven"]}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-electronics"}>
                    {strings["home_electronics"]}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-electronics-two"}>
                    {strings["home_electronics_two"]}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-electronics-three"}>
                    {strings["home_electronics_three"]}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-book-store"}>
                    {strings["home_book_store"]}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-book-store-two"}>
                    {strings["home_book_store_two"]}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-plants"}>
                    {strings["home_plants"]}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-flower-shop"}>
                    {strings["home_flower_shop"]}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-flower-shop-two"}>
                    {strings["home_flower_shop_two"]}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-organic-food"}>
                    {strings["home_organic_food"]}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-organic-food-two"}>
                    {strings["home_organic_food_two"]}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-onepage-scroll"}>
                    {strings["home_onepage_scroll"]}
                  </Link>
                </li>
              </ul>
            </li>
            <li className="menu-item-has-children">
              <Link to={process.env.PUBLIC_URL + "/"}>
                {strings["home_group_three"]}
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-grid-banner"}>
                    {strings["home_grid_banner"]}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-auto-parts"}>
                    {strings["home_auto_parts"]}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-cake-shop"}>
                    {strings["home_cake_shop"]}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-handmade"}>
                    {strings["home_handmade"]}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-pet-food"}>
                    {strings["home_pet_food"]}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-medical-equipment"}>
                    {strings["home_medical_equipment"]}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-christmas"}>
                    {strings["home_christmas"]}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-black-friday"}>
                    {strings["home_black_friday"]}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-black-friday-two"}>
                    {strings["home_black_friday_two"]}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-valentines-day"}>
                    {strings["home_valentines_day"]}
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </li> */}

      {/* <li className="menu-item-has-children">
          <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
            {strings["shop"]}
          </Link>
          <ul className="sub-menu">
            <li className="menu-item-has-children">
              <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                {strings["shop_layout"]}
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                    {strings["shop_grid_standard"]}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/shop-grid-filter"}>
                    {strings["shop_grid_filter"]}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/shop-grid-two-column"}>
                    {strings["shop_grid_two_column"]}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/shop-grid-no-sidebar"}>
                    {strings["shop_grid_no_sidebar"]}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/shop-grid-full-width"}>
                    {strings["shop_grid_full_width"]}
                  </Link>
                </li>
                <li>
                  <Link
                    to={process.env.PUBLIC_URL + "/shop-grid-right-sidebar"}
                  >
                    {strings["shop_grid_right_sidebar"]}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/shop-list-standard"}>
                    {strings["shop_list_standard"]}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/shop-list-full-width"}>
                    {strings["shop_list_full_width"]}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/shop-list-two-column"}>
                    {strings["shop_list_two_column"]}
                  </Link>
                </li>
              </ul>
            </li>
            <li className="menu-item-has-children">
              <Link to={process.env.PUBLIC_URL + "/product/1"}>
                {strings["product_details"]}
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to={process.env.PUBLIC_URL + "/product/1"}>
                    {strings["product_tab_bottom"]}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/product-tab-left/1"}>
                    {strings["product_tab_left"]}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/product-tab-right/1"}>
                    {strings["product_tab_right"]}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/product-sticky/1"}>
                    {strings["product_sticky"]}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/product-slider/1"}>
                    {strings["product_slider"]}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/product-fixed-image/1"}>
                    {strings["product_fixed_image"]}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/product/1"}>
                    {strings["product_simple"]}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/product/1"}>
                    {strings["product_variation"]}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/product/1"}>
                    {strings["product_affiliate"]}
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </li> */}




      {/* <li>
          <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
            {strings["collection"]}
          </Link>
        </li> */}








      {/* 
        <li className="menu-item-has-children">
          <Link to={process.env.PUBLIC_URL + "/"}>{strings["pages"]}</Link>
          <ul className="sub-menu">
            <li>
              <Link to={process.env.PUBLIC_URL + "/cart"}>
                {strings["cart"]}
              </Link>
            </li>
          </ul>
        </li> */}



      {/* ----------------------------------------- */}
      {/* <li>
          {morecategories.length > 0 ? (<Link to={process.env.PUBLIC_URL + "/"}>
            More
            {sidebarMenu ? (
              <span>
                <i className="fa fa-angle-right"></i>
              </span>
            ) : (
                <i className="fa fa-angle-down" />
              )}
          </Link>) : null
          }
          <ul className="mega-menu mega-menu-padding">
            {morecategories.length > 0 && morecategories.map((c, i) => (
              <li key={i}>
                <ul>
                  <li className="mega-menu-title">
                    <Link>
                      {c.categoryname}
                    </Link>
                  </li>
                  {c.subcategory.map((s, i) => (
                    <li key={i}>
                      <Link to={{ pathname: process.env.PUBLIC_URL + "/ecommerce-generic/" + c.slug + "/" + s.slug, aboutProps: { categoryid: c.categoryid, subcategoryid: s.categoryid } }}>
                        <button onClick={() => callRedux(c.categoryid, s.categoryid)} style={{ backgroundColor: '#fff', border: 'none' }}>
                          {s.categoryname}
                        </button>
                      </Link>
                    </li>
                  ))
                  }
                </ul>
              </li>
            ))}
          </ul>
        </li> */}


      {/* ---------------------------------------- */}




      {/* <li className="menu-item-has-children">
                    <Link to={process.env.PUBLIC_URL + "/blog-standard"}>
                        {strings["blog"]}
                    </Link>
                    <ul className="sub-menu">
                        <li>
                            <Link to={process.env.PUBLIC_URL + "/blog-standard"}>
                                {strings["blog_standard"]}
                            </Link>
                        </li>
                        <li>
                            <Link to={process.env.PUBLIC_URL + "/blog-no-sidebar"}>
                                {strings["blog_no_sidebar"]}
                            </Link>
                        </li>
                        <li>
                            <Link to={process.env.PUBLIC_URL + "/blog-right-sidebar"}>
                                {strings["blog_right_sidebar"]}
                            </Link>
                        </li>
                        <li>
                            <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                                {strings["blog_details_standard"]}
                            </Link>
                        </li>
                    </ul>
                </li> */}
      {/* <li>
          <Link to={process.env.PUBLIC_URL + "/contact"}>
            {strings["contact_us"]}
          </Link>
        </li> */}
      {/* </ul> */}
    </nav >
  );
};

MobileNavMenu.propTypes = {
  strings: PropTypes.object
};

export default multilanguage(MobileNavMenu);
