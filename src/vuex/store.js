import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state:{
    name: 'state之余',
    loginflag: false,
  },
  mutations:{
    //点击发表评论弹窗出来
    LoginComment(state){
      state.loginflag = true;
    },
    //取消或者登录成功 隐藏弹窗
    LoginSuccess(state){
      state.loginflag = false;
    }
  },
  getters:{
    //登录flag
    LoginComment(state){
     return  state.loginflag;
    },
    exitComment:state=>{

    }
  },
})

