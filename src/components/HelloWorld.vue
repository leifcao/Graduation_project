<template>
  <div class="hello">
    <form action="">
      <h1>查询</h1>
      <input type="text" v-model="keywords" placeholder="输入姓名查询">
      <button type="button" @click="selectUser">查询</button>
      <div>
        <h3>{{message.name}}</h3>
        <h5>{{message.age}}</h5>
        <span>{{message.id}}</span>
      </div>
    </form>
    <form action="">
      <h1>查询信息</h1>
      <input type="text" v-model="mess" placeholder="空查询">
      <button type="button" @click="selectquery(mess)">查询</button>
      <div>
        <ul v-for="(item,index) in allmembers" :key="index" style="list-style-type: none;margin:0 auto;">
          <li style="border: 1px solid red">
            <dl style="display: flex;">
              <dd>id:{{item.id}}</dd>
              <dd>name:{{item.name}}</dd>
              <dd>age:{{item.age}}</dd>
              <dd><router-link :to="'/helloworld/update/'+item.id">修改</router-link></dd>
            </dl>
          </li>
        </ul>
      </div>
    </form>
    <form action="">
      <h1>删除</h1>
      姓名：<input type="text" name="username" v-model="names"><br>
      年龄：<input type="text" name="age" v-model="age"><br>
      <button type="button" @click="Delete">删除</button>
    </form>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'HelloWorld',
    props: {
      msg: String
    },
    data(){
      return{
        userName:'',
        age:'',
        keywords:'',
        password: '',
        names: '',
        mess: '',
        message: [],
        allmembers: []
      }
    },
    mounted(){
      this.selectquery()
    },
    methods:{
      addUser(){ //
        let name = this.userName;
        let age = this.age;
        let password = this.password;
        axios.post('/api/user/addUser',{
          name,age,password
        }).then(res=>{
          alert('信息添加成功');
          this.userName = '';
          this.age = '';
          this.password = '';
        }).catch(err=>{
          console.log(err)
        })
      },
      selectUser(){
        let name = this.keywords;
        axios.post('api/user/selectUser',{
          name
        }).then(res=>{
          let data = res.data[0];
          this.message = data;
          console.log(this.message)
          console.log(res)
        }).catch(err=>{
          console.log(err)
            alert('没有此用户')
        })
      },
      selectquery(mess){
        //查询全部
        var name = mess || '';
        var url = 'api/user/selectmess'
        axios.post(url,{
          name
        }).then(res=>{
          console.log(res)
          this.allmembers = res.data;
          console.log(this.allmembers)
        }).catch(err=>{
          console.log(err)
        })
      },
      //删除
      Delete(){
        let name = this.names;
        let age = this.age;
        axios.post('/api/user/Deleteuser',{
          name,age
        }).then(res=>{
          if(res.data == ''){
            alert('年龄和姓名不匹配');
            return;
          }
          alert('删除成功');
          this.names = '';
          this.age = '';
        }).catch(err=>{
          console.log(err)
        })
      },
      //修改信息
      updatemess(i){

      }
    }
  }
</script>
<style>
  ul li dd{
    width: 100px;
    height: 20px;
    font-size: 16px;
    line-height: 20px;
  }
</style>
