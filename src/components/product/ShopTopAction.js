import PropTypes from "prop-types";
import React from "react";
import { sortproduct } from "../../redux/actions/productActions";
import { useSelector, useDispatch } from 'react-redux';
import { useToasts } from "react-toast-notifications";
import './style.css';

const ShopTopAction = ({
  getLayout,
  getFilterSortParams,
  productCount,
  sortedProductCount
}) => {
  const dispatch = useDispatch();

  const { addToast } = useToasts();

  const dataReducer = useSelector((state) => state.productData);

  return (
    <div className="shop-top-bar mb-35">
      <div className="select-shoing-wrap">
        <div className="shop-select">
          <select
            onChange={e => {
              let searchParams = new URLSearchParams(window.location.search);
              searchParams.set('page',1)
                      let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + searchParams.toString();
                      window.history.pushState({path: newurl}, '', newurl);
              dispatch(sortproduct(e.target.value,dataReducer.catandsubcat.categoryid,dataReducer.catandsubcat.subcategoryid,dataReducer.variantname,dataReducer.variantvalue,dataReducer.searchtitle,dataReducer.searchglobaltitle,dataReducer.lowerprice,dataReducer.higherprice,addToast,1))}}
          >
            <option value="priceHighToLow">Default</option>
            <option value="priceHighToLow">Price - High to Low</option>
            <option value="priceLowToHigh">Price - Low to High</option>
          </select>
        </div>
        <p>
          {/* Showing {sortedProductCount} of {productCount} result */}
        </p>
      </div>
      <div className="shop-tab">
      </div>
    </div>
  );
};
ShopTopAction.propTypes = {
  getFilterSortParams: PropTypes.func,
  getLayout: PropTypes.func,
  productCount: PropTypes.number,
  sortedProductCount: PropTypes.number
};
export default ShopTopAction;