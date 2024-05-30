<script setup>
import { onMounted } from 'vue'
import * as echarts from 'echarts';
import chinaMap from '@/assets/china.json';

const wordData = {
  "name": "中药术语",
  "value": "中药术语",
  "children": [
    {
      "name": "中药用法",
      "value": "中药用法",
      "children": [
        { "name": "噙化", "value": "噙化" },
        { "name": "冲服", "value": "冲服" },
        { "name": "兑服", "value": "兑服" },
        { "name": "烊化", "value": "烊化" },
        { "name": "泡服", "value": "泡服" },
        { "name": "温服", "value": "温服" },
        { "name": "冷服", "value": "冷服" },
        { "name": "热服", "value": "热服" },
        { "name": "分服", "value": "分服" },
        { "name": "频服", "value": "频服" },
        { "name": "顿服", "value": "顿服" },
        { "name": "临睡服", "value": "临睡服" },
        { "name": "饭后服", "value": "饭后服" },
        { "name": "饭前服", "value": "饭前服" },
        { "name": "空腹服", "value": "空腹服" },
        {
          "name": "煎药法",
          "value": "煎药法",
          "children": [
            { "name": "煎汤代水", "value": "煎汤代水" },
            { "name": "包煎", "value": "包煎" },
            { "name": "另煎", "value": "另煎" },
            { "name": "后下", "value": "后下" },
            { "name": "先煎", "value": "先煎" }
          ]
        }
      ]
    },
    {
      "name": "用药禁忌",
      "value": "用药禁忌",
      "children": [
        { "name": "忌口", "value": "忌口" },
        { "name": "服药食忌", "value": "服药食忌" },
        { "name": "妊娠禁忌", "value": "妊娠禁忌" },
        { "name": "证候禁忌", "value": "证候禁忌" },
        { "name": "配伍禁忌", "value": "配伍禁忌" }
      ]
    },
    {
      "name": "中药配伍",
      "value": "中药配伍",
      "children": [
        { "name": "配伍", "value": "配伍" },
        {
          "name": "七情",
          "value": "七情",
          "children": [
            { "name": "单行", "value": "单行" },
            { "name": "相须", "value": "相须" },
            { "name": "相使", "value": "相使" },
            { "name": "相畏", "value": "相畏" },
            { "name": "相杀", "value": "相杀" },
            { "name": "相恶", "value": "相恶" },
            { "name": "相反", "value": "相反" }
          ]
        },
        { "name": "药对", "value": "药对" }
      ]
    },
    {
      "name": "中药功效",
      "value": "中药功效"
    },
    {
      "name": "中药性能",
      "value": "中药性能",
      "children": [
        { "name": "药性", "value": "药性" },
        { "name": "气味", "value": "气味" },
        { "name": "性味", "value": "性味" },
        {
          "name": "五味四气",
          "value": "五味四气",
          "children": [
            { "name": "寒", "value": "寒" },
            { "name": "热", "value": "热" },
            { "name": "温", "value": "温" },
            { "name": "凉", "value": "凉" },
            { "name": "平", "value": "平" }
          ]
        },
        { "name": "归经", "value": "归经" },
        { "name": "升降浮沉", "value": "升降浮沉" }
      ]
    },
    {
      "name": "中药炮制",
      "value": "中药炮制"
    },
    {
      "name": "中药鉴定",
      "value": "中药鉴定",
      "children": [
        { "name": "来源鉴定法", "value": "来源鉴定法" },
        { "name": "性状鉴定法", "value": "性状鉴定法" },
        {
          "name": "基原鉴定法",
          "value": "基原鉴定法",
          "children": [
            { "name": "原植物鉴定", "value": "原植物鉴定" },
            { "name": "原动物鉴定", "value": "原动物鉴定" },
            { "name": "原矿物鉴定", "value": "原矿物鉴定" }
          ]
        },
        { "name": "显微鉴定法", "value": "显微鉴定法" },
        { "name": "理化鉴定法", "value": "理化鉴定法" },
        { "name": "生物鉴定法", "value": "生物鉴定法" }
      ]
    },
    {
      "name": "中药贮藏",
      "value": "中药贮藏"
    },
    {
      "name": "中药采集",
      "value": "中药采集",
      "children": [
        { "name": "药用部位", "value": "药用部位" },
        {
          "name": "采收期",
          "value": "采收期",
          "children": [
            { "name": "萌发期", "value": "萌发期" },
            { "name": "枯萎期", "value": "枯萎期" }
          ]
        },
        { "name": "采收方法", "value": "采收方法" }
      ]
    },
    {
      "name": "一般概念",
      "value": "一般概念"
    }
  ]
}

var wordOption = {
  tooltip: {
    trigger: 'item',
    // eslint-disable-next-line no-unused-vars
    formatter: function (params, ticket, callback) {
      console.log(params.treeAncestors);
      return params.treeAncestors.slice(1).map(function(ancestor) {
        return ancestor.name;
      }).join(' > ');
    }
  },
  series: [
    {
      type: 'tree',
      data: [wordData],
      left: '20%',
      right: '20%',
      layout: 'radial',
      symbol: 'emptyCircle',
      itemStyle: {
        color: '#45746a',
      },
      symbolSize: 7,
      initialTreeDepth: 3,
      animationDurationUpdate: 750,
      emphasis: {
        focus: 'descendant'
      }
    }
  ]
};

var Areadata = [
  { name: '河北省', value: 1716 },
  { name: '山西省', value: 1788 },
  { name: '辽宁省', value: 1269 },
  { name: '吉林省', value: 1564 },
  { name: '黑龙江省', value: 1500 },
  { name: '江苏省', value: 2289 },
  { name: '浙江省', value: 2400 },
  { name: '安徽省', value: 3578 },
  { name: '福建省', value: 4309 },
  { name: '江西省', value: 2051 },
  { name: '山东省', value: 1537 },
  { name: '河南省', value: 3050 },
  { name: '湖北省', value: 4457 },
  { name: '湖南省', value: 4667 },
  { name: '广东省', value: 4692 },
  { name: '海南省', value: 2402 },
  { name: '四川省', value: 7290 },
  { name: '贵州省', value: 7317 },
  { name: '云南省', value: 8875 },
  { name: '陕西省', value: 3291 },
  { name: '甘肃省', value: 3135 },
  { name: '青海省', value: 1340 },
  { name: '台湾省', value: 1800 },
  { name: '内蒙古自治区', value: 1300 },
  { name: '广西壮族自治区', value: 7506 },
  { name: '西藏自治区', value: 2300 },
  { name: '宁夏回族自治区', value: 610 },
  { name: '新疆维吾尔自治区', value: 1917 },
  { name: '北京市', value: 600 },
  { name: '天津市', value: 728 },
  { name: '上海市', value: 610 },
  { name: '重庆市', value: 4096 }
];

Areadata.sort(function (a, b) {
  return a.value - b.value;
});

const mapOption = {
  tooltip: {
    trigger: 'item',
    // eslint-disable-next-line no-unused-vars
    formatter: function (params, ticket, callback) {
      if (params.value) {
        return params.name + '<br>' + params.value + ' 种';
      } else {
        return params.name + '<br>暂无数据';
      }
    }
  },
  visualMap: {
    left: 'right',
    top: 'middle',
    min: 600,
    max: 8875,
    itemHeight: 100,
    inRange: {
      color: ['#d3dedc', '#45746a']
    },
    calculable: true
  },
  animationDurationUpdate: 1000,
  series: [
    {
      id: 'population',
      type: 'map',
      map: 'China',
      roam: false,
      universalTransition: true,
      data: Areadata,
      emphasis: {
        itemStyle : {
          areaColor: '#fff',
          borderColor: '#45746a',
          borderWidth: 2,
        },
        label: {
          show: true,
          backgroundColor: '#fff',
        }
      },
      select: {
        disabled: true,
      },
    }
  ]
};

const barOption = {
  tooltip: {
    trigger: 'item',
    // eslint-disable-next-line no-unused-vars
    formatter: function (params, ticket, callback) {
      return params.name + '<br>' + params.value + ' 种';
    }
  },
  visualMap: {
    left: 'right',
    top: 'middle',
    min: 600,
    max: 8875,
    itemHeight: 100,
    inRange: {
      color: ['#d3dedc', '#45746a']
    },
    calculable: true,
    dimension: 0
  },
  xAxis: {
    type: 'value'
  },
  yAxis: {
    type: 'category',
    axisLabel: {
      show: false,
      rotate: 30
    },
    data: Areadata.map(function (item) {
      return item.name;
    })
  },
  grid: {
    containLabel: true
  },
  animationDurationUpdate: 1000,
  series: {
    type: 'bar',
    id: 'population',
    emphasis: {
      itemStyle : {
        color: '#fff',
        borderColor: '#45746a',
        borderWidth: 2,
      },
      label: {
        show: true,
      }
    },
    select: {
      disabled: true,
    },
    data: Areadata.map(function (item) {
      return item.value;
    }),
    universalTransition: true
  }
};

var currentOption = mapOption;

onMounted(() => {
  echarts.registerMap('China', chinaMap);
  barOption.yAxis.axisLabel.show = document.body.clientWidth >= 768;
  if(document.body.clientWidth >= 768){
    wordOption.series[0].initialTreeDepth = 3;
  } else {
    wordOption.series[0].initialTreeDepth = 1;
  }
  barOption.visualMap.itemHeight = document.getElementById('introAreaDOM').offsetHeight * 0.6;
  mapOption.visualMap.itemHeight = document.getElementById('introAreaDOM').offsetHeight * 0.6;
  var IntroChart = echarts.init(document.getElementById('introDOM'));
  IntroChart.setOption(wordOption);
  var IntroAreaChart = echarts.init(document.getElementById('introAreaDOM'));
  IntroAreaChart.setOption(currentOption);
  document.getElementById('switch').addEventListener('click', ()=>{
    currentOption = currentOption === mapOption ? barOption : mapOption;
    IntroAreaChart.setOption(currentOption,true);
  });
  window.onresize = function() {
    IntroChart.resize();
    IntroAreaChart.resize();
    barOption.yAxis.axisLabel.show = document.body.clientWidth >= 768;
    barOption.visualMap.itemHeight = document.getElementById('introAreaDOM').offsetHeight * 0.6;
    mapOption.visualMap.itemHeight = document.getElementById('introAreaDOM').offsetHeight * 0.6;
    if(document.body.clientWidth >= 768){
      wordOption.series[0].initialTreeDepth = 3;
    } else {
      wordOption.series[0].initialTreeDepth = 1;
    }
    IntroChart.setOption(wordOption,true);
    IntroAreaChart.setOption(currentOption,true);
  };
})
</script>
<template>
  <div id="intro-container">
    <a-typography-title :level="2" style="margin-top: 60px;">地区分布</a-typography-title>
    <a-typography-paragraph>
      中药材在我国各省市都有分布，以下是具体分布情况。
    </a-typography-paragraph>
    <div class="intro-view" style="position: relative;"><a-button id="switch">切换视图</a-button><div style="width:100%;height:min(100vh,100vw);" id="introAreaDOM"></div></div>
    <a-typography-title :level="2">经典术语</a-typography-title>
    <a-typography-paragraph>
      关于中医药学的术语很多，以下是常见术语。
    </a-typography-paragraph>
    <div class="intro-view"><div style="width:100%;height:min(100vh,100vw);" id="introDOM"></div></div>
  </div>
</template>
<style>
#switch {
  position: absolute;
  top: 12%;
  right: 0;
  z-index: 99;
  @media screen and (max-width: 768px) {
    top: 0;
  }
}

#intro-container {
  width: 100%;
  padding: 0 200px;

  @media screen and (max-width: 992px) {
    padding: 0 20px;
  }
}

.intro-view {
  display: flex;
  width: 100%;
  justify-content:center;
  margin: 40px 0 40px 0;
}
</style>