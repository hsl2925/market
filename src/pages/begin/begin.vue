<script setup lang="ts">
//
</script>

<template>
  <view class="begin-page">
    <view class="top">
      <view class="welcom">欢迎来到生鲜!</view>
      <view class="tabs"
        >无论您身在何处，我们都会为您提供您喜爱的食物，以满足您的食物需求，这里是一些文字描述</view
      >
      <view class="begin">现在开始</view>
    </view>
    <view class="img"><image src="../../static/img-begin.png" mode="scaleToFill" /></view>
  </view>
</template>

<style lang="scss" scoped>
.begin-page {
  height: 100vh;

  .top {
    margin: 0 25px;
    .welcom {
      padding-top: 120px;
      font-size: 30px;
      font-weight: 500;
      letter-spacing: 2px;
      margin-bottom: 20px;
    }

    .tabs {
      margin-bottom: 35px;
      font-size: 16px;
      color: #999;
      line-height: 25px;
    }

    .begin {
      width: 50%;
      background-color: #40ae36;
      border-radius: 25px;
      color: #fff;
      font-size: 13px;
      padding: 13px 35px;
      text-align: center;
      letter-spacing: 1px;
    }
  }

  .img {
    position: relative;
    bottom: 0;
    top: 180px;
    width: 100%;
    height: 300px;
  }
}
</style>
