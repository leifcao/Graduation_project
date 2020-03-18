<template>
  <div id="app">
    <login ref="child"></login>
    <!--   返回顶部   -->
    <div class="BackTop" v-show="isFixed" @click="backTop">
      Top
    </div>


    <!--    <img src="./assets/logo.png">-->
    <router-view/>

    <!--  结束  -->
    <div class="End_mess">
      <div class="End_copyright">
        2020年-毕业设计-手机参数对比平台
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import login from './components/login'

  export default {
    name: 'App',
    data: function () {
      return {
        mess: '注销',
        // flag: true,
        isFixed: false,
      }
    },
    created() {
      // if (this.$route.path === '/' || this.$route.path === '/login') {
      //   this.flag = false;
      // } else {
      //   this.flag = true;
      // }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
      GoLogin() {
        alert('12')
      },
      handleScroll() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;//滚动条偏移量
        let offsetTop = document.querySelector("#boxFixed").offsetTop;// 要滚动到顶部吸附的元素的偏移量
        this.isFixed = scrollTop > offsetTop ? true : false;  // 如果滚动到顶部了，this.isFixed就为true
      },

      //返回顶部
      backTop() {
        var timers = setInterval(function () {
          let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;//滚动条偏移量
          var speedBack = scrollTop / 5;
          document.documentElement.scrollTop = scrollTop - speedBack;
          if (scrollTop == 0) {
            clearInterval(timers);
          }
        }, 30);
      }
    },
    components:{
      login
    },
    watch: {
      //路由监听
      '$route.path': function (path) {
        if (path === '/login' || path === '/') {
          // this.flag = false;
        } else {
          // this.flag = true;
        }
      },

    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: 14px;
    text-decoration: none;
    border: 0;
    border: none;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e30;
    text-align: center;
    min-width: 1400px;
  }

  .header {
    width: 100%;
    height: 30px;
    background-color: blue;
  }

  .headerFixed {
    position: fixed;
    z-index: 1000;
  }

  .header_left {
    float: left;
    width: 70%;
    background-color: #6467b6;
    height: 30px;
    line-height: 30px;
    color: #ffffff;
  }

  .header_right {
    float: right;
    width: 30%;
    background-color: yellow;
    height: 30px;
    line-height: 30px;
  }

  .search {
    padding: 5px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    border: none;
  }

  .BackTop {
    width: 65px;
    height: 65px;
    background-color: #888888;
    position: fixed;
    bottom: 50px;
    border-radius: 5px;
    right: 30px;
    text-align: center;
    line-height: 65px;
    font-weight: bold;
    font-size: 20px;
    z-index: 1000;
    box-shadow: 0px 0px 3px 3px #c6c6c6;
  }

  /*  登录页  */

  .LoginPage {
    width: 500px;
    padding: 10px;
    background-color: darkslateblue;
    margin: 0 auto;
    top: 200px;
    position: fixed;
    left: 0;
    right: 0;
    z-index: 1000;
  }

  .LoginPage h1 {
    text-align: right;
  }

  .LoginPage .loginMiddle {
  }

  .LoginPage .loginMiddle .middle {
  }

  .LoginPage .loginMiddle .middle div {
    margin-top: 15px;

  }

  .LoginPage .loginMiddle .middle label {
    display: inline-block;
    width: 70px;
  }

  .LoginPage .loginMiddle .middle input {
    padding: 5px;
    border-radius: 3px;
  }

  #phone {
    width: 184px;
    height: 26px;
    line-height: 26px;
    border-radius: 3px;
  }

  .LoginBtn {
    width: 100px;
    line-height: 30px;
    height: 30px;
    background-color: red;
    margin: auto;
    margin-bottom: 10px;
  }


  /*  结束  */
  .End_mess{
    width: 100%;
    position: relative;
    margin-top: 5px;
  }
  .End_mess .End_copyright {
    background-color: #333;
    color: #ccc;
    padding: 5px;
    font-size: 10px;
    bottom: 0px;
  }
</style>
