import { fetchApi } from '../../services/api';
import { signout } from '../../auth/index';

export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';
export const DELETE_FROM_WISHLIST = 'DELETE_FROM_WISHLIST';
export const DELETE_ALL_FROM_WISHLIST = 'DELETE_ALL_FROM_WISHLIST';
export const LOAD_WISHLIST = 'LOAD_WISHLIST';
export const DELETE_WISHLIST = 'DELETE_WISHLIST';
export const FETCH_PRODUCT_API = 'FETCH_PRODUCT_API';
export const FETCH_PRODUCT_BY_ID = 'FETCH_PRODUCT_BY_ID';
export const INC_WISH_LENGTH = 'INC_WISH_LENGTH';

// add to wishlist
export const addToWishlist = (item, addToast) => {
  return (dispatch) => {
    if (addToast) {
      addToast('Added To Wishlist', {
        appearance: 'success',
        autoDismiss: true,
      });
    }
    dispatch({ type: ADD_TO_WISHLIST, payload: item });
  };
};

export const incWishLength = (cartItems) => ({
  type: INC_WISH_LENGTH,
  payload: cartItems,
});

// delete from wishlist
export const deleteFromWishlist = (item, addToast) => {
  return (dispatch) => {
    if (addToast) {
      addToast('Removed From Wishlist', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
    dispatch({ type: DELETE_FROM_WISHLIST, payload: item });
  };
};

//delete all from wishlist
export const deleteAllFromWishlist = (addToast) => {
  return (dispatch) => {
    if (addToast) {
      addToast('Removed All From Wishlist', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
    dispatch({ type: DELETE_ALL_FROM_WISHLIST });
  };
};

const fetchWishlistsApi = (wishlists) => ({
  type: LOAD_WISHLIST,
  payload: wishlists,
});
// fetch wishlist

export const fetchwishlists = (addToast) => async (dispatch) => {
  return fetchApi('/userdash/loadbookmarkProduct', null, {}, true, 'post')
    .then((response) => {
      if (response.data.message === 'Access denied') {
        addToast('Session Expired Please Login Again ', { appearance: 'error', autoDismiss: true });
                
         setTimeout(function(){  signout(() => { }) }, 2000);
      }else if (response.data.result.length > 0) {
        dispatch(fetchWishlistsApi(response.data.result));
        dispatch(incWishLength(response.data.result.length));
      } else {
        dispatch(fetchWishlistsApi([]));
        dispatch(incWishLength(response.data.result.length));
      }
    })
    .catch((err) => console.log('error ->', err));
};

export const deletewishlist = (productId, addToast) => async (dispatch) => {
  let obj = {
    productId: productId,
  };

  return fetchApi('/userdash/bookmarkProduct', obj, {}, true, 'post')
    .then((response) => {
      if (response.data.message === 'Access denied') {
        addToast('Session Expired Please Login Again ', { appearance: 'error', autoDismiss: true });
                
         setTimeout(function(){  signout(() => { }) }, 2000);
      }else if (response.data.message === 'unbookmarked') {
        addToast('Products Removed From Wishlist', {
          appearance: 'error',
          autoDismiss: true,
        });
        dispatch(fetchwishlists(addToast));
      } else if (response.data.message === 'bookmarked') {
        dispatch(fetchwishlists(addToast));
        addToast('Product Added To Wishlist', {
          appearance: 'success',
          autoDismiss: true,
        });
      }
    })
    .catch((err) => console.log('error ->', err));
};
