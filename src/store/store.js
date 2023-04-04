import {createStore} from 'redux'

let initialState={
  data:null
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