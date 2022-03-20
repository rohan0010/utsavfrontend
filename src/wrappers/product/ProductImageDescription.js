import React from "react";
import { useToasts } from "react-toast-notifications";
import ProductImageGallery from "../../components/product/ProductImageGallery";
import ProductDescriptionInfo from "../../components/product/ProductDescriptionInfo";


const ProductImageDescription = ({
  spaceTopClass,
  spaceBottomClass,
  galleryType,
  product,
}) => {
  // console.log("rjjjj", product)
  const { addToast } = useToasts();

  return (
    <div
      className={`shop-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
        }`}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            {product.imageUrls ? (<ProductImageGallery product={product} />) : null}
          </div>
          <div className="col-lg-6 col-md-6">
            {/* product description info */}
            <ProductDescriptionInfo
              product={product}
            />
          </div>
        </div>
      </div>
    </div>
  );
};


export default ProductImageDescription;
