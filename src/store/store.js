import {createStore} from 'redux'

let initialState={
  data:sessionStorage.getItem('userData')?JSON.parse(sessionStorage.getItem('userData')):null
}

const isLogin=((state,action)=>{

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


const store=createStore(isLogin,initialState)

export default store