import {createStore} from 'redux'


const isLogin=((state,action)=>{
    return {
        data:action.data
    }
})


const store=createStore(isLogin)

export default store