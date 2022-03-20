import{BANNER}from "../actions/bannerActions"
const initState = {
    bannerItems: [],
  
  } ;
  
  const bannerReducer = (state = initState, action) => {
    // const wishlistItems = state,

    if (action.type === BANNER) {
        return {
          ...state,
          bannerItems: action.payload,
        };
      }
    
  return state
  };
  
  export default bannerReducer;