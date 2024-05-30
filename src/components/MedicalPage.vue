<script setup>
import {onMounted} from 'vue'
import * as echarts from 'echarts';
import {ref} from 'vue';
import herbData from '@/assets/item.json';

var data = [
  {
    name: '心',
    children: [
      {
        name: '神归汤',
        children: [
          {name: '麦东门', value: 27},
          {name: '茯神', value: 27},
          {name: '人参', value: 13},
          {name: '甘草', value: 13},
          {name: '当归', value: 20}
        ]
      },
      {
        name: '安神定志丸',
        children: [
          {name: '茯苓', value: 20},
          {name: '茯神', value: 20},
          {name: '人参', value: 20},
          {name: '远志', value: 20},
          {name: '石菖蒲', value: 10},
          {name: '龙齿', value: 10}
        ]
      },
      {
        name: '补心四物汤',
        children: [
          {name: '酒生地', value: 25},
          {name: '麦门冬', value: 19},
          {name: '当归', value: 19},
          {name: '酒白芍', value: 13},
          {name: '炒枣仁', value: 13},
          {name: '远志', value: 6},
          {name: '甘草', value: 6}
        ]
      }
    ]
  },
  {
    name: '肺',
    children: [
      {
        name: '麻黄杏仁汤',
        children: [
          {name: '杏仁', value: 29},
          {name: '麻黄', value: 14},
          {name: '甘草', value: 29},
          {name: '五味子', value: 29}
        ]
      },
      {
        name: '补肺汤',
        children: [
          {name: '人参', value: 11},
          {name: '黄芪', value: 30},
          {name: '熟地', value: 30},
          {name: '五味子', value: 7},
          {name: '紫菀', value: 11},
          {name: '桑白皮', value: 11}
        ]
      },
      {
        name: '补肺散',
        children: [
          {name: '桑白皮', value: 25},
          {name: '熟地黄', value: 25},
          {name: '人参', value: 12.5},
          {name: '紫菀', value: 12.5},
          {name: '黄芪', value: 12.5},
          {name: '五味子', value: 12.5}
        ]
      }
    ]
  },
  {
    name: '脾',
    children: [
      {
        name: '四君子汤',
        children: [
          {name: '人参', value: 25},
          {name: '白术', value: 25},
          {name: '茯苓', value: 25},
          {name: '甘草灸', value: 25}
        ]
      },
      {
        name: '茯苓五皮散',
        children: [
          {name: '赤苓', value: 14},
          {name: '猪苓', value: 17},
          {name: '泽泻', value: 17},
          {name: '腹皮', value: 17},
          {name: '陈皮', value: 11},
          {name: '桑皮', value: 11},
          {name: '姜皮', value: 11}
        ]
      },
      {
        name: '扶脾散',
        children: [
          {name: '莲肉', value: 25},
          {name: '陈皮', value: 17},
          {name: '白茯苓', value: 17},
          {name: '白术', value: 33},
          {name: '麦芽', value: 8}
        ]
      }
    ]
  },
  {
    name: '肾',
    children: [
      {
        name: '肾四味',
        children: [
          {name: '枸杞子', value: 25},
          {name: '菟丝子', value: 25},
          {name: '仙灵脾', value: 25},
          {name: '补骨脂', value: 25}
        ]
      },
      {
        name: '护肾汤',
        children: [
          {name: '大黄', value: 25},
          {name: '木通', value: 25},
          {name: '生地', value: 25},
          {name: '滑石', value: 12.5},
          {name: '瞿麦', value: 12.5}
        ]
      },
      {
        name: '肺肾两益汤',
        children: [
          {name: '熟地', value: 47},
          {name: '人参', value: 23},
          {name: '麦冬', value: 23},
          {name: '三七根', value: 7}
        ]
      }
    ]
  },
  {
    name: '肝',
    children: [
      {
        name: '大补肝汤',
        children: [
          {name: '桂枝', value: 20},
          {name: '干姜', value: 20},
          {name: '五味子', value: 20},
          {name: '牡丹皮', value: 20},
          {name: '山药', value: 7},
          {name: '旋覆花', value: 7},
          {name: '竹叶', value: 7}
        ]
      },
      {
        name: '泻肝安神汤',
        children: [
          {name: '生珍珠母', value: 32},
          {name: '钩藤', value: 16},
          {name: '丹参', value: 16},
          {name: '夏枯草', value: 16},
          {name: '朱茯神', value: 11},
          {name: '合欢皮', value: 11}
        ]
      },
      {
        name: '补肝养荣汤',
        children: [
          {name: '当归', value: 18},
          {name: '川芎', value: 18},
          {name: '芍药', value: 14},
          {name: '熟地', value: 14},
          {name: '陈皮', value: 14},
          {name: '甘菊花', value: 9},
          {name: '甘草', value: 14}
        ]
      }
    ]
  }
];

const option = {
  color: ['#b1c5c1', '#90aca6', '#769992', '#618981', '#45746a'],
  tooltip: {
    trigger: 'item',
    // eslint-disable-next-line no-unused-vars
    formatter: function (params, ticket, callback) {
      if (params.name) {
        if (params.value < 90) {
          return params.name + ' ' + params.value + '%';
        } else {
          return params.name;
        }
      } else {
        return '返回上一级';
      }
    }
  },
  series: {
    type: 'sunburst',
    data: data,
    avoidLabelOverlap: false,
    levels: [
      {
        radius: ['0%', '5%'],
        itemStyle: {
          color: '#d3dedc',
        },
      },
      {
        radius: ['10%', '30%'],
      },
      {
        radius: ['30%', '70%'],
      },
      {
        radius: ['70%', '73%'],
        label: {
          position: 'outside',
          padding: 3,
          silent: false
        },
      },
    ],
    label: {
      minAngle: 12,
      show: true,
    },
    labelLine: {
      show: false,
    },
    emphasis: {
      label: {
        show: true,
      }
    },
    itemStyle: {
      borderRadius: 7,
      borderWidth: 2,
    },
  }
};

const QIoptions = ref([
  {value: '寒', label: '寒'},
  {value: '热', label: '热'},
  {value: '温', label: '温'},
  {value: '凉', label: '凉'},
  {value: '平', label: '平'},
]);
const WEIoptions = ref([
  {value: '苦', label: '苦'},
  {value: '辛', label: '辛'},
  {value: '甘', label: '甘'},
  {value: '酸', label: '酸'},
  {value: '咸', label: '咸'},
]);
const ZANGoptions = ref([
  {value: '心', label: '心经'},
  {value: '肺', label: '肺经'},
  {value: '肝', label: '肝经'},
  {value: '脾', label: '脾经'},
  {value: '肾', label: '肾经'},
  {value: '胃', label: '胃经'},
  {value: '胆', label: '胆经'},
  {value: '小肠', label: '小肠经'},
  {value: '大肠', label: '大肠经'},
  {value: '膀胱', label: '膀胱经'},
  {value: '三焦', label: '三焦经'},
  {value: '心包', label: '心包经'},
]);
const QIvalue = ref([]);
const WEIvalue = ref([]);
const ZANGvalue = ref([]);
const NAMEvalue = ref('');
const columns = ref([
  {
    title: '药材名称',
    dataIndex: 'name',
    key: 'name',
    resizable: true,
    width: 70,
  },
  {
    title: '四气所属',
    dataIndex: 'qi',
    key: 'qi',
    resizable: true,
    width: 70,
  },
  {
    title: '五味所属',
    dataIndex: 'flavors',
    key: 'flavors',
    resizable: true,
    width: 70,
  },
  {
    title: '相关经脉',
    dataIndex: 'meridians',
    key: 'meridians',
    resizable: true,

  },
]);

const autoComplete = ref([]);

const completeFull = herbData.map(herb => ({
  value: herb.name,
  text: herb.name,
}));

function reSizeForm (check) {
  if (check >= 1230){
    columns.value[0].width = 200;
    columns.value[1].width = 200;
    columns.value[2].width = 200;
  } else if (check >= 992){
    columns.value[0].width = 110;
    columns.value[1].width = 70;
    columns.value[2].width = 110;
  } else if (check >= 740){
    columns.value[0].width = 170;
    columns.value[1].width = 130;
    columns.value[2].width = 170;
  } else if (check >= 520){
    columns.value[0].width = 110;
    columns.value[1].width = 70;
    columns.value[2].width = 110;
  } else if (check >= 450){
    columns.value[0].width = 70;
    columns.value[1].width = 70;
    columns.value[2].width = 110;
  } else {
    columns.value[0].width = 70;
    columns.value[1].width = 70;
    columns.value[2].width = 70;
  }
}

onMounted(() => {
  reSizeForm(document.body.clientWidth);
  var MedicChart = echarts.init(document.getElementById('medicDOM'));
  MedicChart.setOption(option);
  window.onresize = function () {
    MedicChart.resize();
    MedicChart.setOption(option, true);
    reSizeForm(document.body.clientWidth);
  };
})

function onSearchAuto(value) {
  if (value === '') {
    autoComplete.value = [];
  } else {
    autoComplete.value = completeFull.filter(item => item.value.includes(value));
  }
}

const searchResult = ref([]);

function searchData() {
  searchResult.value = herbData.filter(herb => {
    const matchQi = !QIvalue.value.length || QIvalue.value.includes(herb.qi);
    const matchWei = !WEIvalue.value.length || WEIvalue.value.some(wei => herb.flavors.includes(wei));
    const matchZang = !ZANGvalue.value.length || ZANGvalue.value.some(zang => herb.meridians.includes(zang));
    const matchName = !NAMEvalue.value || herb.name.includes(NAMEvalue.value);
    return matchQi && matchWei && matchZang && matchName;
  });
}

function handleResizeColumn(w, col) {
  col.width = w;
}
</script>
<template>
  <div id="medic-container">
    <a-typography-title :level="2" style="margin-top: 60px;">药方简览</a-typography-title>
    <a-typography-paragraph>
      中药药方种类繁多，下面挑选一些进行展示。
    </a-typography-paragraph>
    <div id="medic-view">
      <div style="width:100%;height:400px;" id="medicDOM"></div>
    </div>
    <a-typography-title :level="2">药材速查</a-typography-title>
    <a-typography-paragraph>
      中药具有多项特性，下方可根据特性查找药材。
    </a-typography-paragraph>
    <a-typography-paragraph>
      <a-form layout="inline">
        <a-form-item label="四气">
          <a-select
              class="search-unit"
              showSearch
              showArrow
              allowClear
              :options="QIoptions"
              v-model:value="QIvalue"
              mode="multiple"
              placeholder="选择药材所属四气"
          >
            <template #tagRender="{ label, closable, onClose }">
              <a-tag :closable="closable" style="margin-right: 3px" @close="onClose" color="green">
                {{ label }}
              </a-tag>
            </template>
          </a-select>
        </a-form-item>
        <a-form-item label="五味">
          <a-select
              class="search-unit"
              showSearch
              showArrow
              allowClear
              :options="WEIoptions"
              v-model:value="WEIvalue"
              mode="multiple"
              placeholder="选择药材所属五味"
          >
            <template #tagRender="{ label, closable, onClose }">
              <a-tag :closable="closable" style="margin-right: 3px" @close="onClose" color="green">
                {{ label }}
              </a-tag>
            </template>
          </a-select>
        </a-form-item>
        <a-form-item label="经脉">
          <a-select
              class="search-unit"
              showSearch
              showArrow
              allowClear
              :options="ZANGoptions"
              v-model:value="ZANGvalue"
              :maxTagCount="3"
              mode="multiple"
              placeholder="选择药材相关经脉"
          >
            <template #tagRender="{ label, closable, onClose }">
              <a-tag :closable="closable" style="margin-right: 3px" @close="onClose" color="green">
                {{ label }}
              </a-tag>
            </template>
          </a-select>
        </a-form-item>
        <a-form-item label="药名">
          <a-auto-complete
              class="search-unit"
              v-model:value="NAMEvalue"
              :options="autoComplete"
              @search="onSearchAuto"
              placeholder="可输入药材部分名称"
          />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="searchData">查找</a-button>
        </a-form-item>
      </a-form>
    </a-typography-paragraph>
    <a-typography-paragraph>
      <a-table :columns="columns" :data-source="searchResult" rowKey="name" :scroll="{ y: 600 }" @resizeColumn="handleResizeColumn">
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'name'">
            <a class="result-a" :href="'https://baike.baidu.com/search?enc=utf8&pn=0&rn=0&word=' + record.name" target="_blank">
              {{ record.name }}
            </a>
          </template>
          <template v-else-if="column.dataIndex === 'qi'">
        <span>
            {{ record.qi }}
        </span>
          </template>
          <template v-else-if="column.dataIndex === 'flavors'">
        <span>
          <a-tag v-for="flavor in record.flavors" color="green" :key="flavor">
            {{ flavor }}
          </a-tag>
        </span>
          </template>
          <template v-else-if="column.dataIndex === 'meridians'">
        <span>
          <a-tag v-for="meridian in record.meridians" color="green" :key="meridian">
            {{ meridian }}经
          </a-tag>
        </span>
          </template>
        </template>
      </a-table>
    </a-typography-paragraph>
  </div>
</template>
<style>
.ant-select-multiple .ant-select-selection-item {
  height: 21.333px !important;
  color: #45746a !important;
  background: #f2fffd !important;
  border-color: #45746a !important;
}

.ant-select-item-option-selected {
  background-color: #e8f4f2 !important;
}

.result-a {
  color: #45746a !important;
}

.result-a:hover {
  color: #90aca6 !important;
}

.ant-tag-green {
  color: #45746a !important;
  background: #f2fffd !important;
  border-color: #45746a !important;
}

.ant-form-item {
  margin-bottom: 20px !important;
}

.search-unit {
  min-width: 200px;
  max-width: 100%;
}

#medic-container {
  width: 100%;
  padding: 0 200px;

  @media screen and (max-width: 992px) {
    padding: 0 20px;
  }
}

#medic-view {
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 40px 0 40px 0;
}
</style>