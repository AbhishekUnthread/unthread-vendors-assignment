import {createStore} from 'redux'

let initialState={
  data:sessionStorage.getItem('userData') && isJsonString(sessionStorage.getItem('userData'))?JSON.parse(sessionStorage.getItem('userData')):null
}
function isJsonString(str) {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}

const reducerFunction=((state,action)=>{

    switch (action.type) {
        case "userData":
          return {
            ...state,
            data: action.data
          };
        default:
            return state;
      }
})


const store=createStore(reducerFunction,initialState)

export default store