import PropTypes from "prop-types";
import React, { Fragment } from "react";
import ProductGridSingle from "../../components/product/ProductGridSingle";
import { useSelector } from 'react-redux';


const ProductGrid = ({
  sliderClassName,
  spaceBottomClass
}) => {

  const dataReducer = useSelector((state) => state.productData);
  var filter= dataReducer.product.filter((item) => item.productId !== dataReducer.productbyid.productId);

  // const { product } = dataReducer;
  // console.log(" Produdcutct", dataReducer.product1);

  // useEffect(() => {
  //   dispatch(fetch3product());
  // }, []);


  return (
    <Fragment>
      {dataReducer.product.map(product => {
        return (
          <ProductGridSingle
            sliderClassName={sliderClassName}
            spaceBottomClass={spaceBottomClass}
            product={product}
            key={product.productId}
          />
        );
      })}
    </Fragment>
  );
};

ProductGrid.propTypes = {
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,

};


export default ProductGrid;
