<template>
  <div id="temp">
    <!--    <login></login>-->
    <!--   手机轮播   -->
    <div class="theader">
      <div class="Phone_swiper">
        <PhoneSwiper></PhoneSwiper>
      </div>

      <!--   消息通知  -->
      <!--      <div class="Notify_mess">-->
      <!--      </div>-->
      <!--   手机搜索   -->
      <div class="SearchPHone">
        <Search ref="childsearch" @queryList="getQuery"></Search>
      </div>
    </div>

    <div class="tmiddle">
      <!-- 手机分类 -->
      <div class="Phone_classification">
        <div class="Phone_brand">
          <h3>品牌:</h3>
          <ul>
            <li v-for="(item,index) in PhoneType" :key="index" @click="classifyMethods(item,'1')"
                :class="{'Unlimited': Brandflag === item}">
              <span>{{item}}</span>
            </li>
          </ul>
        </div>
        <div class="Phone_size">
          <h3>价格:</h3>
          <ul>
            <!--            <li v-for="(item,index) in PriceArray" :key="index" @click="PriceMethods(item)"-->
            <li v-for="(item,index) in PriceArray" :key="index" @click="classifyMethods(item,'2')"
                :class="{'Unlimited': Priceflag === item}">
              <span>{{item}}</span>
            </li>
          </ul>
        </div>
      </div>

      <!--  手机信息  -->
      <div class="Phone_mess">
        <ul class="phone_ul">
          <li class="phone_list" v-for="(item,index) in phonelist" @mouseover="compareBtn(index)"
              @mouseout="compareflag=undefined" :class="compareflag == index?'phone_listHover':''">
            <!--            <router-link :to="'/PhoneMessage/'+item.pid">-->
            <div @click="GoPhoneDetail(item.pid,item.name)">
              <img :src="item.imgsrc" alt="">
              <!--            <img src="../assets/xiaomi10.jpg" alt="">-->
              <p class="phone_title" :title="item.name">{{item.name}}</p>
              <p>参考价格：<span class="price_style">{{item.prices}}</span></p>
              <div class="comment_row">
              <span class="star">
                <em :style="{width:item.totalscore*10+'%'}"></em>
              </span>
                <span class="score">{{item.totalscore}}</span>
              </div>
            </div>
            <!--            </router-link>-->
            <p @click="addCompare(item)" v-show="compareflag == index?true:false">对比</p>
          </li>
        </ul>
        <div class="PageBtn" v-show="searchFlag">
          <span class="fontBtn" @click="fontClick()" v-show="pageflag">< 上一页</span>
          <span class="NumBtn" @click="numClick(pageNum)"
                :class="pagelightflag == pageNum? 'pagelight': ''">{{pageNum}}</span>
          <span class="NumBtn" @click="numClick(pageNum+1)" :class="pagelightflag == pageNum+1? 'pagelight': ''">{{pageNum+1}}</span>
          <span class="NumBtn" @click="numClick(pageNum+2)"
                :class="pagelightflag == pageNum+2? 'pagelight': ''">{{pageNum+2}}</span>
          <span style="border: 0" v-show="pageflag1">...</span>
          <span class="nextBtn" @click="nextClick()" v-show="pageflag1">下一页 ></span>
        </div>
      </div>
      <!--  手机新品 热评  -->
      <div class="News">
        <div class="News_Main">
          <div class="News_title"><h4>热评手机</h4></div>
          <div class="News_middle">
            <ul>
              <li v-for="(item,index) in hotphone" :key="index" @mouseover="NewsPhoneflag=index"
                  @click="GoPhoneDetail(item.pid,item.name)">
                <!--                <em :class="index<3?'hotEm':''">{{index+1}}</em>-->
                <em :class="{'hotEm':index<3,'liHoverblock':NewsPhoneflag === index}">{{index+1}}</em>
                <img v-show="NewsPhoneflag === index?true:false" :src="item.imgsrc" alt="">
                <p :class="{'liHoverblock':NewsPhoneflag === index}">{{item.name}}</p>
                <em style="top:60px;color: red;" v-show="NewsPhoneflag === index?true:false"
                    :class="{'liHoverblock':NewsPhoneflag === index}">{{item.prices}}</em>
              </li>
            </ul>
          </div>
          <div class="News_bottom"></div>
        </div>
      </div>
      <!--   对比车   -->
      <div class="Compare_car">
        <h4 class="Compare_carTitle">[{{compareCarNum}}/3] 对比栏</h4>
        <ul>
          <li class="Compare_contrast" v-for="(item,index) in compareCarArray" v-if="index<3"
              @mouseover="delePhoneflag = index" @mouseout="delePhoneflag = ''" @click="GoPhoneDetail(item.pid,item.name)">
            <img :src="item.imgsrc" alt="">
            <span class="DelePhone" v-show="delePhoneflag === index?true:false" @click="deleSinglePhone(index)">x</span>
            <p class="phone_title">{{item.name}}</p>
          </li>
        </ul>
        <div class="Compare_carBottom">
          <span @click="GoCompare(compareCarArray)">对比</span>
          <span @click="clearCompare()">清空对比栏</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // 引入轮播图组件
  import axios from 'axios';
  import PhoneSwiper from './PhoneSwiper';
  import login from './login';
  import Search from './Search';
  import urlkit from '../url/urlkit';

  export default {
    name: "HomePage",
    data() {
      return {
        message: '123',
        imgsrcs1: "url(" + require('../assets/logo.png') + ")",  //默认图
        imgsrc3: require('../assets/rongyaov30.jpg'),
        PhoneType: ['全部', '华为', '小米', '荣耀', '苹果', 'vivo', 'OPPO', '一加'],
        PhoneList: [
          {
            'price': '5000$',
            'date': '2019年10月01日',
            'type': '小米',
            'Cpu': 'ios Exynos 980',
            'swift': '支持',
            'imgsrc': require('../assets/rongyaov30.jpg'),
            'lightflag': false,
          },
        ],
        compareflag: undefined,  //对比按钮的显示隐藏
        pageflag: false, //上一页的显示隐藏
        pageflag1: true,//下一页的显影
        pagelightflag: 1, //数字按钮高光
        delePhoneflag: '', //删除单个手机的flag
        compareCarArray: [],//对比栏手机数组
        compareCarNum: 0,//对比栏手机数量
        pageNum: 1,//页数设置 默认设置0
        pagesize: 0, //分页查询
        pagesize1: 0, //过度分页查询
        hotphone: [], //热评手机列表
        NewsPhone: [],// 手机新品数组
        animate: false,//手机新品轮播 过渡
        NewsPhoneflag: 0,//默认手机新品 li 显示
        Brandflag: '全部', //品牌类别点击高亮
        Priceflag: '不限', //价格类别点击高亮
        Cpuflag: '全部',  //Cpu类别点击高亮
        PriceArray: ['不限', '0-1000', '1000-2000', '2000-3000', '3000-4000', '4000-5000', '5000以上'], //价格分类
        phonelist: [],//手机列表
        searchFlag: true, //搜索数据过少时隐藏下一页按钮信息
        searchNum: 1, //当前页是查询返回的结果,下一或者上一页调用子组件方法
        PhoneArray: [], //假懒加载数据缓存
      }
    },
    created() {
    },
    mounted() {
      this.GetPhonemess();    //手机列表
      this.GethotPhone();    //热评手机
      // setInterval(this.PhoneScroll,2000);
      window.addEventListener('scroll', this.handleScroll2);

      this.compareCarArray = JSON.parse(sessionStorage.getItem('phone') || '[]');
      var compareNumber = this.compareCarArray.length;
      this.compareCarNum = compareNumber++;
    },
    destroyed() {
      window.removeEventListener('scroll', this.handleScroll2);//结束监听滚动
    },
    methods: {
      // 假懒加载实现.
      handleScroll2() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;//滚动条偏移量
        if (scrollTop >= 2780 && this.searchNum == 2) {
          this.phonelist = this.PhoneArray;
          this.searchNum = 1;
          console.log(scrollTop);
        }
      },
      //搜索手机列表返回的数据,子组件返回数据
      getQuery(data) {
        this.searchNum = 2;
        this.searchFlag = false; //隐藏按钮信息
        this.Brandflag = '全部'; //品牌类别点击高亮
        this.Priceflag = '不限'; //价格类别点击高亮
        //假懒加载
        // console.log(data)
        if (data.length > 40) {
          this.PhoneArray = data;
          this.phonelist = []
          for (let i = 0; i <= 40; i++) {
            this.phonelist.push(data[i]);
          }
        } else {
          this.searchNum = 1;
          this.phonelist = data;
        }
      },
      //手机列表
      GetPhonemess() {
        let _this = this;
        let pagesize = _this.pagesize;
        let pagesize1 = 40;
        let url = urlkit + '/api/product/Enquirygoods';
        axios.post(url, {pagesize, pagesize1}).then(res => {
          if (res.status === 200) {
            _this.phonelist = res.data;
            // console.log(_this.phonelist.length, pagesize);
          }
        })
      },
      //热评框
      GethotPhone() {
        let url = urlkit + '/api/product/hotComment';
        axios.get(url).then(res => {
          if (res.status === 200) {
            this.hotphone = res.data;
          }
        });
      },
      //手机类别选择 【品牌】【价格】
      classifyMethods(obj, type) {
        this.searchNum = 1; //搜索切换 开关
        this.searchFlag = true;  //假懒加载
        this.pagelightflag = 1; //页数高亮重置
        this.pageNum = 1; //页数重置
        this.pageflag = false; //上一页按钮隐藏
        this.pageflag1 = true;  //下一页按钮显示
        this.pagesize = 0; //分页
        this.pagesize1 = 0; //分页过度
        let url = urlkit + '/api/product/queryTypePrice';
        if (type == 1) {
          this.Brandflag = obj;
        } else {
          this.Priceflag = obj;
        }
        var pagesize = 0;
        var Brand = this.Brandflag; //类型
        let pagesize1 = 40; //分页
        let prices = this.Priceflag; //价格类别
        if (Brand == '全部' && prices == '不限') {
          this.GetPhonemess();//查询全部
          return;
        }
        //当前点击事件不是“全部”执行 或者不是全部时执行
        axios.post(url, {Brand, prices, pagesize, pagesize1}).then(res => {
          if (res.status === 200) {
            this.phonelist = res.data;
            if (this.phonelist.length < 40) {
              this.searchFlag = false;
            }else{
              this.searchFlag = true;
            }
          }
        });
      },
      //对比按钮的显影
      compareBtn(index) {
        this.compareflag = index;
      },
      //添加手机进如对比栏
      addCompare(item) {
        var pidFlag = true;
        if (this.compareCarNum == 3) {
          alert('抱歉你只能选三款产品进行比较');
          return;
        }
        this.compareCarArray.some((i, index) => {
          if (i.pid == item.pid) {
            alert('该商品已在对比栏中');
            pidFlag = false;
            return;
          }
        });
        if (pidFlag) {
          this.compareCarArray.push(item);
          var compareNumber = this.compareCarArray.length;
          this.compareCarNum = compareNumber++;
          sessionStorage.setItem('phone', JSON.stringify(this.compareCarArray));
        }
      },
      // 手机新品轮播
      PhoneScroll() {
        this.animate = true;
        setTimeout(() => {   //es6箭头函数 省去this的指向问题
          this.NewsPhone.push(this.NewsPhone[0]);
          this.NewsPhone.shift();
          this.animate = false;
        }, 1000)
      },
      // 上一页点击事件
      fontClick() {
        this.pageNum--;
        this.pagelightflag--;
        // console.log(this.pageNum)
        this.pagesize = this.pagesize1 - 40;
        this.pagesize1 = this.pagesize;
        this.pageflag1 = true;
        if (this.pageNum == 1) {
          this.pageflag = false;
        }
        if (this.Brandflag == '全部' && this.Priceflag == '不限') {
          this.GetPhonemess();
        } else {
          this.GetTpyePage(this.Brandflag, this.Priceflag);
        }
        // console.log(this.pageNum, 'pageNum');
      },
      // 下一页点击事件
      nextClick() {
        if (this.phonelist.length < 40) {
          this.pageflag1 = false;
          alert('已经是最后一页了');
          // console.log(this.pageNum, 'pageNum');
          return;
        }
        this.pageflag = true; //上一页的按钮标识
        this.pagesize = this.pagesize1 + 40;
        this.pagesize1 = this.pagesize;
        if (this.Brandflag == '全部' && this.Priceflag == '不限') {
          this.GetPhonemess();
        } else {
          this.GetTpyePage(this.Brandflag, this.Priceflag);
        }
        this.pageNum++; //页数
        this.pagelightflag++; //当前页高亮
        this.pageflag1 = true;
        // console.log(this.pageNum, 'pageNum',this.pagelightflag);
      },
      // 数字点击事件
      numClick(num) {
        this.pagelightflag = num;
        this.pagesize = (num - 1) * 40;
        this.pagesize1 = this.pagesize;
        if (num == 1) {
          this.pageflag = false;
        }
        if (this.Brandflag == '全部' && this.Priceflag == '不限') {
          this.GetPhonemess();
        } else {
          this.GetTpyePage(this.Brandflag, this.Priceflag);
        }
      },

      //类别 价格 下一页 上一页促发方法
      GetTpyePage(type, pricesType) {
        let Brand = type;
        let pagesize = this.pagesize;
        let pagesize1 = 40;
        let prices = pricesType; //价格类别
        let url = urlkit + '/api/product/queryTypePrice';
        axios.post(url, {Brand, prices, pagesize, pagesize1}).then(res => {
          if (res.status === 200) {
            this.phonelist = res.data;
          }
        });
      },
      //删除对比栏信息
      deleSinglePhone(index) {
        this.compareCarArray.splice(index, 1);
        this.compareCarNum = this.compareCarArray.length;
        sessionStorage.setItem('phone', JSON.stringify(this.compareCarArray));
      },
      //手机详细信息跳转
      GoPhoneDetail(id, name) {
        this.$router.push({
          path: '/PhoneMessage',
          query: {
            id: id,
            name: name,
          }
        });
      },
      //手机数据对比跳转
      GoCompare(array) {
        if (array.length == 0 ) {
          alert('请选择对比商品');
          return;
        }
        if(array.length ==1){
          alert('商品不足，无法对比');
          return;
        }
        this.$router.push({
          path: '/PhoneCompare',
          query: {
            array: array,
          }
        })
      },
      clearCompare() {
        this.compareCarArray = [];
        this.compareCarNum = this.compareCarArray.length;
        sessionStorage.setItem('phone', JSON.stringify(this.compareCarArray));
      },
    },
    components: {
      PhoneSwiper,
      login,
      Search
    }

  }
</script>

<style scoped>
  #temp {
    height: 100%;
    width: 100%;
    display: block;
  }

  .theader {
    margin: 10px auto;
    /*width: 1300px;*/
    height: auto;
    width: 80%;
    min-width: 1200px;
    display: inline-block;
  }

  .tmiddle {
    margin: 10px auto;
    /*width: 1300px;*/
    height: auto;
    width: 80%;
    min-width: 1200px;
    display: inline-block;
  }

  .Phone_swiper {
    /*background-color: darkblue;*/
    /*height: 300px;*/
  }

  .Notify_mess {
    background-color: purple;
    height: 30px;
  }

  .SearchPHone {
    margin-top: 15px;
    height: 50px;
    background-color: #6f7a86
  }

  /*  手机分类  */
  .Phone_classification {
    /*float: left;*/
    width: 100%;
    margin-bottom: 30px;
  }

  .Phone_classification .Phone_brand, .Phone_size, .Phone_Cpu {
    margin-top: 5px;
    text-align: left;
    height: 30px;
    border: 1px solid bisque;
  }

  .Phone_classification h3 {
    margin-left: 25px;
    display: inline-block;
  }

  .Phone_classification .Unlimited {
    background-color: #f60;
    color: white;
  }

  .Phone_classification ul {
    /*display: flex;*/
    display: inline-block;
    position: relative;
    top: 5px;
  }

  .Phone_classification ul li {
    float: left;
    margin: 0px 5px;
  }

  .Phone_classification ul li span:hover {
    background-color: #f60;
    color: #ffffff;
    cursor: pointer;
  }

  .Phone_classification ul li span {
    text-align: center;
    display: inline-block;
    padding: 0px 5px;
    height: 20px;
    line-height: 20px;
  }

  /*  手机单品信息  */
  .Phone_mess {
    /*background-color: darkcyan;*/
    width: 885px;
    /*height: 400px;*/
    min-height: 400px;
    float: left;
    font-size: 13px;
    height: auto;
    box-sizing: border-box;
    /*position: relative;*/
    /*display: inline-block;*/
  }

  .Phone_mess img {
    display: inline-block;
    width: 170px;
    height: 170px;
    /*height: auto;*/
  }

  .phone_ul {
    display: flex;
    flex-wrap: wrap;
    /*justify-content: space-between;*/
  }

  .phone_list {
    margin-left: 15px;
    margin-top: 15px;
    width: 200px;
    height: 270px;
    border: 1px solid lemonchiffon;
    transition: all .5s;
  }

  .phone_title {
    height: 20px;
    padding: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .phone_list a {
    width: 100%;
    display: block;
  }

  .phone_list p:last-child {
    height: 30px;
  }

  .phone_list p:last-child:hover {
    /*border: 1px solid red;*/
    cursor: pointer;
  }

  .phone_listHover {
    transform: translateY(-10px);
    box-shadow: 0px 0px 3px 3px #c8c8c8;
  }

  .phone_list p {
    color: #000;
  }

  .phone_list .comment_row {
    margin-top: 4px;
    height: 24px;
    line-height: 24px;
    overflow: hidden;
  }

  .phone_list .comment_row .star {
    display: inline-block;
    width: 69px;
    height: 12px;
    background-position: 0 -113px;
    background-image: url(../assets/pingfen.png);
    background-repeat: no-repeat;
    overflow: hidden;
  }

  .phone_list .comment_row .star em {
    display: block;
    width: 69px;
    height: 12px;
    background-image: url(../assets/pingfen.png);
    background-repeat: no-repeat;
    background-position: 0 -98px;
  }

  .price_style {
    color: red;
    /*font-size: 13px;*/
    text-align: center;
    font-weight: bold;
  }

  /*  上一页下一页按钮  */
  .PageBtn {
    height: auto;
    width: 100%;
    margin-top: 15px;
  }

  .PageBtn span {
    display: inline-block;
    border: 1px solid rebeccapurple;
    /*padding: 5px;*/
    margin-bottom: 5px;
    height: 30px;
    line-height: 30px;
  }

  .PageBtn .pagelight {
    background-color: #6467b6;
  }

  .fontBtn {
    width: 70px;
  }

  .NumBtn {
    width: 40px;
  }

  .nextBtn {
    width: 70px;
  }

  /*  热评新手机上市 */
  .News {
    background-color: #ffffff;

    margin: 15px 0px 0px 20px;
    box-shadow: 0px 0px 3px 3px #ececec;
    float: left;
  }

  .News .News_Main {
    background-color: #fff;
    border: 1px solid #e6e6e6;
  }

  .News .News_Main .News_title {
    width: 100%;
    height: 30px;
    line-height: 30px;
    /*padding: 5px;*/
    color: white;
    background-color: #41416c
  }

  .News .News_Main .News_middle {
  }

  .News .News_Main .News_middle .anim {
    transition: all 0.5s;
    margin-top: -30px;
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
    color: gray;
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
  }

  /*  对比车  */
  .Compare_car {
    position: fixed;
    width: 100px;
    background-color: #ffffff;
    right: 15px;
    top: 90px;
    z-index: 1000;
    border: 1px solid #e9e9e9;
    box-shadow: 0px 0px 3px 3px #c8c8c8;
  }

  .Compare_car ul li:nth-child(1):hover {
    border: 1px dashed #6467b6;
  }

  .Compare_car ul li:nth-child(2):hover {
    border: 1px dashed #6467b6;
  }

  .Compare_car ul li:nth-child(3):hover {
    border: 1px dashed #6467b6;
  }

  .Compare_car .Compare_carTitle {
    color: white;
    font-size: 13px;
    background-color: #6467b6;
    height: 25px;
    line-height: 25px;
    text-align: center;
  }

  .Compare_car .Compare_contrast {
    position: relative;
    border: 1px solid transparent;
    padding-top: 10px;
  }

  .Compare_car .Compare_contrast img {
    width: 80%;
    height: auto;
  }

  .Compare_car .Compare_contrast .DelePhone {
    position: absolute;
    font-weight: bold;
    width: 15px;
    height: 15px;
    line-height: 15px;
    right: 0px;
    /*background-color: #6467b6;*/
  }

  .Compare_car .Compare_contrast p {
    text-overflow: ellipsis;
    overflow: hidden;
    padding: 2px;
  }

  .Compare_carBottom {

  }

  .Compare_carBottom span {
    display: block;
    text-align: center;
    margin: 5px auto;
    width: 80%;
    height: 25px;
    line-height: 25px;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
  }

  .Compare_carBottom span:nth-child(1) {
    background-color: #6467b6;
    color: #ffffff;
  }

  .Compare_carBottom span:nth-child(1):hover {
    background-color: blue;
    cursor: pointer;
  }

  .Compare_carBottom span:nth-child(2):hover {
    color: red;
    cursor: pointer;
  }

</style>
