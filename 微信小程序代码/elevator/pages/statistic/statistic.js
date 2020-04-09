// pages/statistic/statistic.js
// 1、引入依赖脚本
import * as echarts from '../../dist/ec-canvas/echarts';

let chart = null;

// 2、进行初始化数据
function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    title: {
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      y: 'bottom',
    },
    toolbox: {
      show: false,
    },
    calculable: true,
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['8月', '9月', '10月', '11月', '12月', '1月', '2月', '3月', '4月', '5月', '6月', '7月']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '完成任务数量(天/次)',
        type: 'line',
        smooth: true,
        itemStyle: { normal: { areaStyle: { type: 'default' } } },
        data: [18, 19, 10, 22, 25, 24, 22, 20, 12, 10, 35, 30]
      },
      {
        name: '指派任务数量(天/次)',
        type: 'line',
        smooth: true,
        itemStyle: { normal: { areaStyle: { type: 'default' } } },
        data: [30, 29, 20, 24, 25, 26, 22, 23, 14, 18, 36, 33]
      }
    ]
  };


  chart.setOption(option);
  return chart;
}

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    ec: {
      onInit: initChart // 3、将数据放入到里面
    }
  },

  onReady() {
    setTimeout(function () {
      // 获取 chart 实例的方式
      console.log(chart)
    }, 2000);
  },

  onLoad: function (options) {

  },

})