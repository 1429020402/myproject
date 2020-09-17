import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


let store = new Vuex.Store({
    state: {
        goodlist: []
    },
    //改变
    mutations: {
        //初始化goodlist
        initgoodlist(state, newarr) {
            state.goodlist = newarr
        },
        changenum(state, obj) {
            for (let item of state.goodlist) {
                for (let data of item.foods) {
                    if (data.id == obj.id) {
                        data.num += obj.num
                        return
                    }
                }
            }
        },
        clearcart(state,newnum){
            for (let item of state.goodlist) {
                for (let data of item.foods) {
                    data.num=newnum
                }
            }
        }
    },
    //getters 过滤
    getters:{
        newlist(state){
            let arr=[]
            for (let item of state.goodlist) {
                for (let data of item.foods) {
                    if (data.num != 0) {
                        arr.push(data)
                    }
                }
            }
            return arr
        }
    }
})

export default store