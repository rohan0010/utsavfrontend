import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import config from '../../config';
import { addToCart, fetchcarts } from '../../redux/actions/cartActions';
import { deletewishlist } from '../../redux/actions/wishlistActions';
import { fetchApi } from '../../services/api';
import SizeModal from './SizeModal';
import './style.css';
import Rating from './sub-components/ProductRating';
import { Link } from 'react-router-dom';
import SuccessModal from "../../components/popup/SuccessModal";

var optionsa = [];
var optionsb = [];
const ProductDescriptionInfo = ({ product }) => {
  const [redirect, setRedirect] = useState(false);
  const [redirect1, setRedirect1] = useState(false);
  const [successOpen, setSuccessOpen]=useState(false);

  const [quantityCount, setQuantityCount] = useState(1);
  const dataReducer = useSelector((state) => state.wishlistData);
  const [productVariants, setProductVariants] = useState([]);
  const dispatch = useDispatch();
  const [show, setshow] = useState(false);
  const [price, setprice] = useState('');
  const [sku, setsku] = useState('');
  const [mrp, setmrp] = useState('');
  const [isColor, setIsColor]=useState(false);

  const [show1, setShow1] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);


  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => {
    setShow1(true);
    setProfile({
      productName: product.title,
      variantname: activeColor.split("(")[0],
      variantvalue: activeSize,
      lastName: product.slug,
    });
  };
  const [selectedOption, setselectedOption] = useState('');
  const [variantMap, setvariantMap] = useState('');
  const [colorArray, setcolorArray] = useState([])
  const [colorArray1, setcolorArray1] = useState([])
  const [activeColor, setactiveColor] = useState("")
  const [activeSize, setactiveSize] = useState("")

  const [sizeArray, setsizeArray] = useState([])
  const [sizeArray1, setsizeArray1] = useState([])


  const [selectedOption1, setselectedOption1] = useState('');
  const { addToast } = useToasts();
  // Here we add disable button state
  // const [disableButton, setdisableButton] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  // const [sizeArray, setsizeArray] = useState([])
  // const [price, setprice] = useState('');
  // const [mrp, setmrp] = useState('');
  const [tax, settax] = useState('');
  const [available, setavailable] = useState(true);
  // --------
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
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    productName: '',
    slug: '',
    variantname: '',
    variantvalue: '',
    quantity: '',
    location: '',
    message: '',
  });
  const {
    firstName,
    lastName,
    mobile,
    email,
    productName,
    slug,
    variantname,
    variantvalue,
    quantity,
    location,
    message,
  } = profile;
  var data = new Map();
  const handleChange1 = (name) => (event) => {
    setProfile({ ...profile, error: false, [name]: event.target.value });

    if (profile.firstName && profile.lastName && profile.email && profile.mobile && profile.message && profile.location && profile.quantity) {
      setSubmitDisabled(false);
    }
  };
 

  const sizeChange = (value) => {

    setsku(value.skucode ? value.skucode : '');
    setprice(value.price);
    setvara( value.value)
    setmrp(value.mrp);
    setactiveSize(value.variantId)
    setselectedOption({
      label:value.value,
      value:value.value
    });

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
        "value": value.variantId
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
  useEffect(() => {
    document.oncontextmenu = function (e) {
      if (e.button == 2) {
        e.preventDefault();
        return false;
      }

    }
  }, [])
const addToBuyNow = () => {
 
    if (product.variants[0].variant1 && product.variants[0].variant2) {
      var requiredArray = variantMap.get(selectedOption.value)
      var productIndex = requiredArray.findIndex((x) => x.variantValue == selectedOption1.value)
      if (quantityCount > requiredArray[productIndex].stock) {
        var url = config.url + '/commonroutes/mail';

        fetch(url, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            To: ['rohancool3845@gmail.com','pramodjha10@gmail.com','pkseherbal@gmail.com'],
            subject: "Insufficient Stock", // Subject line
            text: "Update Stock", // plaintext body
            html: `
            <h3 style="color: #757575;">Product Id:${product.productId}</h3><br/>
            <h3 style="color: #757575;">ProductName:${product.title}</h3><br/>
            <h4 style="color: #757575;">Cheers!</h4>
            <h4 style="color: #757575;">Utsav Plasto Tech Team</h4>"
            `,
          }),
        })
          .then(() => {
  
          })
          .catch((err) => console.log(err));
        addToast('Stock Unavailable', {
          appearance: 'warning',
          autoDismiss: true,
        });
      }
      else {
        let cartobj = {
          productId: product.productId,
          variant1: {
            name: product.variants[0].variant1.name,
            value: selectedOption.value
          },
          variant2: {
            name: product.variants[0].variant2.name,
            value: selectedOption1.value
          },
          price: requiredArray[productIndex].price + requiredArray[productIndex].tax,
          mrp: requiredArray[productIndex].mrp,
          variantId: requiredArray[productIndex].variantId,
          quantity: quantityCount,
          slug:product.slug,
          skucode:requiredArray[productIndex].skucode,
          codAvailable: product.codAvailable,
        };

        return fetchApi('/userdash/addToBuyNow', cartobj, {}, true, 'post')
          .then((response) => {
            if (response.data.message === 'success') {
              setRedirect1(true)

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
      }
    }
    else {
      for (var i = 0; i < product.variants.length; i++) {
        if (product.variants[i].variant1.value == selectedOption.value) {
          if (quantityCount > product.variants[i].stock) {
            var url = config.url + '/commonroutes/mail';

            fetch(url, {
              method: 'post',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                To: ['rohancool3845@gmail.com','pramodjha10@gmail.com','pkseherbal@gmail.com'],
                subject: "Insufficient Stock", // Subject line
                text: "Update Stock", // plaintext body
                html: `
                <h3 style="color: #757575;">Product Id:${product.productId}</h3><br/>
                <h3 style="color: #757575;">ProductName:${product.title}</h3><br/>
                <h4 style="color: #757575;">Cheers!</h4>
                <h4 style="color: #757575;">Utsav Plasto Tech Team</h4>"
                `,
              }),
            })
              .then(() => {
      
              })
              .catch((err) => console.log(err));
            addToast('Stock Unavailable', {
              appearance: 'warning',
              autoDismiss: true,
            });
          }
          else {
            let cartobj = {
              productId: product.productId,
              variant1: {
                name: product.variants[0].variant1.name,
                value: selectedOption.value
              },

              price: product.variants[i].price + product.variants[i].tax,
              mrp: product.variants[i].mrp,
              variantId: product.variants[i].variantId,
              quantity: quantityCount,
              slug:product.slug,
              skucode:product.variants[i].skucode,
              codAvailable: product.codAvailable,
            };

            return fetchApi('/userdash/addToBuyNow', cartobj, {}, true, 'post')
              .then((response) => {
                if (response.data.message === 'success') {
                  setRedirect1(true)
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
          }
        }
      }

    }
   
};

  const onSubmit = async (e) => {

    var url = config.url + '/commonroutes/mail';

    fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        To: ['rohancool3845@gmail.com'],
        subject: 'New bulk enquiry',
        text: 'Bulk Enquiry',
        html: `
          <h3 style="color: #757575;">Full Name : ${firstName}</h3>
          <h3 style="color: #757575;">Email: ${email}</h3>
          <h3 style="color: #757575;">Mobile Number: ${mobile}</h3>
          <h3 style="color: #757575;">Product Name: ${productName}</h3>
          <h3 style="color: #757575;">Slug: ${lastName}</h3>

          <h3 style="color: #757575;">Variant Name: Weight ${vara})</h3>
          <h3 style="color: #757575;">Quantity: ${quantity}</h3>
          <h3 style="color: #757575;">Location: ${location}</h3>
          <h3 style="color: #757575;">Message: ${message}</h3>
          <h4 style="color: #757575;">Cheers!</h4>
          <h4 style="color: #757575;">Utsav Plasto Tech Team</h4>
          `,
      }),
    })
      .then(() => {
        setShow1(false)

       setSuccessOpen(true)
        // this.verify()
      })
      .catch((err) => console.log(err));

  };
  const handleChange = (selectedOption) => {
    setselectedOption(selectedOption);
    setselectedOption1('');
    // setoptionsb([])
    optionsb = []
    if (product.variants[0].variant1 && product.variants[0].variant2) {
      var sizearray = variantMap.get(selectedOption.value);
      for (var i = 0; i < sizearray.length; i++) {
        optionsb.push({
          value: sizearray[i].variantValue,
          label: sizearray[i].variantValue
        })
      }
      setselectedOption1(optionsb[0]);
      setsizeArray(sizearray)
    }
    else {
      for (var i = 0; i < product.variants.length; i++) {
        if (product.variants[i].variant1.value == selectedOption.value) {
          setmrp(product.variants[i].mrp )
          settax(product.variants[i].tax)
          setprice(product.variants[i].price + product.variants[i].tax)
        }
      }
    }
  }
  const handleChange2 = (selectedOpti) => {
    setselectedOption1(selectedOpti);
    // var sizearray = variantMap.get(selectedOpti.value);
    for (var i = 0; i < sizeArray.length; i++) {
      if (sizeArray[i].variantValue == selectedOpti.value) {
        setprice(sizeArray[i].price + sizeArray[i].tax);
        setmrp(sizeArray[i].mrp );
        settax(sizeArray[i].tax)
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
            price: (product.variants[i].price),
            stock: product.variants[i].stock,
            mrp: (product.variants[i].mrp),
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
    optionsb = [];
    setProductVariants(arrz);
    if (arrz.length > 0) {
      // setprice(product.variants[0].price);
      // setmrp(product.variants[0].mrp);
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
            "tax": e.tax,
            "variantValue": e.variant2.value
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
      optionsa.push({
        value: key,
        label: key,
      });
    });
    setselectedOption(optionsa[0]);
    setvariantMap(variants)
    // setprice(product.variants[0].price);
    // setsku(product.variants[0].skucode ? product.variants[0].skucode : '');
    // setmrp(product.variants[0].mrp);
    setcolorArray(colorarray)
    colorChange1(colorarray[0].key, variants)
  }
  const colorChange1 = (key, variants) => {
    // setactiveColor(key)
    var sizearray = variants.get(key);
    for (var i = 0; i < sizearray.length; i++) {
      optionsb.push({
        value: sizearray[i].variantValue,
        label: sizearray[i].variantValue
      })
    }
    setselectedOption1(optionsb[0]);
    // for(let i=0;i<variantMap.le)
    setsizeArray(sizearray)
    // setactiveSize(sizearray[0].variantValue)
  }
  const[vara,setvara]=useState("")
  const getVariants2 = () => {
    setprice(product.variants[0].price + product.variants[0].tax);
    setmrp(product.variants[0].mrp );
    settax(product.variants[0].tax)
    setsku(product.variants[0].skucode)
    setvara( product.variants[0].variant1.value)
    setactiveSize(product.variants[0].variantId)
    for (var i = 0; i < product.variants.length; i++) {
      optionsa.push({
        value: product.variants[i].variant1.value,
        label: product.variants[i].variant1.value,
        stock:product.variants[i].stock,
          "price": product.variants[i].price+product.variants[i].tax,
      "stock": product.variants[i].stock,
      "mrp": product.variants[i].mrp,
      "skucode": product.variants[i].skucode,
      "variantId":product.variants[i].variantId
      })
    }
    setselectedOption(optionsa[0])
    // setcolorArray1(product.variants)
    // setactiveColor(product.variants[0].variant1.value)
    // setaddcart({
    //   "productName": product.title,
    //   "productImage": product.imageUrls.length > 0 ? product.imageUrls[0] : null,
    //   "productId": product.productId,
    //   "variantId": product.variants[0].variantId,
    //   "variant1": product.variants[0].variant1,
    //   "price": product.variants[0].price,
    //   "stock": product.variants[0].stock,
    //   "mrp": product.variants[0].mrp,
    //   "skucode": product.variants[0].skucode,
    //   "quantity": quantityCount
    // })
  }
  useEffect(() => {
    init();
    if (product.variants[0].variant1 && product.variants[0].variant2) {
      setprice(product.variants[0].price + product.variants[0].tax);
      setmrp(product.variants[0].mrp );
      settax(product.variants[0].tax)
      getVariants()
    }
    if (product.variants[0].variant1 && !product.variants[0].variant2) {
      getVariants2()
    }
  }, [product, dataReducer.wishlistItems1]);

  // const addToCarta = () => {
  //   let cart = addcart
  //   if(cart.stock<quantityCount)
  //   {
  //     addToast("Stock Unavailable", {
  //       appearance: 'warning',
  //       autoDismiss: true,
  //     });
  //     return 0
  //   }
  //   cart.quantity = quantityCount
  //   let cartobj = {
  //     cart
  //   };

  //   return fetchApi('/userdash/addToCart', cart, {}, true, 'post')
  //     .then((response) => {
  //       if (response.data.message === 'success') {
  //         dispatch(fetchcarts());
  //         dispatch(addToCart(cartobj.variantName, addToast, quantityCount));
  //       } else {
  //         if (response.data.message === 'Access denied') {
  //           addToast('Please Login', {
  //             appearance: 'warning',
  //             autoDismiss: true,
  //           });
  //           setRedirect(true);
  //         } else {
  //           addToast(response.data.message, {
  //             appearance: 'warning',
  //             autoDismiss: true,
  //           });
  //         }
  //       }
  //     })
  //     .catch((err) => console.log('error ->', err));
  // };
  const addToCarta = () => {
   
     
      if (product.variants[0].variant1 && product.variants[0].variant2) {
        var requiredArray = variantMap.get(selectedOption.value)
        var productIndex = requiredArray.findIndex((x) => x.variantValue == selectedOption1.value)
        if (quantityCount > requiredArray[productIndex].stock) {
          var url = config.url + '/commonroutes/mail';

          fetch(url, {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              To: ['rohancool3845@gmail.com','pramodjha10@gmail.com','pkseherbal@gmail.com'],
              subject: "Insufficient Stock", // Subject line
              text: "Update Stock", // plaintext body
              html: `
              <h3 style="color: #757575;">Product Id:${product.productId}</h3><br/>
              <h3 style="color: #757575;">ProductName:${product.title}</h3><br/>
              <h4 style="color: #757575;">Cheers!</h4>
              <h4 style="color: #757575;">Utsav Plasto Tech Team</h4>"
              `,
            }),
          })
            .then(() => {
    
            })
            .catch((err) => console.log(err));
          addToast('Stock Unavailable', {
            appearance: 'warning',
            autoDismiss: true,
          });
        }
        else {
          let cartobj = {
            productId: product.productId,
            variant1: {
              name: product.variants[0].variant1.name,
              value: selectedOption.value
            },
            variant2: {
              name: product.variants[0].variant2.name,
              value: selectedOption1.value
            },
            price: requiredArray[productIndex].price + requiredArray[productIndex].tax,
            mrp: requiredArray[productIndex].mrp,
            variantId: requiredArray[productIndex].variantId,
            quantity: quantityCount,
            slug:product.slug,
            skucode:requiredArray[productIndex].skucode,
            codAvailable: product.codAvailable
          };

          return fetchApi('/userdash/addToCart', cartobj, {}, true, 'post')
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
        }
      }
      else {
        for (var i = 0; i < product.variants.length; i++) {
          if (product.variants[i].variant1.value == selectedOption.value) {
            if (quantityCount > product.variants[i].stock) {
              addToast('Stock Unavailable', {
                appearance: 'warning',
                autoDismiss: true,
              });
                var url = config.url + '/commonroutes/mail';

      fetch(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          To: ['rohancool3845@gmail.com','pramodjha10@gmail.com','pkseherbal@gmail.com'],
          subject: "Insufficient Stock", // Subject line
          text: "Update Stock", // plaintext body
          html: `
          <h3 style="color: #757575;">Product Id:${product.productId}</h3><br/>
          <h3 style="color: #757575;">ProductName:${product.title}</h3><br/>
          <h4 style="color: #757575;">Cheers!</h4>
          <h4 style="color: #757575;">Utsav Plasto Tech Team</h4>"
          `,
        }),
      })
        .then(() => {

        })
        .catch((err) => console.log(err));
            }
            else {
              let cartobj = {
                productId: product.productId,
                variant1: {
                  name: product.variants[0].variant1.name,
                  value: selectedOption.value
                },
                slug:product.slug,
                skucode:product.variants[i].skucode,
                price: product.variants[i].price + product.variants[i].tax,
                mrp: product.variants[i].mrp,
                variantId: product.variants[i].variantId,
                quantity: quantityCount,
                codAvailable: product.codAvailable

              };

              return fetchApi('/userdash/addToCart', cartobj, {}, true, 'post')
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
            }
          }
        }
      }
    
  };
  const addToWishlist = (productId, addToast) => {
    dispatch(deletewishlist(productId, addToast));
  };
  const redirectCheckout = () => {
    if (redirect1) {
      return <Redirect to={process.env.PUBLIC_URL + `/buynow`} />;
    }
  };
  const redirectLogin = () => {
    if (redirect) {
      return <Redirect to={process.env.PUBLIC_URL + `/login?redirectTo=product/${product.slug}`} />;
    }
  };

  const getWishlist = () => {
    if (show) {
      return <i class='fa fa-heart fa-heart-wishlist'></i>;
    }
    return <i className='pe-7s-like wishlist-btn' />;
  };

  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(0, object.target.maxLength)
    }
  }
  const openSuccess=()=>{
    setSuccessOpen(false)
  
  }
  return (
    <div className='product-details-content ml-70'>
            {successOpen ? <SuccessModal onClick={openSuccess} message="Thank You! Your Info Recorded!" /> :null}

      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Bulk Enquiry(This enquiry is for product already selected)</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <div
                style={{
                  marginLeft: '60px',
                  marginTop: '30px',
                  margin: '10px',
                }}
              >
                <h4>
                  Full Name <span style={{ color: 'red' }}>*</span>
                </h4>
                <input
                  type='text'
                  name='FirstName'
                  placeholder='FullName'
                  //   ref="ProductName"
                  onChange={handleChange1('firstName')}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 col-12">

              <div
                style={{
                  marginLeft: '60px',
                  color: 'blue',
                  margin: '10px',
                }}
              >
                <h4>
                  Email <span style={{ color: 'red' }}>*</span>
                </h4>
                <input
                  type='email'
                  name='category'
                  placeholder='Email'
                  onChange={handleChange1('email')}

                //   ref="category"
                //   onChange={this.onChange}
                />
              </div>

            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <div
                style={{
                  marginLeft: '60px',
                  color: 'blue',
                  margin: '10px',
                }}
              >
                <h4>
                  Phone Number <span style={{ color: 'red' }}>*</span>
                </h4>
                <input
                  type='number'
                  name='category'
                  placeholder='PhoneNumber'
                  onChange={handleChange1('mobile')}

                //   ref="category"
                //   onChange={this.onChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <div
                style={{
                  marginLeft: '60px',
                  color: 'blue',
                  margin: '10px',
                }}
              >
                <h4>
                  Product Name <span style={{ color: 'red' }}>*</span>
                </h4>
                <input
                  type='text'
                  name='category'
                  placeholder='Product Name'
                  value={productName}
                  disabled={true}
                // onChange={handleChange1("mobile")}

                //   ref="category"
                //   onChange={this.onChange}
                />
              </div>

            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <div
                style={{
                  marginLeft: '60px',
                  color: 'blue',
                  margin: '10px',
                }}
              >
                <h4>
                  Weight <span style={{ color: 'red' }}>*</span>
                </h4>
                <input
                  type='text'
                  name='category'
                  placeholder='Weight'
                  disabled={true}
                  value={"Weight"}
                // onChange={handleChange1("mobile")}

                //   ref="category"
                //   onChange={this.onChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <div
                style={{
                  marginLeft: '60px',
                  color: 'blue',
                  margin: '10px',
                }}
              >
                <h4>
                  Variant <span style={{ color: 'red' }}>*</span>
                </h4>
                <input
                  type='text'
                  name='category'
                  placeholder='size'
                  disabled={true}
                  value={vara}
                // onChange={handleChange1("mobile")}

                //   ref="category"
                //   onChange={this.onChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <div
                style={{
                  marginLeft: '60px',
                  color: 'blue',
                  margin: '10px',
                }}
              >
                <h4>
                  Quantity <span style={{ color: 'red' }}>*</span>
                </h4>

                <input
                  type='number'
                  name='category'
                  placeholder='Quantity'
                  maxlength="4"
                  onChange={handleChange1('quantity')}
                  onKeyDown={e => /[\+\-\.\,]$/.test(e.key) && e.preventDefault()}
                  onInput={maxLengthCheck}
                //   ref="category"
                //   onChange={this.onChange}
                />

              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <div
                style={{
                  marginLeft: '60px',
                  color: 'blue',
                  margin: '10px',
                }}
              >
                <h4>
                  Your location <span style={{ color: 'red' }}>*</span>
                </h4>
                <input
                  type='text'
                  name='category'
                  placeholder='Location'
                  onChange={handleChange1('location')}

                //   ref="category"
                //   onChange={this.onChange}
                />
              </div>
            </div>

            <div className="col-12">
              <div
                style={{
                  marginLeft: '60px',
                  color: 'blue',
                  margin: '10px',
                }}
              >
                <h4>
                  Your Message <span style={{ color: 'red' }}>*</span>
                </h4>
                <textarea
                  type='text'
                  name='category'
                  placeholder='Message'
                  onChange={handleChange1('message')}

                //   ref="category"
                //   onChange={this.onChange}
                />
              </div>
            </div>
            <div className="col-12">
              <div
                className='submit'
                style={{
                  marginTop: '10px',

                  width: '100%',
                }}
              >
                {/* <input type="submit" value="Submit" className="upload-btn" /> */}
                <button style={{ backgroundColor: "#00295F", color: 'white' }} className='btn' onClick={() => onSubmit()} disabled={submitDisabled}>
                  Submit
            </button>
              </div>
            </div>

          </div>


          {/* <div   style={{marginLeft:"60px",width:"40%",color:'blue' ,margin:'10px'}}>
          
          <h4>
          lastName: <span style={{ color: "red" }}>*</span>
            </h4>
            <input
              type="text"
              name="category"
              placeholder="LastName"
              onChange={handleChange1("lastName")}

            //   ref="category"
            //   onChange={this.onChange}
            />
          </div> */}






        </Modal.Body>
      </Modal>
      <div className='text-capitalize'>{product.title}</div>
      {
        sku != '' ? (<div className='text-capitalize'>SKU: #{sku}</div>) : null
      }

      {/* <div className='product-details-price'>
        {product.variants && product.variants.length > 0 ? (
          <div className='product-price'>₹{price.toString().split('.')[1]===undefined?price:price.toFixed(2)}</div>
        ) : (
            ' '
          )}
        <span
          className='old'
          style={{ display: price === mrp ? 'none' : 'flex' }}
        >
          ₹{product.variants !== undefined ? mrp : null}
        </span>
      </div> */}
      {product.averageRating && product.averageRating > 0 ? (
        <div className='pro-details-rating-wrap'>
          <div className='pro-details-rating'>
            <Rating ratingValue={product.averageRating} />
          </div>
        </div>
      ) : (
          ' '
        )}
      <div className='pro-details-list'>
        <p>{product.subtext} </p>
      </div>
    
      <div className="row" style={{ margin: 0 }}>
        {optionsa.length > 0  > 0 ? (<p style={{ width: "100%", marginTop: "20px" }}>Weight</p>
        ) : null}

        {optionsa && optionsa.length > 0
          ? optionsa.map((value, index) => {
            if (index == 10000) {
              return (
                <p>Select Value</p>
              );
            }
            else {
              return (
               <>
               {value.stock !== null && value.stock !== 0 ?
               
                <span onClick={() => {sizeChange(value)}} style={{
                  height: "30px",
                  width: "60px",
                  fontFamily: "auto",
                  whiteSpace: "nowrap",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  textAlign: "center",
                  marginBottom: "30px",
                  marginRight: "5px",
                  border: activeSize == value.variantId ? ("2px solid rgb(0, 0, 0,1)") : "1px solid rgb(0, 0, 0,0.7)"
                }}>{value.label}</span>
                :
                <span style={{
                  height: "30px",
                  width: "60px",
                  fontFamily: "auto",
                  whiteSpace: "nowrap",
                  textTransform: "uppercase",
                  textAlign: "center",
                  marginBottom: "30px",
                  marginRight: "5px",
                  opacity: 0.60,
                  border: activeSize == value.variantId ? ("2px solid rgb(0, 0, 0,1)") : "1px solid rgb(0, 0, 0,0.7)"
                }}><del>{value.label}</del></span>
                }
                </>
              );
            }
          })
          : null}


  
         
      </div>
      <div>

        {
          product.showsizeChart ? (<div>
            <div
              onClick={() => setModalShow(true)}
              style={{ color: '#00295f', paddingLeft: '0px', marginTop:'-41px'}}
              className='btn '
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
        <div className='pro-details-quality'>
      
          {/* <div className='pro-details-cart btn-hover'>
            {
              <button
                onClick={() => addToCarta()}
              // disabled={disableButton}
              >
                {' '}
                Add To Cart{' '}
              </button>
            }
            
          </div> */}
          {/* <div className='pro-details-cart btn-hover'>
            {
              <button
                onClick={() => addToBuyNow()}
              // disabled={disableButton}
              >
                {' '}
                Buy Now{' '}
              </button>
            }
            
          </div> */}
          
          {/* <div className='pro-details-wishlist'>
            <button onClick={() => addToWishlist(product.productId, addToast)}>
              {getWishlist()}
            </button>
          </div> */}
           {redirectCheckout()}
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

      <button
        className='cart-btn-button mt-10'
        style={{ borderRadius: 0 }}
        onClick={() => handleShow1()}
      >
        Bulk Enquiry
      </button>
      {/* <Link to={"/" + `${product.category.id.categoryname}` + "/" + `${product.subCategory.id.categoryname}`}>
        <button
        style={{"display":"none"}}
          className='cart-btn-button mt-10 ml-3'
          style={{ borderRadius: 0 }}
        >
          Continue Shopping
      </button>

      </Link> */}

      {/* <div className="pro-details-social">
        <ul>
          <li>
            <a href="//facebook.com">
              <i className="fa fa-facebook" />
            </a>
          </li>
          <li>
            <a href="//dribbble.com">
              <i className="fa fa-dribbble" />
            </a>
          </li>
          <li>
            <a href="//pinterest.com">
              <i className="fa fa-pinterest-p" />
            </a>
          </li>
          <li>
            <a href="//twitter.com">
              <i className="fa fa-twitter" />
            </a>
          </li>
          <li>
            <a href="//linkedin.com">
              <i className="fa fa-linkedin" />
            </a>
          </li>
        </ul>
      </div> */}
    </div>
  );
};
ProductDescriptionInfo.propTypes = {
  product: PropTypes.object,
};
export default ProductDescriptionInfo;
