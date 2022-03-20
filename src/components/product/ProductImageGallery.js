/* eslint-disable jsx-a11y/alt-text */
import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import { LightgalleryProvider, LightgalleryItem } from 'react-lightgallery';
import Swiper from 'react-id-swiper';

const ProductImageGallery = ({ product }) => {
  const [gallerySwiper, getGallerySwiper] = useState(null);
  const [thumbnailSwiper, getThumbnailSwiper] = useState(null);

  var filter= product.imageUrls.filter((item) => item !== null);

  // effect for swiper slider synchronize
  useEffect(() => {
  var filter= product.imageUrls.filter((item) => item !== null);
    if (
      gallerySwiper !== null &&
      gallerySwiper.controller &&
      thumbnailSwiper !== null &&
      thumbnailSwiper.controller
    ) {
      gallerySwiper.controller.control = thumbnailSwiper;
      thumbnailSwiper.controller.control = gallerySwiper;
    }
  }, [gallerySwiper, thumbnailSwiper,product]);

  // swiper slider settings
  const gallerySwiperParams = {
    getSwiper: getGallerySwiper,
    spaceBetween: 10,
    loopedSlides: 4,
    loop: true,
    effect: 'fade',
  };

  const thumbnailSwiperParams = {
    getSwiper: getThumbnailSwiper,
    spaceBetween: 10,
    slidesPerView: 4,
    loopedSlides: 4,
    touchRatio: 0.2,
    freeMode: true,
    loop: true,
    slideToClickedSlide: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    renderPrevButton: () => (
      <button className='swiper-button-prev ht-swiper-button-nav'>
        <i className='pe-7s-angle-left' />
      </button>
    ),
    renderNextButton: () => (
      <button className='swiper-button-next ht-swiper-button-nav'>
        <i className='pe-7s-angle-right' />
      </button>
    ),
  };

  return (
    <Fragment>
      <div className='product-large-image-wrapper'>
        <LightgalleryProvider>
          {product.imageUrls.length > 0 ? (
            <Swiper {...gallerySwiperParams}>
              {filter &&
                filter.length > 0 &&
                filter.filter((item) => item !== null).map((single, key) => {
                  return (
                    <div key={key}>
                      {single!==null ? (
                        <React.Fragment>
                          <LightgalleryItem
                            group='any'
                            src={`https://api.utsavplastotech.com${single}`}
                          >
                            <button>
                              <i className="pe-7s-expand1"></i>
                            </button>
                          </LightgalleryItem>
                          <div className='single-image'>
                            <img
                            style={{height:"564px",
                          objectFit:"contain"}}
                              src={`https://api.utsavplastotech.com${single}`}
                              className='img-fluid'
                              alt='product-img'
                            />
                          </div>
                        </React.Fragment>
                      ) : (
                          <React.Fragment>
                            <LightgalleryItem
                              group='any'
                              src={
                                process.env.PUBLIC_URL +
                                '/assets/img/externalimages/no-image-available.jpg'
                              }
                            >
                              <button>
                                <i className='pe-7s-expand1'></i>
                              </button>
                            </LightgalleryItem>
                            <div className='single-image'>
                              <img
                              src={
                                process.env.PUBLIC_URL +
                                '/assets/img/externalimages/no-image-available.jpg'
                              }
                                className='img-fluid'
                                alt='product-image'
                              />
                            </div>
                          </React.Fragment>
                        )}
                    </div>
                  );
                })}
            </Swiper>
          ) : (
              <img
                src={
                  process.env.PUBLIC_URL +
                  '/assets/img/externalimages/no-image-available.jpg'
                }
                className='img-fluid'
                alt='product-img1'
              />
            )}
        </LightgalleryProvider>
      </div>
      <div className='product-small-image-wrapper mt-15'>
        <Swiper {...thumbnailSwiperParams}>
          {filter &&
            filter.length > 0 &&
            filter.map((single, key) => {
              return (
                <div key={key}>
                  <div className='single-image'>
                    {single!=null ? (
                      <img
                        src={`https://api.utsavplastotech.com${single}`}
                        className='img-fluid'
                      />
                    ) : (
                        <img
                        src={
                          process.env.PUBLIC_URL +
                          '/assets/img/externalimages/no-image-available.jpg'
                        }
                          className='img-fluid'
                        />
                      )}
                  </div>
                </div>
              );
            })}
        </Swiper>
      </div>
    </Fragment>
  );
};

ProductImageGallery.propTypes = {
  product: PropTypes.object,
};

export default ProductImageGallery;
