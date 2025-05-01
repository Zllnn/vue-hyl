<template>
  <div class="main">

    <!-- 头部 -->
    <header class="header">
      <!-- 左 -->
      <div class="left">
        <div class="inf">
          <div class="year">
            {{ currentTimeY }}
          </div>
          <div class="timer">
            {{ currentTimeT }}
          </div>
        </div>
        <div class="infEchart">
        </div>
      </div>
      <!-- 中 -->
      <div class="center">
        <div class="left"></div>
        <div class="right"></div>
      </div>
      <!-- 右 -->
      <div class="right"></div>
    </header>

    <!-- 下部 -->
    <footer class="footer">
      <!-- 上面两张图表 -->
      <div class="otherDataShow">
        <div class="left"></div>
        <div class="right"></div>
      </div>
      <!-- 底部信息栏 -->
      <div class="userInf">
        <ul>当前用户：</ul>
        <ul>昵称：{{ form.userName }}</ul>
        <ul>学号：{{ form.code }}</ul>
        <ul>统一认证码：{{ form.studentId }}</ul>
      </div>
    </footer>
  </div>
</template>

<script setup>

import * as echarts from 'echarts';
import { onMounted, onUnmounted, ref } from 'vue';
import ecStat from 'echarts-stat';
import { userUserStore } from '@/stores';
import { getArticleCount } from '@/api/article'


//数据part
//时间显示
const currentTimeY = ref('')
const currentTimeT = ref('')
let timer = []
const { user: { userName, code, studentId }, getUserData } = userUserStore()
var myChart1 = null

const form = ref({
  userName,
  code,
  studentId
})

const userData = ref([
  { value: 0, name: '趣事' },
  { value: 0, name: '小说' }
]);
onMounted(() => {
  cenderCenter()
  cenderLeftBottom()
  cenderRightTop()
  cenderLeftCenter()
  cenderRightCenter()
  const timeID = setInterval(() => {
    updataTime()
  }, 1000)
  timer.push(timeID)

  getCount()

})

onUnmounted(() => {
  timer.forEach(time => clearInterval(time))
  timer = []
})

const getCount = async () => {
  const data = await getArticleCount()
  userData.value[0].value = data.data.data.funnyCount;
  userData.value[1].value = data.data.data.story;
  myChart1.setOption({
    series: [{
      data: userData.value // 传入新数据
    }]
  })

}

//渲染中心时实图
const cenderCenter = () => {
  var app = {};
  var chartDom = document.querySelector('.center')
  var myChart = echarts.init(chartDom);
  var option;
  const categories = (function () {
    let now = new Date();
    let res = [];
    let len = 10;
    while (len--) {
      res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
      now = new Date(+now - 2000);
    }
    return res;
  })();
  const categories2 = (function () {
    let res = [];
    let len = 10;
    while (len--) {
      res.push(10 - len - 1);
    }
    return res;
  })();
  const data = (function () {
    let res = [];
    let len = 10;
    while (len--) {
      res.push(Math.round(Math.random() * 1000));
    }
    return res;
  })();
  const data2 = (function () {
    let res = [];
    let len = 0;
    while (len < 10) {
      res.push(+(Math.random() * 10 + 5).toFixed(1));
      len++;
    }
    return res;
  })();
  option = {
    title: {
      text: '用户实时使用数据'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#283b56'
        }
      }
    },
    legend: {},
    toolbox: {
      show: true,
      feature: {
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {}
      }
    },
    dataZoom: {
      show: false,
      start: 0,
      end: 100
    },
    grid: {
      top: '10%',    // 调整绘图区域位置
      right: '8%',
      bottom: '3%',
      left: '8%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: true,
        data: categories
      },
      {
        type: 'category',
        boundaryGap: true,
        data: categories2
      }
    ],
    yAxis: [
      {
        type: 'value',
        scale: true,
        name: 'Price',
        max: 30,
        min: 0,
        boundaryGap: [0.2, 0.2]
      },
      {
        type: 'value',
        scale: true,
        name: 'Order',
        max: 1200,
        min: 0,
        boundaryGap: [0.2, 0.2]
      }
    ],
    series: [
      {
        name: 'Dynamic Bar',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: data
      },
      {
        name: 'Dynamic Line',
        type: 'line',
        data: data2
      }
    ]
  };
  app.count = 11;
  setInterval(function () {
    let axisData = new Date().toLocaleTimeString().replace(/^\D*/, '');
    data.shift();
    data.push(Math.round(Math.random() * 1000));
    data2.shift();
    data2.push(+(Math.random() * 10 + 5).toFixed(1));
    categories.shift();
    categories.push(axisData);
    categories2.shift();
    categories2.push(app.count++);
    myChart.setOption({
      xAxis: [
        {
          data: categories
        },
        {
          data: categories2
        }
      ],
      series: [
        {
          data: data
        },
        {
          data: data2
        }
      ]
    });
  }, 2100);

  // 在组件挂载时初始化图表
  onMounted(() => {
    myChart = echarts.init(chartDom);
    myChart.setOption(option);

    // 监听窗口大小变化
    window.addEventListener('resize', handleResize);
  });

  // 组件卸载时移除监听
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
  });

  // 调整图表大小
  const handleResize = () => {
    myChart.resize();
  };

  option && myChart.setOption(option);
}

//渲染左侧用户空心饼形图
const cenderLeftBottom = () => {
  var chartDom = document.querySelector('.left .infEchart');
  myChart1 = echarts.init(chartDom);
  var option;

  option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '2%',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
          // color: '#ffffff'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold',

          }
        },
        labelLine: {
          show: false
        },
        data: userData.value
      }
    ]
  };

  option && myChart1.setOption(option);
}

//渲染右上角
const cenderRightTop = () => {
  var chartDom = document.querySelector('.header .right')
  var myChart = echarts.init(chartDom);
  var option;
  // See https://github.com/ecomfe/echarts-stat
  echarts.registerTransform(ecStat.transform.regression);
  const data = [
    [96.24, 11.35],
    [33.09, 85.11],
    [57.6, 36.61],
    [36.77, 27.26],
    [20.1, 6.72],
    [45.53, 36.37],
    [110.07, 80.13],
    [72.05, 20.88],
    [39.82, 37.15],
    [48.05, 70.5],
    [0.85, 2.57],
    [51.66, 63.7],
    [61.07, 127.13],
    [64.54, 33.59],
    [35.5, 25.01],
    [226.55, 664.02],
    [188.6, 175.31],
    [81.31, 108.68]
  ];
  option = {
    dataset: [
      {
        source: data
      },
      {
        transform: {
          type: 'ecStat:regression',
          config: { method: 'polynomial', order: 3 }
        }
      }
    ],
    title: {
      text: '用户使用频率',
      // subtext: 'By ecStat.regression',
      sublink: 'https://github.com/ecomfe/echarts-stat',
      left: 'center',
      top: 16
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    xAxis: {
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      },
      splitNumber: 10
    },
    yAxis: {
      min: -40,
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    series: [
      {
        name: 'scatter',
        type: 'scatter'
      },
      {
        name: 'line',
        type: 'line',
        smooth: true,
        datasetIndex: 1,
        symbolSize: 0.1,
        symbol: 'circle',
        // label: { show: true, fontSize: 16 },
        labelLayout: { dx: -20 },
        encode: { label: 2, tooltip: 1 }
      }
    ]
  };

  option && myChart.setOption(option);
}

//渲染用户信息left
const cenderLeftCenter = () => {
  var chartDom = document.querySelector('.footer .otherDataShow .left');
  var myChart = echarts.init(chartDom);
  var option;

  let base = +new Date(2024, 5, 1);
  let oneDay = 24 * 3600 * 1000;
  let valueBase = Math.random() * 300;
  let valueBase2 = Math.random() * 50;
  let data = [];
  let data2 = [];
  for (var i = 1; i < 10; i++) {
    var now = new Date((base += oneDay));
    var dayStr = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-');
    valueBase = Math.round((Math.random() - 0.5) * 20 + valueBase);
    valueBase <= 0 && (valueBase = Math.random() * 300);
    data.push([dayStr, valueBase]);
    valueBase2 = Math.round((Math.random() - 0.5) * 20 + valueBase2);
    valueBase2 <= 0 && (valueBase2 = Math.random() * 50);
    data2.push([dayStr, valueBase2]);
  }
  option = {
    title: {
      left: 'center',
      text: '标题'
    },
    legend: {
      top: 'bottom',
      data: ['Intention']
    },
    tooltip: {
      triggerOn: 'none',
      position: function (pt) {
        return [pt[0], 130];
      }
    },
    toolbox: {
      left: 'center',
      itemSize: 25,
      top: 55,
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        restore: {}
      },
      show: false
    },
    xAxis: {
      type: 'time',
      axisPointer: {
        value: '2016-10-7',
        snap: true,
        lineStyle: {
          color: '#7581BD',
          width: 2
        },
        label: {
          show: true,
          formatter: function (params) {
            return echarts.format.formatTime('yyyy-MM-dd', params.value);
          },
          backgroundColor: '#7581BD'
        },
        handle: {
          show: true,
          color: '#7581BD'
        }
      },
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      axisTick: {
        inside: true
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        inside: true,
        formatter: '{value}\n'
      },
      z: 10
    },
    grid: {
      top: 110,
      left: 15,
      right: 15,
      height: 160
    },
    dataZoom: [
      {
        type: 'inside',
        throttle: 50
      }
    ],
    series: [
      {
        name: 'Fake Data',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        sampling: 'average',
        itemStyle: {
          color: '#0770FF'
        },
        stack: 'a',
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(58,77,233,0.8)'
            },
            {
              offset: 1,
              color: 'rgba(58,77,233,0.3)'
            }
          ])
        },
        data: data
      },
      {
        name: 'Fake Data',
        type: 'line',
        smooth: true,
        stack: 'a',
        symbol: 'circle',
        symbolSize: 5,
        sampling: 'average',
        itemStyle: {
          color: '#F2597F'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(213,72,120,0.8)'
            },
            {
              offset: 1,
              color: 'rgba(213,72,120,0.3)'
            }
          ])
        },
        data: data2
      }
    ]
  };

  option && myChart.setOption(option);
}

//渲染用户信息right
const cenderRightCenter = () => {
  var chartDom = document.querySelector('.footer .otherDataShow .right')
  var myChart = echarts.init(chartDom);
  var option;
  let base = +new Date(1988, 9, 3);
  let oneDay = 24 * 3600 * 1000;
  let data = [[base, Math.random() * 300]];
  for (let i = 1; i < 20000; i++) {
    let now = new Date((base += oneDay));
    data.push([+now, Math.round((Math.random() - 0.5) * 20 + data[i - 1][1])]);
  }
  option = {
    tooltip: {
      trigger: 'axis',
      position: function (pt) {
        return [pt[0], '10%'];
      }
    },
    title: {
      left: 'center',
      text: '标题'
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        restore: {},
        saveAsImage: {}
      },
      show: false
    },
    xAxis: {
      type: 'time',
      boundaryGap: false
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%']
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 20
      },
      {
        start: 0,
        end: 20
      }
    ],
    series: [
      {
        name: 'Fake Data',
        type: 'line',
        smooth: true,
        symbol: 'none',
        areaStyle: {},
        data: data
      }
    ]
  };

  option && myChart.setOption(option);
}

//时间显示模块
const updataTime = () => {
  const now = new Date()
  currentTimeY.value = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日';
  currentTimeT.value = now.toLocaleTimeString();
}

</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.main {
  width: 100%;
  height: 100%;
  background-color: rgb(76, 84, 241);
  background: url('@/assets/images/bg.jpg') no-repeat;
  background-size: 100% 100%;

  .header {
    // background-color: black;
    // width: 100%;
    height: 50%;
    display: flex;
    justify-content: space-between;

    .left {
      // background-color: white;
      border: dotted 1px white;
      flex: 3;

      .inf {
        height: 50%;
        border: dotted 1px white;
        color: white;


        .year {
          width: 100%;
          height: 50%;
          // text-align: center;
          font-size: 30px;
          display: flex;
          justify-content: center;
          /* 水平居中 */
          align-items: flex-end;
          /* 紧贴底部 */
        }

        .timer {
          width: 100%;
          height: 50%;
          text-align: center;
          font-size: 45px;
        }
      }

      .infEchart {
        height: 50%;
        // border: solid 1px white;
      }
    }

    .center {
      // background-color: blue;
      border: dotted 1px white;
      flex: 5;
      width: 500px;
      height: 420px;
      position: relative;
      // background: url('@/assets/images/bg3.jpg') no-repeat;
      // background-size: 100% 100%;

      // height: 400px;
      // &::before {
      //   position: absolute;
      //   content: '';
      //   width: 10px;
      //   height: 10px;
      //   border-left: solid 1px white;
      //   border-top: solid 1px white;
      // }

      // &::after {
      //   position: absolute;
      //   content: '';
      //   width: 10px;
      //   height: 10px;
      //   border-right: solid 1px white;
      //   border-top: solid 1px white;
      //   top: 0;
      //   right: 0;
      // }

      .left {
        position: absolute;
        width: 15px;
        height: 15px;
        border-left: solid 1px white;
        border-bottom: solid 1px white;
        bottom: 0;
        left: 0;
      }

      .right {
        position: absolute;
        width: 15px;
        height: 15px;
        border-right: solid 1px white;
        border-bottom: solid 1px white;
        bottom: 0;
        right: 0;
      }
    }

    .right {
      // background-color: red;
      border: dotted 1px white;
      flex: 3;
      // background-color: rgb(76, 84, 241);
      background: url('@/assets/images/bg2.jpg') no-repeat;
      background-size: 100% 100%;
    }
  }

  .footer {
    // background-color: green;
    // border: solid 1px white;
    height: 50%;

    .otherDataShow {
      color: white;
      height: 90%;
      padding-top: 50px;
      display: flex;
      justify-content: space-between;

      .left {
        flex: 1;
      }

      .right {
        flex: 1;
      }
    }

    .userInf {
      color: white;
      height: 10%;
      display: flex;
      text-align: center;
      line-height: 100%;

      ul:nth-child(1) {
        display: inline-block;
        text-align: center;
        width: 80px;
        padding-top: 10px;
      }

      ul:nth-child(n+2) {
        display: inline-block;
        width: 22%;
        text-align: left;
        border-left: solid 0.5px;
        border-right: solid 0.5px;
        margin-left: 60px;
        padding-top: 13px;
        padding-left: 5px;
        border-radius: 10%;
      }
    }
  }
}
</style>