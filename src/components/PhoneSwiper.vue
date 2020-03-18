<template>
  <div id="Swiper">
    <el-carousel :interval="4000" type="card" height="300px" :autoplay="true">
      <el-carousel-item v-for="(item,index) in SwiperList" :key="index">
        <!--        <h3 class="medium">{{ item }}</h3>-->
        <img :src="item.imgsrc" alt="" width="" height="300px" @click="GoPhoneDetail(item.pid,item.name)">
        <h3 :title="item.name">{{item.name}}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
  import axios from 'axios'
  import urlkit from '../url/urlkit'
  export default {
    name: "PhoneSwiper",
    data() {
      return {
        SwiperList:[],
      }
    },
    created() {
    },
    mounted() {
      this.PhoneSwiper();
    },
    methods: {
      //轮播图
      PhoneSwiper() {
        let url = urlkit + '/api/product/Swiper';
        console.log(url)
        axios.get(url).then(res => {
          if(res.status === 200){
            // console.log(res);
            this.SwiperList = res.data;
          }
        })
      },
      //详细信息展示跳转
      GoPhoneDetail(id, name) {
        this.$router.push({
          path: '/PhoneMessage',
          query: {
            id: id,
            name: name,
          }
        });
      },
      turnleft() {
      },
      turnright() {
      },
    },

  }
</script>

<style scoped>
  #Swiper {
    position: relative;
  }

  .el-carousel__item h3 {
    color: #ffffff;
    font-size: 14px;
    /* opacity: 0.75; */
    margin: auto;
    position: relative;
    bottom: 38px;
    /*background-color: #9a7171;*/
    width: 210px;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
    white-space: nowrap;
  }

  .el-carousel__item img {
    color: #475669;
    font-size: 14px;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    /*background-color: #99a9bf;*/
  }

  .el-carousel__item:nth-child(2n+1) {
    /*background-color: #d3dce6;*/
  }
</style>
