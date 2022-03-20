import PropTypes from "prop-types";
import React, { Fragment,useEffect } from "react";
import MetaTags from "react-meta-tags";
import { useSelector,useDispatch } from 'react-redux';
import LayoutOne from "../../layouts/LayoutOne";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import {
  fetchproductbyslug
  } from '../../redux/actions/productActions';

const Product = ({ location }) => {
  const dataReducer = useSelector((state) => state.productData);
  const dispatch = useDispatch();

    useEffect(() => {
        if(dataReducer.product.length===0)
        {
            dispatch(fetchproductbyslug(window.location.href.split('product/')[1].split('?')[0]))
        }
        if(dataReducer.product.length>0&&dataReducer.productbyid.slug!==(window.location.href.split('product/')[1].split("?")[0]))
        {
            dispatch(fetchproductbyslug(window.location.href.split('product/')[1].split('?')[0]))
        }
        // fetchcartprice()
        // dispatch(fetchcarts(addToast, 0));
        // init12();
        // init2();
        // init3();
      }, []);
  return (
    <Fragment>
      <MetaTags>
        <title>Utsav Plasto Tech | Product Page</title>
        <meta
          name="description"
          content="Utsav Plasto Tech | Product Page"
        />
      </MetaTags>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        {/* <Breadcrumb /> */}

        {/* product description with image */}
        {dataReducer.productbyid.imageUrls ? (<ProductImageDescription
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          product={dataReducer.productbyid}
        />) : null}

        {dataReducer.productbyid.imageUrls ? (<ProductDescriptionTab
          spaceBottomClass="pb-90"
          product={dataReducer.productbyid}
        />) : null}
        {/* product description tab */}


        {/* related product slider */}
        <RelatedProductSlider
          spaceBottomClass="pb-95"
        // category={product.category[0]}
        />
      </LayoutOne>
    </Fragment>
  );
};

Product.propTypes = {
  location: PropTypes.object
};


export default Product;
