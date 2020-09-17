import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store=new Vuex.Store({
    state:{
        num:1,
        list:[
            88,15,16,18,50,51,67
        ]
    },
    //改变 state里的值
    mutations:{
        changenum(state,newnum){
            state.num=newnum
        }
    },
    //同 computed
    getters:{
        getnum(state){
            return state.list.filter(item=>item>50)
        }
    }
})

export default store