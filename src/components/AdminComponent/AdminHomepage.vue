<template>
  <div id="temp">
    <div class="AdminPage">
      <div class="AdminHead"></div>
      <div class="AdminLeft">
        <ul class="AdminLeft_topMain">
          <!--  管理菜单栏  -->
          <li v-for="(item,index) in AdminMenu" :key="index" @click="PageLight=index"
              :class="{'listclik':PageLight==index}">{{item}}
          </li>

        </ul>
      </div>

      <!--  中间内容    -->
      <div class="AdminMiddle">
        <!--   用户信息管理    -->
        <div class="AdminMiddle_main" v-show="PageLight==0">
          <div class="UserSearch">
            <span @click="selectquery(1)">显示全部</span>
            <select name="select" v-model="selectMessage">
              <option :value="index" v-for="(item,index) in UserSelect" :key="index">{{item}}</option>
            </select>
            <input type="text" placeholder="搜索" v-model="searchmess" @keyup.enter="selectsingle(1)">
            <span class="SearchMessage" @click="selectsingle(1)">搜索</span>
          </div>
          <div class="UserMessage">
            <table cellspacing="0">
              <thead>
              <tr>
                <th>id</th>
                <th>用户名</th>
                <th>密码</th>
                <th>类型</th>
                <th>电话</th>
                <th>管理</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in allmembers" :key="index">
                <td>{{item.id}}</td>
                <td>{{item.name}}</td>
                <td>*****</td>
                <td>{{item.type}}</td>
                <td>{{item.tel}}</td>
                <td>
                  <span @click="updateUser(item)">修改</span>
                  <span @click="deleUser(item)">删除</span>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="Pagebtn">
            <span @click="fontPage" v-show="fontflag">上一页</span>
            <span @click="nextPage" v-show="nextflag">下一页</span>
          </div>

        </div>
        <!--   手机信息管理    -->
        <div class="AdminMiddle_main" v-show="PageLight==1">
          <AdminPhone></AdminPhone>
        </div>
        <!--   评论信息审核    -->
        <div class="AdminMiddle_main" v-show="PageLight==2">
          <AdminComment></AdminComment>
        </div>
        <!--   新增热点消息    -->
<!--        <div class="AdminMiddle_main" v-show="PageLight==3">-->
<!--          aaa-->
<!--        </div>-->
      </div>
      <!--   清楚浮动   -->
      <div class="clearfix"></div>

      <!--      <div class="AdminRight" style="height: 200px;">-->

      <AdminUpdate ref="updateWindow"></AdminUpdate>
    </div>

  </div>
</template>

<script>
  import axios from 'axios';
  import AdminUpdate from '../AdminComponent/AdminUpdatepage'
  import AdminPhone from '../AdminComponent/AdminPhonepage'
  import AdminComment from '../AdminComponent/AdminCommentpage'
  import urlkit from '../../url/urlkit';

  export default {
    name: "AdminHomepage",
    data() {
      return {
        PageLight: 0,//菜单高亮且切换
        AdminMenu: ['用户信息管理', '手机信息管理', '评论信息审核'],
        UserSelect: ['id', '用户名', '手机类型'],
        selectMessage: 0, //根据选择类型查询信息
        allmembers: [], //userlist 用户列表
        searchmess: '',//搜索内容
        pagesize: 0, //搜索单页
        fontflag: false, //上一页按钮隐藏
        nextflag: true, //下一页的按钮隐藏
        searchflag: 1, //是否出去搜索状态
        flagsubmit: true, //防止重复提交
        //
      }
    },
    created() {
    },
    mounted() {
      this.selectquery();
    },
    methods: {
      //查询全部
      selectquery(num) {
        var name = '';
        let pagesize = this.pagesize;
        if(num == 1){
          this.pagesize = 0;
          this.fontflag = false;
          pagesize = 0;
        }
        if (this.searchmess != '') {
          this.searchmess = '';  //清空搜索栏
          this.pagesize = 0;
          pagesize = 0;
        }
        let url = urlkit + '/api/user/selectmess';
        axios.post(url, {name, pagesize}).then(res => {
          this.allmembers = res.data;
          if (res.data.length == 0) {
            console.log(this.pagesize)
            alert('信息已到最后');
            this.nextflag = false;
            return;
          }
          //数据量条数小于15 隐藏按钮
          if (res.data.length < 15) {
            this.nextflag = false;
            return;
          }
          this.nextflag = true; //
          // console.log(this.allmembers)
        }).catch(err => {
          console.log(err)
        });
      },
      //单一查询
      selectsingle(num) {
        let flag = this.selectMessage;
        let message = this.searchmess;
        let pagesize;
        if(num ==1){
          this.pagesize = 0;
          pagesize = 0;
        }else{
         pagesize = this.pagesize;
        }
        // console.log(this.pagesize);
        let url = urlkit + '/api/user/selectUser';
        axios.post(url, {flag, message, pagesize}).then(res => {
          if (res.status === 200) {
            if (res.data.length == 0) {
              alert('没有该信息');
              return;
            }
            if (res.data.length < 15) {
              this.nextflag = false;
            }
            if(this.pagesize == 0){
              this.fontflag = false;//上一页按钮隐藏
            }
            this.allmembers = res.data;
          }
        });
      },
      //上一页
      fontPage() {
        this.pagesize = this.pagesize - 15;
        if (this.pagesize == 0) {
          this.fontflag = false;//上一页按钮隐藏
        }
        if (this.searchmess != '') {  //处于搜搜状态
          this.selectsingle();  //搜索状态查询上一页
        } else {
          this.selectquery();  //查询全部下一页
        }
      },
      //下一页
      nextPage() {
        this.fontflag = true;//上一页按钮显示
        this.pagesize = this.pagesize + 15;
        if (this.searchmess != '') {  //处于搜搜状态
          this.selectsingle(); //搜索状态查询下一页
        } else {
          this.selectquery(); //查询全部下一页
        }
      },
      //  修改用户信息
      updateUser(item) {
        this.$refs.updateWindow.open(item) // 调用父类
      },
      //  删除用户信息
      deleUser(item) {
        if (confirm('是否删除该用户')) {
          if (this.flagsubmit) {
            this.flagsubmit = false;
            let id = item.id;
            let url = urlkit + '/api/user/Deleteuser';
            axios.post(url, {id}).then(res => {
              if (res.status == 200 && res.data.affectedRows == 1) {
                this.flagsubmit = true;
                alert('删除成功');
                this.selectquery();
              }
            }).catch(err => {
              console.log(err)
            });
          } else {
            alert('请勿重复删除');
          }
        }
      },


    },
    components: {
      AdminUpdate, AdminPhone, AdminComment
    }
  }
</script>

<style scoped>
  #temp {
    width: 80%;
    margin: auto;
    height: 685px;
    /*background-color: red;*/
    background-image: linear-gradient(to right, #9b7894, #b8b8b8, #6467b6);
  }

  .AdminPage {
    width: 100%;
    position: relative;
  }

  /*左边栏*/
  .AdminLeft {
    width: 12%;
    margin: auto;
    float: left;
  }

  .AdminLeft_topMain {
    background-color: #e6e6e6;
    width: 100%;
    height: auto;
  }

  .AdminLeft_topMain .listclik {
    background-color: #ae9d1d;
  }

  .AdminLeft_topMain li {
    background-color: #584e76;
    color: #ffffff;
    height: 30px;
    line-height: 30px;
    padding: 5px;
    /* border: 1px solid white; */
    margin-top: 5px;
    box-shadow: 0px 0px 3px 3px #dcdcdc;
  }

  /*中间边板块*/
  .AdminMiddle {
    float: left;
    /*height: 600px;*/
    width: 80%;
    /*background-color: #fff;*/

  }

  .AdminMiddle span {
    padding: 5px;
  }

  .AdminMiddle .AdminMiddle_main {
    width: 90%;
    /*height: 300px;*/
    padding: 5px;
    margin: 10px auto;
    /*background-color: #e6e6e6;*/
    background-image: linear-gradient(to right, #9b7894, #b8b8b8, #8b8caf);
    box-shadow: 0px 0px 3px 3px #6f6f6f;

  }

  /*清除浮动*/
  .clearfix:after {
    clear: both;
    content: '';
    display: block;
    height: 0;
    visibility: hidden;
  }

  .UserSearch {
    width: 100%;
    padding: 10px;
    text-align: center;
    display: flex;
    justify-content: center;
  }

  .UserSearch select {
    width: 100px;
    height: 30px;
    padding: 5px;
    display: inline-block;
    margin-left: 15px;
    border-radius: 3px;
    /*隐藏select的下拉图标*/
    /*appearance: none;*/
    /*-webkit-appearance: none;*/
    /*-moz-appearance: none;*/
    /*清除select的边框样式*/
    border: none;
    /*清除select聚焦时候的边框颜色*/
    outline: none;
    vertical-align: middle;
  }

  .UserSearch input {
    border-radius: 3px;
    width: 350px;
    height: 20px;
    display: inline-block;
    margin-left: 15px;
    /*margin-top: 10px;*/
    padding: 5px;
    vertical-align: middle;
  }

  .SearchMessage {
    width: 90px;
    text-align: center;
    background-color: #51517e;
    color: white;
    margin-left: 15px;
    border-radius: 3px;
    display: inline-block;
    /*margin-top: 10px;*/
    vertical-align: middle;
  }

  .UserMessage {
    width: 90%;
    margin: auto;
    /*border: 1px solid gray;*/
  }

  .UserMessage tbody, table, thead {
    width: 100%;
    margin: auto;
    /*border: 1px solid gray;*/
  }

  .UserMessage tr {

  }

  .UserMessage tr td, th {
    height: 30px;
    line-height: 30px;
    border: 1px solid #c5c5c5;
  }

  .Pagebtn span {
    background-color: #51517e;
    margin: 10px auto;
    padding: 5px 10px;
    display: inline-block;
    cursor: pointer;
    color: #ffffff;
  }


</style>
