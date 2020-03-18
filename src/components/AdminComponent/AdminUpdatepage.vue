<template>
  <div id="temps" v-show="updateopen">
    <!--  更新页面弹窗 -->
    <div class="UpdatePage">
    </div>

    <div class="UpdateMain">
      <div class="updateBox">
        <span class="updateclose" @click="close()">x</span>
        <ul>
          <li>
            <span>id:</span>
            <span>{{ID}}</span>
          </li>
          <li>
            <span>用户名:</span>
            <span><input type="text" v-model="userName"></span>
          </li>
          <li>
            <span>密码:</span>
            <span><input type="password" v-model="passWord"></span>
          </li>
          <li>
            <span>类型:</span>
            <span>
            <select name="" id="" v-model="options">
             <option :value="item" v-for="(item,index) in Ptypes" :key="index">{{item}}</option>
            </select>
          </span>
          </li>
          <li>
            <span>电话号码:</span>
            <span><input type="text" v-model="telephone"></span>
          </li>
        </ul>
      </div>
      <div class="btn">
        <span @click="submit()">提交</span>
        <span @click="close()">取消</span>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import urlkit from '../../url/urlkit';

  export default {
    name: "AdminUpdatepage",
    data() {
      return {
        Ptypes: ['华为', '小米', '荣耀', '苹果', 'vivo', 'OPPO', '一加'],
        updateopen: false,  //打开窗口flag
        flagsubmit: true, //防止重复提交
        ID:'',//用户id
        userName: '',  //用户名
        passWord: '',  //密码
        telephone: '', //电话
        options: '',  //类别
      }
    },
    created() {
    },
    mounted() {
      this.checkSession();
    },
    methods: {
      //验证登录
      checkSession() {
        let userName = JSON.parse(sessionStorage.getItem('userName'));
        if (userName == '') {
          alert('您无权访问');
          this.$router.go(-1);
          return;
        }
      },
      //提交信息
      submit() {
        if(this.flagsubmit){
          this.flagsubmit = false;
          var array = [];
          array.push(this.userName);
          array.push(this.passWord);
          array.push(this.options);
          array.push(this.telephone);
          array.push(this.ID);
          let url = urlkit + '/api/user/updateUser';
          axios.post(url, {array}).then(res => {
            if(res.status === 200 && res.data.affectedRows ==1){
              // console.log(res)
              alert('提交成功');
              this.flagsubmit = true;
              // this.$emit('ReQuery');
              this.$parent.selectquery(); //子调用父方法
              this.close();
            }
          }).catch(err=>{
            console.log(err);
          });
        }else {
          alert('请勿重复提交');
        }
      },
      //关闭窗口
      close() {
        this.updateopen = false;
      },
      //打开窗口
      open(data) {
        this.updateopen = true;
        this.userName = data.name;
        this.passWord = data.password;
        this.options = data.type;
        this.telephone = data.tel;
        this.ID = data.id;
        // console.log(data, this.updateopen, data.password);
      },
    }
  }
</script>

<style scoped>
  #temps {
    width: 100%;
  }

  /*  更新页弹窗 蒙版*/
  .UpdatePage {
    width: 100%;
    position: absolute;
    top: 0px;
    height: 650px;
    opacity: 0.6;
    background-color: #9c8cac;
  }

  .UpdateMain {
    width: 80%;
    background-color: #51536f;
    color: #ffffff;
    margin: auto;
    position: absolute;
    top: 50px;
    left: 0px;
    right: 0px;
    box-shadow: 5px 5px 3px #6f7a86;
  }

  .updateBox {
    padding: 10px;
    position: relative;;
  }

  .updateBox p {
    height: 30px;
    position: relative;;
  }

  .updateBox ul li {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }

  .updateBox ul li span:nth-child(2n) {
    width: 300px;
    height: 50px;
    line-height: 50px;
    text-align: left;
    display: inline-block;
    position: relative;;
    vertical-align: middle;
    margin-left: 10px;
  }

  .updateBox ul li span:nth-child(2n+1) {
    width: 80px;
    height: 50px;
    line-height: 50px;
    text-align: right;
    display: inline-block;
    position: relative;;
    vertical-align: middle;
  }

  .updateBox input {
    height: 20px;
    border-radius: 3px;
    width: 260px;
    padding: 5px;
  }

  .updateBox select {
    width: 150px;
    height: 30px;
    /* padding: 5px; */
    border-radius: 3px
  }

  .updateclose {
    position: absolute;
    padding: 5px;
    font-size: 20px;
    right: 0px;
    top: 0px;
    background-color: #a53d3d;
  }

  .btn {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .btn span {
    padding: 5px;
    width: 50px;
    display: inline-block;
    background-color: #6f7a86;
    cursor: pointer;
  }
</style>
