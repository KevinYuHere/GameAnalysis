<script setup>
import {RouterLink} from 'vue-router';
import {ref} from 'vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';


const About = ref(false);
</script>

<template>
  <a-config-provider :locale="zhCN" :theme="{
      token: {
        colorPrimary: '#45746a',
        fontFamily: 'MiSans VF, -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, \'Helvetica Neue\', Arial, \'Noto Sans\', sans-serif, \'Apple Color Emoji\', \'Segoe UI Emoji\', \'Segoe UI Symbol\', \'Noto Color Emoji\''
      },
    }">
    <a-app>
      <a-modal v-model:open="About" title="关于我们" :footer="null">
        <span>基于 B 站 UP 主「一棵平衡树」的结论制作。<br>All rights reserved. Infringement will be prosecuted.</span>
      </a-modal>
      <div id="title">
        <div class="title-item">
          <RouterLink to="/" style="color: inherit;"><img style="margin: 0 10px 0 0;width: 133px; height: auto;" src="@/assets/logo.png" alt=""></RouterLink>
          <a-button type="text" size="large" class="title-btn">
            <RouterLink to="/intro" style="display: flex;align-items: center">
              <svg class="title-svg" xmlns="http://www.w3.org/2000/svg"
                   xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024">
                <path d="M839.2 278.1a32 32 0 0 0-30.4-22.1H736V144c0-17.7-14.3-32-32-32H320c-17.7 0-32 14.3-32 32v112h-72.8a31.9 31.9 0 0 0-30.4 22.1L112 502v378c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V502l-72.8-223.9zM360 184h304v72H360v-72zm480 656H184V513.4L244.3 328h535.4L840 513.4V840zM652 572H544V464c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v108H372c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h108v108c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V636h108c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z" fill="currentColor"></path>
              </svg>
              <p class="title-text">简要介绍</p></RouterLink>
          </a-button>
          <a-button type="text" size="large" class="title-btn">
            <RouterLink to="/medical" style="display: flex;align-items: center">
              <img src="@/assets/calculate-konkai.png">
              <p class="title-text">经典名方</p></RouterLink>
          </a-button>
          <a-button type="text" size="large" class="title-btn">
            <RouterLink to="/history" style="display: flex;align-items: center">
              <svg class="title-svg" xmlns="http://www.w3.org/2000/svg"
                   xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
                <path d="M9 5v.38c-.83-.33-1.72-.5-2.61-.5c-1.42 0-2.84.43-4.05 1.29c-.51.36-.57 1.09-.13 1.53l2.57 2.57h1.11v1.11c.86.86 1.98 1.31 3.11 1.36V15H7c-.55 0-1 .45-1 1v2c0 1.1.9 2 2 2h10c1.66 0 3-1.34 3-3V5c0-.55-.45-1-1-1H10c-.55 0-1 .45-1 1zm-1.11 5.41V8.26H5.61L4.57 7.22a5.07 5.07 0 0 1 1.82-.34c1.34 0 2.59.52 3.54 1.46l1.41 1.41l-.2.2a2.7 2.7 0 0 1-1.92.8c-.47 0-.93-.12-1.33-.34zM19 17c0 .55-.45 1-1 1s-1-.45-1-1v-1c0-.55-.45-1-1-1h-5v-2.59c.57-.23 1.1-.57 1.56-1.03l.2-.2L15.59 14H17v-1.41l-6-5.97V6h8v11z" fill="currentColor"></path>
              </svg>
              <p class="title-text">历史传承</p></RouterLink>
          </a-button>
        </div>
        <div style="display: flex;align-items: center">
          <a-button type="text" size="large" class="title-btn" @click="About = true;">
            <div style="display: flex;align-items: center">
              <svg class="title-svg" xmlns="http://www.w3.org/2000/svg"
                   xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
                <g fill="none">
                  <path
                      d="M12 1.999c5.524 0 10.002 4.478 10.002 10.002c0 5.523-4.478 10.001-10.002 10.001C6.476 22.002 2 17.524 2 12.001C1.999 6.477 6.476 1.999 12 1.999zm0 1.5a8.502 8.502 0 1 0 0 17.003A8.502 8.502 0 0 0 12 3.5zm-.004 7a.75.75 0 0 1 .744.648l.007.102l.004 5.502a.75.75 0 0 1-1.494.102l-.006-.101l-.004-5.502a.75.75 0 0 1 .75-.75zm.005-3.497a.999.999 0 1 1 0 1.997a.999.999 0 0 1 0-1.997z"
                      fill="currentColor"></path>
                </g>
              </svg>
              <p class="title-text">关于我们</p></div>
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
* {
  font-family: MiSans VF, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  letter-spacing: 0.02em;
}

body {
  background-color: #fff;
}

.title-svg {
  width: 40px;
  height: 40px;
  padding-bottom: 15px
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
  background-color: #45746a;
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

