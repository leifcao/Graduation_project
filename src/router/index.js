import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import login from '@/components/login';
import update from '@/components/update';
import tests from '@/components/tests';
import homepage from '@/components/HomePage';
import PhoneCompare from '@/components/PhoneCompare';
import PhoneMessage from '@/components/PhoneMessage';

//管理员界面
import AdminPage from '@/components/AdminComponent/AdminHomepage'
import AdminUpdatepage from '@/components/AdminComponent/AdminUpdatepage'

import axios from  'axios';
Vue.prototype.$ajax = axios

Vue.use(Router)

export default new Router({
  mode: 'history',  //页面跳转置顶
  scrollBehavior(to,from,saveTop){
    if(saveTop){
      return saveTop;
    }else {
      return {x: 0,y:0};
    }
  },
  routes: [
    {path: '/helloworld', name: 'HelloWorld', component: HelloWorld}, //测试增删改查
    {path: '/tests', name: 'tests', component: tests}, //测试通知轮播
    {path: '/',name: 'homepage' , component: homepage}, //首页
    // {path: '/login',name: 'login' , component: login}, //登录页
    {path: '/helloworld/update/:id',name:'update',component: update},
    {path: '/homepage',name:'homepage',component: homepage},//手机首页
    {path: '/PhoneCompare',name:'PhoneCompare',component: PhoneCompare},//对比页面
    {path: '/PhoneMessage',name: 'PhoneMessage',component: PhoneMessage},//手机详细信息展示
    {path: '/AdminPage',name: 'AdminHomepage',component: AdminPage},//管理员界面
    {path: '/AdminPage/AdminUpdatepage',name: 'AdminUpdatepage',component: AdminUpdatepage},//管理员界面
  ]
})
