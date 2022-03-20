import PropTypes from "prop-types";
import React from "react";
import Swiper from "react-id-swiper";
import SectionTitleSeven from "../../components/section-title/SectionTitleSeven";
import ProductGridEight from "./ProductGridEight";
import './StyleSliderThree.css';

const ProductSliderThree = ({ spaceBottomClass, category, colorClass }) => {
    const settings = {
        loop: true,
        slidesPerView: 4,
        grabCursor: true,
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
                <i className="pe-7s-angle-left pe3" />
            </button>
        ),
        renderNextButton: () => (
            <button className="swiper-button-next ht-swiper-button-nav">
                <i className="pe-7s-angle-right pe4" />
            </button>
        )
    };

    return (
        <div
            className={`related-product-area ${
                spaceBottomClass ? spaceBottomClass : ""
                }`}
        >
            <div className="container mb-5">
                <SectionTitleSeven
                    titleText="Best Seller"
                    subtitleText="Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    positionClass="text-center"
                    spaceClass="mb-55"
                    borderClass="no-border"
                />
                <div className="row">
                    <Swiper {...settings}>
                        <ProductGridEight
                            category={category}
                            limit={6}
                            sliderClassName="swiper-slide"
                            colorClass={colorClass}
                        />
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

ProductSliderThree.propTypes = {
    category: PropTypes.string,
    spaceBottomClass: PropTypes.string
};

export default ProductSliderThree;
