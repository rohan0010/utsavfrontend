import { loadLanguages } from 'redux-multilanguage';
import { fetchApi } from '../../services/api';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCT_API = 'FETCH_PRODUCT_API';
export const FETCH_NEW_PRODUCT_API = 'FETCH_NEW_PRODUCT_API';
export const FETCH_OUR_PRODUCT_API = 'FETCH_OUR_PRODUCT_API';
export const FETCH_PRODUCT_BY_ID = 'FETCH_PRODUCT_BY_ID';
export const FETCH_CAT_SUBCAT = 'FETCH_CAT_SUBCAT';
export const FETCH_VARIANT_VALUE = 'FETCH_VARIANT_VALUE';
export const FETCH_VARIANT_NAME = 'FETCH_VARIANT_NAME';
export const FETCH3_PRODUCT_API = 'FETCH3_PRODUCT_API';
export const FETCH_SEARCH_TITLE = 'FETCH_SEARCH_TITLE';
export const FETCH_CAT_SUBCAT_SLUG = 'FETCH_CAT_SUBCAT_SLUG';
export const FETCH_PRODUCT_SLUG = 'FETCH_PRODUCT_SLUG';
export const FETCH_SEARCH_GLOBAL_TITLE = 'FETCH_SEARCH_GLOBAL_TITLE';
export const FETCH_PRODUCT_COUNT = 'FETCH_PRODUCT_COUNT';
export const FETCH_PAGINATION_CASE = 'FETCH_PAGINATION_CASE';
export const FETCH_LOWER_PRICE = 'FETCH_LOWER_PRICE';
export const FETCH_HIGHER_PRICE = 'FETCH_HIGHER_PRICE';
export const FETCH_SORT_TYPE = 'FETCH_SORT_TYPE';
export const ADD_REVIEW = 'ADD_REVIEW';
export const FETCH_LOGIN_KEY = 'FETCH_LOGIN_KEY';
export const CATEGORY_ACCESS = 'CATEGORY_ACCESS';
export const CALL_USE_EFFECT = 'CALL_USE_EFFECT';

const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});
export const fetchCategorySuccess = (products) => ({
  type: CATEGORY_ACCESS,
  payload: products,
});
export const callApi = (products) => ({
  type: CALL_USE_EFFECT,
  payload: products,
});
const fetchProductid = (products) => ({
  type: FETCH_PRODUCT_BY_ID,
  payload: products,
});
const fetchProductsApi = (products) => ({
  type: FETCH_PRODUCT_API,
  payload: products,
});

const fetchNewProductsApi = (products) => ({
  type: FETCH_NEW_PRODUCT_API,
  payload: products,
});

const fetchOurProductsApi = (products) => ({
  type: FETCH_OUR_PRODUCT_API,
  payload: products,
});

const fetch3ProductsApi = (products) => ({
  type: FETCH3_PRODUCT_API,
  payload: products,
});

export const fetchCategoryandSubCategory = (product) => ({
  type: FETCH_CAT_SUBCAT,
  payload: product,
});

export const fetchLowerPrice = (product) => ({
  type: FETCH_LOWER_PRICE,
  payload: product,
});

export const fetchHigherPrice = (product) => ({
  type: FETCH_HIGHER_PRICE,
  payload: product,
});

export const fetchSortType = (product) => ({
  type: FETCH_SORT_TYPE,
  payload: product,
});

export const fetchCategoryandSubCategoryslug = (product) => ({
  type: FETCH_CAT_SUBCAT_SLUG,
  payload: product,
});

export const fetchLoginKey = (product) => ({
  type: FETCH_LOGIN_KEY,
  payload: product,
});

export const fetchProductslug = (product) => ({
  type: FETCH_PRODUCT_SLUG,
  payload: product,
});

export const fetchVariantValue = (product) => ({
  type: FETCH_VARIANT_VALUE,
  payload: product,
});

export const fetchSearchTitle = (product) => ({
  type: FETCH_SEARCH_TITLE,
  payload: product,
});

export const fetchPaginationCase = (product) => ({
  type: FETCH_PAGINATION_CASE,
  payload: product,
});

export const fetchSearchGlobalTitle = (product) => ({
  type: FETCH_SEARCH_GLOBAL_TITLE,
  payload: product,
});

export const fetchVariantName = (product) => ({
  type: FETCH_VARIANT_NAME,
  payload: product,
});

export const fetchProductCount = (product) => ({
  type: FETCH_PRODUCT_COUNT,
  payload: product,
});
export const fetchproductbyslug = ( pslug, addToast) => async (
  dispatch
) => {
  let obj = {
    slug: pslug,
  };
  dispatch(fetchProductslug(pslug));
  return fetchApi('/commonroutes/getProductbyslug', obj, {}, false, 'post')
    .then((response) => {
      dispatch(Productbyid([]));
      // console.log("Response Product", response.data.result);
      if (response.data.product !== null) {
        dispatch(Productbyid(response.data.product));
        // console.log("Response Variants Length",response.data.result.variants.length);
        // var varinatslen = response.data.result.variants.length;
        // // console.log("Varinats Len",varinatslen);
        // localStorage.setItem('varinatslen', varinatslen);
      } else {
        addToast('No Product Found', {
          appearance: 'warning',
          autoDismiss: true,
        });
      }
    })
    .catch((err) => console.log('error ->', err));
};
// fetch products
export const fetchProducts = (products) => {
  return (dispatch) => {
    dispatch(fetchProductsSuccess(products));
  };
};
export const fetchProduct = (products) => {
  return (dispatch) => {
    dispatch(fetchProductsApi(products));
  };
};

export const fetch3Product = (products) => {
  return (dispatch) => {
    dispatch(fetch3ProductsApi(products));
  };
};

export const fetchNewProduct = (products) => {
  return (dispatch) => {
    dispatch(fetchNewProductsApi(products));
  };
};

export const fetchOurProduct = (products) => {
  return (dispatch) => {
    dispatch(fetchOurProductsApi(products));
  };
};

export const Productbyid = (products) => {
  return (dispatch) => {
    dispatch(fetchProductid(products));
  };
};

export const productcount = (obj) => async (dispatch) => {
  let obj1 = {
    filters: obj.filters,
  };
  return fetchApi('/commonroutes/countProducts', obj, {}, false, 'post')
    .then((response) => {
  
      if (response.data.message === 'success') {
        dispatch(fetchProductCount(response.data.productCount));
      } else {
        dispatch(fetchProductCount(0));
        dispatch(fetchProduct([]));
      }
    })
    .catch((err) => console.log('error ->', err));
};

export const fetchspecificproduct = (
  categoryid,
  subcategoryid,
  cslug,
  sslug,
  pageNumber
) => async (dispatch,getState) => {
  dispatch(fetchPaginationCase(1));

  dispatch(fetchCategoryandSubCategory({ categoryid, subcategoryid }));

  dispatch(fetchCategoryandSubCategoryslug({ cslug, sslug }));

  var count1;

  if (pageNumber === 1) {
    count1 = 0;
  } else {
    count1 = (pageNumber - 1) * 16;
  }

  let obj;
  if (subcategoryid === null) {
    obj = {
      count: count1,
      limit: 16,
      field: 'max',
      filters: {
        'category.categoryid': categoryid,
      },
    };
  } else {
    obj = {
      count: count1,
      limit: 16,
      field: 'max',
      filters: {
        'category.categoryid': categoryid,
        'subCategory.categoryid': subcategoryid,
      },
    };
  }
  dispatch(productcount(obj));
  return fetchApi('/commonroutes/loadProducts', obj, {}, false, 'post')
    .then((response) => {
      if (response.data.length > 0) {
        if(getState.product!=response.data)
        dispatch(fetchProduct(response.data));
      } else {
        dispatch(fetchProductCount(0));
        dispatch(fetchProduct([]));
      }
    })
    .catch((err) => console.log('error ->', err));
};


export const fetchspecificproduct1 = (
  categoryid,
  subcategoryid,
  cslug,
  sslug,
  pageNumber
) => async (dispatch,getState) => {
  dispatch(fetchPaginationCase(1));
 var catid,subcatid;
 await fetchApi("/category/getMegaMenu", null, {}, false, "post")
  .then((response) => {
    if (response.data.result.length > 0) {
      var arr = [];

      var arr2 = []
      var arr1 = [];

      for (var k = 0; k < response.data.result.length; k++) {
        if (response.data.result[k].subcategory.length > 0) {
          arr2.push(response.data.result[k]);
        }
      }
      var index;
       for(var a=0;a<arr2.length;a++)
       {
         if(arr2[a].slug==cslug)
         {
           catid=arr2[a].categoryid
           index=a
         }
       }
       for(var z=0;z<arr2[index].subcategory.length;z++)
       {
         if(arr2[index].subcategory[z].slug==sslug)
         {
          subcatid=arr2[index].subcategory[z].categoryid
         }
       }
      // for (var i = 0; i < response.data.result.length; i++) {
      //   if (response.data.result[i].subcategory.length > 0) {
      //     arr.push(response.data.result[i]);
      //   }
      // }
    
    } else {
      alert("No Category Exist");
    }
  })
  .catch((err) => console.log(err));

  dispatch(fetchCategoryandSubCategoryslug({ cslug, sslug }));

  dispatch(fetchCategoryandSubCategory({ categoryid:catid,subcategoryid:subcatid}));
  var count1;

  if (pageNumber === 1) {
    count1 = 0;
  } else {
    count1 = (pageNumber - 1) * 16;
  }

  let obj;
  if (sslug === null) {
    obj = {
      count: count1,
      limit: 16,
      field: 'max',
      filters: {
        'category.categoryid': catid,
      },
    };
  } else {
    obj = {
      count: count1,
      limit: 16,
      field: 'max',
      filters: {
        'category.categoryid': catid,
        'subCategory.categoryid': subcatid,
      },
    };
  }
  dispatch(productcount(obj));
  return fetchApi('/commonroutes/loadProducts', obj, {}, false, 'post')
    .then((response) => {
      if (response.data.length > 0) {
      
        dispatch(fetchProduct(response.data));
      
      } else {
        dispatch(fetchProductCount(0));
        dispatch(fetchProduct([]));
      }
    })
    .catch((err) => console.log('error ->', err));
};
export const sortproduct = (
  sort,
  categoryid,
  subcategoryid,
  variantName,
  variantValue,
  title,
  searchglobaltitle,
  lowerprice,
  higherprice,
  addToast,
  pageNumber
) => async (dispatch) => {
  dispatch(fetchSortType(sort));

  dispatch(fetchPaginationCase(2));

  var count1;

  if (pageNumber === 1) {
    count1 = 0;
  } else {
    count1 = (pageNumber - 1) * 16;
  }
  let obj;
  if (sort === 'priceHighToLow') {
    if (searchglobaltitle !== null) {
      obj = {
        count: count1,
        limit: 16,
        field: 'max',
        filters: {
          title: searchglobaltitle,
        },
        sortBy: {
          type: 'price',
          order: -1,
        },
      };
    } else if (subcategoryid == null) {
      if (lowerprice !== null || higherprice !== null) {
        obj = {
          count: count1,
          limit: 16,
          field: 'max',
          filters: {
            'category.categoryid': categoryid,
            range: {
              'variants.price': {
                min: lowerprice,
                max: higherprice,
              },
            },
          },
          sortBy: {
            type: 'price',
            order: -1,
          },
        };
      } else {
        obj = {
          count: count1,
          limit: 16,
          field: 'max',
          filters: {
            'category.categoryid': categoryid,
          },
          sortBy: {
            type: 'price',
            order: -1,
          },
        };
      }
    } else {
      if (lowerprice !== null || higherprice !== null) {
        obj = {
          count: count1,
          limit: 16,
          field: 'max',
          filters: {
            'category.categoryid': categoryid,
            'subCategory.categoryid': subcategoryid,
            range: {
              'variants.price': {
                min: lowerprice,
                max: higherprice,
              },
            },
          },
          sortBy: {
            type: 'price',
            order: -1,
          },
        };
      } else {
        obj = {
          count: count1,
          limit: 16,
          field: 'max',
          filters: {
            'category.categoryid': categoryid,
            'subCategory.categoryid': subcategoryid,
          },
          sortBy: {
            type: 'price',
            order: -1,
          },
        };
      }
    }
  } else if (sort === 'priceLowToHigh') {
    if (searchglobaltitle !== null) {
      obj = {
        count: count1,
        limit: 16,
        field: 'max',
        filters: {
          title: searchglobaltitle,
        },
        sortBy: {
          type: 'price',
          order: -1,
        },
      };
    } else if (subcategoryid == null) {
      if (lowerprice !== null || higherprice !== null) {
        obj = {
          count: count1,
          limit: 16,
          field: 'max',
          filters: {
            'category.categoryid': categoryid,
            range: {
              'variants.price': {
                min: lowerprice,
                max: higherprice,
              },
            },
          },
          sortBy: {
            type: 'price',
            order: 1,
          },
        };
      } else {
        obj = {
          count: count1,
          limit: 16,
          field: 'max',
          filters: {
            'category.categoryid': categoryid,
          },
          sortBy: {
            type: 'price',
            order: 1,
          },
        };
      }
    } else {
      if (lowerprice !== null || higherprice !== null) {
        obj = {
          count: count1,
          limit: 16,
          field: 'max',
          filters: {
            'category.categoryid': categoryid,
            'subCategory.categoryid': subcategoryid,
            range: {
              'variants.price': {
                min: lowerprice,
                max: higherprice,
              },
            },
          },
          sortBy: {
            type: 'price',
            order: 1,
          },
        };
      } else {
        obj = {
          count: count1,
          limit: 16,
          field: 'max',
          filters: {
            'category.categoryid': categoryid,
            'subCategory.categoryid': subcategoryid,
          },
          sortBy: {
            type: 'price',
            order: 1,
          },
        };
      }
    }
  }
 
  dispatch(productcount(obj));
  return fetchApi('/commonroutes/loadProducts', obj, {}, false, 'post')
    .then((response) => {
     
      if (response.data.length > 0) {
        dispatch(fetchProduct(response.data));
      } else {
        dispatch(fetchProductCount(0));
        dispatch(fetchProduct([]));
      }
    })
    .catch((err) => console.log('error ->', err));
};
export const searchproduct = (
  title,
  categoryid,
  subcategoryid,
  pageNumber,
  addToast
) => async (dispatch) => {
  dispatch(fetchSearchTitle(title));


    dispatch(fetchPaginationCase(3));

    var count1 = 0;

    if (pageNumber === 1) {
      count1 = 0;
    } else {
      count1 = (pageNumber - 1) * 16;
    }

    dispatch(fetchSearchTitle(title));

    let obj;

    if (subcategoryid == null) {
      obj = {
        count: count1,
        limit: 16,
        field: 'max',
        filters: {
          title: title,
          'category.categoryid': categoryid,
        },
      };
    } else {
      obj = {
        count: count1,
        limit: 16,
        field: 'max',
        filters: {
          title: title,
          'category.categoryid': categoryid,
          'subCategory.categoryid': subcategoryid,
        },
      };
    }
    dispatch(productcount(obj));
    return fetchApi('/commonroutes/loadProducts', obj, {}, false, 'post')
      .then((response) => {
        if (response.data.length > 0) {
          dispatch(fetchProduct(response.data));
        } else {
          dispatch(fetchProductCount(0));
          dispatch(fetchProduct([]));
        }
      })
      .catch((err) => console.log('error ->', err));
  
};

export const fetchproductbyid = (productId, pslug, addToast) => async (
  dispatch
) => {
  let obj = {
    productId: productId,
  };
  dispatch(fetchProductslug(pslug));

  return fetchApi('/admindash/getProductById', obj, {}, false, 'post')
    .then((response) => {
      dispatch(Productbyid([]));
      if (response.data.result !== null) {
        dispatch(Productbyid(response.data.result));
       
        var varinatslen = response.data.result.variants.length;
        localStorage.setItem('varinatslen', varinatslen);
      } else {
        addToast('No Product Found', {
          appearance: 'warning',
          autoDismiss: true,
        });
      }
    })
    .catch((err) => console.log('error ->', err));
};
export const filterProduct = (
  categoryid,
  subcategoryid,
  variantValue,
  variantName,
  searchglobaltitle,
  addToast,
  pageNumber
) => async (dispatch) => {
  dispatch(fetchPaginationCase(4));
if(variantValue!=null)
{
  if(variantValue.includes("("))
  dispatch(fetchVariantValue(variantValue.split("(")[0]));
  else
  dispatch(fetchVariantValue(variantValue))

}
else{
  dispatch(fetchVariantValue(variantValue))
}
  dispatch(fetchVariantName(variantName));

  let obj;

  var count1;

  if (pageNumber === 1) {
    count1 = 0;
  } else {
    count1 = (pageNumber - 1) * 16;
  }

  if (searchglobaltitle !== null) {
    if (variantValue === null) {
      obj = {
        count: count1,
        limit: 16,
        field: 'max',
        variant1:variantName,
        variant2:variantValue,
        filters: {
       
          title: searchglobaltitle,
        },
      };
    } else {
      obj = {
        count: count1,
        limit: 16,
        field: 'max',
        variant1:variantName,
        variant2:variantValue,
        filters: {
         
          
          title: searchglobaltitle,
        },
      };
    }
  } else if (subcategoryid === null) {
    if (variantValue === null) {
      obj = {
        count: count1,
        limit: 16,
        variant1:variantName,
        variant2:variantValue,
        field: 'max',
        filters: {
         
          'category.categoryid': categoryid,
        },
      };
    } else {
      obj = {
        count: count1,
        limit: 16,
        field: 'max',
        variant1:variantName,
        variant2:variantValue,
        filters: {
       
          'category.categoryid': categoryid,
        },
      };
    }
  } else {
    if (variantValue == null) {
      obj = {
        count: count1,
        limit: 16,
        field: 'max',
        variant1:variantName,
        variant2:variantValue,
        filters: {
          'category.categoryid': categoryid,
          'subCategory.categoryid': subcategoryid,
        },
      };
    } else {
      obj = {
        count: count1,
        limit: 16,
        field: 'max',
        variant1:variantName,
        variant2:variantValue,
        filters: {
        
          'category.categoryid': categoryid,
          'subCategory.categoryid': subcategoryid,
        },
      };
    }
  }
  dispatch(productcount(obj));
  return fetchApi('/commonroutes/loadProducts', obj, {}, false, 'post')
    .then((response) => {
      if (response.data.length > 0) {
        dispatch(fetchProduct(response.data));
      } else {
        dispatch(fetchProductCount(0));
        dispatch(fetchProduct([]));
      }
    })
    .catch((err) => console.log('error ->', err));
};

export const filterProduct1 = (
  categoryid,
  subcategoryid,
  variantValue,
  variantName,
  searchglobaltitle,
  addToast,
  pageNumber
) => async (dispatch) => {
  dispatch(fetchPaginationCase(4));

  dispatch(fetchVariantValue(variantValue));
  dispatch(fetchVariantName(variantName));

  let obj;

  var count1;

  if (pageNumber === 1) {
    count1 = 0;
  } else {
    count1 = (pageNumber - 1) *16;
  }

  if (searchglobaltitle !== null) {
    if (variantValue === null) {
      obj = {
        count: count1,
        limit:16,
        field: 'max',
        filters: {
          'variants.variant2.name': variantName,
          title: searchglobaltitle,
        },
      };
    } else {
      obj = {
        count: count1,
        limit:16,
        field: 'max',
        filters: {
          'variants.variant2.name': variantName,
          title: searchglobaltitle,
        },
      };
    }
  } else if (subcategoryid === null) {
    if (variantValue === null) {
      obj = {
        count: count1,
        limit:16,
        field: 'max',
        filters: {
          'variants.variant2.name': variantName,
          'category.categoryid': categoryid,
        },
      };
    } else {
      obj = {
        count: count1,
        limit:16,
        field: 'max',
        filters: {
          'variants.variant2.value': variantValue,
          'variants.variant2.name': variantName,
          'category.categoryid': categoryid,
        },
      };
    }
  } else {
    if (variantValue == null) {
      obj = {
        count: count1,
        limit:16,
        field: 'max',
        filters: {
          'variants.variant2.name': variantName,
          'category.categoryid': categoryid,
          'subCategory.categoryid': subcategoryid,
        },
      };
    } else {
      obj = {
        count: count1,
        limit:16,
        field: 'max',
        filters: {
          'variants.variant2.value': variantValue,
          'variants.variant2.name': variantName,
          'category.categoryid': categoryid,
          'subCategory.categoryid': subcategoryid,
        },
      };
    }
  }
  dispatch(productcount(obj));
  return fetchApi('/commonroutes/loadProducts', obj, {}, false, 'post')
    .then((response) => {
      if (response.data.length > 0) {
        dispatch(fetchProduct(response.data));
      } else {
        dispatch(fetchProductCount(0));
        dispatch(fetchProduct([]));
      }
    })
    .catch((err) => console.log('error ->', err));
};
export const fetch3product = () => async (dispatch) => {
  let obj = {
    count: 0,
    limit: 9,
    field: 'max',
  };
  return fetchApi('/commonroutes/loadProducts', obj, {}, false, 'post')
    .then((response) => {
      if (response.data.length > 0) {
        dispatch(fetch3Product(response.data));
      } else {
        dispatch(fetch3Product([]));
      }
    })
    .catch((err) => console.log('error ->', err));
};

export const fetchNewproducts = () => async (dispatch) => {
  let obj = {
    count: 0,
    limit: 5,
    field: 'max',
    sortBy: {
      type: 'postDate',
      order: -1,
    },
  };
  return fetchApi('/commonroutes/loadProducts', obj, {}, false, 'post')
    .then((response) => {
      if (response.data.length > 0) {
        dispatch(fetchNewProduct(response.data));
      } else {
        dispatch(fetchNewProduct([]));
      }
    })
    .catch((err) => console.log('error ->', err));
};

export const fetchOurProducts = () => async (dispatch) => {
  let obj = {
    count: 0,
    limit: 5,
    field: 'max',
    sortBy: {
      type: 'numberOfSells',
      order: 1,
    },
  };
  return fetchApi('/commonroutes/loadProducts', obj, {}, false, 'post')
    .then((response) => {
      if (response.data.length > 0) {
        dispatch(fetchOurProduct(response.data));
      } else {
        dispatch(fetchOurProduct([]));
      }
    })
    .catch((err) => console.log('error ->', err));
};

export const sortbasedonprice = (
  categoryid,
  subcategoryid,
  lowerprice,
  higherprice,
  addToast,
  pageNumber
) => async (dispatch) => {

  if (lowerprice === 0 && higherprice === 0) {
    lowerprice = 0;
    higherprice = 9999999;
  } else if (lowerprice === 0) {
    lowerprice = 0;
  } else if (higherprice === 0) {
    higherprice = 9999999;
  }

  dispatch(fetchLowerPrice(lowerprice));

  dispatch(fetchHigherPrice(higherprice));

  dispatch(fetchPaginationCase(5));

  let obj;

  var count1;

  if (pageNumber === 1) {
    count1 = 0;
  } else {
    count1 = (pageNumber - 1) * 16;
  }

  if (subcategoryid === null) {
    obj = {
      count: count1,
      limit:16,
      field: 'max',
      filters: {
        'category.categoryid': categoryid,
        
        range: {
          'variants.price': {
            min: lowerprice,
            max: higherprice,
          },
        },
      },
    };
  } else {
    obj = {
      count: 0,
      limit:16,
      field: 'max',
      filters: {
        'category.categoryid': categoryid,
        'subCategory.categoryid': subcategoryid,
        range: {
          'variants.price': {
            min: lowerprice,
            max: higherprice,
          },
        },
      },
    };
  }

  dispatch(productcount(obj));

  return fetchApi('/commonroutes/loadProducts', obj, {}, false, 'post')
    .then((response) => {
      if (response.data.length > 0) {
        dispatch(fetchProduct(response.data));
      } else {
        
        dispatch(fetchProductCount(0));
        dispatch(fetchProduct([]));
      
      }
    })
    .catch((err) => console.log('error ->', err));
};

export const searchglobalproduct = (title, pageNumber, addToast) => async (
  dispatch
) => {
  dispatch(fetchPaginationCase(6));

  var count1;

  if (pageNumber === 1) {
    count1 = 0;
  } else {
    count1 = (pageNumber - 1) * 16;
  }

  dispatch(fetchSearchGlobalTitle(title));

  let obj;

  obj = {
    count: count1,
    limit:16,
    field: 'max',
    filters: {
      title: title,
    },
  };

  dispatch(productcount(obj));
  return fetchApi('/commonroutes/loadProducts', obj, {}, false, 'post')
    .then((response) => {
      if (response.data.length > 0) {
        dispatch(fetchProduct(response.data));
      } else {
        dispatch(fetchProductCount(0));
        dispatch(fetchProduct([]));
      
      }
    })
    .catch((err) => console.log('error ->', err));
};
