import PropTypes from "prop-types";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import ProductGridSingleNine from "../../components/product/ProductGridSingleNine";
import {  fetchNewproducts } from "../../redux/actions/productActions";

const ProductGridNine = ({
  sliderClassName,
  spaceBottomClass,
  colorClass
}) => {

  const dispatch = useDispatch();

  const dataReducer = useSelector((state) => state.productData);
  // const { product } = dataReducer;
  // console.log("New Products ", dataReducer.newproducts);

  useEffect(() => {
    dispatch(fetchNewproducts());

  }, []);


  return (
    <Fragment>
      {dataReducer.newproducts && dataReducer.newproducts.map((product) => {
        return (
          <ProductGridSingleNine
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

ProductGridNine.propTypes = {

  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string,
};

export default ProductGridNine;
