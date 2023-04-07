
const BASE_URL = "https://backend.unthread.in";

export const createCategory = (body) => { 
  let url=BASE_URL+'/api/product-categories'
  return callApi(body,url,'POST')


  };

  export const updateCategory = (body,id) => { 
    let url=BASE_URL+'/api/product-categories/' + id
    return callApi(body,url,'PUT')
  
  
    };

  export const createSubCategory = (body) => { 
    let url=BASE_URL+'/api/product-sub-categories'
    return callApi(body,url,'POST')
  
  
    };

    export const updateSubCategory = (body,id) => { 
      let url=BASE_URL+'/api/product-sub-categories/' + id
      return callApi(body,url,'PUT')
    
    
      };

     


  const callApi=(body,url,method)=>{
    return fetch(url, {
        method,
        body:JSON.stringify(body),
        headers: {
          "Content-Type": "application/json"
        
        },
      }).then(async (response) => {
       return await response.json();
      }).catch(err=>{
        throw 'Connection Error! We are unable to reach to the server'
      });
  }

  export const callGetApi=(appendUrl,method)=>{
    let url=BASE_URL+appendUrl

    return fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
      }).then(async (response) => {
       return await response.json();
      }).catch(err=>{
        throw 'Connection Error! We are unable to reach to the server'
      });
  }



  