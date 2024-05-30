<script setup>
</script>
<template>
  <div style="position: relative;display: flex;width: 100%;justify-content: center;">
    <div class="title-image-container" style="width: 90vw;height: 90vh;">
      <img class="image" src="https://www.jd-link.com/uploadfiles/2022/03/%E4%B8%AD%E8%8D%AF%E6%9D%90.jpg">
    </div>
    <p id="home-title">药典可视</p>
    <p id="home-subtitle">中药药典可视化成果展示</p>
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