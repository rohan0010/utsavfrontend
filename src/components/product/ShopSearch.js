import React, { useState } from "react";
import {searchproduct} from "../../redux/actions/productActions";
import { useSelector, useDispatch } from 'react-redux';
import { useToasts } from "react-toast-notifications";

const ShopSearch = () => { 

  const dispatch = useDispatch();
  const [search,setSearch]=useState("") 
  
  const dataReducer = useSelector((state) => state.productData);

  const { addToast } = useToasts();

  return ( 
    <div style={{display: dataReducer.searchglobaltitle!==null?'none':'flex'}}>
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Search </h4>
      <div className="pro-sidebar-search mb-50 mt-25">
        <div className="pro-sidebar-search-form">
          <input 
           onKeyPress={event => {
            if (event.key === 'Enter') {
              dispatch(searchproduct(search,
                dataReducer.catandsubcat.categoryid,
                dataReducer.catandsubcat.subcategoryid,
                1,
                addToast))
            }
          }}
          
          type="text" placeholder="Search here..." onChange={e =>  setSearch(e.target.value)} required/>
          <button 
          onClick={()=> 
          dispatch(searchproduct(search,
          dataReducer.catandsubcat.categoryid,
          dataReducer.catandsubcat.subcategoryid,
          1,
          addToast))}>
            <i className="pe-7s-search" />
          </button>
          </div>
      </div>
    </div>
    </div>
  );
};
export default ShopSearch;