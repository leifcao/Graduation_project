<template>
  <div id="temp">
    <div class="pheader">

    </div>
    <div class="pmiddle">
      <div class="pmiddle_top">
        <div class="pmiddle_topMain">
          <span v-for="(item,i) in pixeldata1" :key="i">{{item}}&nbsp;&nbsp;{{i==0?'和':''}}&nbsp;&nbsp;</span>
          <span>的区别</span>
        </div>
      </div>
      <div class="pmiddle_mess">
        <div>
          <ul class="pmiddle_comprehensive">
            <li>
              <div class="pmiddle_firstgid">
                <i class="Recommend Memoryicon">推荐</i>
                <i class="Recommend Memoryicon1" style="top: 45px;">推荐</i>
                <img src="" alt="">
                <h5></h5>
              </div>
              <p class="pmiddleTitle">基本参数</p>
              <p>电商报价(￥)</p>
              <p @mouseover="CPUFlag=true" @mouseout="CPUFlag=false"><i class="cpuicon"></i>CPU型号</p>
              <span class="CpuCommend" v-show="CPUFlag" @mouseover="CPUFlag=true" @mouseout="CPUFlag=false">
                CPU系列型号是指CPU厂商会根据CPU产品的市场定位来给属于同一系列的CPU产品确定一个系列型号以便于区分和管理，一般而言系列型号可以说是用于区分CPU性能的重要标识
              </span>
              <p>操作系统</p>
              <p>解锁方式</p>
              <p class="pmiddleTitle">屏幕</p>
              <p>主屏尺寸</p>
              <p>屏幕类型</p>
              <p>主屏分辨率</p>
              <p class="pmiddleTitle">硬件</p>
              <p>CPU频率</p>
              <p @mouseover="RAMFlag=true" @mouseout="RAMFlag=false">RAM容量</p>
              <span class="RAMCommend" v-show="RAMFlag" @mouseover="RAMFlag=true" @mouseout="RAMFlag=false">
                运行内存，也称作主存，是指程序运行时需要的内存，只能临时存储数据用于与CPU交换高速缓存数据，一般多指随机存取存储器（RAM）运行内存的大小直接决定了系统能运行多少程序，运行内存越大，系统运行程序越快
              </span>
              <p>电池容量</p>
              <p>电池类型</p>
              <p class="pmiddleTitle">摄像头</p>
              <p>后置摄像头</p>
              <p>前置摄像头</p>
              <p>光圈</p>
              <p class="pmiddleTitle">网络与连接</p>
              <p>导航</p>
              <p>蓝牙</p>
              <p>NFC</p>
            </li>
            <li v-for="(item,index) in PhoneList" @mouseover="lightflag=index" @mouseout="lightflag=undefined"
                :class="lightflag == index?'Lilight':''" :key="index">
              <span class="pmiddle_close" @click="DeletClose(index,item.pid)" v-show="item.name != null">x</span>
              <div class="pmiddle_firstgid">
              <span class="pmiddle_btn" @click="addNewPhone(index)" v-if="item.name == null">+
              </span>
                <img :src="item.imgsrc" alt="" v-else>
                <h5 :title="item.name">{{item.name}}</h5>
                <i :class="{'Pkicon':index!=2}"></i>
              </div>
              <p class="pmiddleTitle"></p>
              <p style="color: red">{{item.Price}}</p>
              <p style="color: #116baf;">{{item.CPU}}</p>
              <p :title="item.OperatingSystem">{{item.OperatingSystem}}</p>
              <p>{{item.Unlock}}</p>
              <p class="pmiddleTitle"></p>
              <p :title="item.screen1"><i :class="GetScreen(item.screen)"></i>{{item.screen}}</p>
              <p>{{item.screenType}}</p>
              <p>{{item.Resolvingpower}}</p>
              <p class="pmiddleTitle"></p>
              <p>{{item.cpuFrequen}}</p>
              <!--              <p><i :class="{'Memoryicon':item.Memory=='8GB','Memoryicon1':item.Memory=='12GB'}"></i>{{item.Memory}}</p>-->
              <p><i :class="{'Memoryicon1':Memory==index}"></i>{{item.Memory}}</p>
              <p :title="item.Battery1"><i :class="GetBattery(item.Battery)"></i><i
                :class="{'Memoryicon1':battery==index}"></i>{{item.Battery}}</p>
              <p>{{item.batteryType}}</p>
              <p class="pmiddleTitle"></p>
              <p :title="item.Postposition">{{item.Postposition}}</p>
              <p :title="item.Preposition"><i :class="{'Memoryicon1':Preposition==index}"></i>{{item.Preposition}}</p>
              <p>{{item.Aperture}}</p>
              <p class="pmiddleTitle"></p>
              <p :title="item.navigation">{{item.navigation}}</p>
              <p>{{item.bluetooth}}</p>
              <p>{{item.NFC}}</p>

            </li>
          </ul>
        </div>
        <div class="pmiddle_CpuMess">
          <h1>CPU对比情况
            <span @mouseover="Tiantiflag=true" @mouseout="Tiantiflag=false"
                  style="float: right;height:25px">Cpu天梯图</span></h1>
          <div id="pmiddle_CpuTianti" @mouseover="Tiantiflag=true" @mouseout="Tiantiflag=false" v-show="Tiantiflag">
          </div>
          <div id="pmiddle_Cpu" style="width: 100%;height: 300px">
          </div>
          <div class="pmiddle_Memory">
            <div class="pmiddle_MemoryMain">
              <h1>运行内存对比情况</h1>
              <div class="pmiddle_MemoryMess">
                <span>4GB以下<br/>大型软件运行卡顿</span>
                <span>4GB-8GB<br/>大型软件运行流畅</span>
                <span>8GB以上<br/>大型软件运行超快</span>
              </div>
              <p class="MemoryRows">
                <span v-for="(item,index) in PhoneList" :key="index" :style="{width: GetPrencent(item.Memory)}">{{item.Memory}}</span>
              </p>
            </div>
          </div>
          <div>
            <div class="pmiddle_pixel">
              <h1>后置摄像头像素对比</h1>
              <div class="pmiddle_behind" id="Pixel">
              </div>
              <h1>前置摄像头像素对比</h1>
              <div class="pmiddle_fontside" id="fontPixel">
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>

    <div class="Windows">
      <AlertWindow @func="GetPidName" ref="compares"></AlertWindow>
    </div>


  </div>
</template>

<script>
  import axios from 'axios';
  import echarts from 'echarts';
  import AlertWindow from './AlertWindow';
  import Cpuchart from './CPUechart';
  import urlkit from '../url/urlkit';

  export default {
    name: "PhoneCompare",
    data() {
      return {
        //详细页传过来的参数
        Array: this.$route.query.array,
        PhoneList: [], //手机对比表
        Notmess: '暂无参数',
        isDisable: true, //防止重复点击
        Object: '',  //用于接收子组件传过来的值
        lightflag: undefined,
        fatherwindow: false, //窗口显示
        Btnshow: false, //选择手机菜单按钮是否显示
        CPUlist: [],//所有CPU信息echart图渲染 data
        charts: '',  //CPU图渲染
        CPUFlag: false, //Cpu信息说明flag
        RAMFlag: false, //RAM信息说明flag
        pixelcharts: '',  //后置像素高清echart
        pixeloptions: '', // echatr渲染
        pixeldatas: [],//echart图渲染 data
        pixeldata1: [],//echart图渲染 data1
        // myColor: ['#1089E7', '#F57474', '#56D0E3'],  //后置颜色
        myColor: ['#cecece', '#bb8181', '#535582'],  //后置颜色
        //  前置
        data: {
          value: '24.5',
          color: '#535582',
          xAxis: [], //'2017-11', '2017-12', '2018-01'
          values: [], //'1600', '1200', '1300'
        },
        seriesData: [], //前置
        titleData: [], //前置
        option: [],  //前置
        Fpixelchart: '',  //前置置像素高清echart
        CPUchart: '',//cpu对比图
        CPUoption: '',//cpu option
        CPUdata: [], //cpu data
        CPUscore: [], //cpu score
        AllCPU: [],  //全部cpu
        Tiantiflag: true, //cpu天体表显影

        //  推荐图标
        totallike:'', // 综合推荐
        Memory: '', //内存
        battery: '', //电池
        Preposition: '', //前置
        Resolvingpower:'',//主屏像素
      }
    },
    created() {

    },
    mounted() {
      this.CompareMessage(); //手机参数对比信息
      //echart图的使用
      this.$nextTick(function () {
        this.GetNumber('双1600万像素+600王')
        // this.drawFpixel('fontPixel');
      });
    },
    methods: {
      // 获取推荐图标
      GetLike() {
        var list = this.PhoneList;
        var maxRAM = 0;
        var maxBattery = 0;
        var maxPreposition = 0;
        var maxResolvingpower = 0
        list.forEach((item, index) => {
          // 判断是否为空{}对象
          if (item.Memory) {
            var RAM = item.Memory.split('GB');
            var battery = item.Battery.split('mAh');
            var Preposition = item.Preposition.split('万像素');
            var Resolvingpower = item.Resolvingpower.split('像素');
            // 判断内存最大
            if (maxRAM < Number(RAM[0])) {
              maxRAM = Number(RAM[0]);
              this.Memory = index;
            }
            // 判断电池最大
            if (maxBattery < Number(battery[0])) {
              maxBattery = Number(battery[0]);
              this.battery = index;
            }
            //前置推荐 判断最大
            if (maxPreposition < Number(Preposition[0])) {
              maxPreposition = Number(Preposition[0]);
              this.Preposition = index;
            }
          // //  判断主屏像素
          //   if (maxResolvingpower < Number(Resolvingpower[0])) {
          //     maxResolvingpower = Number(Resolvingpower[0]);
          //     this.Resolvingpower = index;
          //   }

          }
        })
      },
      //返回 数字，字符串中提取数字
      GetNumber(str) {
        let str1 = str
        str1 = parseInt(str);
        // console.log(str1);
        if (isNaN(str1)) {
          // str1 = str.replace(/[^0-9]/ig, "");
          let str2 = str.slice(1);
          str1 = parseInt(str2);
          if (isNaN(str1)) {
            str2 = str2.slice(1);
            str1 = parseInt(str2);
          }
        }
        return str1;
      },

      //获取 百分比  内存图的显示
      GetPrencent(item) {
        if (item == '8GB') {
          return '80%';
        } else if (item == '6GB') {
          return '60%';
        } else if (item == '4GB') {
          return '40%';
        } else if (item == '3GB') {
          return '30%';
        } else if (item == '12GB') {
          return '100%';
        } else {
          return '0%';
        }
      },
      //屏幕图标动态显示
      GetScreen(item) {
        item = parseInt(item);
        if (item >= 6) {
          return 'screenicon';
        } else if (item < 6) {
          return 'screenicon1';
        }
      },
      //电池图标动态显示
      GetBattery(item) {
        item = parseInt(item);
        if (item > 0 && item < 3000) {
          return 'batteryicon';
        } else if (item < 4000) {
          return 'batteryicon1';
        } else if (item >= 4000) {
          return 'batteryicon2';
        }
      },
      //手机对比参数显示一
      CompareMessage() {
        let array = [];
        let localArray = JSON.parse(sessionStorage.getItem('phone'));
        // this.Array.forEach((item, index) => {
        localArray.forEach((item, index) => {
          array.push(item.pid);
          // console.log(array);
        });
        let url = urlkit + '/api/product/phoneCompare';
        axios.post(url, {array}).then(res => {
          if (res.status === 200) {
            // this.PhoneList = res.data;
            for (var l = 0; l < array.length; l++) {
              for (var j = 0; j < res.data.length; j++) {
                if (array[l] == res.data[j].pid) {
                  this.PhoneList.push(res.data[j])
                }
              }
            }
            var data = this.PhoneList;
            // console.log(this.PhoneList)
            //后置，前置信息push进数组
            for (let i in data) {
              //后置像素信息
              var str = this.GetNumber(data[i].Postposition);
              let nameArray = data[i].name.split("（");
              this.pixeldatas.push({value: str, name: nameArray[0]});
              this.pixeldata1.push(nameArray[0]);
              //前置像素信息
              var str1 = this.GetNumber(data[i].Preposition);
              this.data.xAxis.push(nameArray[0]);
              this.data.values.push(str1);

              //cpu参数 处理
              var temp = data[i].CPU;
              temp = temp.replace(/\s*/g, ""); //去空格
              temp = temp.split("（")[0];
              if (temp.indexOf('高通') != -1 || temp.indexOf('麒麟') != -1) {
                temp = temp.substring(2, 8); //从第三开始截取 即索引四
                // console.log(temp)
              }
              this.CPUdata.push(temp);
              // console.log(this.CPUdata);
            }
            this.drawPixel('Pixel');  //渲染后置echart
            this.drawFpixel('fontPixel'); //渲染前置
            var Listlength = true;
            //补全数组长度为3
            while (Listlength) {
              if (this.PhoneList.length < 3) {
                this.PhoneList.push({});
              } else {
                Listlength = false;
              }
            }
            this.GetLike();//推荐图标
            this.GetCPUmessage();// cpu信息
          }
        })
      },
      //添加手机展示弹窗
      addNewPhone(index) {
        // this.fatherwindow = true;
        this.$refs.compares.openWind(index);  //调用子组件的方法
      },
      //获取子组件的值
      GetPidName(data) {
        //子组件传过来的对象
        this.Object = data.obj;
        //后置像素ehcart图重绘
        var str = this.GetNumber(data.obj.Postposition);
        let nameArray = data.obj.name.split("（");
        // this.pixeldatas.push({value: str, name: nameArray[0]});
        // this.pixeldata1.push(nameArray[0]);
        this.pixeldatas.splice(data.indexflag, 0, {value: str, name: nameArray[0]});
        this.pixeldata1.splice(data.indexflag, 0, nameArray[0]);
        this.pixelcharts.setOption(this.pixeloptions);
        //前置像素Echart重绘
        var str1 = this.GetNumber(data.obj.Preposition);
        this.data.xAxis.splice(data.indexflag, 0, nameArray[0]);
        this.data.values.splice(data.indexflag, 0, str1);
        this.titleData = [];  //清空信息重绘
        this.seriesData = [];  //清空信息重绘
        this.emitFpixel();
        //  更新对比栏信息
        this.PhoneList.splice(data.indexflag, 1, data.obj);
        var array = JSON.parse(sessionStorage.getItem('phone'));
        array.splice(data.indexflag, 0, data.obj);
        sessionStorage.setItem('phone', JSON.stringify(array));
        //更新like推荐
        this.GetLike();
        //  更新CPU对比
        var temp = this.Object.CPU;
        temp = temp.replace(/\s*/g, ""); //去空格
        temp = temp.split("（")[0];
        if (temp.indexOf('高通') != -1 || temp.indexOf('麒麟') != -1) {
          temp = temp.substring(2, 8); //从第三开始截取 即索引四
        }
        this.AllCPU.some((item, index) => {
          if (item.cpu.substring(0, 6) == temp) {
            this.CPUoption.xAxis.data.splice(data.indexflag, 0, item.cpu);
            this.CPUoption.series[0].data.splice(data.indexflag, 0, item.cpuscore);
            return true;
          } else if (index == this.AllCPU.length - 1) {
            this.CPUoption.xAxis.data.splice(data.indexflag, 0, temp);
            this.CPUoption.series[0].data.splice(data.indexflag, 0, 0);
            return true;
          }
        });
        console.log(this.CPUoption.xAxis.data, this.CPUoption.series[0].data)

        this.CPUchart.setOption(this.CPUoption);
      },
      //删掉对比商品
      DeletClose(index, pid) {
        //echart 信息更新
        var array = JSON.parse(sessionStorage.getItem('phone'));
        console.log(array);
        array.some((item, i) => {
          if (item.pid == pid) {
            console.log(i);
            this.pixeldata1.splice(i, 1);
            this.pixeldatas.splice(i, 1);
            this.data.xAxis.splice(i, 1);
            this.data.values.splice(i, 1);
            this.CPUoption.xAxis.data.splice(i, 1);
            this.CPUoption.series[0].data.splice(i, 1);
            // console.log(this.CPUoption.xAxis.data,this.CPUoption.series[0].data)
            array.splice(i, 1);
            return true;
          }
        });
        this.titleData = [];
        this.seriesData = [];
        this.titleData.length = 0;
        this.seriesData.length = 0; //清空前置push的所有信息
        this.pixelcharts.setOption(this.pixeloptions); // 后置像素重绘
        this.emitFpixel();// 前置像素重绘
        this.CPUchart.setOption(this.CPUoption); //单个cpu重绘

        this.PhoneList.splice(index, 1, {});
        //  更新对比栏信息
        sessionStorage.setItem('phone', JSON.stringify(array));
        this.GetLike();
      },
      //  获取Cpu信息列表
      GetCPUmessage() {
        let url = urlkit + '/api/product/GetCpu';
        axios.get(url).then(res => {
          if (res.status === 200) {
            var list = res.data;
            this.AllCPU = res.data;
            list.forEach((item, index) => {
              if (index < 15) {
                this.CPUlist.push({
                  name: item.cpu,
                  value: item.cpuscore,
                });
              }
            });
            for (var i = 0; i < this.CPUdata.length; i++) {
              for (var j = 0; j < list.length; j++) {
                if (this.CPUdata[i] == list[j].cpu.substring(0, 6)) {
                  this.CPUscore.push(list[j].cpuscore);
                  this.CPUdata.splice(i, 1, list[j].cpu);
                  break;
                } else if (j == list.length - 1) {
                  this.CPUscore.push(0);
                }
              }
            }
            // console.log(this.CPUscore)

            //渲染echart图
            this.drawPic('pmiddle_CpuTianti');
            this.drawCPu('pmiddle_Cpu');
          }
        });
      },
      //echart CPU图
      drawPic(id) {
        this.charts = echarts.init(document.getElementById(id));
        var data = [];
        data = this.CPUlist
        var getArrByKey = (data, k) => {
          let key = k || "value";
          let res = [];
          if (data) {
            data.forEach(function (t) {
              res.push(t[key]);
            });
          }
          return res;
        };
        var opt = {
          index: 0
        }
        var color = ['#fc2b5f', '#ffbf51', '#bb8181'];
        data = data.sort((a, b) => {
          return b.value - a.value
        });

        this.charts.setOption({
          // backgroundColor: '#011c3a',
          grid: {
            top: '2%',
            bottom: -15,
            right: 30,
            left: -60,
            containLabel: true
          },
          xAxis: {
            show: false
          },
          yAxis: [{
            triggerEvent: true,
            show: true,
            inverse: true,
            data: getArrByKey(data, 'name'),
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: 0,
              color: '#666',
              align: 'left',
              margin: 100,
              fontSize: 13,
              formatter: function (value, index) {
                if (opt.index === 0 && index < 3) {
                  return '{idx' + index + '|' + (1 + index) + '} {title|' + value + '}'
                } else if (opt.index !== 0 && (index + opt.index) < 9) {
                  return '{idx|0' + (1 + index + opt.index) + '} {title|' + value + '}'
                } else {
                  return '{idx|' + (1 + index + opt.index) + '} {title|' + value + '}'
                }
              },
              rich: {
                idx0: {
                  color: '#FB375E',
                  backgroundColor: '#FFE8EC',
                  borderRadius: 100,
                  padding: [5, 8]
                },
                idx1: {
                  color: '#FF9023',
                  backgroundColor: '#FFEACF',
                  borderRadius: 100,
                  padding: [5, 8]
                },
                idx2: {
                  color: '#01B599',
                  backgroundColor: '#E1F7F3',
                  borderRadius: 100,
                  padding: [5, 8]
                },
                idx: {
                  color: '#333',
                  borderRadius: 100,
                  padding: [5, 8]
                },
                title: {
                  width: 165
                }
              }
            },
          }, {
            triggerEvent: true,
            show: true,
            inverse: true,
            data: getArrByKey(data, 'name'),
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: 0,
              color: '#666',
              align: 'left',
              margin: 20,
              fontSize: 13,
              formatter: function (value, index) {
                return '评分：' + data[index].value
              },
            }
          }],
          series: [{
            name: '条',
            type: 'bar',
            yAxisIndex: 0,
            data: data,
            barWidth: 10,
            itemStyle: {
              color: (val) => {
                if (val.dataIndex < 3 && opt.index === 0) {
                  return color[val.dataIndex];
                } else {
                  return '#60617d'
                }
              },
              barBorderRadius: 30,
            }
          }]
        });
        //  防止渲染echart时无法获取宽度，等渲染完后隐藏
        this.Tiantiflag = false;
      },
      //drawPixel 后置像素 图
      drawPixel(id) {
        let _this = this;
        _this.pixelcharts = echarts.init(document.getElementById(id));
        _this.pixeloptions = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} (万像素)',
            // formatter: '{a} <br/>{b}: {c} ({d}万像素)'
          },
          legend: {
            // orient: 'vertical',
            left: 10,
            data: _this.pixeldata1,
            textStyle: {
              fontSize: '15',
            }
          },
          series: [
            {
              name: '后置像素',
              type: 'pie',
              radius: ['55%', '70%'],  //同心圆 内径和外径
              avoidLabelOverlap: false,
              itemStyle: {
                normal: {
                  color: function (params) {
                    var num = _this.myColor.length;
                    return _this.myColor[params.dataIndex % num]
                  },
                }
              },
              label: {
                normal: {
                  show: true,
                  position: 'bottom',
                  textStyle: {
                    fontSize: '15',
                    fontWeight: 'bold'
                  },
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '20',
                    fontWeight: 'bold'
                  },
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: _this.pixeldatas,
            }
          ]
        }
        _this.pixelcharts.setOption(_this.pixeloptions);
      },
      //绘制前置echart
      drawFpixel(id) {
        this.Fpixelchart = echarts.init(document.getElementById(id));
        this.emitFpixel();
      },
      //重绘前置像素时调用
      emitFpixel() {
        let _this = this;
        _this.data.values.forEach(function (item, index) {
          _this.titleData.push({
            text: _this.data.xAxis[index],
            left: 25 * (index + 1) - .5 + '%',
            top: '85%',  //标题高度
            textAlign: 'center',
            textStyle: {
              fontSize: '15',  //标题字体大小
              color: '#535582',
              fontWeight: '400',
            },
          });
          _this.seriesData.push({
            type: 'pie',
            radius: ['50', '60'],  //同心圆大小
            center: [25 * (index + 1) + '%', '50%'],
            hoverAnimation: false,
            label: {
              normal: {
                position: 'center'   //文字剧中
              },
            },
            data: [{
              value: item,
              name: '',
              itemStyle: {
                normal: {
                  color: _this.data.color,
                }
              },
              label: {
                normal: {
                  show: false,
                }
              }
            },
              {
                value: 3200 - item,
                name: '占位',
                tooltip: {
                  show: false
                },
                itemStyle: {
                  normal: {
                    color: '#edf1f4',
                  }
                },
                label: {
                  normal: {
                    formatter: item + '万像素',
                    textStyle: {
                      fontSize: 12,
                      color: _this.data.color
                    }
                  },
                }
              }
            ]
          })
        });
        _this.option = {
          backgroundColor: '#ffffff',
          title: _this.titleData,
          series: _this.seriesData
        }
        // console.log(_this.titleData, _this.seriesData);
        _this.Fpixelchart.setOption(_this.option);
      },
      //绘制cpu（单个）
      drawCPu(id) {
        let _this = this;
        _this.CPUchart = echarts.init(document.getElementById(id));
        _this.CPUoption = {
          backgroundColor: '#011c3a',
          xAxis: {
            data: _this.CPUdata,
            axisLine: {
              lineStyle: {
                color: '#0177d4'
              }
            },
            axisLabel: {
              color: '#fff',
              fontSize: 13
            }
          },
          yAxis: {
            name: "（评分）",
            nameTextStyle: {
              color: '#fff',
              fontSize: 16
            },
            axisLine: {
              lineStyle: {
                color: '#0177d4'
              }
            },
            axisLabel: {
              color: '#fff',
              fontSize: 13
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: '#0177d4'
              }
            },
            interval: 10,
            max: 120
          },
          series: [{
            type: 'bar',
            barWidth: 30,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#00b0ff'
                }, {
                  offset: 0.8,
                  color: '#7052f4'
                }], false)
              }
            },
            label: {
              normal: {
                show: true,
                position: "top",
                formatter: function (params) {
                  return params.data.value;
                },
                textStyle: {
                  color: "#ffc72b",
                }
              }
            },
            data: _this.CPUscore
          }]
        };
        _this.CPUchart.setOption(_this.CPUoption);
      }
    },


    components: {
      AlertWindow,
      Cpuchart
    },


  }

</script>

<style scoped>
  #temp {
    height: 100%;
    /*margin: auto;*/
    /*width: 1300px;*/
  }

  .pmiddle {
    /*width: 1300px;*/
    width: 90%;
    margin: auto;

  }

  .pmiddle_top {
    /*background-color: #c6b0d1;*/
    /*height: 80px;*/
    color: #ffffff;
    background-image: linear-gradient(to right, #9b7894, #b8b8b8, #6467b6);
  }


  .pmiddle_topMain {
    /*background-color: cyan;*/
    margin: auto;
    width: 80%;
    height: auto;
  }

  .pmiddle_topMain span {
    display: inline-block;
    height: 50px;
    line-height: 50px;
    font-size: 28px;
  }


  .pmiddle_mess {
    height: auto;
    display: flex;
  }

  .pmiddle_comprehensive {
    background-color: #ffffff;
    display: flex;
    /*width: 60%;*/
    height: auto;
    border-left: 1px solid #c7c7c7;
    border-bottom: 1px solid #c7c7c7;
  }

  .pmiddle_comprehensive li {
    /*margin: 5px 0 0 10px;*/
    /*width: 100%;*/
    /*padding: 10px;*/
    /*border: 1px solid #c7c7c7;*/
    width: 200px;
    position: relative;
  }

  /*图标集合*/
  .pmiddle_comprehensive li i {
    width: 40px;
    display: inline-block;
    position: absolute;
  }

  .Pkicon {
    width: 80px !important;
    height: 40px;
    right: -40px;
    top: 65px;
    transform: scale(0.6);
    z-index: 100;
    background: url("../assets/icons/pk_red.png") no-repeat center center;
  }

  .cpuicon {
    height: 40px;
    left: 33px;
    top: 2px;
    transform: scale(0.7);
    background: url("../assets/icons/cpu0.png") no-repeat center center;
  }

  /*推荐共同样式*/
  .Recommend {
    width: 180px !important;
    line-height: 30px;
    font-style: normal;
  }

  .Memoryicon {
    height: 30px;
    left: 7px;
    top: 7px;
    background: url("../assets/icons/like-icon.png") no-repeat 0 top;
  }

  .Memoryicon1 {
    height: 30px;
    left: 7px;
    top: 7px;
    background: url("../assets/icons/like-icon.png") no-repeat 0 bottom;
  }

  .screenicon {
    height: 65px;
    transform: scale(0.5);
    top: -9px;
    left: 30px;
    background: url("../assets/icons/doublehand.png") no-repeat center center;
  }

  .screenicon1 {
    height: 65px;
    transform: scale(0.5);
    top: -9px;
    left: 30px;
    background: url("../assets/icons/singlehand.png") no-repeat center center;
  }

  .batteryicon {
    height: 22px;
    transform: scale(0.7);
    bottom: -2px;
    left: 0;
    right: 0;
    margin: auto;
    background: url("../assets/icons/minbettery.png") no-repeat center center;

  }

  .batteryicon1 {
    height: 22px;
    transform: scale(0.7);
    bottom: -2px;
    left: 0;
    right: 0;
    margin: auto;
    background: url("../assets/icons/bettery1.png") no-repeat center center;

  }

  .batteryicon2 {
    height: 22px;
    transform: scale(0.7);
    bottom: -2px;
    left: 0;
    right: 0;
    margin: auto;
    background: url("../assets/icons/morebettery.png") no-repeat center center;
  }

  /*图标集合*/

  .pmiddle_comprehensive .CpuCommend, .RAMCommend {
    position: absolute;
    display: block;
    width: 200px;
    text-align: left;
    text-indent: 1em;
    left: -10px;
    padding: 5px;
    background-color: #afaab3;
    -webkit-box-shadow: 0px 0px 3px 3px #6f7a86;
    box-shadow: 0px 0px 3px 3px #6f7a86;
    z-index: 100;
  }

  .pmiddle_firstgid {
    height: 175px;
    padding: 5px;
    /*display: flex;*/
    /*vertical-align: center;*/
    /*align-items: center;*/
  }

  .pmiddle_firstgid img {
    display: block;
    width: 130px;
    height: 130px;
    padding: 10px;
    margin: auto;
  }

  .pmiddle_firstgid .pmiddle_btn {
    width: 130px;
    height: 130px;
    font-size: 60px;
    color: #ffffff;
    line-height: 130px;
    display: block;
    padding: 10px;
    margin: auto;
  }

  .pmiddle_close {
    width: 20px;
    height: 20px;
    line-height: 20px;
    position: absolute;
    font-size: 20px;
    right: 5px;
    top: 5px;
    /*background-color: yellowgreen;*/
  }

  .pmiddle_firstgid h5 {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .pmiddle_comprehensive li p {
    border-top: 1px solid #c7c7c7;
    padding: 5px;
    height: 35px;
    line-height: 35px;
    text-overflow: ellipsis;
    word-break: break-all;
    white-space: nowrap;
    overflow: hidden;
    position: relative;
  }

  .pmiddle_comprehensive .pmiddleTitle {
    font-weight: bold;
    font-size: 16px;
    text-align: left;
    padding-left: 20px;
  }

  /*  高亮  */
  .Lilight {
    background-color: #8f8f9a;
  }

  /*右边栏目*/
  .pmiddle_CpuMess {
    width: 40%;
    /*height: inherit;*/
    text-align: center;
    padding: 10px;
    position: relative;
    /*background-color: greenyellow;*/
    /*float: right;*/
  }

  .pmiddle_CpuMess h1 {
    box-shadow: 0px -5px 3px #848070;
    padding: 5px;
    /* color: #ffffff; */
    color: #633232;
  }

  #pmiddle_CpuTianti {
    width: 100%;
    /*padding: 10px;*/
    height: 500px;
    position: absolute;
    z-index: 1;
    display: block;
    background-color: white;
    border-bottom: 1px solid #848070;
  }

  .pmiddle_Memory {
    width: 100%;
    /*height: 10%;*/
    /*background-color: #768eb6;*/
  }

  .pmiddle_Memory .pmiddle_MemoryMain {
    margin: 10px auto;
    /*width: 95%;*/
    /*box-shadow: 0px 0px 3px 3px #848070;*/
    /*height: 100px;*/
  }

  .pmiddle_behind {
    /*margin: 20px auto;*/
    width: 100%;
    height: 260px;
  }

  .pmiddle_fontside {
    /*margin: 20px auto;*/
    width: 100%;
    height: 180px;
  }

  .pmiddle_Memory .pmiddle_MemoryMain .pmiddle_MemoryMess {
    /*height: 100px;*/
    margin-top: 5px;
    display: flex;
    justify-content: center;
    /*background-image: linear-gradient(to right,  #00b0ff,#7052f4,#bb8181);*/
    background-image: linear-gradient(to right, #bb8181, #7052f4, #393db5);
  }

  .pmiddle_Memory .pmiddle_MemoryMess span {
    display: inline-block;
    width: 33.33%;
    border-right: 1px solid rebeccapurple;
    vertical-align: middle;
    padding: 10px;
    color: #ffffff;
    font-size: 13px;
  }

  .MemoryRows {
    /*width: 100%;*/
  }

  .MemoryRows span {
    display: block;
    height: 15px;
    line-height: 15px;
    border-radius: 0px 10px 10px 0px;
    color: #ffffff;
    padding-right: 5px;
    font-size: 11px;
    border: 1px solid #7052f4;
    text-align: right;
    /*background-image: linear-gradient(to right,  #00b0ff,#7052f4,#bb8181);*/
    background-image: linear-gradient(to right, #bb8181, #7052f4, #393db5);
  }

  /*.MemoryRows span:nth-child(1) {*/
  /*  !*background-color: yellowgreen;*!*/
  /*  background-image: linear-gradient(to right, #cecece, #bb8181, #393db5);*/
  /*}*/

  /*.pmiddle_CpuMess .MemoryRows span:nth-child(2) {*/
  /*  !*background-color: royalblue;*!*/
  /*  background-image: linear-gradient(to right, #cecece, #bb8181, #393db5);*/
  /*}*/

  /*.pmiddle_CpuMess .MemoryRows span:nth-child(3) {*/
  /*  !*background-color: yellow;*!*/
  /*  background-image: linear-gradient(to right, #cecece, #b0b0b0, #cc98d0);*/
  /*}*/

  .pmiddle_pixel {
  }

  .pmiddle_pixel h1 {

  }


  dl dt {
    float: left;
  }

</style>
