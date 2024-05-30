<script setup>
import { onMounted } from 'vue'
import * as echarts from 'echarts';

// prettier-ignore
const months = [
  '1', '2', '3', '4', '5', '6', '7',
  '8', '9', '10', '11', '12'
];
// prettier-ignore
const years = [
  '2014', '2015', '2016', '2017', '2018',
  '2019', '2020', '2021', '2022', '2023'
];
// prettier-ignore
const data = [
  [0, 0, 25.4], [0, 1, 26.8], [0, 2, 25.7], [0, 3, 23.8], [0, 4, 26.1], [0, 5, 30.8], [0, 6, 27.2], [0, 7, 24.6], [0, 8, 29], [0, 9, 28.8], [0, 10, 29.6], [0, 11, 33.3],
  [1, 0, 27.2], [1, 1, 23.8], [1, 2, 28.1], [1, 3, 29.9], [1, 4, 26.9], [1, 5, 30.1], [1, 6, 29.5], [1, 7, 23.3], [1, 8, 27], [1, 9, 26.5], [1, 10, 30.4], [1, 11, 33.2],
  [2, 0, 25.4], [2, 1, 25.2], [2, 2, 30.6], [2, 3, 28.4], [2, 4, 29.2], [2, 5, 33.2], [2, 6, 29], [2, 7, 28.6], [2, 8, 30.5], [2, 9, 29.6], [2, 10, 32.8], [2, 11, 36.3],
  [3, 0, 31.3], [3, 1, 30], [3, 2, 35], [3, 3, 31.8], [3, 4, 31.9], [3, 5, 36.2], [3, 6, 31.1], [3, 7, 30.2], [3, 8, 31.9], [3, 9, 30.6], [3, 10, 32.3], [3, 11, 36.4],
  [4, 0, 24], [4, 1, 26.5], [4, 2, 27.5], [4, 3, 26.5], [4, 4, 27.8], [4, 5, 27.6], [4, 6, 23.4], [4, 7, 21.2], [4, 8, 23.3], [4, 9, 22.2], [4, 10, 23.3], [4, 11, 26.7],
  [5, 0, 20], [5, 1, 22.6], [5, 2, 24.5], [5, 3, 25.6], [5, 4, 26.2], [5, 5, 28.4], [5, 6, 20.5], [5, 7, 18.4], [5, 8, 20.1], [5, 9, 20.3], [5, 10, 22], [5, 11, 23.8],
  [6, 0, 12.9], [6, 1, 16], [6, 2, 18.6], [6, 3, 18], [6, 4, 18.1], [6, 5, 21.4], [6, 6, 16.9], [6, 7, 16.2], [6, 8, 18.8], [6, 9, 19.1], [6, 10, 22.5], [6, 11, 26.1],
  [7, 0, 13.5], [7, 1, 19.2], [7, 2, 20.9], [7, 3, 19.5], [7, 4, 18.2], [7, 5, 20.8], [7, 6, 17.7], [7, 7, 18.2], [7, 8, 20.2], [7, 9, 20.3], [7, 10, 23.2], [7, 11, 24.6],
  [8, 0, 23.7], [8, 1, 24.4], [8, 2, 21.5], [8, 3, 18.5], [8, 4, 20.4], [8, 5, 21.2], [8, 6, 18.5], [8, 7, 16.7], [8, 8, 19.1], [8, 9, 19.9], [8, 10, 22.4], [8, 11, 26.4],
  [9, 0, 19], [9, 1, 21.4], [9, 2, 22.7], [9, 3, 18.4], [9, 4, 17.2], [9, 5, 18.4], [9, 6, 15.4], [9, 7, 14.4], [9, 8, 17.5], [9, 9, 17.6], [9, 10, 19.1], [9, 11, 21.4]
].map(function (item) {
  return [item[1], item[0], item[2] || '-'];
});

var option = {
  tooltip: {
    position: 'top',
    // eslint-disable-next-line no-unused-vars
    formatter: function (params, ticket, callback) {
      return (params.value[1] + 2014) + " 年 " +params.name + ' 月<br>' + params.value[2] + ' 万吨';
    }
  },
  grid: {
    height: '80%',
    top: '0%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: months,
    splitArea: {
      show: true
    }
  },
  yAxis: {
    type: 'category',
    data: years,
    splitArea: {
      show: true
    }
  },
  visualMap: {
    min: 12.9,
    max: 36.4,
    itemHeight: 1000,
    precision: 1,
    calculable: true,
    inRange: {
      color: ['#d3dedc', '#45746a'],
    },
    orient: 'horizontal',
    left: 'center',
    bottom: '0%'
  },
  series: [
    {
      name: '每月数据',
      type: 'heatmap',
      data: data,
      label: {
        show: true,
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};


onMounted(() => {
  option.series[0].label.show = document.body.clientWidth >= 768;
  option.visualMap.itemHeight = document.getElementById('HistoryDOM').offsetWidth - 80;
  var HisChart = echarts.init(document.getElementById('HistoryDOM'));
  HisChart.setOption(option);
  window.onresize = function() {
    HisChart.resize();
    option.series[0].label.show = document.body.clientWidth >= 768;
    option.visualMap.itemHeight = document.getElementById('HistoryDOM').offsetWidth - 80;
    HisChart.setOption(option,true);
  };
})
</script>
<template>
  <div id="history-container">
    <a-typography-title :level="2" style="margin-top: 60px;">当代发展</a-typography-title>
    <a-typography-paragraph>
      中医药学在当代发展鼎盛，下图为 2014-2023 年中成药产量当月数据（万吨）。
    </a-typography-paragraph>
    <div id="history-view"><div style="width:100%;height:400px;" id="HistoryDOM"></div></div>
    <a-typography-title :level="2">历史传承</a-typography-title>
    <a-typography-paragraph>
      中医药学博大精深，历史传承非常悠久。
    </a-typography-paragraph>
    <a-timeline style="margin-top: 40px;" mode="alternate">
      <a-timeline-item>
        <p class="time-view">远古时代</p>
        <p>“神农尝百草”</p>
        <p>“药食同源”</p>
      </a-timeline-item>
      <a-timeline-item>
        <p class="time-view">夏代</p>
        <p>酒</p>
      </a-timeline-item>
      <a-timeline-item>
        <p class="time-view">商代</p>
        <p>汤液</p>
      </a-timeline-item>
      <a-timeline-item>
        <p class="time-view">西周时期</p>
        <p>食医</p>
        <p>疾医</p>
        <p>疡医</p>
        <p>兽医</p>
      </a-timeline-item>
      <a-timeline-item>
        <p class="time-view">春秋战国</p>
        <p>“望、闻、问、切”四诊合参</p>
      </a-timeline-item>
      <a-timeline-item>
        <p class="time-view">秦汉时期</p>
        <p>《黄帝内经》</p>
        <p>《伤寒杂病论》</p>
        <p>《神农本草经》</p>
      </a-timeline-item>
      <a-timeline-item>
        <p class="time-view">东汉末年</p>
        <p>麻醉剂“麻沸散”</p>
      </a-timeline-item>
      <a-timeline-item>
        <p class="time-view">西晋时期</p>
        <p>《针灸甲乙经》</p>
      </a-timeline-item>
      <a-timeline-item>
        <p class="time-view">隋唐</p>
        <p>“大医精诚”</p>
        <p>《诸病源候论》</p>
        <p>《新修本草》</p>
        <p>《备急千金要方》</p>
        <p>《千金翼方》</p>
        <p>《外台秘要》</p>
      </a-timeline-item>
      <a-timeline-item>
        <p class="time-view">两宋</p>
        <p>《妇人良方大全》</p>
        <p>《小儿药证直诀》</p>
        <p>《洗冤录》</p>
        <p>《开宝本草》</p>
        <p>《嘉佑本草》</p>
        <p>《本草图经》</p>
      </a-timeline-item>
      <a-timeline-item>
        <p class="time-view">明清</p>
        <p>《本草纲目》</p>
        <p>《本草品汇精要》</p>
        <p>《温热论》</p>
      </a-timeline-item>
      <a-timeline-item>
        <p class="time-view">民国时期</p>
        <p>西方医学的传入</p>
      </a-timeline-item>
      <a-timeline-item>
        <p class="time-view">现代</p>
        <p>集大成的中医药学</p>
      </a-timeline-item>
    </a-timeline>
  </div>
</template>
<style>
.time-view {
  font-weight: bold;
}

#history-container {
  width: 100%;
  padding: 0 200px;

  @media screen and (max-width: 992px) {
    padding: 0 20px;
  }
}

#history-view {
  display: flex;
  width: 100%;
  justify-content:center;
  margin: 40px 0 40px 0;
}
</style>