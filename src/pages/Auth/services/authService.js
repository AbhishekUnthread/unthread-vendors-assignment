
const BASE_URL = "https://backend.unthread.in";

export const signUp = (body) => {
  let url = BASE_URL + '/api/auth/local/register'
  return callApi(body, url)
};

export const signIn = (body) => {

  let url = BASE_URL + '/api/auth/local'

  return callApi(body, url)



};

  export const validatetoken=(appendUrl)=>{
    let url=BASE_URL+appendUrl

    return fetch(url, {
        method:'GET',
        headers: {
          "Content-Type": "application/json"
        },
      }).then(async (response) => {
       return await response.json();
      }).catch(err=>{
        throw 'Connection Error! We are unable to reach to the server'
      });
  }


const callApi = (body, url) => {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"

    },
  }).then(async (response) => {
    return await response.json();
  }).catch(err => {
    throw 'Connection Error! We are unable to reach to the server'
  });
}


