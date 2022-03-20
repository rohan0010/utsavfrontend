import { fetchApi } from '../../services/api';
import country from '../../pages/other/country.json'
import states from '../../pages/other/states.json'
export const COUNTRIES = 'COUNTRIES';
export const STATES = 'STATES';

export const AUTHTOKEN = 'AUTHTOKEN';
export const CITIES = 'CITIES';


const fetchcountries = (countries) => ({
  type: COUNTRIES,
  payload: countries,
});
const fetchstates= (states) => ({
    type: STATES,
    payload: states,
  });
  const fetchcity= (cities) => ({
    type: CITIES,
    payload: cities,
  });
const authtoken = (token) => ({
    type: AUTHTOKEN,
    payload: token,
  });
export const fetchcountry = () => async (dispatch) => {

 
 
   
    
          var arr=[]
      
       for(var i=0;i<country.countries.length;i++)
       {
         arr.push({
           label:country.countries[i].name,
           value:country.countries[i].id
         })
       }
            dispatch(fetchcountries(arr))
            
    
        
       
      



};
export const fetchstate = (state) => async (dispatch) => {
 
 var arr=[]
    for(var i=0;i<states.states.length;i++)
    {
      if(states.states[i].country_id==state)
      {
      arr.push({
        value:states.states[i].name,
        label:states.states[i].name
      })
      }
    }
        //   var arr=[]
        //   console.log("rj",country)
        //  for(var i=0;i<country[0].states.length;i++)
        //   {
        //     arr.push({
        //       value:country[0].states[i].name,
        //       label:country[0].states[i].name
        //     })
        //   } 
          //  console.log("rj",res)
          //  for(var i=0;i<res.length;i++)
          //  {
          //      arr.push({
          //          value:res[i].state_name,
          //          label:res[i].state_name
          //      })
          //  }
            dispatch(fetchstates(arr))
            
    
         
       
      



};
export const emptydata = () => async (dispatch) => {

 
 
   dispatch(fetchstates([]))
//    dispatch(fetchcity([]))
      



};
export const emptydata1 = () => async (dispatch) => {

 
 
    // dispatch(fetchstates([]))
    dispatch(fetchcity([]))
       
 
 
 
 };
export const fetchcities = (city) => async (dispatch) => {

 
 
  
          var arr=[]
          //  console.log("rj",res)
          //  for(var i=0;i<res.length;i++)
          //  {
          //      arr.push({
          //          value:res[i].city_name,
          //          label:res[i].city_name
          //      })
          //  }
          //   dispatch(fetchcity(arr))
          var index=0
          for(var i=0;i<country[0].states.length;i++)
          {
            if(country[0].states[i].name==city)
            {
                 index=i
           
            }
          }
          for(var j=0;j<country[0].states[index].cities.length;j++)
          {
            arr.push({
                       value:country[0].states[index].cities[j].name,
                       label:country[0].states[index].cities[j].name
                   })
          }
          dispatch(fetchcity(arr))
    
           
       
      



};