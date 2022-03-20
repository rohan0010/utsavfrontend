import {
  ADD_TO_WISHLIST,
  DELETE_FROM_WISHLIST,
  DELETE_ALL_FROM_WISHLIST,
  LOAD_WISHLIST,
  INC_WISH_LENGTH
} from "../actions/wishlistActions";

const initState = {
  wishlistItems1: [],
  wishlistLength:''
} ;

const wishlistReducer = (state = initState, action) => {
  const wishlistItems = state,
    product = action.payload;

  if (action.type === ADD_TO_WISHLIST) {
    const wishlistItem = wishlistItems.filter(
      item => item.id === product.id
    )[0];
    if (wishlistItem === undefined) {
      return [...wishlistItems, product];
    } else {
      return wishlistItems;
    }
  }

  if (action.type === DELETE_FROM_WISHLIST) {
    const remainingItems = (wishlistItems, product) =>
      wishlistItems.filter(wishlistItem => wishlistItem.id !== product.id);
    return remainingItems(wishlistItems, product);
  }

  if (action.type === DELETE_ALL_FROM_WISHLIST) {
    return wishlistItems.filter(item => {
      return false;
    });
  } 
  if(action.type === LOAD_WISHLIST) {
    return { ...state,
      wishlistItems1 : action.payload
    }
  }
  if(action.type === INC_WISH_LENGTH) {
    return { ...state,
      wishlistLength : action.payload
    }
  }
  return wishlistItems;
};

export default wishlistReducer;
