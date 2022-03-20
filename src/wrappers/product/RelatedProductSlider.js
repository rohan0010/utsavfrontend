import PropTypes from "prop-types";
import React from "react";
import Swiper from "react-id-swiper";
import SectionTitle from "../../components/section-title/SectionTitle";
import ProductGrid from "./ProductGrid";
import { useSelector } from 'react-redux';

const RelatedProductSlider = ({ spaceBottomClass }) => { 

  const dataReducer = useSelector((state) => state.productData);

  const settings = {
    loop: false,
    slidesPerView: 4,
    grabCursor: true,
    breakpoints: {
      1024: {
        slidesPerView: 4
      },
      768: {
        slidesPerView: 4
      },
      640: {
        slidesPerView: 2
      },
      320: {
        slidesPerView: 1
      }
    }
  };

  return (
    <div
      className={`related-product-area ${
        spaceBottomClass ? spaceBottomClass : ""
        }`}
    >
      <div className="container"> 
      { dataReducer.product.length > 4
        ? <SectionTitle
          titleText="Related Products"
          positionClass="text-center"
          spaceClass="mb-50"
        />: null 
      }
      { dataReducer.product.length > 4?
        (<div className="row">
          <Swiper {...settings}>
            <ProductGrid
              limit={6}
              sliderClassName="swiper-slide"
            />
          </Swiper>
        </div>):null
}
      </div>
    </div>
  );
};

RelatedProductSlider.propTypes = {
  category: PropTypes.string,
  spaceBottomClass: PropTypes.string
};

export default RelatedProductSlider;
