<script setup>
import {RouterLink} from 'vue-router';
import {onMounted, ref} from 'vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';

const About = ref(false);

onMounted(() => {
});
</script>

<template>
  <a-config-provider :locale="zhCN" :theme="{
      token: {
        colorPrimary: '#1264d8',
        fontFamily: 'MiSans VF, -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, \'Helvetica Neue\', Arial, \'Noto Sans\', sans-serif, \'Apple Color Emoji\', \'Segoe UI Emoji\', \'Segoe UI Symbol\', \'Noto Color Emoji\''
      },
    }">
    <a-app>
      <a-modal v-model:open="About" title="关于项目" :footer="null">
        <span>基于 B 站 UP 主「一棵平衡树」的结论制作。<br>All rights reserved. Infringement will be prosecuted.</span>
      </a-modal>
      <div id="title">
        <div class="title-item">
          <RouterLink to="/" style="color: inherit;"><img style="margin: 0 10px 0 0;width: 50px; height: auto;" src="@/assets/logo.png" alt=""></RouterLink>
          <a-button type="text" size="large" class="title-btn">
            <RouterLink to="/calculate/genshin" style="display: flex;align-items: center">
              <img class="title-path-icon" src="@/assets/calculate-genshin.png" alt="">
              <p class="title-text">原神计算</p></RouterLink>
          </a-button>
          <a-button type="text" size="large" class="title-btn">
            <RouterLink to="/calculate/honkai" style="display: flex;align-items: center;">
              <img class="title-path-icon" src="@/assets/calculate-honkai.png" alt="">
              <p class="title-text">星铁计算</p></RouterLink>
          </a-button>
          <a-button type="text" size="large" class="title-btn">
            <RouterLink to="/emulate/genshin" style="display: flex;align-items: center">
              <img class="title-path-icon" src="@/assets/emulate-genshin.png" alt="">
              <p class="title-text">原神模拟</p></RouterLink>
          </a-button>
          <a-button type="text" size="large" class="title-btn">
            <RouterLink to="/emulate/honkai" style="display: flex;align-items: center">
              <img class="title-path-icon" src="@/assets/emulate-honkai.png" alt="">
              <p class="title-text">星铁模拟</p></RouterLink>
          </a-button>
        </div>
        <div style="display: flex;align-items: center">
          <a-button type="text" size="large" class="title-btn" @click="About = true;">
            <div style="display: flex;align-items: center">
              <img class="title-path-icon" src="@/assets/about-us.png" alt="">
              <p class="title-text">关于项目</p></div>
          </a-button>
        </div>
      </div>
      <div style="width: 100%;height: 70px;"></div>
      <div id="content">
        <RouterView></RouterView>
      </div>
      <div id="footer">
        <div
            style="display: grid;grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));gap: 40px;padding: 100px 0 40px 0">
          <div class="footer-container">
            <p class="footer-title">抽卡解析</p>
            <p class="footer-item"><a>代码仓库</a></p>
            <p class="footer-item"><a>相关结论</a></p>
            <p class="footer-item"><a>研究代码</a></p>
          </div>
          <div class="footer-container">
            <p class="footer-title">数据来源</p>
            <p class="footer-item"><a>米哈游</a></p>
            <p class="footer-item"><a>非小酋</a></p>
            <p class="footer-item"><a>一棵平衡树</a></p>
          </div>
          <div class="footer-container">
            <p class="footer-title">开源支持</p>
            <p class="footer-item"><a>ECharts</a></p>
            <p class="footer-item"><a>Vue</a></p>
            <p class="footer-item"><a>AntdDesign</a></p>
          </div>
        </div>
        <div style="padding-bottom: 100px;">欢迎关注开源仓库<br>数据仅供参考</div>
      </div>
    </a-app>
  </a-config-provider>
</template>
<style>
.sth-container {
  width: 100%;
  padding: 0 200px;

  @media screen and (max-width: 992px) {
    padding: 0 20px;
  }
}

.title-path-icon {
  margin: 0 10px 0 0;
  width: 30px;
  padding-bottom: 15px;
  height: auto;
}

* {
  font-family: MiSans VF, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  letter-spacing: 0.02em;
}

body {
  background-color: #fff;
}

.footer-container {
  margin: 0;
}

.footer-item {
  margin: 10px 0;
}

.footer-item a {
  color: inherit;
}

.footer-title {
  font-weight: bold;
  font-size: large;
  margin: 0 0 20px 0;
}

#footer {
  margin-top: 40px;
  background-color: #0b408b;
  color: white;
  padding: 0 200px;

  @media screen and (max-width: 992px) {
    padding: 0 50px;
  }
}

.title-btn {
  font-weight: bold;
  padding: 6px 15px 4px 6px !important;
  @media screen and (max-width: 992px) {
    padding: 6px 0 4px 0 !important;
  }
}

#title {
  position: fixed;
  z-index: 100;
  width: 100%;
  height: 70px;
  backdrop-filter: blur(40px);
  background-color: hsla(0, 0%, 100%, .8);
  padding-left: 190px;
  padding-right: 190px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 992px) {
    padding: 0 10px;
  }
}

.title-item {
  display: flex;
  gap: 10px;
  align-items: center;
}

.title-text {
  @media screen and (max-width: 992px) {
    display: none;
  }
}
</style>

