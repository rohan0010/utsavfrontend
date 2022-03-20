/* eslint-disable jsx-a11y/alt-text */
import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import Swiper from 'react-id-swiper';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { addToCart, fetchcarts } from '../../redux/actions/cartActions';
import { deletewishlist } from '../../redux/actions/wishlistActions';
import { fetchApi } from '../../services/api';
import SizeModal from './SizeModal';
import './style.css';
import Rating from './sub-components/ProductRating';

var optionsa = [];
var optionsb = [];
function ProductModal(props) {
  const { product } = props;
  const dataReducer = useSelector((state) => state.wishlistData);
  const [price, setprice] = useState('');
  const [mrp, setmrp] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [gallerySwiper, getGallerySwiper] = useState(null);
  const [thumbnailSwiper, getThumbnailSwiper] = useState(null);
  const [quantityCount, setQuantityCount] = useState(1);
  const [show, setshow] = useState(false);
  const [sku, setsku] = useState('');

  const [modalShow, setModalShow] = useState(false);
  const getVariants = () => {


    var colors = [...new Set(product.variants.map(x => x.variant1.value))];

    let variants = new Map();

    colors.forEach((x) => {
      product.variants.forEach((e) => {

        if (e.variant1.value == x) {
          let obj = {
            "variantId": e.variantId,
            "skucode": e.skucode,
            "mrp": e.mrp,
            "stock": e.stock,
            "price": e.price,
            "variantValue": e.variant2 ? e.variant2.value : ''
          }

          if (variants.get(x)) {
            variants.get(x).push(obj);
          }
          else {

            variants.set(x, [obj]);
          }

        }
      });
    })
    let colorarray = []
    variants.forEach(function (value, key) {

      colorarray.push({
        key: key,
        value: value
      })
      // arrz.push({
      //   key: key,
      //   value: value.values,
      // });
      // optionsa.push({
      //   value: key,
      //   label: key,
      // });
    });
    setvariantMap(variants)

    setprice(product.variants[0].price);
    setsku(product.variants[0].skucode ? product.variants[0].skucode : '');
    setmrp(product.variants[0].mrp);

    setcolorArray(colorarray)
    setaddcart({
      "productName": product.title,
      "productImage": product.imageUrls.length > 0 ? product.imageUrls[0] : null,
      "productId": product.productId,
      "variantId": product.variants[0].variantId,
      "variant1": product.variants[0].variant1,
      "variant2": product.variants[0].variant2,
      "price": product.variants[0].price,
      "stock": product.variants[0].stock,
      "mrp": product.variants[0].mrp,
      "skucode": product.variants[0].skucode,
      "quantity": quantityCount

    })
    colorChange1(colorarray[0].key, variants)
  }
  const colorChange = (key) => {
    var sizearray = variantMap.get(key);
    setactiveColor(key)
    // for(let i=0;i<variantMap.le)
    setsku(sizearray[0].skucode ? sizearray[0].skucode : '');
    setprice(sizearray[0].price);

    setmrp(sizearray[0].mrp);
    setactiveSize(sizearray[0].variantValue)
    setsizeArray(sizearray)
    setaddcart({
      "productName": product.title,
      "productImage": product.imageUrls.length > 0 ? product.imageUrls[0] : null,
      "productId": product.productId,
      "variantId": sizearray[0].variantId,
      "variant1": {
        "name": "color",
        "value": key
      },
      "variant2": {
        "name": "size",
        "value": sizearray[0].variantValue
      },
      "price": sizearray[0].price,
      "stock": sizearray[0].stock,
      "mrp": sizearray[0].mrp,
      "skucode": sizearray[0].skucode,
      "quantity": quantityCount

    })

  }

  const colorChange12 = (value) => {
    // var sizearray=variantMap.get(key);

    // for(let i=0;i<variantMap.le)
    setsku(value.skucode ? value.skucode : '');
    setprice(value.price);

    setmrp(value.mrp);
    setactiveColor(value.variant1.value)
    setaddcart({
      "productName": product.title,
      "productImage": product.imageUrls.length > 0 ? product.imageUrls[0] : null,
      "productId": product.productId,
      "variantId": value.variantId,
      "variant1": value.variant1,

      "price": value.price,
      "stock": value.stock,
      "mrp": value.mrp,
      "skucode": value.skucode,
      "quantity": quantityCount

    })


  }

  const sizeChange = (value) => {

    setsku(value.skucode ? value.skucode : '');
    setprice(value.price);

    setmrp(value.mrp);
    setactiveSize(value.variantValue)
    setaddcart({
      "productName": product.title,
      "productImage": product.imageUrls.length > 0 ? product.imageUrls[0] : null,
      "productId": product.productId,
      "variantId": value.variantId,
      "variant1": {
        "name": "color",
        "value": activeColor
      },
      "variant2": {
        "name": "size",
        "value": value.variantValue
      },
      "price": value.price,
      "stock": value.stock,
      "mrp": value.mrp,
      "skucode": value.skucode,
      "quantity": quantityCount

    })

  }


  const sizeChange1 = (value) => {

    setsku(value.skucode ? value.skucode : '');
    setprice(value.price);

    setmrp(value.mrp);
    setactiveSize(value.variant2.value)
    setaddcart({
      "productName": product.title,
      "productImage": product.imageUrls.length > 0 ? product.imageUrls[0] : null,
      "productId": product.productId,
      "variantId": value.variantId,

      "variant2": {
        "name": "size",
        "value": value.variant2.value
      },
      "price": value.price,
      "stock": value.stock,
      "mrp": value.mrp,
      "skucode": value.skucode,
      "quantity": quantityCount

    })

  }
  const colorChange1 = (key, variants) => {
    setactiveColor(key)
    var sizearray = variants.get(key);


    setsizeArray(sizearray)
    setactiveSize(sizearray[0].variantValue)


  }
  const getVariants1 = () => {
    setprice(product.variants[0].price);
    setsku(product.variants[0].skucode ? product.variants[0].skucode : '');
    setmrp(product.variants[0].mrp);
    setsizeArray1(product.variants)
    setactiveSize(product.variants[0].variant2.value)
    setaddcart({
      "productName": product.title,
      "productImage": product.imageUrls.length > 0 ? product.imageUrls[0] : null,
      "productId": product.productId,
      "variantId": product.variants[0].variantId,
      "variant2": product.variants[0].variant2,
      "price": product.variants[0].price,
      "stock": product.variants[0].stock,
      "mrp": product.variants[0].mrp,
      "skucode": product.variants[0].skucode,
      "quantity": quantityCount

    })

  }

  const getVariants2 = () => {

    setprice(product.variants[0].price);
    setsku(product.variants[0].skucode ? product.variants[0].skucode : '');
    setmrp(product.variants[0].mrp);
    setcolorArray1(product.variants)
    setactiveColor(product.variants[0].variant1.value)
    setaddcart({
      "productName": product.title,
      "productImage": product.imageUrls.length > 0 ? product.imageUrls[0] : null,
      "productId": product.productId,
      "variantId": product.variants[0].variantId,
      "variant1": product.variants[0].variant1,
      "price": product.variants[0].price,
      "stock": product.variants[0].stock,
      "mrp": product.variants[0].mrp,
      "skucode": product.variants[0].skucode,
      "quantity": quantityCount

    })

  }
  useEffect(() => {
    init();
    if (product.variants[0].variant1 && product.variants[0].variant2) {
      getVariants()

    }
    if (!product.variants[0].variant1 && product.variants[0].variant2) {
      getVariants1()
    }
    if (product.variants[0].variant1 && !product.variants[0].variant2) {
      getVariants2()
    }
    if (
      gallerySwiper !== null &&
      gallerySwiper.controller &&
      thumbnailSwiper !== null &&
      thumbnailSwiper.controller
    ) {
      gallerySwiper.controller.control = thumbnailSwiper;
      thumbnailSwiper.controller.control = gallerySwiper;
    }
  }, [gallerySwiper, thumbnailSwiper, dataReducer.wishlistItems1]);
  const gallerySwiperParams = {
    getSwiper: getGallerySwiper,
    spaceBetween: 10,
    loopedSlides: 4,
    loop: true,
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
  const [productVariants, setProductVariants] = useState([]);
  const dispatch = useDispatch();
  const [selectedOption, setselectedOption] = useState('');
  const [selectedOption1, setselectedOption1] = useState('');
  const [variantMap, setvariantMap] = useState('');
  const [colorArray, setcolorArray] = useState([])
  const [colorArray1, setcolorArray1] = useState([])
  const [activeColor, setactiveColor] = useState("")
  const [activeSize, setactiveSize] = useState("")

  const [sizeArray, setsizeArray] = useState([])
  const [sizeArray1, setsizeArray1] = useState([])
  const [addcart, setaddcart] = useState(
    {
      "productName": product.title,
      "productImage": product.imageUrls.length > 0 ? product.imageUrls[0] : null,
      "productId": product.productId,
      "variantId": "gWAphFF5",
      "variant1": { "name": "color", "value": "red" },
      "variant2": { "name": "size", "value": 32 },
      "price": 1000,
      "stock": 15,
      "mrp": 400,
      "skucode": "hbshbbhs",
      "quantity": 1

    }
  )
  const { addToast } = useToasts();

  var data = new Map();

  const getWishlist = () => {
    if (show) {
      return <i class='fa fa-heart fa-heart-wishlist'></i>;
    }
    return <i className='pe-7s-like wishlist-btn' />;
  };
  const handleChange = (selectedOption) => {
    setselectedOption(selectedOption);
    setselectedOption1('');
    var productIndex = productVariants.findIndex(
      (x) => x.key === selectedOption.value
    );
    optionsb = [];
    for (var i = 0; i < productVariants[productIndex].value.length; i++) {
      optionsb.push({
        label: productVariants[productIndex].value[i].value,
        value: productVariants[productIndex].value[i].value,
      });
    }
  };
  const handleChange2 = (selectedOpti) => {
    setselectedOption1(selectedOpti);
    var productIndex = productVariants.findIndex(
      (x) => x.key === selectedOption.value
    );
    for (var i = 0; i < productVariants[productIndex].value.length; i++) {
      if (productVariants[productIndex].value[i].value === selectedOpti.value) {
        setprice(productVariants[productIndex].value[i].price);
        setmrp(productVariants[productIndex].value[i].mrp);
      }
    }
  };
  const init = async () => {
    var productIndex = dataReducer.wishlistItems1.findIndex(
      (x) => x.productId === product.productId
    );
    if (productIndex > -1) {
      setshow(true);
    }
    if (productIndex === -1) {
      setshow(false);
    }
    var arrz = [];
    var arr1 = [];
    if (product.variants !== undefined) {
      for (var i = 0; i < product.variants.length; i++) {
        if (
          product.variants[0].variantName !== undefined &&
          product.variants &&
          product.variants.length > 0
        ) {
          arr1.push({
            variantName: product.variants[i].variantName,
            value: product.variants[i].value,
            price: product.variants[i].price,
            stock: product.variants[i].stock,
            mrp: product.variants[i].mrp,
            variantId: product.variants[i].variantId,
            _id: product.variants[i]._id,
          });
        }
      }
    }
    arr1.forEach((x, i) => {
      let name = x.variantName;
      delete x.variantName;
      if (data.has(name)) {
        data.get(name).values.push(x);
      } else {
        data.set(name, { values: [x] });
      }
    });
    optionsa = [];
    data.forEach(function (value, key) {
      arrz.push({
        key: key,
        value: value.values,
      });
      optionsa.push({
        value: key,
        label: key,
      });
    });
    setProductVariants(arrz);
    optionsb = [];
    setProductVariants(arrz);
    if (arrz.length > 0) {
      setprice(product.variants[0].price);
      setmrp(product.variants[0].mrp);
      setselectedOption(optionsa[0]);

      for (i = 0; i < arrz[0].value.length; i++) {
        optionsb.push({
          label: arrz[0].value[i].value,
          value: arrz[0].value[i].value,
        });
      }
      setselectedOption1(optionsb[0]);
    }
  };
  const addToCarta = () => {
    let cart = addcart
    if(cart.stock<quantityCount)
    {
      addToast("Stock Unavailable", {
        appearance: 'warning',
        autoDismiss: true,
      });
      return 0
    }
    cart.quantity = quantityCount

    let cartobj = {
      cart
    };

    return fetchApi('/userdash/addToCart', cart, {}, true, 'post')
      .then((response) => {
        
        if (response.data.message === 'success') {
          dispatch(fetchcarts());
          dispatch(addToCart(cartobj.variantName, addToast, quantityCount));
        } else {
          if (response.data.message === 'Access denied') {
            addToast('Please Login', {
              appearance: 'warning',
              autoDismiss: true,
            });
            setRedirect(true);
          } else {
            addToast(response.data.message, {
              appearance: 'warning',
              autoDismiss: true,
            });
          }
        }
      })
      .catch((err) => console.log('error ->', err));
  };


  const addToWishlist = (productId, addToast) => {
    dispatch(deletewishlist(productId, addToast));
  };

  const redirectLogin = () => {
    if (redirect) {
      return <Redirect to={process.env.PUBLIC_URL + `/login?redirectTo=store/women/kimono`} />;
    }
  };
  return (
    <Fragment>
      <Modal
        show={props.show}
        onHide={props.onHide}
        className='product-quickview-modal-wrapper'
      >
        <Modal.Header closeButton></Modal.Header>
        <div className='modal-body'>
          <div className='row'>
            <div className='col-md-5 col-sm-12 col-xs-12'>
              <div className='product-large-image-wrapper'>
                {product.imageUrls.length > 0 ? (
                  <Swiper {...gallerySwiperParams}>
                    {product.imageUrls.length >= 0 &&
                      product.imageUrls.map((single, key) => {
                        return (
                          <div key={key}>
                            {single !== null ? (<div className='single-image'>
                              <img
                                src={`https://api.utsavplastotech.com${single}`}
                                className='img-fluid'
                                alt='product-img'
                              />
                            </div>) : (<div className='single-image'>
                              <img
                                src={
                                  process.env.PUBLIC_URL +
                                  '/assets/img/externalimages/no-image-available.jpg'
                                }
                                className='img-fluid'
                                alt='product-img'
                              />
                            </div>)}

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
              </div>
              <div className='product-small-image-wrapper mt-15'>
                <Swiper {...thumbnailSwiperParams}>
                  {product.imageUrls.length >= 0 &&
                    product.imageUrls.map((single, key) => {
                      return (
                        <div key={key}>
                          <div className='single-image'>
                            {single !== null ? (
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
            </div>
            <div className='col-md-7 col-sm-12 col-xs-12'>
              <div className='product-details-content quickview-content'>
                <h2>
                  <div class='text-capitalize'>{product.title}</div>
                </h2>
                <div className='product-details-price'>
                  {product.variants && product.variants.length > 0 ? (
                    <div style={{ color: '#00295F' }} className='product-price'>${price}</div>
                  ) : (
                      ' '
                    )}
                  <span
                    className='old'
                    style={{ display: price === mrp ? 'none' : 'flex', color: 'grey' }}
                  >
                    ${mrp}
                  </span>
                </div>
                {product.rating && product.rating > 0 ? (
                  <div className='pro-details-rating-wrap'>
                    <div className='pro-details-rating'>
                      <Rating ratingValue={product.rating} />
                    </div>
                  </div>
                ) : (
                    ''
                  )}

                <div className='pro-details-list'>
                  <p>{product.description}</p>

                </div>
                <div>
                  <div className='row' style={{ margin: 0 }}>
                    {colorArray.length > 0 || colorArray1.length > 0 ? (<p style={{ width: "100%" }}>Color</p>) : null}
                    <br></br>
                    {colorArray && colorArray.length > 0
                      ? colorArray.map((value, index) => {
                        if (index == 10000) {
                          return (
                            <p>Select Value</p>
                          );
                        }
                        else {
                          return (
                            <span style={{
                              width: "40px",
                              borderRadius: "100%",
                              marginRight: "5px",
                              height: "40px",
                              border: "1px solid rgba(0,0,0,6)"
                            }}
                              key={index}
                            >
                              <span onClick={() => colorChange(value.key)} style={{
                                height: "80%",
                                display: "block",
                                margin: "10%",
                                width: "80%",
                                // background:value.key.split("(")[1].split(")")[0]==="#multi"?"conic-gradient(from 90deg,violet,indigo,blue,green,yellow,orange,red,violet)":"",
                                // backgroundColor: value.key.split("(")[1].split(")")[0],
                                borderRadius: "100%",
                                border: activeColor == value.key ? ("3px solid rgb(0, 0, 0,1)") : "1px solid rgb(0, 0, 0,0.7)"
                              }}></span></span>
                          );
                        }
                      })
                      : null}

                    {colorArray1 && colorArray1.length > 0
                      ? colorArray1.map((value, index) => {
                        if (index == 10000) {
                          return (
                            <p>Select Value</p>
                          );
                        }
                        else {
                          return (
                            <span style={{
                              width: "40px",
                              borderRadius: "100%",
                              marginRight: "5px",
                              height: "40px",
                              border: "1px solid rgba(0,0,0,6)"
                            }}
                              key={index}
                            >
                              <span onClick={() => colorChange12(value)} style={{
                                height: "80%",
                                display: "block",
                                margin: "10%",
                                width: "80%",
                                // background:value.variant1.value.split("(")[1].split(")")[0]==="#multi"?"conic-gradient(from 90deg,violet,indigo,blue,green,yellow,orange,red,violet)":"",
                                // backgroundColor: value.variant1.value.split("(")[1].split(")")[0],
                                borderRadius: "100%",
                                border: activeColor == value.variant1.value ? ("3px solid rgb(0, 0, 0,1)") : "1px solid rgb(0, 0, 0,0.7)"
                              }}></span>
                            </span>
                          );
                        }
                      })
                      : null}
                  </div>
                  <div className="row" style={{ margin: 0 }}>
                    {sizeArray.length > 0 || sizeArray1.length > 0 ? (<p style={{ width: "100%", marginTop: "20px" }}>Size</p>
                    ) : null}

                    {sizeArray && sizeArray.length > 0
                      ? sizeArray.map((value, index) => {
                        if (index == 10000) {
                          return (
                            <p>Select Value</p>
                          );
                        }
                        else {
                          return (

                            <span onClick={() => sizeChange(value)} style={{
                              height: "30px",
                              width: "40px",
                              fontFamily: "auto",
                              whiteSpace: "nowrap",
                              textTransform: "uppercase",
                              cursor: "pointer",
                              textAlign: "center",
                              marginRight: "5px",
                              border: activeSize == value.variantValue ? ("2px solid rgb(0, 0, 0,1)") : "1px solid rgb(0, 0, 0,0.7)"
                            }}
                              key={index}
                            >{value.variantValue}</span>

                          );
                        }
                      })
                      : null}


                    {sizeArray1 && sizeArray1.length > 0
                      ? sizeArray1.map((value, index) => {
                        if (index == 10000) {
                          return (
                            <p>Select Value</p>
                          );
                        }
                        else {
                          return (

                            <span onClick={() => sizeChange1(value)} style={{
                              height: "30px",
                              width: "40px",
                              fontFamily: "auto",
                              whiteSpace: "nowrap",
                              textTransform: "uppercase",
                              cursor: "pointer",
                              textAlign: "center",
                              marginRight: "5px",
                              border: activeSize == value.variant2.value ? ("2px solid rgb(0, 0, 0,1)") : "1px solid rgb(0, 0, 0,0.7)"
                            }}>{value.variant2.value}</span>

                          );
                        }
                      })
                      : null}

                  </div>

                  {
                    product.showsizeChart ? (<div className='col-md-4 mt-20' style={{ paddingLeft: 0 }}>
                      <div
                        onClick={() => setModalShow(true)}
                        style={{ color: '#00295f', paddingLeft: 0 }}
                        className='btn mt-10'
                      >
                        Size Chart
                    </div>
                      <SizeModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        imgName={'/assets/img/product/modal.png'}
                      />
                    </div>) : null
                  }
                </div>

                {
                  <div className='pro-details-quality' style={{ marginTop: "10px" }}>
                    <div className='cart-plus-minus'>
                      <button
                        onClick={() =>
                          setQuantityCount(
                            quantityCount > 1 ? quantityCount - 1 : 1
                          )
                        }
                        className='dec qtybutton'
                      >
                        -
                      </button>
                      <input
                        className='cart-plus-minus-box'
                        type='text'
                        value={quantityCount}
                        readOnly
                      />
                      <button
                        onClick={() => setQuantityCount(quantityCount + 1)}
                        className='inc qtybutton'
                      >
                        +
                      </button>
                    </div>
                    <div className='pro-details-cart btn-hover'>
                      {
                        <button onClick={() => addToCarta()}>
                          {' '}
                          Add To Cart{' '}
                        </button>
                      }
                    </div>
                    <div className='pro-details-wishlist'>
                      <button
                        onClick={() =>
                          addToWishlist(product.productId, addToast)
                        }
                      >
                        {getWishlist()}
                      </button>
                    </div>
                    {redirectLogin()}
                  </div>
                }
                {product.category !== undefined ? (
                  <div className='pro-details-meta'>
                    <span>Category :</span>
                    <ul>
                      <li>{product.category.id.categoryname}</li>
                    </ul>
                  </div>
                ) : (
                    ''
                  )}
                {product.subCategory !== undefined ? (
                  <div className='pro-details-meta'>
                    <span>Subcategory :</span>
                    <ul>
                      <li>{product.subCategory.id.categoryname}</li>
                    </ul>
                  </div>
                ) : (
                    ''
                  )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
}
ProductModal.propTypes = {
  product: PropTypes.object,
  show: PropTypes.bool,
};
export default ProductModal;
