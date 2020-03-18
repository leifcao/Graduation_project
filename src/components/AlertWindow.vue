<template>
  <!--  手机新品 热评  -->
  <div class="News" v-show="windowFlag">
    <div class="News_Main">
      <div class="News_MainLeft">
        <div v-for="(item,index) in PhoneType" :key="index" class="News_MainLeftType"
             @click="CheckPhone(item)" :class="{'TypeClickCss':TypeClick ===item}">
          <span>{{item}}</span>
        </div>
      </div>
      <div class="closeBtn"><span @click="closeWind()">x</span></div>
      <div class="News_title"><h4>{{TypeClick}}</h4></div>
      <div class="News_middle">
        <ul>
          <li v-for="(item,index) in hotphone" :key="index" @mouseover="NewsPhoneflag=index"
              @click="addTableList(item)">
            <!--                <em :class="index<3?'hotEm':''">{{index+1}}</em>-->
            <em :class="{'liHoverblock':NewsPhoneflag === index}">{{index+1}}</em>
            <img v-show="NewsPhoneflag === index?true:false" :src="item.imgsrc" alt="">
            <p :class="{'liHoverblock':NewsPhoneflag === index}">{{item.name}}</p>
            <em style="top:60px;color: red;font-style: normal" v-show="NewsPhoneflag === index?true:false"
                :class="{'liHoverblock':NewsPhoneflag === index}">￥{{item.Price}}</em>
          </li>
        </ul>
      </div>
      <div class="News_bottom">
      </div>
    </div>
  </div>

</template>

<script>
  import axios from 'axios';
  import urlkit from '../url/urlkit';

  export default {
    name: "AlertWindow",
    data() {
      return {
        NewsPhoneflag: 0,//默认手机新品 li 显示
        PhoneTypes: [],
        hotphone: [], //手机列表
        PhoneType: ['全部', '华为', '小米', '荣耀', '苹果', 'vivo', 'OPPO', '一加'],
        TypeClick: '全部',
        windowFlag: false,
        indexflag: '',//父组件传过来的index信息
      }
    },
    created() {
    },
    mounted() {
      //获取全部手机
      this.CheckPhone(this.TypeClick);
    },
    methods: {
      //获取手机信息  默认查询全部
      CheckPhone(obj) {
        this.TypeClick = obj;
        let phoneType = obj;
        let url = urlkit + '/api/product/popupWindow';
        axios.post(url, {phoneType}).then(res => {
          if (res.status === 200) {
            this.hotphone = res.data;
          }
        });
      },
      //将信息传到父组件
      addTableList(obj) {
        let list = JSON.parse(sessionStorage.getItem('phone') || '[]');
        // console.log(list,'555')
        var repeatflag = true;
        list.some((item, index) => {
          if(item.pid == obj.pid){
            alert('该手机已在对比区中');
            repeatflag = false;
            return true;
          }
        });
        if(repeatflag){
          this.$emit('func', {obj: obj, indexflag: this.indexflag});
          this.closeWind();
        }
      },
      //关闭窗口传值 传到父组件
      closeWind() {
        this.windowFlag = false;
      },
      openWind(index) {
        this.windowFlag = true;
        this.indexflag = index;
      }
    },
  }

</script>

<style scoped>
  /*  热评新手机上市 */

  .News {
    background-color: #ffffff;
    width: 355px;
    position: absolute;
    top: 155px;
    left: 365px;
    z-index: 101;
  }

  .News .News_Main {
    /*width: 70%;*/
    margin: 0px auto;
    background-color: #fff;
    border: 1px solid #e6e6e6;
    padding-bottom: 10px;
  }

  .News .News_Main .News_MainLeft {
    float: left;
    width: 50px;
    background-color: #9b7894;
    color: #ffffff;
    margin-top: 30px;
  }

  .News .News_Main .News_MainLeft .News_MainLeftType {
    padding: 5px;
    border: 1px solid #ffffff;
  }

  .News .News_Main .News_MainLeft .TypeClickCss {
    background-color: #e6a23c;
    /*color: #ffffff;*/
  }

  .closeBtn {
    float: right;
  }

  .closeBtn span {
    font-weight: bold;
    font-size: 20px;
    width: 30px;
    height: 30px;
    line-height: 30px;
    display: block;
    color: white;
    cursor: pointer;
  }

  .News .News_Main .News_title {
    width: 100%;
    height: 30px;
    line-height: 30px;
    /*padding: 5px;*/
    color: #fff;
    background-color: #535582;
  }

  .News .News_Main .News_middle {
  }

  .News .News_Main .News_middle .anim {
    transition: all 0.5s;
    margin-top: -30px;
  }

  .News .News_Main .News_middle ul {
    overflow: auto;
    height: 400px;
  }

  .News .News_Main .News_middle li {
    text-align: left;
    padding: 5px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    position: relative;
    font-size: 12px;
  }

  .News .News_Main .News_middle li img {
    display: inline-block;
    margin-left: 20px;
    width: 80px;
    height: auto;
  }

  .News .News_Main .News_middle .liHoverblock {
    width: 150px;
    position: absolute;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
  }

  .News .News_Main .News_middle li em {
    color: #6467b6;
    display: inline-block;
  }

  .News .News_Main .News_middle .hotEm {
    color: red !important;
  }

  .News .News_Main .News_middle li p {
    display: inline-block;
    margin-left: 10px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 13px;
    width: 250px;
  }


  /*  滚动条*/
  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  ::-webkit-scrollbar {
    width: 10px;
    background-color: #fff;
  }

  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: lightgray;
  }

  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
    background-color: #6467b6;
  }

  /*定义最上方和最下方的按钮*/
  ::-webkit-scrollbar-button {
    /*background-color: #000;*/
    /*border:1px solid yellow;*/
  }

</style>
