<script setup>
</script>
<template>
  <div style="position: relative;display: flex;width: 100%;justify-content: center;">
    <div class="title-image-container" style="width: 90vw;height: 90vh;">
      <img class="image" src="https://upload-bbs.miyoushe.com/upload/2024/05/08/191335050/7d4643e830b3041a82f6c79713b0d7da_8402655201927690946.png?x-oss-process=image/auto-orient,0/interlace,1/format,png">
    </div>
    <p id="home-title">抽卡解析</p>
    <p id="home-subtitle">抽卡机制分析和模拟</p>
  </div>
</template>
<style>
.title-image-container {
  overflow: hidden;
}

#home-title {
  position: absolute;
  color: white;
  font-size: 80px;
  font-weight: bold;
  right: 150px;
  bottom: 70px;
  @media screen and (max-width: 992px) {
    writing-mode: vertical-lr;
    font-size: 30px;
    right: 70px;
    bottom: 40px;
  }
}

#home-subtitle {
  position: absolute;
  color: white;
  font-size: 40px;
  font-weight: bold;
  right: 150px;
  bottom: 50px;
  @media screen and (max-width: 992px) {
    writing-mode: vertical-lr;
    font-size: 20px;
    right: 50px;
  }
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>