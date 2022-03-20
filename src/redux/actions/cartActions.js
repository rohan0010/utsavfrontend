import { fetchApi } from '../../services/api';
import { signout } from '../../auth/index';

export const ADD_TO_CART = 'ADD_TO_CART';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';
export const DELETE_FROM_CART = 'DELETE_FROM_CART';
export const DELETE_ALL_FROM_CART = 'DELETE_ALL_FROM_CART';
export const LOAD_CART = 'LOAD_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CART_PRICE = 'CART_PRICE';
export const INC_CART_LENGTH = 'INC_CART_LENGTH';

//add to cart
export const addToCart = (item, addToast, quantityCount) => {
  return (dispatch) => {
    if (addToast) {
      addToast('Added To Cart', { appearance: 'success', autoDismiss: true });
    }
    dispatch({
      type: ADD_TO_CART,
      payload: {
        ...item,
        quantity: quantityCount,
      },
    });
  };
};
//decrease from cart
export const decreaseQuantity = (item, addToast) => {
  return (dispatch) => {
    if (addToast) {
      addToast('Item Decremented From Cart', {
        appearance: 'warning',
        autoDismiss: true,
      });
    }
    dispatch({ type: DECREASE_QUANTITY, payload: item });
  };
};
//delete from cart
export const deleteFromCart = (item, addToast) => {
  return (dispatch) => {
    if (addToast) {
      addToast('Removed From Cart', { appearance: 'error', autoDismiss: true });
    }
    dispatch({ type: DELETE_FROM_CART, payload: item });
  };
};
//delete all from cart
export const deleteAllFromCart = (addToast) => {
  return (dispatch) => {
    if (addToast) {
      addToast('Removed All From Cart', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
    dispatch({ type: DELETE_ALL_FROM_CART });
  };
};

const fetchCartsApi = (cartItems) => ({
  type: LOAD_CART,
  payload: cartItems,
});

const cartPrice = (cartItems) => ({
  type: CART_PRICE,
  payload: cartItems,
});
// fetch wishlist

export const incCartLength = (cartItems) => ({
  type: INC_CART_LENGTH,
  payload: cartItems,
});

export const fetchcarts = (addToast, disc) => async (dispatch) => {
  return fetchApi('/userdash/loadCart', null, {}, true, 'post')
    .then((response) => {
      if (response.data.message === 'Access denied') {
        addToast('Session Expired Please Login Again ', { appearance: 'error', autoDismiss: true });
                
         setTimeout(function(){  signout(() => { }) }, 2000);
      }else if (response.data.length > 0) {
        dispatch(fetchCartsApi(response.data));
        dispatch(fetchcartprice(disc));
        dispatch(incCartLength(response.data.length));
      } else {
        dispatch(fetchCartsApi([]));
        dispatch(incCartLength(0));
      }
    })
    .catch((err) => console.log('error ->', err));
};
export const fetchcartprice = (disc,addToast) => async (dispatch) => {
  let obj = {
    type: 'cod',
    couponDiscount: disc,
  };
  return fetchApi('/userdash/cartPrice', obj, {}, true, 'post')
    .then((response) => {
      if (response.data.message === 'Access denied') {
        addToast('Session Expired Please Login Again ', { appearance: 'error', autoDismiss: true });
                
         setTimeout(function(){  signout(() => { }) }, 2000);
      } else if (response.data) {
        dispatch(cartPrice(response.data.result));
      } else {
       
      }
    })
    .catch((err) => console.log('error ->', err));
};

export const deletecart = (productId, variantId, addToast) => async (
  dispatch
) => {
  let obj = {
    productId: productId,
    variantId: variantId,
  };
  return fetchApi('/userdash/removeFromCart', obj, {}, true, 'post')
    .then((response) => {
      if (response.data.message === 'Access denied') {
        addToast('Session Expired Please Login Again ', { appearance: 'error', autoDismiss: true });
                
         setTimeout(function(){  signout(() => { }) }, 2000);
      }
      if (response.data.message === 'success') {
        dispatch(fetchcarts(addToast));
        addToast('Item Deleted From  Cart Successfully', {
          appearance: 'warning',
          autoDismiss: true,
        });
      } else {
        addToast(response.data.message, {
          appearance: 'warning',
          autoDismiss: true,
        });
      }
    })
    .catch((err) => console.log('error ->', err));
};

export const updateCart = (
  productId,
  variantId,
  quantity,
  addToast,
  disco
) => async (dispatch) => {
  let obj = {
    productId: productId,
    variantId: variantId,
    quantity: quantity,
  };
  return fetchApi('/userdash/updateCart', obj, {}, true, 'post')
    .then((response) => {
      if (response.data.message === 'Access denied') {
        addToast('Session Expired Please Login Again ', { appearance: 'error', autoDismiss: true });
                
         setTimeout(function(){  signout(() => { }) }, 2000);
      }
      if (response.data.message === 'success') {
        dispatch(fetchcarts(addToast, disco));
      } else {
        addToast(response.data.message, {
          appearance: 'warning',
          autoDismiss: true,
        });
      }
    })
    .catch((err) => console.log('error ->', err));
};
