<template>
  <div id="Search">
    <input type="text" v-model="message" @keyup.enter="search" placeholder="请输入您要搜索的手机名称">
    <span class="SearchMessage" @click="search">搜索</span>
  </div>
</template>

<script>
  import axios from 'axios';
  import urlkit from '../url/urlkit';

  export default {
    name: "Search",
    data() {
      return {
        message: '',
      }
    },
    created() {
    },
    mounted() {
      // console.log(this.$store.state.name)
    },
    methods: {
      //查询信息
      search() {
        // alert(1);
        let message = this.message;
        let page = 0;
        let url = urlkit + '/api/product/PhoneSearch';
        axios.post(url, {message,page}).then(res => {
          if (res.status === 200) {
            if(res.data.length == 0){
              alert('没有您想要查询的信息');
              return;
            }
            //信息传到父组件
            this.$emit('queryList',res.data);
          }
        });
      },
    }
  }
</script>

<style scoped>
  #Search {
    text-align: left;
  }

  #Search input {
    border-radius: 3px;
    width: 350px;
    height: 20px;
    display: inline-block;
    margin-top: 10px;
    margin-left: 55px;
    padding: 5px;
  }

  .SearchMessage {
    width: 90px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color: #41416c;
    color: white;
    margin-top: 10px;
    margin-left: 15px;
    border-radius: 3px;
    display: inline-block;
  }
</style>
