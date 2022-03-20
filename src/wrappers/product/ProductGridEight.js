import PropTypes from "prop-types";
import React, { Fragment, useEffect } from "react";
import ProductGridSingleEightNew from "../../components/product/ProductGridSingleEightNew";
import { useSelector, useDispatch } from 'react-redux';
import {fetchOurProducts } from "../../redux/actions/productActions";

const ProductGridEight = ({
  sliderClassName,
  spaceBottomClass,
  colorClass
}) => {

  const dispatch = useDispatch();


  const dataReducer = useSelector((state) => state.productData);

  useEffect(() => {
    dispatch(fetchOurProducts());
  }, []);


  return (
    <Fragment>
      {dataReducer.ourproducts && dataReducer.ourproducts.map((product) => {
        return (
          <ProductGridSingleEightNew
            sliderClassName={sliderClassName}
            spaceBottomClass={spaceBottomClass}
            colorClass={colorClass}
            product={product}
            key={product.productId}
          />
        );
      })}
    </Fragment>
  );
};

ProductGridEight.propTypes = {

  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string,
};

export default ProductGridEight;
