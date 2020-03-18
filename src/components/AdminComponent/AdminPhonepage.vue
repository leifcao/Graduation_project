<template>
  <div id="phonetemp">
    <!--  更新页面弹窗 -->
    <div class="UpdatePage" v-show="updateflag">
      <div class="UpdateOpen">
        <ul>
          <li>
            <p>
              <span>手机名称</span>
              <span>{{phoneObj.phoneName}}</span>
              <span>手机类型</span>
              <span>{{phoneObj.type}}</span>
            </p>
            <p>
              <span>价格</span>
              <span><input type="text" v-model="phoneObj.Price"></span>
              <span>cpu频率</span>
              <span><input type="text" v-model="phoneObj.cpuFrequen"></span>
            </p>
            <p>
              <span>导航</span>
              <span><input type="text" v-model="phoneObj.navigation"></span>
              <span>蓝牙</span>
              <span><input type="text" v-model="phoneObj.bluetooth"></span>
            </p>
            <p>
              <span>操作系统</span>
              <span><input type="text" v-model="phoneObj.OperatingSystem"></span>
              <span>解锁方式</span>
              <span><input type="text" v-model="phoneObj.Unlock"></span>
            </p>
            <p>
              <span>图片地址</span>
              <span><input type="text" v-model="phoneObj.imgsrc"></span>
              <span>分辨率情况</span>
              <span><input type="text" v-model="phoneObj.Resolvingpower1"></span>
            </p>
            <p>
              <span>Cpu游戏支持</span>
              <span><input type="text" v-model="phoneObj.CPU1"></span>
              <span>内存游戏支持</span>
              <span><input type="text" v-model="phoneObj.Memory1"></span>
            </p>
            <p>
              <span>后置像素支持</span>
              <span><input type="text" v-model="phoneObj.Postposition1"></span>
              <span>前置像素支持</span>
              <span><input type="text" v-model="phoneObj.Preposition1"></span>
            </p>
            <p>
              <span>电池类别</span>
              <span><input type="text" v-model="phoneObj.Battery1"></span>
              <span>屏幕类别</span>
              <span><input type="text" v-model="phoneObj.screen1"></span>
            </p>
            <p>
              <span>Cpu</span>
              <span><input type="text" v-model="phoneObj.CPU"></span>
              <span>Cpu百分比</span>
              <span><input type="text" v-model="phoneObj.CPU2"></span>
            </p>
            <p>
              <span>内存</span>
              <span><input type="text" v-model="phoneObj.Memory"></span>
              <span>内存百分比</span>
              <span><input type="text" v-model="phoneObj.Memory2"></span>
            </p>
            <p>
              <span>电池</span>
              <span><input type="text" v-model="phoneObj.Battery"></span>
              <span>电池百分比</span>
              <span><input type="text" v-model="phoneObj.Battery2"></span>
            </p>
            <p>
              <span>后置</span>
              <span><input type="text" v-model="phoneObj.Postposition"></span>
              <span>后置百分比</span>
              <span><input type="text" v-model="phoneObj.Postposition2"></span>
            </p>
            <p>
              <span>前置</span>
              <span><input type="text" v-model="phoneObj.Preposition"></span>
              <span>前置百分比</span>
              <span><input type="text" v-model="phoneObj.Preposition2"></span>
            </p>
            <p>
              <span>屏幕</span>
              <span><input type="text" v-model="phoneObj.screen"></span>
              <span>屏幕百分比</span>
              <span><input type="text" v-model="phoneObj.screen2"></span>
            </p>
            <p>
              <span>分辨率</span>
              <span><input type="text" v-model="phoneObj.Resolvingpower"></span>
              <span>分辨率百分比</span>
              <span><input type="text" v-model="phoneObj.Resolvingpower2"></span>
            </p>
            <p>
              <span>NFC</span>
              <span><input type="text" v-model="phoneObj.NFC"></span>
              <span>评分</span>
              <span><input type="text" v-model="phoneObj.score"></span>
            </p>
          </li>
        </ul>
        <div class="Pagebtn">
          <span class="submit" @click="submit()">提交</span>
          <span class="cancel" @click="cancel()">取消</span>
        </div>
      </div>
    </div>

    <div class="PhoneSearch">
      <span @click="queryALL(1)">显示全部</span>
      <select name="select" v-model="selecttype">
        <option :value="index" v-for="(item,index) in PhoneSelect" :key="index">{{item}}</option>
      </select>
      <input type="text" placeholder="搜索" v-model="searchmess" @keyup.enter="querySinge(1)">
      <span class="SearchMessage" @click="querySinge(1)">搜索</span>
    </div>
    <div class="PhoneMessage">
      <table cellspacing="0">
        <thead>
        <tr>
          <th>ID</th>
          <th>手机名称</th>
          <th>图片</th>
          <th>价格</th>
          <th>类型</th>
          <th>网评</th>
          <th>管理</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in PhoneLists" :key="index">
          <td>{{item.pid}}</td>
          <td><span :title="item.name" class="phonetr">{{item.name}}</span></td>
          <td><span :title="item.imgsrc" class="phonetr">{{item.imgsrc}}</span></td>
          <td><span :title="item.prices" class="phonetr">{{item.prices}}</span></td>
          <td>{{item.type}}</td>
          <td>{{item.totalscore}}</td>
          <td>
            <span @click="updatephone(item)">更新</span>
            <span @click="delephone(item)">删除</span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="Pagebtn">
      <span @click="fontsPage" v-show="fontflag">上一页</span>
      <span @click="nextsPage" v-show="nextflag">下一页</span>
    </div>


  </div>
</template>

<script>
  import axios from 'axios';
  import urlkit from '../../url/urlkit';

  export default {
    name: "AdminPhonepage",
    data() {
      return {
        PhoneSelect: ['id', '名字', '类型'],
        PhoneLists: [],
        searchmess: '',  //搜索的信息
        selecttype: 0,  //选择类型搜索
        pagesize: 0, //默认查询0-15的条数
        fontflag: false, //上一页按钮隐藏
        nextflag: true, //下一页的按钮隐藏
        updateflag: false, //弹窗信息开关
        flagsubmit: true, //重复提交按钮
        phoneObj: {
          pid: '',
          phoneName: '',
          type: '',
          Price: '',
          navigation: '',
          bluetooth: '',
          OperatingSystem: '',
          Unlock: '',
          imgsrc: '',
          Battery: '',
          Battery1: '',
          Battery2: '',
          CPU: '',
          CPU1: '',
          CPU2: '',
          Memory: '',
          Memory1: '',
          Memory2: '',
          Postposition: '',
          Postposition1: '',
          Postposition2: '',
          Preposition: '',
          Preposition1: '',
          Preposition2: '',
          Resolvingpower: '',
          Resolvingpower1: '',
          Resolvingpower2: '',
          screen: '',
          screen1: '',
          screen2: '',
          NFC: '',
          score: '',
          cpuFrequen: '',
          batteryType: '',

        }
      }
    },
    created() {
    },
    mounted() {
      this.queryALL()
    },
    methods: {
      //all手机列表
      queryALL(num) {
        let _this = this;
        let pagesize = _this.pagesize;
        let pagesize1 = 25;
        if (num == 1) {
          _this.pagesize = 0;
          _this.fontflag = false;
          pagesize = 0;
        }
        if (_this.searchmess != '') {
          _this.searchmess = '';  //清空搜索栏
          let pagesize = 0;
        }
        let url = urlkit + '/api/product/Enquirygoods';
        axios.post(url, {pagesize, pagesize1}).then(res => {
          if (res.status === 200) {
            _this.PhoneLists = res.data;
            if (res.data.length == 0) {
              alert('信息已到最后');
              this.nextflag = false;
              return;
            }
            //数据量条数小于25 隐藏按钮
            if (res.data.length < 25) {
              this.nextflag = false;
              return;
            }
            this.nextflag = true;
          }
        })
      },
      //查单品信息
      querySinge(num) {
        let flag = this.selecttype;
        let message = this.searchmess;
        let pagesize;
        if(num ==1){
          this.pagesize = 0;
          pagesize = 0;
        }else{
          pagesize = this.pagesize;
        }
        let pagesize1 = 25;
        let url = urlkit + '/api/AdminProduct/selectPhone';
        axios.post(url, {flag, message, pagesize, pagesize1}).then(res => {
          if (res.status === 200) {
            if (res.data.length == 0) {
              alert('没有该信息');
              return;
            }
            if (res.data.length < 25) {
              this.nextflag = false;
            }
            if(this.pagesize == 0){
              this.fontflag = false;//上一页按钮隐藏
            }
            console.log(this.pagesize)
            this.PhoneLists = res.data;
          }
        });
      },
      //跟新列表打开
      updatephone(item) {
        this.updateflag = true;
        let flag = 3;
        let message = item.pid;
        let pagesize = 0;
        let pagesize1 = 15;
        let url = urlkit + '/api/AdminProduct/selectPhone';

        axios.post(url, {flag, message, pagesize, pagesize1}).then(res => {
          if (res.status === 200) {
            // this.PhoneLists = res.data;
            let a = res.data[0];
            this.phoneObj.pid = a.pid;
            this.phoneObj.phoneName = a.name;
            this.phoneObj.Price = a.Price;
            this.phoneObj.type = a.type;
            this.phoneObj.cpuFrequen = a.cpuFrequen;
            this.phoneObj.navigation = a.navigation;
            this.phoneObj.bluetooth = a.bluetooth;
            this.phoneObj.OperatingSystem = a.OperatingSystem;
            this.phoneObj.Unlock = a.Unlock;
            this.phoneObj.imgsrc = a.imgsrc;
            this.phoneObj.Battery = a.Battery;
            this.phoneObj.Battery1 = a.Battery1;
            this.phoneObj.Battery2 = a.Battery2;
            this.phoneObj.CPU = a.CPU;
            this.phoneObj.CPU1 = a.CPU1;
            this.phoneObj.CPU2 = a.CPU2;
            this.phoneObj.Memory = a.Memory;
            this.phoneObj.Memory1 = a.Memory1;
            this.phoneObj.Memory2 = a.Memory2;
            this.phoneObj.Postposition = a.Postposition;
            this.phoneObj.Postposition1 = a.Postposition1;
            this.phoneObj.Postposition2 = a.Postposition2;
            this.phoneObj.Preposition = a.Preposition;
            this.phoneObj.Preposition1 = a.Preposition1;
            this.phoneObj.Preposition2 = a.Preposition2;
            this.phoneObj.Resolvingpower = a.Resolvingpower;
            this.phoneObj.Resolvingpower1 = a.Resolvingpower1;
            this.phoneObj.Resolvingpower2 = a.Resolvingpower2;
            this.phoneObj.screen = a.screen;
            this.phoneObj.screen1 = a.screen1;
            this.phoneObj.screen2 = a.screen2;
            this.phoneObj.NFC = a.NFC;
            this.phoneObj.score = a.score;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      //删除手机信息
      delephone(item) {
        if (confirm("是否删除该手机信息")) {
          var pid = item.pid;
          let url = urlkit + '/api/AdminProduct/AdminDele';
          axios.post(url, {pid}).then(res => {
            if(res.status===200){
              // console.log(res);
              alert('删除成功');
              this.queryALL(1);//查全部返回列表
            }
          }).catch(err=>{
            console.log(err);
          });
        }
      },
      //上一页
      fontsPage() {
        this.pagesize = this.pagesize - 25;
        if (this.pagesize == 0) {
          this.fontflag = false;//上一页按钮隐藏
        }
        if (this.searchmess != '') {  //处于搜搜状态
          this.querySinge();  //搜索状态查询上一页
        } else {
          this.queryALL();  //查询全部下一页
        }
      },
      //下一页
      nextsPage() {
        this.fontflag = true;//上一页按钮显示
        this.pagesize = this.pagesize + 25;
        if (this.searchmess != '') {  //处于搜搜状态
          this.querySinge(); //搜索状态查询下一页
        } else {
          this.queryALL(); //查询全部下一页
        }
      },
      //  提交
      submit() {
        if (this.flagsubmit) {
          this.flagsubmit = false;
          let array = [];
          array.push(this.phoneObj.Price);
          array.push(this.phoneObj.cpuFrequen);
          array.push(this.phoneObj.navigation);
          array.push(this.phoneObj.bluetooth);
          array.push(this.phoneObj.OperatingSystem);
          array.push(this.phoneObj.Unlock);
          array.push(this.phoneObj.imgsrc);
          array.push(this.phoneObj.Battery);
          array.push(this.phoneObj.Battery1);
          array.push(this.phoneObj.Battery2);
          array.push(this.phoneObj.CPU);
          array.push(this.phoneObj.CPU1);
          array.push(this.phoneObj.CPU2);
          array.push(this.phoneObj.Memory);
          array.push(this.phoneObj.Memory1);
          array.push(this.phoneObj.Memory2);
          array.push(this.phoneObj.Postposition);
          array.push(this.phoneObj.Postposition1);
          array.push(this.phoneObj.Postposition2);
          array.push(this.phoneObj.Preposition);
          array.push(this.phoneObj.Preposition1);
          array.push(this.phoneObj.Preposition2);
          array.push(this.phoneObj.Resolvingpower);
          array.push(this.phoneObj.Resolvingpower1);
          array.push(this.phoneObj.Resolvingpower2);
          array.push(this.phoneObj.screen);
          array.push(this.phoneObj.screen1);
          array.push(this.phoneObj.screen2);
          array.push(this.phoneObj.NFC);
          array.push(this.phoneObj.score);
          array.push(this.phoneObj.pid);
          // 更新提交
          let url = urlkit + '/api/AdminProduct/AdminUpdate';
          axios.post(url, {array}).then(res => {
            if (res.status === 200 && res.data.affectedRows == 2) {
              // console.log(res);
              alert('更新成功');
              this.flagsubmit = true;
              this.updateflag = false; //关闭窗口
            }
          }).catch(err => {
            console.log(err);
          });
        } else {
          alert('请勿重复提交');
        }

      },
      //取消
      cancel() {
        this.updateflag = false;
      },
    },
  }
</script>

<style scoped>
  #phonetemp {
    position: relative;
  }

  .PhoneSearch {
    width: 100%;
    padding: 10px;
    text-align: center;
    display: flex;
    justify-content: center;
  }

  .PhoneSearch span {
    padding: 5px;
  }

  .PhoneSearch select {
    width: 100px;
    height: 30px;
    padding: 5px;
    display: inline-block;
    border-radius: 3px;
    vertical-align: middle;
    margin-left: 15px;
    /*隐藏select的下拉图标*/
    /*appearance: none;*/
    /*-webkit-appearance: none;*/
    /*-moz-appearance: none;*/
    /*清除select的边框样式*/
    border: none;
    /*清除select聚焦时候的边框颜色*/
    outline: none;
  }

  .PhoneSearch input {
    border-radius: 3px;
    width: 350px;
    height: 20px;
    display: inline-block;
    vertical-align: middle;
    /*margin-top: 10px;*/
    padding: 5px;
    margin-left: 15px;
  }

  .SearchMessage {
    width: 90px;
    text-align: center;
    background-color: #51517e;
    color: white;
    margin-left: 15px;
    border-radius: 3px;
    display: inline-block;
    vertical-align: middle;
    /*margin-top: 10px;*/
  }

  .PhoneMessage {
    width: 90%;
    margin: auto;
    /*border: 1px solid gray;*/
  }

  .PhoneMessage tbody, table, thead {
    width: 100%;
    margin: auto;
    /*border: 1px solid gray;*/
  }

  .PhoneMessage tr {

  }

  .PhoneMessage tr td, th {
    width: 150px;
    /*height: 20px;*/
    /*line-height: 20px;*/
    border: 1px solid #c5c5c5;
  }
  .PhoneMessage span {
    /*width: 150px;*/
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    display: inline-block;
    justify-content: center;
    vertical-align: middle;
  }
  .PhoneMessage .phonetr {
    width: 150px;
  }

  .Pagebtn span {
    background-color: #51517e;
    margin: 10px auto;
    padding: 5px 10px;
    display: inline-block;
    cursor: pointer;
    color: #ffffff;
  }

  /*  更新页弹窗 蒙版*/
  .UpdatePage {
    width: 100%;
    position: absolute;
    top: -5px;
    left: -5px;
    height: 665px;
    padding: 5px;
    /* opacity: 0.6; */
    background-color: #b7a3a3;
    -webkit-box-shadow: 5px 5px 3px #6f7a86;
    box-shadow: 0px 0px 3px 3px #6f7a86;
  }

  .UpdatePage .UpdateOpen {
    /*height: 500px;*/
    margin: auto;
  }

  .UpdatePage .UpdateOpen ul {
    display: flex;
    justify-content: center;
  }


  .UpdatePage .UpdateOpen ul li {

  }

  .UpdatePage .UpdateOpen ul li span:nth-child(2n+1) {
    width: 100px;
    display: inline-block;
    background-color: #84849a;
    margin: 10px 0px 0px 25px;
    padding: 5px;
    vertical-align: middle;

  }

  .UpdatePage .UpdateOpen ul li span:nth-child(2n) {
    display: inline-block;
    width: 230px;
    /*background-color: royalblue;*/
    margin-top: 10px;
    /*padding: 5px;*/
    vertical-align: middle;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

  }

  .UpdatePage .UpdateOpen input {
    width: 230px;
    padding: 5px;
  }
</style>
