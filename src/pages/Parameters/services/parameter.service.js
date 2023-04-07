
const BASE_URL = "https://backend.unthread.in";

export const createCategory = (body) => { 
  let url=BASE_URL+'/api/product-categories'
  return callApi(body,url)


  };

  export const createSubCategory = (body) => { 
    let url=BASE_URL+'/api/product-sub-categories'
    return callApi(body,url)
  
  
    };


  const callApi=(body,url)=>{
    return fetch(url, {
        method: "POST",
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

  export const callGetApi=(appendUrl)=>{
    let url=BASE_URL+appendUrl

    return fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      }).then(async (response) => {
       return await response.json();
      }).catch(err=>{
        throw 'Connection Error! We are unable to reach to the server'
      });
  }



  