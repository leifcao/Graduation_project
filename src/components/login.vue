<template>
  <div id="hello">
    <div id="boxFixed" class="header" :class="{'headerFixed': isFixed}">
      <div class="header_left">
        <div class="homepage" v-show="homeflag" @click="$router.push({path:'/homepage'})">首页</div>
        手机参数对比平台
      </div>
      <div class="header_right">
        <!--        <span>搜索</span>-->
        <div>
          <span v-show="!tiggerflag" class="loginname">{{userName}}</span>
          <img class="imageHead" src="../assets/logo.png" v-show="!tiggerflag" @click="notify"><i v-show="feedbackNum!=0">{{feedbackNum}}</i>
          <span @click="childMethodComment()" v-if="tiggerflag">登录</span>
          <span @click="exit()" v-else style="margin-left: 35px">{{mess}}</span>
        </div>
      </div>
    </div>
    <!--  登录页弹窗  -->
    <div class="LoginPage" v-show="$store.getters.LoginComment">
      <div>
        <h1>
          <span class="" @click="addUserflag=true" v-if="!addUserflag">没有账号？点击注册</span>
          <span @click="addUserflag=false" v-else>登录</span>
        </h1>
        <div class="loginMiddle">
          <div class="middle">
            <div>
              <label for="names">用户名</label>
              <input type="text" id="names" v-model="userName" placeholder="用户名/账号">
            </div>
            <div>
              <label for="pass">密码</label>
              <input type="password" id="pass" v-model="password" placeholder="请输入密码" autocomplete="off"
                     @keyup.enter="Login">
            </div>
            <div v-show="addUserflag">
              <div>
                <label for="surepass">确认密码</label>
                <input type="password" id="surepass" v-model="surepass" autocomplete="off" @blur="testpass()">
                <p v-show="passflag" style="color: red;font-size: 12px;padding: 3px;">密码不一致</p>
              </div>
              <div>
                <label for="phonenum">电话</label>
                <input type="password" id="phonenum" v-model="phonenum" autocomplete="off">
              </div>
              <div>
                <label for="phone">欣喜品牌</label>
                <select name="" id="phone" v-model="type">
                  <option :value="item" v-for="(item,index) in Phonetype" :key="index">{{item}}</option>
                </select>
              </div>
            </div>
            <div class="LoginBtn" @click="Login" v-if="!addUserflag">登录</div>
            <div class="LoginBtn" @click="addUser" v-else>立即注册</div>
            <div class="LoginBtn" @click="loginflag = $store.commit('LoginSuccess')">取消</div>
          </div>
        </div>
      </div>
    </div>

    <div class="feedback" v-for="(item,index) in feedbacklist" :key="index" v-show="feedflags">
      <div>
        <ul>
          <li><p>亲爱的{{item.userName}},您在{{item.createTime}}评论的信息,已被驳回,请确认信息</p></li>
          <li><span>手机名称:</span><span>{{item.phonename}}</span></li>
          <li><span>评分:</span><span>{{item.scores}}</span></li>
          <li><span>评论信息:</span><span>{{item.comments}}</span></li>
          <li><span>驳回理由:</span><span>{{item.rejectReason}}</span></li>
        </ul>
      </div>
      <div class="feedBtn">
        <span @click="sureMess(item,index)">确定</span>
        <span @click="cancelMess(index)">取消</span>
      </div>
    </div>


  </div>
</template>

<script>
  import axios from 'axios'
  import urlkit from '../url/urlkit';

  export default {
    name: "login",
    data() {
      return {
        mess: '注销',
        // flag: true,
        isFixed: false,
        userName: '', //用户名
        password: '',  //密码
        phonenum: '', //d电话号码
        surepass: '', //确认密码
        type: '华为',
        loginflag: false, //默认游客登录
        passflag: false, //确认密码错误flag
        addUserflag: false, //注册表单隐藏
        tiggerflag: true, //登录按钮隐藏
        Phonetype: ['华为', '小米', '荣耀', '苹果', 'vivo', 'OPPO', '一加'],
        feedbacklist: [], //驳回信息列表
        feedflags: false, //驳回信息默认隐藏
        feedbackNum:0,
        homeflag: false,
        notifyInterval:'',//轮询看管理员是否审核
      }
    },
    mounted() {
      console.log(urlkit);
      window.addEventListener('scroll', this.handleScroll);
      // this.checkCookie();
      //检测是否登录了
      this.checkSession();

    },
    methods: {
      //滚动监听
      handleScroll() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;//滚动条偏移量
        let offsetTop = document.querySelector("#boxFixed").offsetTop;// 要滚动到顶部吸附的元素的偏移量
        this.isFixed = scrollTop > offsetTop ? true : false;  // 如果滚动到顶部了，this.isFixed就为true
      },
      // 消息通知的显示
      notify() {
        // alert('12')
        this.feedBackMess();
      },
      //登录
      Login() {
        let name = this.userName;
        let password = this.password;
        if (password == '' || name == '') {
          alert('密码或者账号不能为空');
          return;
        }
        let url = urlkit + '/api/user/Userlogin';
        axios.post(url, {name, password}).then(res => {
          if (res.data.mess == '账号或者密码错误') {
            alert(res.data.mess);
            return;
          }
          var phonetype = res.data[0].type;
          //设置cookie
          // this.setCookie(this.userName, phonetype);
          //设置session
          sessionStorage.setItem('userName', JSON.stringify(this.userName));
          sessionStorage.setItem('phonetype', JSON.stringify(phonetype));
          // this.getCookie();
          this.password = '';
          this.$store.commit('LoginSuccess');  //促发vux方法,隐藏登录框;
          // this.loginflag = false; //弹窗隐藏
          this.tiggerflag = false; //隐藏登录
          //弹出  驳回信息
          this.feedBackMess();
          this.notifyInterval = setInterval(()=>{
            this.sendNotityNum();
          },10000);//十秒轮询机制 推送消息
          alert('登录成功');
          //管理员页面跳转
          if (name == 'admin') {
            this.$router.push({
              path: '/AdminPage'
            }).catch(err => {
              console.log(err)
            });
          }
        })
      },
      //注册用户
      addUser() {
        let name = this.userName;
        let password = this.password;
        let phonenum = this.phonenum;
        let type = this.type;
        let url = urlkit + '/api/user/addUser';
        if (this.password != this.surepass) {
          alert('两次密码不正确');
          return;
        }
        var num = phonenum.length
        //正则判断是否 是存数字
        const result = /^\d+$/.test(phonenum);
        if (num != 11 || !result) {
          alert('请输入正确的电话信息');
          return;
        }
        axios.post(url, {
          name, password, type, phonenum,
        }).then(res => {
          if (res.data.mess != '注册成功') {
            alert(res.data.mess);
            return;
          }
          // this.userName = '';
          // this.password = '';
          this.phonenum = '';
          this.type = '华为';
          this.addUserflag = false;
          // this.$store.commit('LoginSuccess');
          // this.loginflag = false; //弹窗隐藏
          alert(res.data.mess);
        }).catch(err => {
          console.log(err)
        });
      },
      //确认密码失去焦点 监听
      testpass() {
        if (this.password != this.surepass) {
          this.passflag = true;
        } else {
          this.passflag = false;
        }
      },
      //注销
      exit() {
        this.$store.commit('LoginComment');
        this.tiggerflag = true;
        // this.setCookie('', '');
        //设置session 用户和手机类型
        sessionStorage.setItem('userName', JSON.stringify(''));
        sessionStorage.setItem('phonetype', JSON.stringify(''));
        this.notifyInterval = ''; // 通知轮询滞空
        this.feedbackNum = 0;
        //管理员注销时返回路径
        if (this.$route.path === '/AdminPage') {
          this.$router.go(-1);
        }
      },
      //设置登录cookie
      setCookie(name, type) {
        var a = "username=" + name;
        var b = "phonetype=" + type;
        document.cookie = a; //名字
        document.cookie = b;  //喜好手机
        // 设置推荐类型机
        var ptype = sessionStorage.setItem('type', JSON.stringify(type));
      },
      //获取cookie
      getCookie() {
        var cookies = document.cookie.split(";");
        // console.log(cookies,document.cookie)
        var name = cookies[0].split("=")[1];
        var phonetype = cookies[1].split("=")[1];
        return {name: name, phonetype: phonetype};
      },
      //检查cookie
      checkCookie() {
        var cookies = document.cookie
        // console.log(cookies,document.cookie)
        if (cookies == '') {
          this.setCookie('', '');  //设置空cookie防止报错
          return;
        }
        var name = this.getCookie();
        if (name.name == '') {
          this.tiggerflag = true;
          this.setCookie('', '');  //设置空cookie防止报错
        } else {
          this.tiggerflag = false;
          this.userName = name.name;
        }
      },
      checkSession() {
        var userName = JSON.parse(sessionStorage.getItem('userName')) || '';
        if (userName == '') {
          this.tiggerflag = true;
          sessionStorage.setItem('userName', JSON.stringify(''));
        } else {
          this.tiggerflag = false;
          this.userName = userName;
        }
      },
      //  父组件调用子组件方法
      childMethodComment() {
        this.loginflag = true;
        this.$store.commit('LoginComment');
      },
      //  评论信息驳回检测
      feedBackMess() {
        let name = this.userName;
        // let name = this.userName;
        let url = urlkit + '/api/AdminProduct/RCommentList';
        axios.post(url, {name}).then(res => {
          if (res.status === 200) {
            if (res.data.length == 0) {
              this.feedflags = false;
            } else {
              this.feedbacklist = res.data;
              this.feedbackNum = this.feedbacklist.length;
              this.feedflags = true;
            }
            // console.log(res);
          }
        }).catch(err => {
          console.log(err);
        })
      },

      //后台管理员 审核信息前端推送代码
      sendNotityNum(){
        let name = this.userName;
        let url = urlkit + '/api/AdminProduct/RCommentList';
        axios.post(url, {name}).then(res => {
          if (res.status === 200) {
            if (res.data.length == 0) {
              this.feedflags = false;
            } else {
              this.feedbackNum = res.data.length;
              this.feedflags = true;
            }
          }
        }).catch(err => {
          console.log(err);
        })
      },

      //确认驳回信息,不会再弹窗
      sureMess(item, index) {
        this.feedbacklist.splice(index, 1);
        this.feedbackNum = this.feedbacklist.length;
        if (this.feedbacklist.length == 0)
          this.feedflags = false;
        let cid = item.cid;
        let url = urlkit + '/api/AdminProduct/sureReject';
        axios.post(url, {cid}).then(res => {
          console.log(res);
        }).catch(err => {
          console.log(err);
        });

      },
      cancelMess(index) {
        this.feedbacklist.splice(index, 1);
        if (this.feedbacklist.length == 0) {
          this.feedflags = false;
        }

      }
    },
    watch: {
      '$route.path': function (path) {
        if (path == '/' || path == '/homepage') {
          this.homeflag = false;
        } else {
          this.homeflag = true;
        }
      }
    }
  }
</script>

<style scoped>

  #hello {
    position: relative;
  }

  .header {
    width: 100%;
    height: 40px;
    /*background-color: blue;*/
  }

  .headerFixed {
    position: fixed;
    z-index: 1000;
  }

  .homepage {
    float: left;
    width: 10%;
    font-size: 17px;
    cursor: pointer;
  }

  .header_left {
    float: left;
    width: 80%;
    background-color: #535582;
    height: 40px;
    line-height: 40px;
    font-size: 17px;
    color: #ffffff;
  }

  .header_right {
    float: right;
    position: relative;
    width: 20%;
    background-color: #b5b7b4;
    height: 40px;
    line-height: 40px;
  }

  .header_right i {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    color: #ffffff;
    line-height: 15px;
    font-style: normal;
    display: inline-block;
    position: absolute;
    z-index: 1;
    top: 0px;
    margin-left: 20px;
  }

  .header_right .loginname {
    display: inline-block;
    padding: 0 5px;
  }

  .search {
    padding: 5px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    border: none;
    margin-right: 15px;
  }

  .imageHead {
    /*background: url("../assets/logo.png") no-repeat center center;*/
    width: 29px;
    height: 29px;
    top: 4px;
    position: absolute;
    border-radius: 50%;
    display: inline-block;
    background-color: greenyellow;
  }

  /*  登录页  */

  .LoginPage {
    width: 500px;
    padding: 10px;
    background-color: #acb9b2;
    margin: 0 auto;
    top: 200px;
    position: fixed;
    left: 0;
    right: 0;
    z-index: 1000;
    box-shadow: 0px 0px 3px 3px #7d7b7b;
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
    background-color: #717592;
    margin: auto;
    margin-bottom: 10px;
  }

  /*  信息驳回 */
  .feedback {
    position: fixed;
    width: 50%;
    /*height: 300px;*/
    left: 0px;
    right: 0px;
    background-color: rgb(118, 142, 182);
    top: 100px;
    z-index: 100;
    margin: auto;
    box-shadow: 5px 5px 3px #6f7a86;
    padding: 5px;
  }

  .feedback ul li {
    display: flex;
    margin-top: 10px;
    justify-content: center
  }

  .feedback ul li span {
    vertical-align: middle;
    display: inline-block;
    padding: 2px;
  }

  .feedback ul li span:nth-child(2n+1) {
    width: 80px;
    height: 20px;
    background-color: darkgrey;
  }

  .feedback ul li span:nth-child(2n) {
    width: 260px;
    word-break: break-all;
    background-color: #2fbaf8;
    text-align: left;
  }

  .feedBtn {
    margin: 20px auto;
  }

  .feedBtn span {
    padding: 5px 15px;
    background-color: #2663c8;
  }
</style>
