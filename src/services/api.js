import axios from 'axios';
import config from '../config';


export const fetchApi = async function(endpoint, payload, headers, auth, method = 'get') { 
  if(headers === {} ) {
 headers['Content-Type'] = 'application/json' 
 } 
 else if(headers===1) {
   headers = {}
 }
  if(auth ===true){
    var token1 = await localStorage.getItem('access_token') 
    var token = JSON.parse(token1);
    headers.Authorization ="Bearer " + token;
  }  
    const axiosConfig = {
      headers,
      method: method.toLowerCase(),
    };
    if (axiosConfig.method === 'get') {
      axiosConfig.params = payload;
    } else if (axiosConfig.method === 'delete') {
      axiosConfig.params = payload;
    } else {
      axiosConfig.data = payload;
    }
    
    var url1 = config.url+ endpoint;
    
   
    return axios(url1, axiosConfig);
    
  };
   

  export const fetchApi2 = async function(endpoint, payload, headers, auth, method = 'get') {
    headers['Content-Type'] = 'application/x-www-form-urlencoded' 
    headers['Accept'] = 'application/json' 
     if(auth ===true){
       var token = await localStorage.getItem('access_token')
       headers.Authorization ="Bearer "
       + token;
     }  
       const axiosConfig = {
         headers,
         method: method.toLowerCase(),
       };
       if (axiosConfig.method === 'get') {
         axiosConfig.params = payload;
       } else if (axiosConfig.method === 'delete') {
         axiosConfig.params = payload;
       } else {
         axiosConfig.data = payload;
       }
       
       var url1
       url1 = config.url+ endpoint;
       return axios(url1, axiosConfig);

     };
     