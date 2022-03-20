import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import ProductGridSingleEight from "../../components/product/ProductGridSingleEight";
// import ProductGridSingleEight1 from "../../components/product/ProductGridSingleEight1";
import { useSelector, useDispatch } from 'react-redux';
import { fetch3product } from "../../redux/actions/productActions";

const ProductGridEight = ({
  sliderClassName,
  spaceBottomClass,
  colorClass
}) => {

  const dispatch = useDispatch();


  const dataReducer = useSelector((state) => state.productData);

  useEffect(() => {
    dispatch(fetch3product());
  }, []);


  return (
    <Fragment>
      {dataReducer.product1 && dataReducer.product1.map((product) => {
        return (
          <ProductGridSingleEight
            sliderClassName={sliderClassName}
            spaceBottomClass={spaceBottomClass}
            colorClass={colorClass}
            product={product}
            key={product.productId}
          />

          // <ProductGridSingleEight1
          //   sliderClassName={sliderClassName}
          //   spaceBottomClass={spaceBottomClass}
          //   colorClass={colorClass}
          //   product={product}
          //   addToCart={addToCart}
          //   addToWishlist={addToWishlist}
          //   addToCompare={addToCompare}
          //   cartItem={
          //     cartItems.filter((cartItem) => cartItem.id === product.id)[0]
          //   }
          //   wishlistItem={
          //     wishlistItems.filter(
          //       (wishlistItem) => wishlistItem.id === product.id
          //     )[0]
          //   }
          //   compareItem={
          //     compareItems.filter(
          //       (compareItem) => compareItem.id === product.id
          //     )[0]
          //   }
          //   key={product.id}
          // />
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
