
const BASE_URL = "http://3.6.32.47:1337";

export const signUp = (body) => { 

  let url=BASE_URL+'/api/auth/local/register'

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


  };

  export const signIn = (body) => { 

    let url=BASE_URL+'/api/auth/local'
  
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
  
  
    };


  