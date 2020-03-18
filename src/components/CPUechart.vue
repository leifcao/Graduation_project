<template>
  <div id="PxielEchart">
    <div id="Pixel" style="width: 100%;height: 300px;background-color: dimgrey"></div>
    <div class="btn">
      <span @click="b()">dianji</span>
    </div>
  </div>

</template>

<script>
  import echarts from 'echarts';

  export default {
    name: "CPUechart",
    data() {
      return {
        pixelcharts: '',  //后置像素高清echart
        pixeloptions:'', // echatr渲染
        pixeldatas:[],//echart图渲染 data
        pixeldata1:[],//echart图渲染 data1
      }
    },
    created() {
    },
    mounted() {
      this.pixeldatas.push({value:1200,name:'联盟广告'});
      this.pixeldatas.push({value:4800,name:'视频广告'});
      this.pixeldatas.push({value:1600,name:'搜索引擎'});
      this.pixeldata1.push('搜索引擎');
      this.pixeldata1.push('视频广告');
      this.pixeldata1.push('联盟广告');
      this.$nextTick(function () {
        this.drawPixel('Pixel');
      });
    },
    methods: {
      a(){
        console.log('1');
        // this.datas.push({value:1200,name:'5555'});
        // this.charts.setOption(this.options);
      },
      drawPixel(id) {
        this.pixelcharts = echarts.init(document.getElementById(id));
        this.pixeloptions = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 10,
            data: this.pixeldata1,
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: this.pixeldatas,
            }
          ]
        }
        this.pixelcharts.setOption(this.pixeloptions);
      },
      b(){
        alert('1')
        this.datas.push({value:1200,name:'5555'});
        this.data1.push('5555');
        this.charts.setOption(this.options);
      }
    }
  }
</script>

<style scoped>

</style>
