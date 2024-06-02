<script setup>
import {h, ref} from 'vue';
import {onMounted} from 'vue';
import genshinItem from '@/assets/genshin-item.json';
import {Modal, message, notification} from "ant-design-vue";
import * as echarts from 'echarts';

const goodColor = 'green';
const badColor = 'red';

let wishResultsShow = {
  characterWish: {
    "4": [],
    "5": [],
  },
  weaponWish: {
    "4": [],
    "5": [],
  },
  standardWish: {
    "4": [],
    "5": [],
  },
};
let characterWishChart;
let weaponWishChart;
let standardWishChart;

const detailColumns = [
  {
    dataIndex: 'name',
    title: '物品名称',
    width: 100
  },
  {
    dataIndex: 'level',
    title: '星级',
    width: 100
  },
  {
    dataIndex: 'class',
    title: '级别',
    width: 100
  },
  {
    dataIndex: 'type',
    title: '类别',
    width: 100
  },
];

const historyColumns = [
  {
    dataIndex: 'name',
    title: '物品名称',
    width: 100
  },
  {
    dataIndex: 'level',
    title: '星级',
    width: 100
  },
  {
    dataIndex: 'class',
    title: '级别',
    width: 100
  },
  {
    dataIndex: 'type',
    title: '类别',
    width: 100
  },
  {
    dataIndex: 'last',
    title: '上个同星物品',
    width: 100
  },
  {
    dataIndex: 'lastLimited',
    title: '上个同级物品',
    width: 100
  }
];

const detailData = ref([]);

const historyData = ref([]);

const detailTitle = ref('');

const defaultCounters = {
  characterWish: {
    fourStarCounter: 1,
    fiveStarCounter: 1,
    fourStarLimitedCounter: 1,
    fiveStarLimitedCounter: 1,
    fourStarCharacterCounter: 1,
    fourStarWeaponCounter: 1,
    lastfourStarUP: true,
    lastfiveStarUP: true,
  },
  weaponWish: {
    fourStarCounter: 1,
    fiveStarCounter: 1,
    fourStarLimitedCounter: 1,
    fiveStarLimitedCounter: 1,
    fiveStarDesiredCounter: 1,
    fourStarCharacterCounter: 1,
    fourStarWeaponCounter: 1,
    lastfourStarUP: true,
    lastfiveStarUP: true,
    desiredValue: 0,
    isPinned: 'yes'
  },
  standardWish: {
    fourStarCounter: 1,
    fiveStarCounter: 1,
    fourStarCharacterCounter: 1,
    fourStarWeaponCounter: 1,
    fiveStarCharacterCounter: 1,
    fiveStarWeaponCounter: 1
  }
};

const wishCounters = ref({
  characterWish: {
    fourStarCounter: 1,
    fiveStarCounter: 1,
    fourStarLimitedCounter: 1,
    fiveStarLimitedCounter: 1,
    fourStarCharacterCounter: 1,
    fourStarWeaponCounter: 1,
    lastfourStarUP: true,
    lastfiveStarUP: true,
  },
  weaponWish: {
    fourStarCounter: 1,
    fiveStarCounter: 1,
    fourStarLimitedCounter: 1,
    fiveStarLimitedCounter: 1,
    fiveStarDesiredCounter: 1,
    fourStarCharacterCounter: 1,
    fourStarWeaponCounter: 1,
    lastfourStarUP: true,
    lastfiveStarUP: true,
    desiredValue: 0,
    isPinned: 'yes'
  },
  standardWish: {
    fourStarCounter: 1,
    fiveStarCounter: 1,
    fourStarCharacterCounter: 1,
    fourStarWeaponCounter: 1,
    fiveStarCharacterCounter: 1,
    fiveStarWeaponCounter: 1
  }
});

const defaultStatistics = {
  characterWish: {
    recordIndex: 1,
    fiveStarAverage: 0.0,
    fiveStarNumber: 0,
    fiveStarLimitedAverage: 0.0,
    fiveStarLimitedRatio: 0.0,
    fiveStarLimitedNumber: 0,
    fiveStarNotGuaranteedRatio: 0.0,
    fiveStarGuaranteedCheck: 0,
    fiveStarNotGuaranteedNumber: 0,
    fourStarAverage: 0.0,
    fourStarNumber: 0,
    fourStarLimitedAverage: 0.0,
    fourStarLimitedRatio: 0.0,
    fourStarLimitedNumber: 0,
    fourStarNotGuaranteedRatio: 0.0,
    fourStarGuaranteedCheck: 0,
    fourStarNotGuaranteedNumber: 0,
  },
  weaponWish: {
    recordIndex: 1,
    fiveStarAverage: 0.0,
    fiveStarNumber: 0,
    fiveStarLimitedAverage: 0.0,
    fiveStarLimitedRatio: 0.0,
    fiveStarLimitedNumber: 0,
    fiveStarNotGuaranteedRatio: 0.0,
    fiveStarGuaranteedCheck: 0,
    fiveStarNotGuaranteedNumber: 0,
    fiveStarFullDesiredRatio: 0.0,
    fiveStarFullDesiredNumber: 0,
    fiveStarDesiredAverage: 0.0,
    fiveStarDesiredNumber: 0,
    fiveStarPinnedNumber: 0,
    fiveStarDesiredValueAverage: 0.0,
    fiveStarLimitedValueAverage: 0.0,
    fiveStarPinnedLimitedNumber: 0,
    fourStarAverage: 0.0,
    fourStarNumber: 0,
    fourStarLimitedAverage: 0.0,
    fourStarLimitedRatio: 0.0,
    fourStarLimitedNumber: 0,
    fourStarNotGuaranteedRatio: 0.0,
    fourStarGuaranteedCheck: 0,
    fourStarNotGuaranteedNumber: 0,
  },
  standardWish: {
    recordIndex: 1,
    fiveStarAverage: 0.0,
    fiveStarNumber: 0,
    fiveStarCharacterRatio: 0.0,
    fiveStarCharacterNumber: 0,
    fiveStarWeaponRatio: 0.0,
    fourStarAverage: 0.0,
    fourStarNumber: 0,
    fourStarCharacterRatio: 0.0,
    fourStarCharacterNumber: 0,
    fourStarWeaponRatio: 0.0,
  }
};

const wishStatistics = ref({
  characterWish: {
    recordIndex: 1,
    fiveStarAverage: 0.0,
    fiveStarNumber: 0,
    fiveStarLimitedAverage: 0.0,
    fiveStarLimitedRatio: 0.0,
    fiveStarLimitedNumber: 0,
    fiveStarNotGuaranteedRatio: 0.0,
    fiveStarGuaranteedCheck: 0,
    fiveStarNotGuaranteedNumber: 0,
    fourStarAverage: 0.0,
    fourStarNumber: 0,
    fourStarLimitedAverage: 0.0,
    fourStarLimitedRatio: 0.0,
    fourStarLimitedNumber: 0,
    fourStarNotGuaranteedRatio: 0.0,
    fourStarGuaranteedCheck: 0,
    fourStarNotGuaranteedNumber: 0,
  },
  weaponWish: {
    recordIndex: 1,
    fiveStarAverage: 0.0,
    fiveStarNumber: 0,
    fiveStarLimitedAverage: 0.0,
    fiveStarLimitedRatio: 0.0,
    fiveStarLimitedNumber: 0,
    fiveStarNotGuaranteedRatio: 0.0,
    fiveStarGuaranteedCheck: 0,
    fiveStarNotGuaranteedNumber: 0,
    fiveStarFullDesiredRatio: 0.0,
    fiveStarFullDesiredNumber: 0,
    fiveStarDesiredAverage: 0.0,
    fiveStarDesiredNumber: 0,
    fiveStarPinnedNumber: 0,
    fiveStarDesiredValueAverage: 0.0,
    fiveStarLimitedValueAverage: 0.0,
    fiveStarPinnedLimitedNumber: 0,
    fourStarAverage: 0.0,
    fourStarNumber: 0,
    fourStarLimitedAverage: 0.0,
    fourStarLimitedRatio: 0.0,
    fourStarLimitedNumber: 0,
    fourStarNotGuaranteedRatio: 0.0,
    fourStarGuaranteedCheck: 0,
    fourStarNotGuaranteedNumber: 0,
  },
  standardWish: {
    recordIndex: 1,
    fiveStarAverage: 0.0,
    fiveStarNumber: 0,
    fiveStarCharacterRatio: 0.0,
    fiveStarCharacterNumber: 0,
    fiveStarWeaponRatio: 0.0,
    fourStarAverage: 0.0,
    fourStarNumber: 0,
    fourStarCharacterRatio: 0.0,
    fourStarCharacterNumber: 0,
    fourStarWeaponRatio: 0.0,
  }
});

const wishResults = ref({
  characterWish: [],
  weaponWish: [],
  standardWish: []
});

const wishResultsDetail = ref({
  characterWish: [],
  weaponWish: [],
  standardWish: []
});

const detailOpen = ref(false);

const detailShowPool = ref("");

function initializeWishData() {
  const countersData = JSON.parse(localStorage.getItem('GenshinWishCounters'));
  if (countersData) {
    wishCounters.value = countersData;
  } else {
    localStorage.setItem('GenshinWishCounters', JSON.stringify(wishCounters.value));
  }
  const statisticsData = JSON.parse(localStorage.getItem('GenshinWishStatistics'));
  if (statisticsData) {
    wishStatistics.value = statisticsData;
  } else {
    localStorage.setItem('GenshinWishStatistics', JSON.stringify(wishStatistics.value));
  }
  const resultsData = JSON.parse(localStorage.getItem('GenshinWishResults'));
  if (statisticsData) {
    wishResults.value = resultsData;
  } else {
    localStorage.setItem('GenshinWishResults', JSON.stringify(wishResults.value));
  }
}

//同步本地存储
function syncLocalStorage() {
  localStorage.setItem('GenshinWishCounters', JSON.stringify(wishCounters.value));
  localStorage.setItem('GenshinWishStatistics', JSON.stringify(wishStatistics.value));
  localStorage.setItem('GenshinWishResults', JSON.stringify(wishResults.value));
}

function getRandomIntInclusive(min, max) {
  //得到一个[min, max]之间的随机整数
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

function rouletteSelection(items) {
  // 权重是顺序敏感的！
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  const limit = Math.min(totalWeight, 10000);
  const randomValue = getRandomIntInclusive(1, limit);

  let cumulativeWeight = 0;
  for (const item of items) {
    cumulativeWeight += item.weight;
    if (randomValue <= cumulativeWeight) {
      return item.name;
    }
  }
  return items[items.length - 1].name;
}

function thingLevelChoose(pool) {
  const fiveCounter = wishCounters.value[pool].fiveStarCounter;
  const fourCounter = wishCounters.value[pool].fourStarCounter;
  let level,last = 0
  if (pool === 'characterWish' || pool === 'standardWish') {
    const fiveWeight = (fiveCounter >= 74) ? (60 + 600 * (fiveCounter - 73)) : 60;
    const fourWeight = (fourCounter >= 9) ? (510 + 5100 * (fourCounter - 8)) : 510;
    level = rouletteSelection([
      {name: '5', weight: fiveWeight},
      {name: '4', weight: fourWeight},
      {name: '3', weight: 9430},
    ]);
  } else {
    const fiveWeight = (fiveCounter >= 63) ? (70 + 700 * (fiveCounter - 62)) : 70;
    const fourWeight = (fourCounter >= 8) ? (600 + 6000 * (fourCounter - 7)) : 600;
    level = rouletteSelection([
      {name: '5', weight: fiveWeight},
      {name: '4', weight: fourWeight},
      {name: '3', weight: 9330},
    ]);
  }
  if (level === '5') {
    last = wishCounters.value[pool].fiveStarCounter;
  } else if (level === '4') {
    last = wishCounters.value[pool].fourStarCounter;
  }
  if (level === '5') {
    wishStatistics.value[pool].fiveStarNumber++;
    if (pool === "weaponWish" && wishCounters.value.weaponWish.isPinned === "yes") {
      wishStatistics.value[pool].fiveStarPinnedNumber++;
    }
    const fiveStarAverage = wishStatistics.value[pool].fiveStarAverage;
    wishStatistics.value[pool].fiveStarAverage = (fiveStarAverage * (wishStatistics.value[pool].fiveStarNumber - 1) + wishCounters.value[pool].fiveStarCounter) / wishStatistics.value[pool].fiveStarNumber;
    wishCounters.value[pool].fiveStarCounter = 1;
    wishCounters.value[pool].fourStarCounter++;
  } else if (level === '4') {
    wishStatistics.value[pool].fourStarNumber++;
    const fourStarAverage = wishStatistics.value[pool].fourStarAverage;
    wishStatistics.value[pool].fourStarAverage = (fourStarAverage * (wishStatistics.value[pool].fourStarNumber - 1) + wishCounters.value[pool].fourStarCounter) / wishStatistics.value[pool].fourStarNumber;
    wishCounters.value[pool].fiveStarCounter++;
    wishCounters.value[pool].fourStarCounter = 1;
  } else {
    wishCounters.value[pool].fiveStarCounter++;
    wishCounters.value[pool].fourStarCounter++;
  }
  return {level:level,last:last};
}

function thingPlaceChoose(pool, level) {
  let place = {class: 'standard', type: 'weapon'};
  if (level === "3") {
    if (pool !== "standardWish") {
      wishCounters.value[pool].fourStarLimitedCounter++;
      wishCounters.value[pool].fiveStarLimitedCounter++;
    }
    if (pool === "weaponWish") {
      wishCounters.value.weaponWish.fiveStarDesiredCounter++;
    }
    return place;
  }
  if (pool === "characterWish") {
    const lastUP = (level === '5') ? wishCounters.value.characterWish.lastfiveStarUP : wishCounters.value.characterWish.lastfourStarUP;
    if (lastUP) {
      if (level === '5') {
        wishStatistics.value.characterWish.fiveStarGuaranteedCheck++;
      } else {
        wishStatistics.value.characterWish.fourStarGuaranteedCheck++;
      }
      place.class = rouletteSelection([
        {name: 'limited', weight: 5000},
        {name: 'standard', weight: 5000}
      ]);
      if (level === '5') {
        if (place.class === 'limited') {
          wishStatistics.value.characterWish.fiveStarNotGuaranteedNumber++;
        }
        wishStatistics.value.characterWish.fiveStarNotGuaranteedRatio = wishStatistics.value.characterWish.fiveStarNotGuaranteedNumber / wishStatistics.value.characterWish.fiveStarGuaranteedCheck;
      } else if (level === '4') {
        if (place.class === 'limited') {
          wishStatistics.value.characterWish.fourStarNotGuaranteedNumber++;
        }
        wishStatistics.value.characterWish.fourStarNotGuaranteedRatio = wishStatistics.value.characterWish.fourStarNotGuaranteedNumber / wishStatistics.value.characterWish.fourStarGuaranteedCheck;
      }
    } else {
      place.class = 'limited';
    }
    if (level === '4' && place.class === 'standard') {
      const characterRecord = wishCounters.value.characterWish.fourStarCharacterCounter;
      const weaponRecord = wishCounters.value.characterWish.fourStarWeaponCounter;
      const characterWeight = (characterRecord >= 18) ? (255 + 2550 * (characterRecord - 17)) : 255;
      const weaponWeight = (weaponRecord >= 18) ? (255 + 2550 * (weaponRecord - 17)) : 255;
      place.type = rouletteSelection([
        {name: 'character', weight: characterWeight},
        {name: 'weapon', weight: weaponWeight},
      ]);
    } else {
      place.type = 'character';
    }
  } else if (pool === "weaponWish") {
    const lastUP = (level === '5') ? wishCounters.value.weaponWish.lastfiveStarUP : wishCounters.value.weaponWish.lastfourStarUP;
    if (wishCounters.value.weaponWish.desiredValue === 2 && level === '5') {
      place.class = 'desired';
      wishStatistics.value.weaponWish.fiveStarFullDesiredNumber++;
    } else if (lastUP) {
      if (level === '5') {
        wishStatistics.value.weaponWish.fiveStarGuaranteedCheck++;
      } else {
        wishStatistics.value.weaponWish.fourStarGuaranteedCheck++;
      }
      place.class = rouletteSelection([
        {name: 'limited', weight: 7500},
        {name: 'standard', weight: 2500}
      ]);//对五星来说，这里limited包含有desired！！！
      if (level === '5') {
        if (place.class === 'limited') {
          wishStatistics.value.weaponWish.fiveStarNotGuaranteedNumber++;
        }
        wishStatistics.value.weaponWish.fiveStarNotGuaranteedRatio = wishStatistics.value.weaponWish.fiveStarNotGuaranteedNumber / wishStatistics.value.weaponWish.fiveStarGuaranteedCheck;
      } else if (level === '4') {
        if (place.class === 'limited') {
          wishStatistics.value.weaponWish.fourStarNotGuaranteedNumber++;
        }
        wishStatistics.value.weaponWish.fourStarNotGuaranteedRatio = wishStatistics.value.weaponWish.fourStarNotGuaranteedNumber / wishStatistics.value.weaponWish.fourStarGuaranteedCheck;
      }
    } else {
      place.class = 'limited';//对五星来说，这里limited包含有desired！！！
    }
    if (level === '4' && place.class === 'standard') {
      const characterRecord = wishCounters.value.weaponWish.fourStarCharacterCounter;
      const weaponRecord = wishCounters.value.weaponWish.fourStarWeaponCounter;
      const characterWeight = (characterRecord >= 15) ? (300 + 3000 * (characterRecord - 14)) : 300;
      const weaponWeight = (weaponRecord >= 15) ? (300 + 3000 * (weaponRecord - 14)) : 300;
      place.type = rouletteSelection([
        {name: 'character', weight: characterWeight},
        {name: 'weapon', weight: weaponWeight},
      ]);
    } else {
      place.type = 'weapon';
    }
    if (level === "5") {
      wishStatistics.value.weaponWish.fiveStarFullDesiredRatio = wishStatistics.value.weaponWish.fiveStarFullDesiredNumber / wishStatistics.value.weaponWish.fiveStarPinnedNumber;
    }
  } else {
    if (level === '4') {
      const characterRecord = wishCounters.value.standardWish.fourStarCharacterCounter;
      const weaponRecord = wishCounters.value.standardWish.fourStarWeaponCounter;
      const characterWeight = (characterRecord >= 18) ? (255 + 2550 * (characterRecord - 17)) : 255;
      const weaponWeight = (weaponRecord >= 18) ? (255 + 2550 * (weaponRecord - 17)) : 255;
      place.type = rouletteSelection([
        {name: 'character', weight: characterWeight},
        {name: 'weapon', weight: weaponWeight},
      ]);
    } else {
      const characterRecord = wishCounters.value.standardWish.fiveStarCharacterCounter;
      const weaponRecord = wishCounters.value.standardWish.fiveStarWeaponCounter;
      const characterWeight = (characterRecord >= 147) ? (30 + 300 * (characterRecord - 146)) : 30;
      const weaponWeight = (weaponRecord >= 147) ? (30 + 300 * (weaponRecord - 146)) : 30;
      place.type = rouletteSelection([
        {name: 'character', weight: characterWeight},
        {name: 'weapon', weight: weaponWeight},
      ]);
    }
  }
  return place;
}

function setPlaceCounter(pool, level, place, name) {
  let lastLimited = 0;
  if (pool === "characterWish") {
    if (level === '5') {
      wishCounters.value.characterWish.lastfiveStarUP = place.class === 'limited';
      wishCounters.value.characterWish.fourStarCharacterCounter++;
      wishCounters.value.characterWish.fourStarWeaponCounter++;
    } else if (level === '4') {
      wishCounters.value.characterWish.lastfourStarUP = place.class === 'limited';
      if (place.type === 'character') {
        wishCounters.value.characterWish.fourStarWeaponCounter++;
        wishCounters.value.characterWish.fourStarCharacterCounter = 1;
      } else {
        wishCounters.value.characterWish.fourStarCharacterCounter++;
        wishCounters.value.characterWish.fourStarWeaponCounter = 1;
      }
    } else {
      wishCounters.value.characterWish.fourStarCharacterCounter++;
      wishCounters.value.characterWish.fourStarWeaponCounter++;
    }
  } else if (pool === "weaponWish") {
    if (level === '5') {
      wishCounters.value.weaponWish.lastfiveStarUP = place.class === 'limited';
      wishCounters.value.weaponWish.fourStarCharacterCounter++;
      wishCounters.value.weaponWish.fourStarWeaponCounter++;
      if (wishCounters.value.weaponWish.isPinned === "yes") {
        if (place.class === "limited") {
          const thingsList = genshinItem.weaponWish["5"].desired.weapon;
          if (thingsList.includes(name)) {
            const LimitedAverage = wishStatistics.value.weaponWish.fiveStarLimitedValueAverage;
            wishStatistics.value.weaponWish.fiveStarLimitedValueAverage = ((LimitedAverage * wishStatistics.value.weaponWish.fiveStarPinnedLimitedNumber) + wishCounters.value.weaponWish.desiredValue) / (wishStatistics.value.weaponWish.fiveStarPinnedLimitedNumber + 1);
            const Average = wishStatistics.value.weaponWish.fiveStarDesiredValueAverage;
            wishStatistics.value.weaponWish.fiveStarDesiredValueAverage = ((Average * wishStatistics.value.weaponWish.fiveStarDesiredNumber) + wishCounters.value.weaponWish.desiredValue) / (wishStatistics.value.weaponWish.fiveStarDesiredNumber + 1);
            wishCounters.value.weaponWish.desiredValue = 0;
            place.class = "desired";
          } else {
            const Average = wishStatistics.value.weaponWish.fiveStarLimitedValueAverage;
            wishStatistics.value.weaponWish.fiveStarLimitedValueAverage = ((Average * wishStatistics.value.weaponWish.fiveStarPinnedLimitedNumber) + wishCounters.value.weaponWish.desiredValue) / (wishStatistics.value.weaponWish.fiveStarPinnedLimitedNumber + 1);
            wishCounters.value.weaponWish.desiredValue++;
          }
        } else if (place.class === "desired") {
          const LimitedAverage = wishStatistics.value.weaponWish.fiveStarLimitedValueAverage;
          wishStatistics.value.weaponWish.fiveStarLimitedValueAverage = ((LimitedAverage * wishStatistics.value.weaponWish.fiveStarPinnedLimitedNumber) + wishCounters.value.weaponWish.desiredValue) / (wishStatistics.value.weaponWish.fiveStarPinnedLimitedNumber + 1);
          const Average = wishStatistics.value.weaponWish.fiveStarDesiredValueAverage;
          wishStatistics.value.weaponWish.fiveStarDesiredValueAverage = ((Average * wishStatistics.value.weaponWish.fiveStarDesiredNumber) + wishCounters.value.weaponWish.desiredValue) / (wishStatistics.value.weaponWish.fiveStarDesiredNumber + 1);
          wishCounters.value.weaponWish.desiredValue = 0;
        } else {
          wishCounters.value.weaponWish.desiredValue++;
        }
      }
    } else if (level === '4') {
      wishCounters.value.weaponWish.lastfourStarUP = place.class === 'limited';
      if (place.type === 'character') {
        wishCounters.value.weaponWish.fourStarWeaponCounter++;
        wishCounters.value.weaponWish.fourStarCharacterCounter = 1;
      } else {
        wishCounters.value.weaponWish.fourStarCharacterCounter++;
        wishCounters.value.weaponWish.fourStarWeaponCounter = 1;
      }
    } else {
      wishCounters.value.weaponWish.fourStarCharacterCounter++;
      wishCounters.value.weaponWish.fourStarWeaponCounter++;
    }
  } else {
    if (level === '5') {
      wishCounters.value.standardWish.fourStarCharacterCounter++;
      wishCounters.value.standardWish.fourStarWeaponCounter++;
      if (place.type === 'character') {
        lastLimited = wishCounters.value.standardWish.fiveStarCharacterCounter;
        wishCounters.value.standardWish.fiveStarWeaponCounter++;
        wishCounters.value.standardWish.fiveStarCharacterCounter = 1;
      } else {
        lastLimited = wishCounters.value.standardWish.fiveStarWeaponCounter;
        wishCounters.value.standardWish.fiveStarCharacterCounter++;
        wishCounters.value.standardWish.fiveStarWeaponCounter = 1;
      }
    } else if (level === '4') {
      wishCounters.value.standardWish.fiveStarCharacterCounter++;
      wishCounters.value.standardWish.fiveStarWeaponCounter++;
      if (place.type === 'character') {
        lastLimited = wishCounters.value.standardWish.fourStarCharacterCounter;
        wishCounters.value.standardWish.fourStarWeaponCounter++;
        wishCounters.value.standardWish.fourStarCharacterCounter = 1;
      } else {
        lastLimited = wishCounters.value.standardWish.fourStarWeaponCounter;
        wishCounters.value.standardWish.fourStarCharacterCounter++;
        wishCounters.value.standardWish.fourStarWeaponCounter = 1;
      }
    } else {
      wishCounters.value.standardWish.fiveStarCharacterCounter++;
      wishCounters.value.standardWish.fiveStarWeaponCounter++;
      wishCounters.value.standardWish.fourStarCharacterCounter++;
      wishCounters.value.standardWish.fourStarWeaponCounter++;
    }
  }
  if (place.class !== "standard") {//desired也算
    if (level === '5') {
      if (place.class === "desired") {
        lastLimited = wishCounters.value.weaponWish.fiveStarDesiredCounter;
      } else {
        lastLimited = wishCounters.value[pool].fiveStarLimitedCounter;
      }
      wishStatistics.value[pool].fiveStarLimitedNumber++;
      if (pool === "weaponWish") {
        wishStatistics.value[pool].fiveStarPinnedLimitedNumber++;
      }
      const Average = wishStatistics.value[pool].fiveStarLimitedAverage;
      wishStatistics.value[pool].fiveStarLimitedAverage = (Average * (wishStatistics.value[pool].fiveStarLimitedNumber - 1) + wishCounters.value[pool].fiveStarLimitedCounter) / wishStatistics.value[pool].fiveStarLimitedNumber;
      wishCounters.value[pool].fiveStarLimitedCounter = 1;
      wishCounters.value[pool].fourStarLimitedCounter++;
      if (place.class === "desired") {
        wishStatistics.value.weaponWish.fiveStarDesiredNumber++;
        const Average = wishStatistics.value.weaponWish.fiveStarDesiredAverage;
        wishStatistics.value.weaponWish.fiveStarDesiredAverage = (Average * (wishStatistics.value.weaponWish.fiveStarDesiredNumber - 1) + wishCounters.value.weaponWish.fiveStarDesiredCounter) / wishStatistics.value.weaponWish.fiveStarDesiredNumber;
        wishCounters.value.weaponWish.fiveStarDesiredCounter = 1;
      } else if (pool === "weaponWish") {
        wishCounters.value.weaponWish.fiveStarDesiredCounter++;
      }
    } else if (level === '4') {
      lastLimited = wishCounters.value[pool].fourStarLimitedCounter;
      wishStatistics.value[pool].fourStarLimitedNumber++;
      const Average = wishStatistics.value[pool].fourStarLimitedAverage;
      wishStatistics.value[pool].fourStarLimitedAverage = (Average * (wishStatistics.value[pool].fourStarLimitedNumber - 1) + wishCounters.value[pool].fourStarLimitedCounter) / wishStatistics.value[pool].fourStarLimitedNumber;
      wishCounters.value[pool].fourStarLimitedCounter = 1;
      wishCounters.value[pool].fiveStarLimitedCounter++;
      if (pool === "weaponWish") {
        wishCounters.value.weaponWish.fiveStarDesiredCounter++;
      }
    }
  } else if (pool === 'standardWish') {
    if (level === '5') {
      if (place.type === "character") {
        wishStatistics.value.standardWish.fiveStarCharacterNumber++;
      }
      wishStatistics.value.standardWish.fiveStarCharacterRatio = wishStatistics.value.standardWish.fiveStarCharacterNumber / wishStatistics.value.standardWish.fiveStarNumber;
      wishStatistics.value.standardWish.fiveStarWeaponRatio = 1 - wishStatistics.value.standardWish.fiveStarCharacterRatio;
    } else if (level === '4') {
      if (place.type === "character") {
        wishStatistics.value.standardWish.fourStarCharacterNumber++;
      }
      wishStatistics.value.standardWish.fourStarCharacterRatio = wishStatistics.value.standardWish.fourStarCharacterNumber / wishStatistics.value.standardWish.fourStarNumber;
      wishStatistics.value.standardWish.fourStarWeaponRatio = 1 - wishStatistics.value.standardWish.fourStarCharacterRatio;
    }
  } else if (level !== '3') {
    if (pool === "weaponWish") {
      wishCounters.value.weaponWish.fiveStarDesiredCounter++;
    }
    if (level === '5') {
      lastLimited = wishCounters.value[pool].fiveStarLimitedCounter;
    } else if (level === '4') {
      lastLimited = wishCounters.value[pool].fourStarLimitedCounter;
    }
    wishCounters.value[pool].fiveStarLimitedCounter++;
    wishCounters.value[pool].fourStarLimitedCounter++;
  }
  if (pool !== "standardWish") {
    if (level === "4") {
      wishStatistics.value[pool].fourStarLimitedRatio = wishStatistics.value[pool].fourStarLimitedNumber / wishStatistics.value[pool].fourStarNumber;
    } else if (level === "5") {
      wishStatistics.value[pool].fiveStarLimitedRatio = wishStatistics.value[pool].fiveStarLimitedNumber / wishStatistics.value[pool].fiveStarNumber;
    }
  }
  return {class: place.class, type: place.type, name: name, lastLimited: lastLimited};
}

function wishEmulate(pool, times) {
  let flag = false;
  let resultCount = {'5': 0, '4': 0, '3': 0};
  for (let i = 0; i < times; i++) {
    const levelAndLastData = thingLevelChoose(pool);
    const place = thingPlaceChoose(pool, levelAndLastData.level);
    const thingsList = genshinItem[pool][levelAndLastData.level][place.class][place.type];
    const thingIndex = getRandomIntInclusive(0, thingsList.length - 1);
    const thing = thingsList[thingIndex];
    const setPlaceItem = setPlaceCounter(pool, levelAndLastData.level, place, thing);
    const resultItem = {
      level:levelAndLastData.level,
      class:setPlaceItem.class,
      type:setPlaceItem.type,
      name:setPlaceItem.name,
      last:levelAndLastData.last,
      lastLimited:setPlaceItem.lastLimited,
      index:wishStatistics.value[pool].recordIndex,
    }
    const resultItemDetail = {
      level: resultItem.level,
      class: resultItem.class,
      type: resultItem.type,
      name: resultItem.name
    };
    wishResultsDetail.value[pool].unshift(resultItemDetail);
    if (resultItem.level !== '3') {
      flag = true;
      wishStatistics.value[pool].recordIndex++;
      wishResults.value[pool].unshift(resultItem);
      wishResultsShow[pool][resultItem.level].unshift([resultItem.index, resultItem.last, resultItem.name, resultItem.level, resultItem.class, resultItem.type, resultItem.lastLimited]);
      if (wishResults.value[pool].length > 1500) {
        wishResults.value[pool].pop();
        wishResultsShow[pool][resultItem.level].pop();
      }
      updateWishShow(pool);
    }
    if (wishResultsDetail.value[pool].length > 1500) {
      wishResultsDetail.value[pool].pop();
    }
    resultCount[resultItem.level]++;
  }
  if (flag) {
    syncLocalStorage();
  }
  notification.open({
    message: pool === "standardWish" ? "常驻祈愿结果" : pool === "characterWish" ? "角色祈愿结果" : "武器祈愿结果",
    description: () => {
      return h('div', [
        h('p', `恭喜完成 ${times} 次祈愿！共获得：`),
        h('p', [
          `5 星物品 ${resultCount['5']} 个，`,
          h('br'),
          `4 星物品 ${resultCount['4']} 个，`,
          h('br'),
          `3 星物品 ${resultCount['3']} 个！`
        ])
      ]);
    },
  });
}

function isPinnedChange(e) {
  wishCounters.value.weaponWish.isPinned = e.target.value === "yes" ? "no" : "yes";
  Modal.confirm({
    title: '温馨提示',
    content: '改变定轨状态将导致定轨值和定轨统计信息清零，确定要继续吗？',
    onOk() {
      wishCounters.value.weaponWish.desiredValue = 0;
      wishCounters.value.weaponWish.fiveStarDesiredCounter = 1;
      wishStatistics.value.weaponWish.fiveStarFullDesiredRatio = 0.0;
      wishStatistics.value.weaponWish.fiveStarFullDesiredNumber = 0;
      wishStatistics.value.weaponWish.fiveStarDesiredAverage = 0.0;
      wishStatistics.value.weaponWish.fiveStarDesiredNumber = 0;
      wishStatistics.value.weaponWish.fiveStarDesiredValueAverage = 0.0;
      wishStatistics.value.weaponWish.fiveStarLimitedValueAverage = 0.0;
      wishStatistics.value.weaponWish.fiveStarPinnedNumber = 0;
      wishStatistics.value.weaponWish.fiveStarPinnedLimitedNumber = 0;
      if (e.target.value === "yes") {
        message.success('已成功定轨');
      } else {
        message.success('已取消定轨');
      }
      wishCounters.value.weaponWish.isPinned = e.target.value;
      syncLocalStorage();
    },
    onCancel() {
      message.info('已取消操作');
    },
  });
}

function showDetail(pool) {
  detailTitle.value = pool === "standardWish" ? "常驻祈愿物品详情" : pool === "characterWish" ? "角色祈愿物品详情" : "武器祈愿物品详情";
  detailShowPool.value = pool;
  detailData.value = wishResultsDetail.value[pool];
  historyData.value = wishResults.value[pool];
  detailOpen.value = true;
}

function cleanHistory(pool) {
  const poolName = pool === "standardWish" ? "常驻祈愿" : pool === "characterWish" ? "角色祈愿" : "武器祈愿";
  Modal.confirm({
    title: '温馨提示',
    content: '将清空' + poolName + '的所有数据，并重置卡池状态，是否确认？',
    onOk() {
      for (let key in defaultCounters[pool]) {
        wishCounters.value[pool][key] = defaultCounters[pool][key];
      }
      for (let key in defaultStatistics[pool]) {
        wishStatistics.value[pool][key] = defaultStatistics[pool][key];
      }
      wishResults.value[pool] = [];
      wishResultsDetail.value[pool] = [];
      wishResultsShow[pool] = {
        '5': [],
        '4': [],
      };
      updateWishShow(pool);
      syncLocalStorage();
      message.success('已成功清空' + poolName + '数据');
    },
    onCancel() {
      message.info('已取消操作');
    },
  });
}

function setDetailColor(record, pool, group) {
  if (group === "last") {
    if (pool !== "weaponWish") {
      if (record.level === "5") {
        return record.last > 62.297 ? badColor : goodColor;
      } else {
        return record.last > 7.6589 ? badColor : goodColor;
      }
    } else {
      if (record.level === "5") {
        return record.last > 53.25 ? badColor : goodColor;
      } else {
        return record.last > 6.728 ? badColor : goodColor;
      }
    }
  } else {
    if (pool === "characterWish") {
      if (record.level === "5") {
        if (record.class === "limited") {
          return record.lastLimited > 93.446 ? badColor : goodColor;
        } else {
          return record.lastLimited > 62.297 ? badColor : goodColor;
        }
      } else {
        if (record.class === "limited") {
          return record.lastLimited > 11.483 ? badColor : goodColor;
        } else {
          return record.lastLimited > 7.6589 ? badColor : goodColor;
        }
      }
    } else if (pool === "weaponWish") {
      if (record.level === "5") {
        if (record.class === "desired") {
          return record.lastLimited > 105.67 ? badColor : goodColor;
        } else if (record.class === "limited") {
          return record.lastLimited > 66.5625 ? badColor : goodColor;
        } else {
          return record.lastLimited > 53.25 ? badColor : goodColor;
        }
      } else {
        if (record.class === "limited") {
          return record.lastLimited > 8.41 ? badColor : goodColor;
        } else {
          return record.lastLimited > 6.728 ? badColor : goodColor;
        }
      }
    } else {
      if (record.level === "5") {
        return record.lastLimited > 124.594 ? badColor : goodColor;
      } else {
        return record.lastLimited > 15.3178 ? badColor : goodColor;
      }
    }
  }
}

const chartOption = {
  visualMap: [
    {
      show: false,
      type: 'continuous',
      inRange: {
        color: ['rgba(255, 237, 237, 1)', 'red'],
      },
      seriesIndex: 0,
      dimension: 1,
      min: 1,
      max: 90
    },
    {
      show: false,
      type: 'continuous',
      inRange: {
        color: ['rgba(91, 119, 255, 1)', 'rgba(230, 244, 255, 1)'],
      },
      seriesIndex: 1,
      dimension: 1,
      min: 1,
      max: 10
    },
  ],
  dataZoom: [
    {
      type: 'slider',
      startValue: 0,
      endValue: 100,
      labelPrecision: 0,
      brushSelect: false,
    },
    {
      type: 'inside',
      startValue: 0,
      endValue: 100,
    }
  ],
  xAxis: {
    type: 'value',
    show: false,
    scale: true,
  },
  yAxis: [
    {
      type: 'value',
      name: '四星',
      position: 'left'
    },
    {
      type: 'value',
      name: '五星',
      position: 'right'
    }
  ],
  tooltip: {
    trigger: 'axis',
    formatter: function (params) {
      let tooltipText = '';
      params.forEach(param => {
        const data = param.data;
        tooltipText += `
               No.${data[0]} ${data[2]}<br/>
               ${data[3] === "4" ? "四星" : "五星"}${data[4] === "desired" ? "定轨" : data[4] === "limited" ? "限定" : "常驻"}${data[5] === "character" ? "角色" : "武器"}<br/>
               上个同星: ${data[1]}<br/>
               上个同级: ${data[6]}<br/>
             `;
      });
      return tooltipText;
    }
  },
  series: [
    {
      name: '五星',
      type: 'line',
      yAxisIndex: 1,
      itemStyle: {
        color: 'red'
      },
      encode: {
        x: 0,
        y: 1,
      },
      sampling: 'lttb',
      z: 2
    },
    {
      name: '四星',
      type: 'line',
      yAxisIndex: 0,
      itemStyle: {
        color: 'green'
      },
      encode: {
        x: 0,
        y: 1,
      },
      sampling: 'lttb',
      z: 1
    }
  ]
};

function updateWishShow (pool) {
  if (pool === "characterWish") {
    characterWishChart.setOption({
      series: [
        {
          data: wishResultsShow.characterWish["5"]
        },{
          data: wishResultsShow.characterWish["4"]
        }
      ]
    });
  } else if (pool === "weaponWish") {
    weaponWishChart.setOption({
      series: [
        {
          data: wishResultsShow.weaponWish["5"]
        },{
          data: wishResultsShow.weaponWish["4"]
        }
      ]
    });
  } else {
    standardWishChart.setOption({
      series: [
        {
          data: wishResultsShow.standardWish["5"]
        },{
          data: wishResultsShow.standardWish["4"]
        }
      ]
    });
  }
}

function initializeWishShow() {
  wishResultsShow.characterWish["5"] = wishResults.value.characterWish.filter(item => item.level === '5').map(item => [item.index, item.last, item.name, item.level, item.class, item.type, item.lastLimited]),
  wishResultsShow.characterWish["4"] = wishResults.value.characterWish.filter(item => item.level === '4').map(item => [item.index, item.last, item.name, item.level, item.class, item.type, item.lastLimited]),
  wishResultsShow.weaponWish["5"] = wishResults.value.weaponWish.filter(item => item.level === '5').map(item => [item.index, item.last, item.name, item.level, item.class, item.type, item.lastLimited]),
  wishResultsShow.weaponWish["4"] = wishResults.value.weaponWish.filter(item => item.level === '4').map(item => [item.index, item.last, item.name, item.level, item.class, item.type, item.lastLimited]),
  wishResultsShow.standardWish["5"] = wishResults.value.standardWish.filter(item => item.level === '5').map(item => [item.index, item.last, item.name, item.level, item.class, item.type, item.lastLimited]),
  wishResultsShow.standardWish["4"] = wishResults.value.standardWish.filter(item => item.level === '4').map(item => [item.index, item.last, item.name, item.level, item.class, item.type, item.lastLimited])
}

onMounted(() => {
  initializeWishData();
  initializeWishShow();
  notification.config({
    maxCount: 1,
    duration: 3,
  });
  characterWishChart = echarts.init(document.getElementById('GenshinCharacterChart'));
  characterWishChart.setOption(chartOption);
  updateWishShow("characterWish");
  weaponWishChart = echarts.init(document.getElementById('GenshinWeaponChart'));
  weaponWishChart.setOption(chartOption);
  updateWishShow("weaponWish");
  standardWishChart = echarts.init(document.getElementById('GenshinStandardChart'));
  standardWishChart.setOption(chartOption);
  updateWishShow("standardWish");
  const element = document.getElementById('GenshinContainer');
  const width = element.offsetWidth;
  const style = window.getComputedStyle(element);
  const contentWidth = width - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
  characterWishChart.resize({width: contentWidth});
  weaponWishChart.resize({width: contentWidth});
  standardWishChart.resize({width: contentWidth});
  window.onresize = function() {
    const element = document.getElementById('GenshinContainer');
    const width = element.offsetWidth;
    const style = window.getComputedStyle(element);
    const contentWidth = width - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
    characterWishChart.resize({width: contentWidth});
    weaponWishChart.resize({width: contentWidth});
    standardWishChart.resize({width: contentWidth});
  };
});
</script>
<template>
  <a-drawer
      v-model:open="detailOpen"
      :maskClosable="false"
      height="100%"
      :title="detailTitle"
      placement="bottom"
  >
    <div style="margin-top: -20px"></div>
    <a-tabs class="detail-drawer">
      <a-tab-pane key="1" tab="临时记录">
        <a-typography-text type="secondary">共 {{ detailData.length }} 条数据。此处数据仅供临时展示，将在页面刷新后清空。
        </a-typography-text>
        <div style="margin-bottom: 10px"></div>
        <a-table :columns="detailColumns" :data-source="detailData" :scroll="{ x: true,y: false }">
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'name'">
          <span :style="{ color: record.level === '3' ? 'green' : (record.level === '4' ? 'purple' : 'red') }">
            {{ record.name }}
          </span>
            </template>
            <template v-else-if="column.dataIndex === 'level'">
          <span>
            <a-tag
                :key="record.level"
                :color="record.level === '3' ? 'green' : record.level === '4' ? 'purple' : 'red'"
            >
              {{ record.level === '3' ? '三星' : record.level === '4' ? '四星' : '五星' }}
            </a-tag>
          </span>
            </template>
            <template v-else-if="column.dataIndex === 'class'">
          <span>
            <a-tag
                :key="record.class"
                :color="record.class === 'standard' ? 'cyan' : record.class === 'limited' ? 'red' : 'pink'"
            >
              {{ record.class === 'standard' ? '常驻' : record.class === 'limited' ? '限定' : '定轨' }}
            </a-tag>
          </span>
            </template>
            <template v-else-if="column.dataIndex === 'type'">
          <span>
            <a-tag
                :key="record.type"
                :color="record.type === 'weapon' ? 'blue' : 'red'"
            >
              {{ record.type === 'weapon' ? '武器' : '角色' }}
            </a-tag>
          </span>
            </template>
          </template>
        </a-table>
      </a-tab-pane>
      <a-tab-pane key="2" tab="本地记录">
        <a-typography-text type="secondary">共 {{ historyData.length }}
          条数据，三星数据已省略。此处数据存储在本地，不会随页面关闭而消失。
        </a-typography-text>
        <br>
        <a-typography-text type="secondary">
          对限定池，「同级物品」按照「定轨 > 限定 > 常驻」划分，除本级外，所有更高级的物品也都属于「同级物品」；对常驻池则按「角色 / 武器」划分，只有同类物品才属于「同级物品」。
        </a-typography-text>
        <div style="margin-bottom: 10px"></div>
        <a-table :columns="historyColumns" :data-source="historyData" :scroll="{ x: true,y: false }">
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'name'">
          <span :style="{ color: record.level === '4' ? 'purple' : 'red' }">
            {{ record.name }}
          </span>
            </template>
            <template v-else-if="column.dataIndex === 'level'">
          <span>
            <a-tag
                :key="record.level"
                :color="record.level === '4' ? 'purple' : 'red'"
            >
              {{ record.level === '4' ? '四星' : '五星' }}
            </a-tag>
          </span>
            </template>
            <template v-else-if="column.dataIndex === 'class'">
          <span>
            <a-tag
                :key="record.class"
                :color="record.class === 'standard' ? 'cyan' : record.class === 'limited' ? 'red' : 'pink'"
            >
              {{ record.class === 'standard' ? '常驻' : record.class === 'limited' ? '限定' : '定轨' }}
            </a-tag>
          </span>
            </template>
            <template v-else-if="column.dataIndex === 'type'">
          <span>
            <a-tag
                :key="record.type"
                :color="record.type === 'weapon' ? 'blue' : 'red'"
            >
              {{ record.type === 'weapon' ? '武器' : '角色' }}
            </a-tag>
          </span>
            </template>
            <template v-else-if="column.dataIndex === 'last'">
          <span :style="{ color: setDetailColor(record, detailShowPool, 'last') }">
            {{ record.last }}
          </span>
            </template>
            <template v-else-if="column.dataIndex === 'lastLimited'">
          <span :style="{ color: setDetailColor(record, detailShowPool, 'lastLimited') }">
            {{ record.lastLimited }}
          </span>
            </template>
          </template>
        </a-table>
      </a-tab-pane>
    </a-tabs>
  </a-drawer>
  <div class="sth-container" id="GenshinContainer">
    <a-typography-title :level="2" style="margin-top: 60px;">抽卡模拟器·原神版</a-typography-title>
    <a-typography-paragraph>
      本页面为原神抽卡模拟器，提供了角色活动祈愿、武器活动祈愿和常驻祈愿三种抽卡方式，不保证模拟结果与实际抽卡结果一致。
    </a-typography-paragraph>
    <a-typography-paragraph>
      「查看详情」中的数据仅供临时展示，将在页面刷新后清空；其它数据将做持久化处理。此外，临时数据和永久数据均有 1500
      条/每卡池的存储上限，超过上限将自动清除历史数据。
    </a-typography-paragraph>
    <div id="genshin-upcharacter-emulate">
      <a-typography-title :level="3">角色活动祈愿</a-typography-title>
      <a-typography-paragraph>
        <div class="wish-bar">
          <a-space-compact>
            <a-button type="primary" @click="wishEmulate('characterWish',1);">抽卡 × 1</a-button>
            <a-button @click="wishEmulate('characterWish',10);">抽卡 × 10</a-button>
            <a-button @click="wishEmulate('characterWish',100);">抽卡 × 100</a-button>
          </a-space-compact>
          <a @click="showDetail('characterWish')">查看详情</a>
          <a @click="cleanHistory('characterWish')">清空数据</a>
        </div>
      </a-typography-paragraph>
      <a-typography-paragraph>
        <div class="result-statistic-container">
          <a-card title="五星统计信息">
            <template #extra>
              <a-typography-text type="secondary">共 {{ wishStatistics.characterWish.fiveStarNumber }} 个
              </a-typography-text>
            </template>
            <div class="result-statistic-incard">
              <a-statistic title="平均抽数" :precision="2" :value-style="{ color: wishStatistics.characterWish.fiveStarAverage > 62.297 ? badColor : goodColor }"
                           :value="wishStatistics.characterWish.fiveStarAverage"/>
              <a-statistic title="限定平均抽数" :precision="2" :value-style="{ color: wishStatistics.characterWish.fiveStarLimitedAverage > 93.446 ? badColor : goodColor }"
                           :value="wishStatistics.characterWish.fiveStarLimitedAverage"/>
              <a-statistic title="限定占比" :precision="2" suffix="%" :value-style="{ color: wishStatistics.characterWish.fiveStarLimitedRatio < 0.6667 ? badColor : goodColor }"
                           :value="wishStatistics.characterWish.fiveStarLimitedRatio * 100"/>
              <a-statistic title="小保底不歪率" :precision="2" suffix="%" :value-style="{ color: wishStatistics.characterWish.fiveStarNotGuaranteedRatio < 0.5 ? badColor : goodColor }"
                           :value="wishStatistics.characterWish.fiveStarNotGuaranteedRatio * 100"/>
            </div>
          </a-card>
          <a-card title="四星统计信息">
            <template #extra>
              <a-typography-text type="secondary">共 {{ wishStatistics.characterWish.fourStarNumber }} 个
              </a-typography-text>
            </template>
            <div class="result-statistic-incard">
              <a-statistic title="平均抽数" :precision="2" :value-style="{ color: wishStatistics.characterWish.fourStarAverage > 7.6589 ? badColor : goodColor }"
                           :value="wishStatistics.characterWish.fourStarAverage"/>
              <a-statistic title="限定平均抽数" :precision="2" :value-style="{ color: wishStatistics.characterWish.fourStarLimitedAverage > 11.4884 ? badColor : goodColor }"
                           :value="wishStatistics.characterWish.fourStarLimitedAverage"/>
              <a-statistic title="限定占比" :precision="2" suffix="%" :value-style="{ color: wishStatistics.characterWish.fourStarLimitedRatio < 0.666667 ? badColor : goodColor }"
                           :value="wishStatistics.characterWish.fourStarLimitedRatio * 100"/>
              <a-statistic title="小保底不歪率" :precision="2" suffix="%" :value-style="{ color: wishStatistics.characterWish.fourStarNotGuaranteedRatio < 0.5 ? badColor : goodColor }"
                           :value="wishStatistics.characterWish.fourStarNotGuaranteedRatio * 100"/>
            </div>
          </a-card>
        </div>
      </a-typography-paragraph>
      <div id="GenshinCharacterChart" class="wish-show-chart" v-show="wishResults.characterWish.length !== 0"></div>
    </div>
    <div id="genshin-upweapon-emulate">
      <a-typography-title :level="3">武器活动祈愿</a-typography-title>
      <a-typography-paragraph>
        <div class="wish-bar">
          <a-space-compact>
            <a-button type="primary" @click="wishEmulate('weaponWish',1);">抽卡 × 1</a-button>
            <a-button @click="wishEmulate('weaponWish',10);">抽卡 × 10</a-button>
            <a-button @click="wishEmulate('weaponWish',100);">抽卡 × 100</a-button>
          </a-space-compact>
          <a-radio-group v-model:value="wishCounters.weaponWish.isPinned" name="radioGroup" @change="isPinnedChange">
            <a-radio-button value="yes">定轨</a-radio-button>
            <a-radio-button value="no">未定轨</a-radio-button>
          </a-radio-group>
          <a @click="showDetail('weaponWish')">查看详情</a>
          <a @click="cleanHistory('weaponWish')">清空数据</a>
        </div>
      </a-typography-paragraph>
      <a-typography-paragraph>
        <div class="result-statistic-container">
          <a-card title="五星统计信息">
            <template #extra>
              <a-typography-text type="secondary">共 {{ wishStatistics.weaponWish.fiveStarNumber }} 个
              </a-typography-text>
            </template>
            <div class="result-statistic-incard">
              <a-statistic title="平均抽数" :precision="2" :value-style="{ color: wishStatistics.weaponWish.fiveStarAverage > 53.25 ? badColor : goodColor }"
                           :value="wishStatistics.weaponWish.fiveStarAverage"/>
              <a-statistic title="限定平均抽数" :precision="2" :value-style="{ color: wishStatistics.weaponWish.fiveStarLimitedAverage > 66.5625 ? badColor : goodColor }"
                           :value="wishStatistics.weaponWish.fiveStarLimitedAverage"/>
              <a-statistic title="限定占比" :precision="2" suffix="%" :value-style="{ color: wishStatistics.weaponWish.fiveStarLimitedRatio < 0.8 ? badColor : goodColor }"
                           :value="wishStatistics.weaponWish.fiveStarLimitedRatio * 100"/>
              <a-statistic title="小保底不歪率" :precision="2" suffix="%" :value-style="{ color: wishStatistics.weaponWish.fiveStarNotGuaranteedRatio < 0.75 ? badColor : goodColor }"
                           :value="wishStatistics.weaponWish.fiveStarNotGuaranteedRatio * 100"/>
            </div>
          </a-card>
          <a-card title="定轨统计信息" v-show="wishCounters.weaponWish.isPinned === 'yes'">
            <template #extra>
              <a-typography-text type="secondary">共 {{ wishStatistics.weaponWish.fiveStarDesiredNumber }} 个
              </a-typography-text>
            </template>
            <div class="result-statistic-incard">
              <a-statistic title="定轨平均命定值" :precision="2" :value-style="{ color: wishStatistics.weaponWish.fiveStarDesiredValueAverage > 0.9844 ? badColor : goodColor }"
                           :value="wishStatistics.weaponWish.fiveStarDesiredValueAverage"/>
              <a-statistic title="限定平均命定值" :precision="2" :value-style="{ color: wishStatistics.weaponWish.fiveStarLimitedValueAverage > 0.7619 ? badColor : goodColor }"
                           :value="wishStatistics.weaponWish.fiveStarLimitedValueAverage"/>
              <a-statistic title="定轨平均抽数" :precision="2" :value-style="{ color: wishStatistics.weaponWish.fiveStarDesiredAverage > 105.67 ? badColor : goodColor }"
                           :value="wishStatistics.weaponWish.fiveStarDesiredAverage"/>
              <a-statistic title="满定轨占比" :precision="2" suffix="%" :value-style="{ color: wishStatistics.weaponWish.fiveStarFullDesiredRatio > 0.181102 ? badColor : goodColor }"
                           :value="wishStatistics.weaponWish.fiveStarFullDesiredRatio * 100"/>
            </div>
          </a-card>
          <a-card title="四星统计信息">
            <template #extra>
              <a-typography-text type="secondary">共 {{ wishStatistics.weaponWish.fourStarNumber }} 个
              </a-typography-text>
            </template>
            <div class="result-statistic-incard">
              <a-statistic title="平均抽数" :precision="2" :value-style="{ color: wishStatistics.weaponWish.fourStarAverage > 6.728 ? badColor : goodColor }"
                           :value="wishStatistics.weaponWish.fourStarAverage"/>
              <a-statistic title="限定平均抽数" :precision="2" :value-style="{ color: wishStatistics.weaponWish.fourStarLimitedAverage > 8.435 ? badColor : goodColor }"
                           :value="wishStatistics.weaponWish.fourStarLimitedAverage"/>
              <a-statistic title="限定占比" :precision="2" suffix="%" :value-style="{ color: wishStatistics.weaponWish.fourStarLimitedRatio < 0.8 ? badColor : goodColor }"
                           :value="wishStatistics.weaponWish.fourStarLimitedRatio * 100"/>
              <a-statistic title="小保底不歪率" :precision="2" suffix="%" :value-style="{ color: wishStatistics.weaponWish.fourStarNotGuaranteedRatio < 0.75 ? badColor : goodColor }"
                           :value="wishStatistics.weaponWish.fourStarNotGuaranteedRatio * 100"/>
            </div>
          </a-card>
        </div>
      </a-typography-paragraph>
      <div id="GenshinWeaponChart" class="wish-show-chart" v-show="wishResults.weaponWish.length !== 0"></div>
    </div>
    <div id="genshin-standard-emulate">
      <a-typography-title :level="3">常驻祈愿</a-typography-title>
      <a-typography-paragraph>
        <div class="wish-bar">
          <a-space-compact>
            <a-button type="primary" @click="wishEmulate('standardWish',1);">抽卡 × 1</a-button>
            <a-button @click="wishEmulate('standardWish',10);">抽卡 × 10</a-button>
            <a-button @click="wishEmulate('standardWish',100);">抽卡 × 100</a-button>
          </a-space-compact>
          <a @click="showDetail('standardWish')">查看详情</a>
          <a @click="cleanHistory('standardWish')">清空数据</a>
        </div>
      </a-typography-paragraph>
      <a-typography-paragraph>
        <div class="result-statistic-container">
          <a-card title="五星统计信息">
            <template #extra>
              <a-typography-text type="secondary">共 {{ wishStatistics.standardWish.fiveStarNumber }} 个
              </a-typography-text>
            </template>
            <div class="result-statistic-incard">
              <a-statistic title="平均抽数" :precision="2" :value-style="{ color: wishStatistics.standardWish.fiveStarAverage > 62.297 ? badColor : goodColor }"
                           :value="wishStatistics.standardWish.fiveStarAverage"/>
              <a-statistic title="角色占比" :precision="2" suffix="%" :value-style="{ color: wishStatistics.standardWish.fiveStarCharacterRatio < 0.5 ? badColor : goodColor }"
                           :value="wishStatistics.standardWish.fiveStarCharacterRatio * 100"/>
              <a-statistic title="武器占比" :precision="2" suffix="%" :value-style="{ color: wishStatistics.standardWish.fiveStarWeaponRatio > 0.5 ? badColor : goodColor }"
                           :value="wishStatistics.standardWish.fiveStarWeaponRatio * 100"/>
            </div>
          </a-card>
          <a-card title="四星统计信息">
            <template #extra>
              <a-typography-text type="secondary">共 {{ wishStatistics.standardWish.fourStarNumber }} 个
              </a-typography-text>
            </template>
            <div class="result-statistic-incard">
              <a-statistic title="平均抽数" :precision="2" :value-style="{ color: wishStatistics.standardWish.fourStarAverage > 7.6589 ? badColor : goodColor }"
                           :value="wishStatistics.standardWish.fourStarAverage"/>
              <a-statistic title="角色占比" :precision="2" suffix="%" :value-style="{ color: wishStatistics.standardWish.fourStarCharacterRatio < 0.5 ? badColor : goodColor }"
                           :value="wishStatistics.standardWish.fourStarCharacterRatio * 100"/>
              <a-statistic title="武器占比" :precision="2" suffix="%" :value-style="{ color: wishStatistics.standardWish.fourStarWeaponRatio > 0.5 ? badColor : goodColor }"
                           :value="wishStatistics.standardWish.fourStarWeaponRatio * 100"/>
            </div>
          </a-card>
        </div>
      </a-typography-paragraph>
        <div id="GenshinStandardChart" class="wish-show-chart" v-show="wishResults.standardWish.length !== 0"></div>
    </div>
  </div>
</template>
<style>
.wish-show-chart {
  width: 100%;
  height: 60vh;
}

.result-statistic-incard {
  display: flex;
  flex-wrap: wrap;
  gap: 15px 45px;
  align-items: center;
}

.wish-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 15px 20px;
  align-items: center;
}

.detail-drawer {
  width: 100%;
  padding: 0 200px;

  @media screen and (max-width: 992px) {
    padding: 0 20px;
  }
}
</style>