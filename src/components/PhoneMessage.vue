<template>
  <div id="temp">
    <!--    <login ref="child"></login>-->
    <div class="temps">
      <div class="PMessheader"></div>
      <div class="PMessMain" v-for="(item,index) in PhoneDetailedList" :key="index">
        <!--  手机标题-->
        <div class="PMessMainTitle">
          <h1>{{item.name}}</h1>
        </div>
        <!-- 左侧图片-->
        <div class="PMessMainLeft">
          <div class="PImg">
            <img :src="MainImage" alt="">
          </div>
          <div>
            <ul>
              <li class="PMessMainImgList" @mouseover="MainImage = item.imgsrc">
                <div class="PmImg">
                  <img :src="item.imgsrc" alt="">
                </div>
              </li>
              <li class="PMessMainImgList">
                <div class="PmImg">
                  <img :src="item.Img1" alt="" @mouseover="MainImage = item.Img1">
                </div>
              </li>
              <li class="PMessMainImgList">
                <div class="PmImg">
                  <img :src="item.Img2" alt="" @mouseover="MainImage =item.Img2">
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 中部信息-->
        <div class="PMessMainMiddle">
          <ul>
            <li>
              <div class="PMainMiddle_left">
                <!--              <label class="">CPU：</label>-->
                <span>CPU：{{item.CPU}}</span>
                <span class="line">
                <i class="Icons" :style="{backgroundImage: bgImage1}"></i>
                游戏运行完美
              </span>
              </div>
              <div class="PMainMiddle_right">
                <div class="phoneBar">
                  <span class="phoneProgress_Bar" :style="'width:'+GetNumber(item.CPU2)"></span>
                  <i>{{item.CPU2}}</i>
                </div>
                <span class="phoneBar_last">
                行业最高：高通蛟龙855+
              </span>
              </div>
            </li>
            <li>
              <div class="PMainMiddle_left">
                <span>后置：{{item.Postposition}}</span>
                <span class="line">
                <i class="Icons" :style="{backgroundImage: bgImage2}"></i>
                {{item.Postposition1}}
              </span>
              </div>
              <div class="PMainMiddle_right">
                <div class="phoneBar">
                  <span class="phoneProgress_Bar" :style="'width:'+GetNumber(item.Postposition2)"></span>
                  <i>{{item.Postposition2}}</i>
                </div>
                <span class="phoneBar_last">
                行业最高：12000万
              </span>
              </div>
            </li>
            <li>
              <div class="PMainMiddle_left">
                <span>前置：{{item.Preposition}}</span>
                <span class="line">
                <i class="Icons" :style="{backgroundImage: bgImage2}"></i>
                {{item.Preposition1}}
              </span>
              </div>
              <div class="PMainMiddle_right">
                <div class="phoneBar">
                  <span class="phoneProgress_Bar" :style="'width:'+GetNumber(item.Preposition2)"></span>
                  <i>{{item.Preposition2}}</i>
                </div>
                <span class="phoneBar_last">
                行业最高：4000万
              </span>
              </div>
            </li>
            <li>
              <div class="PMainMiddle_left">
                <span>内存：{{item.Memory}}</span>
                <span class="line">
                <i class="Icons" :style="{backgroundImage: bgImage3}"></i>
                {{item.Memory1}}
              </span>
              </div>
              <div class="PMainMiddle_right">
                <div class="phoneBar">
                  <span class="phoneProgress_Bar" :style="'width:'+GetNumber(item.Memory2)"></span>
                  <i>{{item.Memory2}}</i>
                </div>
                <span class="phoneBar_last">
                行业最高：12G
              </span>
              </div>
            </li>
            <li>
              <div class="PMainMiddle_left">
                <span>电池：{{item.Battery}}</span>
                <span class="line">
                <i class="Icons" :style="{backgroundImage: bgImage4}"></i>
                {{item.Battery1}}
              </span>
              </div>
              <div class="PMainMiddle_right">
                <div class="phoneBar">
                  <span class="phoneProgress_Bar" :style="'width:'+GetNumber(item.Battery2)"></span>
                  <i>{{item.Battery2}}</i>
                </div>
                <span class="phoneBar_last">
                行业最高：10300mAh
              </span>
              </div>
            </li>
            <li>
              <div class="PMainMiddle_left">
                <span>屏幕：{{item.screen}}</span>
                <span class="line">
                <i class="Icons" :style="{backgroundImage: bgImage5}"></i>
               {{item.screen1}}
              </span>
              </div>
              <div class="PMainMiddle_right">
                <div class="phoneBar">
                  <span class="phoneProgress_Bar" :style="'width:'+GetNumber(item.screen2)"></span>
                  <i>{{item.screen2}}</i>
                </div>
                <span class="phoneBar_last">
                行业最高：8英寸
              </span>
              </div>
            </li>
            <li>
              <div class="PMainMiddle_left">
                <span>分辨率：{{item.Resolvingpower}}</span>
                <span class="line">
                <i class="Icons" :style="{backgroundImage: bgImage6}"></i>
                {{item.Resolvingpower1}}
              </span>
              </div>
              <div class="PMainMiddle_right">
                <div class="phoneBar">
                  <span class="phoneProgress_Bar" :style="'width:'+GetNumber(item.Resolvingpower2)"></span>
                  <i>{{item.Resolvingpower2}}</i>
                </div>
                <span class="phoneBar_last">
                行业最高：3840*2160
              </span>
              </div>
            </li>
          </ul>
          <div>
            <span class="addBtn" @click="addCompare(PhoneDetailedList[0])" v-if="comparebtnFlag">加入对比</span>
            <span class="addBtn" @click="DeleCompare(PhoneDetailedList[0])" v-else>取消对比</span>
          </div>
        </div>
        <!-- 右侧性能-->
        <div class="PMessMainRight"></div>
      </div>
      <div class="PMessbottom">
        <div class="PMessbottom_top">
          <h1>详细参数</h1>
        </div>
        <div class="PMessbottom_left">
          <div class="PMessbottom_leftMain" :class="{'PMessbottom_stop':Absolute}" ref="tests">
            <ul>
              <li>
              <span>
                <a href="javascript:void(0);" @click="goAnchor('#base1')">基本参数</a>
              </span>
              </li>
              <li>
              <span>
                <a href="javascript:void(0);" @click="goAnchor('#base2')">屏幕</a>
              </span>
              </li>
              <li>
              <span>
                <a href="javascript:void(0);" @click="goAnchor('#base3')">硬件</a>
              </span>
              </li>
              <li>
              <span>
                <a href="javascript:void(0);" @click="goAnchor('#base4')">网络与连接</a>
              </span>
              </li>
              <li>
              <span>
                <a href="javascript:void(0);" @click="goAnchor('#base5')">摄像头</a>
              </span>
              </li>
            </ul>
          </div>
        </div>
        <div class="PMessbottom_middle">
          <div class="PMessbottom_right">
            <div class="PMessbottom_RMainT">
              <h1>猜你喜欢</h1>
              <div class="PMessbottom_RMainM">
                <ul class="phoneRecommend_ul">
                  <li class="phoneRecommend_list" v-for="(item,index) in phoneRecommend" v-if="index<2"
                      @mouseover="compareflag = index" @mouseout="compareflag=''">
                    <div @click="GoPhoneDetail(item.pid,item.name)">
                      <img :src="item.imgsrc" alt="">
                      <p class="phoneRecommend_title" :title="item.name">{{item.name}}</p>
                      <p>参考价格：<span class="price_style">{{item.prices}}</span></p>
                    </div>
                    <p @click="addCompare(item)" class="Phcompare" v-show="compareflag === index?true:false">
                      对比</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="PMessbottom_main" style="" v-for="(item,index) in PhoneDetailedList" :key="index">
            <table>
              <tbody>
              <tr>
                <th class="PMessbottom_title1" id="base1">基本参数</th>
              </tr>
              <tr>
                <td>手机信息</td>
                <td>{{item.name}}</td>
              </tr>
              <tr>
                <td>电商报价</td>
                <td style="color:red;">￥{{item.Price}}</td>
              </tr>
              <tr>
                <td>CPU型号</td>
                <td>{{item.CPU}}</td>
              </tr>
              <tr>
                <td>操作系统</td>
                <td>{{item.OperatingSystem==null?Notmess:item.OperatingSystem}}</td>
              </tr>
              <tr>
                <td>解锁方式</td>
                <td>{{item.Unlock==null?Notmess:item.Unlock}}</td>
              </tr>
              <tr>
                <th class="PMessbottom_title2" id="base2">屏幕</th>
              </tr>
              <tr>
                <td>主屏尺寸</td>
                <td>{{item.screen==null?Notmess:item.screen}}</td>
              </tr>
              <tr>
                <td>屏幕类型</td>
                <td>{{item.screenType==null?Notmess:item.screenType}}</td>
              </tr>
              <tr>
                <td>主屏分辨率</td>
                <td>{{item.Resolvingpower==null?Notmess:item.Resolvingpower}}</td>
              </tr>
              <tr>
                <th class="PMessbottom_title2" id="base3">硬件</th>
              </tr>
              <tr>
                <td>CPU频率</td>
                <td>{{item.cpuFrequen==null?Notmess:item.cpuFrequen}}</td>
              </tr>
              <tr>
                <td>RAM容量</td>
                <td>{{item.Memory==null?Notmess:item.Memory}}</td>
              </tr>
              <tr>
                <td>电池容量</td>
                <td>{{item.Battery==null?Notmess:item.Battery}}</td>
              </tr>
              <tr>
                <td>电池类型</td>
                <td>{{item.batteryType==null?Notmess:item.batteryType}}</td>
              </tr>
              <tr>
                <th class="PMessbottom_title2" id="base4">网络与连接</th>
              </tr>
              <tr>
                <td>导航</td>
                <td>{{item.navigation==null?Notmess:item.navigation}}</td>
              </tr>
              <tr>
                <td>蓝牙</td>
                <td>{{item.bluetooth==null?Notmess:item.bluetooth}}</td>
              </tr>
              <tr>
                <td>NFC</td>
                <td>{{item.NFC==null?Notmess:item.NFC}}</td>
              </tr>
              <tr>
                <th class="PMessbottom_title2" id="base5">摄像头</th>
              </tr>
              <tr>
                <td>后置摄像头</td>
                <td>{{item.Postposition==null?Notmess:item.Postposition}}</td>
              </tr>
              <tr>
                <td>前置摄像头</td>
                <td>{{item.Preposition==null?Notmess:item.Preposition}}</td>
              </tr>
              <tr>
                <td>光圈</td>
                <td>{{item.Aperture==null?Notmess:item.Aperture}}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>


        <!--  手机点评  -->
        <div class="Phone_reviews">
          <div class="Reviews_title" ref="Reviews"><h1>在线留言</h1></div>
          <div class="Reviews_main" v-for="(item,index) in CommentList" :key="item.cid">
            <div>
              <div class="Reviews_user">
                <img src="../assets/logo.png" alt="">
                <p>{{item.userName}}</p>
              </div>
              <div class="Reviews_score">
                <div class="Score_fixed">
                  <div class="star">
                    <em :style="{width:item.scores*10+'%'}"></em>
                  </div>
                  <span>{{item.scores}}分</span>
                </div>
              </div>
            </div>
            <div class="Reviewes_message">
              <div class="Reviews_MessMain">
                <span class="Reviews_comment">{{item.comments}}</span>
                <p class="Reviewes_end">
                  <span>{{Dateformat(item.createTime)}}</span>
                  <span @click="replyflag=item.cid,target=item.userName">回复</span>
                </p>
                <div class="Reviews_reply">
                  <div v-for="(obj,i) in item.target" :key="i">
                  <span><em>{{obj.userName}}</em>&nbsp;回复&nbsp;<em>@{{obj.targetName}}</em>:</span>
                  <span class="Reviews_comment">{{obj.comments}}</span>
                    <p class="Reviewes_end">
                      <span>{{Dateformat(obj.createTime)}}</span>
                      <span  @click="replyflag=item.cid,target=obj.userName">回复</span>
                    </p>
                  </div>
                  <p v-show="replyflag==item.cid">
                    <textarea name="" v-model="replycomments" :placeholder="'回复'+target+':'"></textarea>
                    <span class="replystyle" @click="reply(item)">确定</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="Reviews_Mine" v-show="commentflag">
            <div><span>打分：</span><input type="text" v-model="scores"><em>（10分满分）</em></div>
            <div><span class="comment">评论：</span><textarea name="" id="" v-model="comments"></textarea></div>
          </div>
          <div class="Reviews_New" @click="addComment">发表点评</div>
        </div>
      </div>
    </div>

    <!--   对比车   -->
    <div class="Compare_car">
      <h4 class="Compare_carTitle">[{{compareCarNum}}/3] 对比栏</h4>
      <ul>
        <li class="Compare_contrast" v-for="(item,index) in compareCarArray" v-if="index<3"
            @mouseover="delePhoneflag = index" @mouseout="delePhoneflag = ''" @click="GoPhoneDetail(item.pid,item.name)">
          <img :src="item.imgsrc" alt="">
          <span class="DelePhone" v-show="delePhoneflag === index?true:false"
                @click="deleSinglePhone(index)">x</span>
          <p class="phoneRecommend_title">{{item.name}}</p>
        </li>
      </ul>
      <div class="Compare_carBottom">
        <span @click="GoCompare(compareCarArray)">对比</span>
        <span @click="clearCompare()">清空对比栏</span>
      </div>
    </div>


  </div>
</template>

<script>
  import axios from 'axios';
  import login from './login';
  import urlkit from '../url/urlkit';

  export default {
    name: "PhoneMessage",
    data() {
      return {
        compareflag: '',
        phoneRecommend: [], //推荐列表
        Message: 'abc',
        id: this.$route.query.id,  //跳转过来的id
        names: this.$route.query.name,
        Notmess: '暂无数据',
        bgImage1: "url(" + require('../assets/icons/gameIcon.png') + ")",  //背景图
        bgImage2: "url(" + require('../assets/icons/HD.png') + ")",
        bgImage3: "url(" + require('../assets/icons/game.png') + ")",
        bgImage4: "url(" + require('../assets/icons/bettery.png') + ")",
        bgImage5: "url(" + require('../assets/icons/handtouch.png') + ")",
        bgImage6: "url(" + require('../assets/icons/phHD.png') + ")",
        PhoneMessageList: [{  //单个手机信息数组
          'price': '4500$',
          'swift': '支持',
          'precent': '90%',
          'imgsrc1': require('../assets/xiaomi10.jpg'),
          'imgsrc2': require('../assets/vivo.jpg'),
          'imgsrc3': require('../assets/rongyaov30.jpg'),
        }],
        PhoneDetailedList: [], //详细信息list
        MainImage: '', //手机主图
        Absolute: false,//  锚点跳转定格
        AbsoluteNum: 1, //锚点开关
        CommentList: [], //评论列表
        commentflag: true, //评论默认关闭
        scores: '',  //分数
        comments: '',  //评论
        replycomments: '', //回复
        target: '', // 回复 用户暂存
        userMess: '',//用户名 默认为空
        hobbyget: '', //推荐类型手机存储
        delePhoneflag: '', //删除单个手机的flag
        compareCarArray: [],//对比栏手机数组
        compareCarNum: 0,//对比栏手机数量
        comparebtnFlag: true,  //取消对比flag
        DontRepeat: true,  //重复点击禁止
        replyflag: '', // 回复按钮
      }
    },
    created() {
    },
    mounted() {
      //主图默认
      window.addEventListener('scroll', this.handleScroll2);
      this.PhoneDetailed(); // 手机详情
      this.queryComment();  //评论信息
      //对比栏
      this.compareCarArray = JSON.parse(sessionStorage.getItem('phone') || '[]');
      // console.log(this.compareCarArray)
      var compareNumber = this.compareCarArray.length;
      this.compareCarNum = compareNumber++;
      // //获取cookie
      // this.userMess = this.getCookie();
    },
    destroyed() {
      window.removeEventListener('scroll', this.handleScroll2);//结束监听滚动
      clearTimeout(this.hobbyget); //离开界面时关闭定时
    },
    methods: {

      //监听 分类div 的位置定格
      handleScroll2() {
        //  获取口碑点评距离顶端的距离
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;//滚动条偏移量
        let Reviews = this.$refs.Reviews.getBoundingClientRect().top;
        Reviews = Reviews + 100;
        this.Absolute = Reviews < scrollTop ? true : false;
        if (this.Absolute && this.AbsoluteNum == 1) {
          this.$refs.tests.style.marginTop = Reviews + 'px';
          this.AbsoluteNum = 2;
        } else if (!this.Absolute && this.AbsoluteNum == 2) {
          this.$refs.tests.style.marginTop = 10 + 'px';
          this.AbsoluteNum = 1;
        }
      },
      //锚点跳转
      goAnchor(selector) {
        var anchor = this.$el.querySelector(selector)
        document.documentElement.scrollTop = anchor.offsetTop;
      },
      //手机详细信息展示
      PhoneDetailed() {
        let id = this.id;
        let url = urlkit + '/api/product/Detailed';
        axios.post(url, {id}).then(res => {
          if (res.status === 200) {
            this.PhoneDetailedList = res.data;
            // console.log(res)
            this.MainImage = this.PhoneDetailedList[0].imgsrc;
            this.Recommend(); // 评论列表表
            //浏览当前页一分钟表示为对其产品感性趣
            this.hobbyget = setTimeout(() => {
              var ptype = this.PhoneDetailedList[0].type;
              sessionStorage.setItem('phonetype', JSON.stringify(ptype));
              console.log(ptype);
            }, 10000);
          }
        });
      },
      //返回 数字，字符串中提取数字
      GetNumber(str) {
        // str.replace
        return str.replace(/[^0-9]/ig, "") / 100 + '%';
      },
      //查看猜你喜欢手机的详细参数
      GoPhoneDetail(pid) {
        this.id = pid;
        this.PhoneDetailed();  //当前页刷新手机
        this.queryComment();  //获取手机评论信息
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
        this.comparebtnFlag = false;
        if (pidFlag) {
          this.compareCarArray.push(item);
          var compareNumber = this.compareCarArray.length;
          this.compareCarNum = compareNumber++;
          sessionStorage.setItem('phone', JSON.stringify(this.compareCarArray));
        }
      },
      DeleCompare(obj) {
        this.comparebtnFlag = true;
        this.compareCarArray.some((item, index) => {
          console.log(obj, item.pid)
          if (item.pid == obj.pid) {
            this.compareCarArray.splice(index, 1);
            this.compareCarNum = this.compareCarArray.length;
            sessionStorage.setItem('phone', JSON.stringify(this.compareCarArray));
            return true;
          }
        });
      },
      //删除对比车信息
      deleSinglePhone(index) {
        this.comparebtnFlag = true;
        this.compareCarArray.splice(index, 1);
        this.compareCarNum = this.compareCarArray.length;
        sessionStorage.setItem('phone', JSON.stringify(this.compareCarArray));
      },
      //手机数据对比跳转
      GoCompare(array) {
        if (array.length == 0) {
          alert('请选择对比商品');
          return;
        }
        if (array.length == 1) {
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
        this.comparebtnFlag = true;
        this.compareCarNum = this.compareCarArray.length;
        sessionStorage.setItem('phone', JSON.stringify(this.compareCarArray));
      },

      //查看评论
      queryComment() {
        let pid = this.id; // 手机id
        let url = urlkit + '/api/userComment/getComment';
        axios.post(url, {pid}).then(res => {
          if (res.status === 200) {
            this.CommentList = res.data;
            console.log(res.data);
          }
        });
      },
      //获取cookie
      getCookie() {
        var cookies = document.cookie.split(";");
        var name = cookies[0].split("=")[1];
        var phonetype = cookies[1].split("=")[1];
        return {name: name, phonetype: phonetype};
      },

      //发表评论
      addComment() {
        // let userName = this.getCookie().name;
        let userName = JSON.parse(sessionStorage.getItem('userName')) || '';
        if (this.DontRepeat) {  //防止重复点击
          this.DontRepeat = false;
          // var userName = this.$refs.child.getCookie();
          if (userName == '') {
            alert('请登录页面');
            // this.commentflag = false;
            this.$store.commit('LoginComment');
            this.DontRepeat = true;
            return;
          } else {
            // this.commentflag = true;
            this.DontRepeat = true;
            if (this.scores == '' || Number(this.scores) > 10) {
              alert("请正确填写信息");
              return;
            }
            if (this.comments == '' || this.comments.length > 200) {
              // console.log(Number(this.scores));
              alert("信息不能为空或者字数超过200");
              return;
            }
            let targetName = '';
            let tag = 0;
            let pass = 0;
            let scores = this.scores; //评分
            let comments = this.comments; //评论信息
            let pid = this.id; // 手机id
            let phonename = this.PhoneDetailedList[0].name;// 手机id
            let phonetype = this.PhoneDetailedList[0].type;
            // let t = new Date().getFullYear();
            // let t1 = new Date().getMonth() + 1;
            // let t2 = new Date().getDate();
            // var createTime = t + '年' + t1 + '月' + t2 + '日';
            var createTime = new Date().getTime();
            let url = urlkit + '/api/userComment/setComment';
            axios.post(url, {
              pid,
              userName,
              targetName,
              phonename,
              phonetype,
              scores,
              comments,
              createTime,
              pass,
              tag,
            }).then(res => {
              if (res.status === 200) {
                alert(res.data.mess);
                // console.log(createTime);
                this.scores = '';
                this.comments = '';
                this.DontRepeat = true; //防止重复点击
              }
            }).catch(err => {
              console.log(err);
            });
          }
        } else {
          alert('请勿重复点击');
        }
      },

      //  提交回复
      reply(item) {
        let userName = JSON.parse(sessionStorage.getItem('userName')) || '';
        if (this.DontRepeat) {  //防止重复点击
          this.DontRepeat = false;
          if (userName == '') {
            alert('请登录页面');
            this.$store.commit('LoginComment');
            this.replyflag = '';
            this.DontRepeat = true;
            return;
          } else {
            this.DontRepeat = true;
            if(userName == this.target){
              this.replycomments = '';
              alert('不能回复自己');
              return;
            }

            if (this.replycomments == '' || this.replycomments.length > 200) {
              alert("信息不能为空或者字数超过200");
              return;
            }
            let targetName = this.target;
            let scores = 0; //评分
            let tag = item.cid;
            let pass = 1;
            let comments = this.replycomments; //评论信息
            let pid = this.id; // 手机id
            let phonename = this.PhoneDetailedList[0].name;// 手机id
            let phonetype = this.PhoneDetailedList[0].type;
            let createTime = new Date().getTime();
            let url = urlkit + '/api/userComment/setComment';
            axios.post(url, {
              pid,
              userName,
              targetName,
              phonename,
              phonetype,
              scores,
              comments,
              createTime,
              pass,
              tag,
            }).then(res => {
              if (res.status === 200) {
                alert('回复成功');
                this.replycomments = ''; // 清空回复信息
                this.target = ''; // 清空回复目标
                this.replyflag = '';  //隐藏回复输入框
                this.DontRepeat = true; //防止重复点击
                this.queryComment();// 刷新评论列表
              }
            }).catch(err => {
              console.log(err);
            });
          }
        } else {
          alert('请勿重复点击');
        }
      },

      // 日期格式化
      Dateformat(time){
        time = Number(time);
        let t1 = new Date(time).getMonth() + 1;
        let t2 = new Date(time).getDate();
        let t3 = new Date(time).getHours();
        let t4 = new Date(time).getMinutes();
        var createTime = t1 + '月' + t2 + '日'+' '+t3+':'+t4;
        return createTime;
      },

      //获取推荐手机列表方法
      GetRecommend(minPrice, maxPrice) {
        var ptype = JSON.parse(sessionStorage.getItem('phonetype')) || '';
        let max = maxPrice;
        let min = minPrice;
        let pid = this.PhoneDetailedList[0].pid;
        let url = urlkit + '/api/userCommend/getRecommend';
        axios.post(url, {pid, ptype, min, max}).then(res => {
          if (res.status === 200) {
            // console.log(res);
            this.phoneRecommend = res.data;
            this.comparebtnFlag = true;
          }
        });
      },
      //  获取手机推荐列表 猜你喜欢
      Recommend() {
        var prices = this.PhoneDetailedList[0].Price;
        let minPrice, maxPrice;
        var len = prices.length;
        var num = prices.split("");
        //确定价格范围
        if (len == 3) {
          minPrice = 0;
          maxPrice = Number(num[0]) + 1 + "00";
        } else if (len == 4) {
          minPrice = num[0] + "000";
          maxPrice = Number(num[0]) + 1 + "000";
        } else {
          minPrice = num[0] + "0000";
          maxPrice = Number(num[0]) + 1 + "0000";
        }

        this.GetRecommend(Number(minPrice), Number(maxPrice));
      },


    },
    watch: {},
    components: {
      login
    }
  }
</script>

<style scoped>
  #temp {
    /*text-align: left;*/
    /*width: 85%;*/
    /*display: block;*/
    /*margin: auto;*/
  }

  .temps {
    text-align: left;
    width: 85%;
    display: block;
    margin: auto;
  }

  .PMessMain {
    text-align: left;
    width: 100%;
    /*height: auto;*/
    height: 400px;
    display: block;
    margin: auto;
  }

  .PMessMain .PMessMainTitle h1 {
    height: 50px;
    font-size: 20px;
    color: #e8e2e2;
    text-align: left;
    padding-left: 10px;
    line-height: 50px;
    background-image: linear-gradient(to right, #9b7894, #b8b8b8, #6467b6);
    border-radius: 25px;
  }

  .PMessMain .PMessMainLeft {
    width: 30%;
    float: left;
    text-align: center;
    margin-top: 10px;
  }

  /*图片剧中显示*/
  .PMessMain .PMessMainLeft .PImg {
    height: 240px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .PMessMain .PMessMainLeft .PImg img {
    width: 60%;
    height: auto;
    display: block;
    margin: auto;
  }

  .PMessMain .PMessMainLeft ul {
    width: 100%;
  }

  .PMessMain .PMessMainLeft .PMessMainImgList {
    width: 33%;
    float: left;
    margin-top: 5px;
  }

  .PMessMain .PMessMainLeft .PMessMainImgList .PmImg {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .PMessMain .PMessMainLeft .PMessMainImgList img {
    width: 80%;
    float: left;
    height: 75px;
    display: block;
    margin: 5px auto;
    border: 1px solid #efefef
  }


  .PMessMain .PMessMainLeft .PMessMainImgList img:hover {
    border: 1px solid #2fbaf8;
    cursor: pointer;
  }

  .PMessMain .PMessMainMiddle {
    display: inline-block;
    width: 70%;
    float: left;
  }

  .PMessMain .PMessMainMiddle li {
    margin-top: 10px;
    display: inline-block;
    width: 100%;
    height: 30px;
    line-height: 30px;
  }


  .PMessMain .PMessMainMiddle .PMainMiddle_left {
    /*width: 100%;*/
    width: 40%;
    min-width: 240px;
    float: left;
    height: 100%;
  }

  .PMessMain .PMessMainMiddle .PMainMiddle_left span:nth-child(1) {
    background-color: white;
    float: left;
    margin: 0 0 0 15px;
    height: 100%;
    width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .PMessMain .PMessMainMiddle .PMainMiddle_left .line {
    display: inline-block;
    border-left: 1px solid #d9c7c7;
    margin-left: 5px;
    padding-left: 5px;
    height: 100%;
    color: grey;
  }


  .PMessMain .PMessMainMiddle .PMainMiddle_left .Icons {
    width: 25px;
    height: 25px;
    display: inline-block;
    vertical-align: middle;
    background-repeat: no-repeat;
    margin: 0px 5px;
  }

  .PMessMain .PMessMainMiddle .PMainMiddle_right {
    float: left;
    width: 60%;
  }

  .PMessMain .PMessMainMiddle .PMainMiddle_right .phoneBar {
    float: left;
    height: 24px;
    line-height: 24px;
    width: 55%;
    background-color: #bdc0d7;
    border-radius: 25px;
    position: relative;
    margin: 3px 20px 0 3px;
  }

  .PMessMain .PMessMainMiddle .PMainMiddle_right .phoneBar i {
    display: block;
    color: white;
    font-size: 12px;
    font-style: normal;
    margin-left: 10px;
    position: absolute;
  }

  .PMessMain .PMessMainMiddle .PMainMiddle_right .phoneBar .phoneProgress_Bar {
    background-color: #6467b6;
    display: block;
    height: 24px;
    border-radius: 24px;
    position: absolute;
  }

  .PMessMain .PMessMainMiddle .PMainMiddle_right .phoneBar_last {
    width: 45%;
    color: #6467b6;
  }

  .PMessMain .PMessMainMiddle .addBtn {
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #ffffff;
    border-radius: 3px;
    border: none;
    display: block;
    margin: 10px 0px 0px 200px;
    background-color: #768eb6;
  }

  .PMessbottom {
    width: 100%;
    margin: 10px auto;
    display: block;
  }

  .PMessbottom .PMessbottom_top h1 {
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    padding-left: 10px;
  }

  .PMessbottom .PMessbottom_left .PMessbottom_leftMain {
    /*height: 60px;*/
    background-image: linear-gradient(to right, #9b7894, #6c3b3b, #6467b6);
    position: fixed;
    margin-left: 25px;
    margin-top: 10px;
    padding: 5px 25px;
    text-align: center;
  }

  .PMessbottom .PMessbottom_left .PMessbottom_leftMain a {
    font-size: 13px;
    color: #ffffff;
  }


  .PMessbottom_stop {
    position: absolute !important;
  }


  .PMessbottom .PMessbottom_middle {
    /*background-color: yellowgreen;*/
    /*position: relative;*/
  }

  .PMessbottom .PMessbottom_middle .PMessbottom_right {
    width: 300px;
    float: right;
  }

  .PMessbottom .PMessbottom_middle .PMessbottom_right .PMessbottom_RMainT {
    margin: auto;
    border: 1px solid lightgray;
    width: 200px;
  }

  .PMessbottom .PMessbottom_middle .PMessbottom_right .PMessbottom_RMainT h1 {
    padding: 5px;
    text-align: center;
    color: #ffffff;
    background-color: #535582
  }

  .PMessbottom .PMessbottom_middle .PMessbottom_main {
    /*height: 400px;*/
    margin: auto;
    width: 75%;
  }

  .PMessbottom .PMessbottom_middle .PMessbottom_main tbody, table {
    width: 90%;
    display: block;
  }

  .PMessbottom .PMessbottom_middle .PMessbottom_main tbody tr {
    /*height: 50px;*/
    /*line-height: 50px;*/
    margin: auto;
    display: block;
    border: 1px solid #c9c9c9;
  }

  .PMessbottom .PMessbottom_middle .PMessbottom_main tbody tr th {
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    background-color: #ababb5;
    display: block;
  }

  .PMessbottom .PMessbottom_middle .PMessbottom_main tbody tr td:nth-child(1) {
    height: 20px;
    line-height: 20px;
    width: 200px;
    padding-left: 20px;
  }

  .PMessbottom .PMessbottom_middle .PMessbottom_main tbody tr td:nth-child(2) {
    height: 30px;
    line-height: 30px;
    border-left: 1px solid #c9c9c9;
    padding-left: 20px;
  }

  /*  手机点评  */
  .Phone_reviews {
    width: 100%;
    /*height: 500px;*/
    /*background-color: yellowgreen;*/
    margin-top: 50px;
    padding-bottom: 10px;
    background-image: linear-gradient(to right, #9b7894, #b8b8b8, #6467b6);
  }

  .Phone_reviews h1 {
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    padding-left: 10px;
  }

  .Phone_reviews .Reviews_main {
    overflow: hidden;
    margin-bottom: 20px;
  }

  .Phone_reviews .Reviews_main .Reviews_user {
    width: 100px;
    float: left;
  }

  .Phone_reviews .Reviews_main .Reviews_user img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: inline-block;
    margin: 5px 0px 0px 45px;
    border: 1px solid #b9babc;
  }

  .Phone_reviews .Reviews_main .Reviews_user p {
    margin-left: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
  }

  .Phone_reviews .Reviews_main .Reviews_score {
    /*float: left;*/
    /*width: 200px;*/
    /*height: 50px;*/
    margin: 0px 10px;
  }

  /* 清楚浮动 */
  /*.Phone_reviews .Reviews_main .Reviews_score:after {*/
  /*  content: '';*/
  /*  clear: both;*/
  /*  display: block;*/
  /*}*/

  .Phone_reviews .Reviews_main .Reviews_score .Score_fixed {
    overflow: hidden;
    padding-left: 10px;
  }

  .Phone_reviews .Reviews_main .Reviews_score .Score_fixed .star {
    overflow: hidden;
    float: left;
    margin: 10px 0px;
    width: 92px;
    /*height: 16px;*/
    background-image: url(../assets/pingfen2.png);
    background-position: 0 -74px;
    background-repeat: no-repeat;
  }

  .Phone_reviews .Reviews_main .Reviews_score .Score_fixed .star em {
    display: block;
    height: 16px;
    background-image: url(../assets/pingfen2.png);
    background-repeat: no-repeat;
    background-position: 0 -57px;
  }

  .Phone_reviews .Reviews_main .Reviews_score .Score_fixed span {
    float: left;
    font-size: 16px;
    margin: 10px 10px;
  }

  .Phone_reviews .Reviews_main .Reviewes_message {
    /*width: 80%;*/
    /*padding: 10px;*/
    float: left;
    background-color: #e5e5e5;
    padding: 10px;
    margin-left: 10px;
  }

  .Phone_reviews .Reviews_main .Reviewes_message .Reviews_MessMain {
    /*margin-left: 120px;*/
    width: 750px;
  }
  .Phone_reviews .Reviews_main .Reviewes_message .Reviews_MessMain span{
    padding: 5px;
    word-break: break-all;
    /*width: 400px;*/
  }

  .Reviews_main .Reviewes_message .Reviews_MessMain .Reviews_comment {
    /*background-color: gray;*/
  }

  .Phone_reviews .Reviews_main .Reviewes_message .Reviews_MessMain .Reviews_reply div{
    margin-top: 10px;
  }

  .Phone_reviews .Reviews_main .Reviewes_message .Reviews_MessMain .Reviews_reply em{
    font-style: normal;
    color: #768eb6;
  }

  .Phone_reviews .Reviews_main .Reviewes_message .Reviews_MessMain .Reviews_reply .replystyle{
    display: inline;
    position: relative;
    background-color: #535582;
    top: -8px;
    color: white;
    padding: 5px 20px;
  }

  .Reviewes_end{
    float: right;
    color: gray;
  }

  .Reviewes_end span{
    font-size: 12px;
  }


  .Phone_reviews .Reviews_main .Reviewes_message .Reviews_MessMain .Reviews_reply textarea {
    width: 400px;
    height: 50px;
    padding: 5px;
    margin-top: 10px;
  }


  .Phone_reviews .Reviews_Mine {
    margin-left: 67px;
  }

  .Phone_reviews .Reviews_Mine div {
    margin-top: 10px;
  }

  .Phone_reviews .Reviews_Mine em {
    font-style: normal;
    color: red;
    font-size: 13px;
  }

  .Phone_reviews .Reviews_Mine input {
    width: 30px;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 5px;
  }

  .Phone_reviews .Reviews_Mine textarea {
    width: 400px;
    height: 65px;
    padding: 5px;
    position: relative;
    left: 42px;
  }

  .comment {
    display: inline-block;
    position: absolute;
  }

  .Phone_reviews .Reviews_New {
    width: 100px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    background-color: #535582;
    color: white;
    left: 280px;
    margin-top: 10px;
    margin-bottom: 10px;
    position: relative;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
  }


  /* 推荐手机 */
  .phoneRecommend_ul {

  }

  .phoneRecommend_ul img {
    display: inline-block;
    width: 100%;
    height: auto;
  }

  .phoneRecommend_list {
    margin: 5px auto;
    width: 130px;
    /*height: 270px;*/
    border: 1px solid lemonchiffon;
    position: relative;
    padding: 5px;
  }

  .phoneRecommend_title {
    height: 20px;
    padding: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .phoneRecommend_list a {
    width: 100%;
    display: block;
  }

  .phoneRecommend_list p {
    color: #000;
    text-align: center;
  }

  .phoneRecommend_list .Phcompare {
    color: #ffffff;
    background-color: #535582;
    position: absolute;
    top: 0px;
    right: 0px;
    padding: 3px;
  }

  .price_style {
    color: red;
    /*font-size: 13px;*/
    text-align: center;
    font-weight: bold;
  }

  /* 对比车 */
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
