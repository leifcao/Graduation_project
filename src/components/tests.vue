<template>

  <div>
    <div class="news_box">
      <div class="inner-container">
        <p class="text" v-for="(text, index) in arr" :key="index">{{text}}</p >
      </div>
    </div>
    <div id="box">
      <ul id="con1" ref="con1" :class="{anim:animate==true}">
        <li v-for='item in items'>{{item.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "news",
    data(){
      return{
        arr: [
          '1 不是被郭德纲发现的，也不是一开始就收为徒弟。',
          '2 现在雅阁这个状态像极了新A4L上市那段日子。',
          '3 低配太寒碜，各种需要加装，中配定价过高，又没啥特色',
          '4 然后各种机油门、经销商造反什么的幺蛾子。',
          '5 看五月销量，建议参考A4，打8折吧。',
          '1 不是被郭德纲发现的，也不是一开始就收为徒弟。',
          '1 不是被郭德纲发现的，也不是一开始就收为徒弟。',
          '1 不是被郭德纲发现的，也不是一开始就收为徒弟。',
          '1 不是被郭德纲发现的，也不是一开始就收为徒弟。',
          '5 看五月销量，建议参考A4，打8折吧。',
          '1 不是被郭德纲发现的，也不是一开始就收为徒弟。',
        ],
        animate:false,
        items:[
          {name:"马云"},
          {name:"马云"},
          {name:"雷军"},
          {name:"马云"},
          {name:"雷军"},
          {name:"王勤"}
        ]
      }
    },
    created(){
      setInterval(this.scroll,1000)
    },
    methods: {
      scroll(){
        this.animate=true;    // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
        setTimeout(()=>{      //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
          this.items.push(this.items[0]);  // 将数组的第一个元素添加到数组的
          this.items.shift();               //删除数组的第一个元素
          this.animate=false;  // margin-top 为0 的时候取消过渡动画，实现无缝滚动
        },500)
      }
    }
  }
</script>

<style scoped>
  .inner-container {
    animation: myMove 5s linear infinite;
    animation-fill-mode: forwards;
  }
  /*文字停顿滚动*/
  @keyframes myMove {
    0% {
      transform: translateY(0);
    }
    10% {
      /*transform: translateY(-30px);*/
    }
    20% {
      transform: translateY(-30px);
    }
    30% {
      /*transform: translateY(-60px);*/
    }
    40% {
      transform: translateY(-60px);
    }
    50% {
      /*transform: translateY(-90px);*/
    }
    60% {
      transform: translateY(-90px);
    }
    70% {
      /*transform: translateY(-120px);*/
    }
    80% {
      transform: translateY(-120px);
    }
    90% {
      /*transform: translateY(-150px);*/
    }
    100% {
      transform: translateY(-150px);
    }
  }

  .text{
    white-space: nowrap;
    overflow: hidden;
  }

  .news_box{
    height: 30px;
    white-space: nowrap;
    overflow: hidden;
    background: #00B4FF;
  }

  *{
    margin: 0 ;
    padding: 0;
  }
  #box{
    width: 300px;
    height: 100px;
    overflow: hidden;
    padding-left: 30px;
    border: 1px solid black;
  }
  .anim{
    transition: all 0.5s;
    margin-top: -30px;
  }
  #con1 li{
    list-style: none;
    line-height: 30px;
    height: 30px;
  }
</style>
