import {
  FETCH_NEW_PRODUCT_API,
  FETCH_OUR_PRODUCT_API,
  FETCH_PRODUCT_API,
  FETCH_SEARCH_GLOBAL_TITLE,
  FETCH3_PRODUCT_API,
  FETCH_PRODUCT_SLUG,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCT_BY_ID,
  FETCH_CAT_SUBCAT,
  FETCH_VARIANT_VALUE,
  FETCH_VARIANT_NAME,
  FETCH_SEARCH_TITLE,
  FETCH_CAT_SUBCAT_SLUG,
  FETCH_PRODUCT_COUNT,
  FETCH_PAGINATION_CASE,
  FETCH_LOWER_PRICE,
  FETCH_HIGHER_PRICE,
  FETCH_SORT_TYPE,
  FETCH_LOGIN_KEY,
  CATEGORY_ACCESS,
  CALL_USE_EFFECT
} from '../actions/productActions';

const initState = {
  products: [],
  product: [],
  product1: [],
  ourproducts: [],
  newproducts: [],
  productbyid: '',
  catandsubcat: {},
  variantvalue: '',
  variantname: '',
  searchtitle: '',
  searchglobaltitle: '',
  catandsubcatslug: {},
  productslug: ' ',
  productcount: 0,
  paginationcase: 0,
  sorttype: ' ',
  lowerprice: '',
  higherprice: ' ',
  loginkey: '',
  category:[],
  call:false
};

const productReducer = (state = initState, action) => {
  if (action.type === FETCH_PRODUCTS_SUCCESS) {
    return {
      ...state,
      products: action.payload,
    };
  }
  if (action.type === CALL_USE_EFFECT) {
    return {
      ...state,
      products: action.payload,
    };
  }
  if (action.type === CATEGORY_ACCESS) {
    return {
      ...state,
      category: action.payload,
    };
  }
  if (action.type === FETCH_PRODUCT_API) {
    return {
      ...state,
      product: action.payload,
    };
  }
  if (action.type === FETCH_OUR_PRODUCT_API) {
    return {
      ...state,
      ourproducts: action.payload,
    };
  }
  if (action.type === FETCH_NEW_PRODUCT_API) {
    return {
      ...state,
      newproducts: action.payload,
    };
  }
  if (action.type === FETCH_PRODUCT_BY_ID) {
    return {
      ...state,
      productbyid: action.payload,
    };
  }

  if (action.type === FETCH_CAT_SUBCAT) {
    return {
      ...state,
      catandsubcat: action.payload,
    };
  }
  if (action.type === FETCH_CAT_SUBCAT_SLUG) {
    return {
      ...state,
      catandsubcatslug: action.payload,
    };
  }
  if (action.type === FETCH_PRODUCT_SLUG) {
    return {
      ...state,
      productslug: action.payload,
    };
  }
  if (action.type === FETCH_VARIANT_VALUE) {
    return {
      ...state,
      variantvalue: action.payload,
    };
  }
  if (action.type === FETCH_VARIANT_NAME) {
    return {
      ...state,
      variantname: action.payload,
    };
  }
  if (action.type === FETCH_SEARCH_TITLE) {
    return {
      ...state,
      searchtitle: action.payload,
    };
  }
  if (action.type === FETCH_SEARCH_GLOBAL_TITLE) {
    return {
      ...state,
      searchglobaltitle: action.payload,
    };
  }
  if (action.type === FETCH3_PRODUCT_API) {
    return {
      ...state,
      product1: action.payload,
    };
  }
  if (action.type === FETCH_PRODUCT_COUNT) {
    return {
      ...state,
      productcount: action.payload,
    };
  }
  if (action.type === FETCH_PAGINATION_CASE) {
    return {
      ...state,
      paginationcase: action.payload,
    };
  }
  if (action.type === FETCH_LOWER_PRICE) {
    return {
      ...state,
      lowerprice: action.payload,
    };
  }
  if (action.type === FETCH_HIGHER_PRICE) {
    return {
      ...state,
      higherprice: action.payload,
    };
  }
  if (action.type === FETCH_LOGIN_KEY) {
    return {
      ...state,
      loginkey: action.payload,
    };
  }
  if (action.type === FETCH_SORT_TYPE) {
    return {
      ...state,
      sorttype: action.payload,
    };
  }

  return state;
};

export default productReducer;
