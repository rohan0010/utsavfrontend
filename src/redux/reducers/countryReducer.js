import{COUNTRIES,AUTHTOKEN,STATES,CITIES}from "../actions/countryActions"
const initState = {
    country: [],
    state:[],
    city:[],
    authtoken:''
  
  } ;
  
  const countryReducer = (state = initState, action) => {
    // const wishlistItems = state,

    if (action.type === COUNTRIES) {
        return {
          ...state,
          country: action.payload,
        };
      }
      if (action.type === STATES) {
        return {
          ...state,
          state: action.payload,
        };
      }
      if (action.type === CITIES) {
        return {
          ...state,
          city: action.payload,
        };
      }
      if (action.type === AUTHTOKEN) {
        return {
          ...state,
          authtoken: action.payload,
        };
      }
  return state
  };
  
  export default countryReducer;