import PropTypes from "prop-types";
import React from "react";
import Swiper from "react-id-swiper";
import SectionTitleSeven from "../../components/section-title/SectionTitleSeven";
import ProductGridNine from "./ProductGridNine";
import './StyleSlideFour.css';

const ProductSliderFour = ({ spaceBottomClass, category }) => {
  const settings = {
    loop: true,
    slidesPerView: 4,
    grabCursor: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    breakpoints: {
      1024: {
        slidesPerView: 4
      },
      768: {
        slidesPerView: 3
      },
      640: {
        slidesPerView: 2
      },
      320: {
        slidesPerView: 2
      }
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    renderPrevButton: () => (
      <button className="swiper-button-prev ht-swiper-button-nav">
        <i className="pe-7s-angle-left pe1" />
      </button>
    ),
    renderNextButton: () => (
      <button className="swiper-button-next ht-swiper-button-nav">
        <i className="pe-7s-angle-right pe2" />
      </button>
    )

  };

  return (
    <div
      className={`related-product-area ${
        spaceBottomClass ? spaceBottomClass : ""
        }`}
    >
      <div className="container">
        <SectionTitleSeven
          titleText="New Products"
      
          spaceClass="mb-55"
          borderClass="no-border"
          positionClass="text-center"
        />
        <div className="row">
          <Swiper {...settings}>
            <ProductGridNine
              category={category}
              limit={6}
              sliderClassName="swiper-slide"
              type="new"
            />
          </Swiper>
        </div>
      </div>
    </div>
  );
};

ProductSliderFour.propTypes = {
  category: PropTypes.string,
  spaceBottomClass: PropTypes.string
};

export default ProductSliderFour;
