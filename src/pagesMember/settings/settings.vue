<script lang="ts" setup></script>

<template>
  <div class="settings">
    <view class="set-con">
      <view class="set-msg">
        <img class="img" src="http://localhost:3000/icon.png" alt="" />
        <view class="content">
          <text class="person-msg">个人信息</text>
          <view class="more-msg">头像、昵称、收货地址等</view>
        </view>
      </view>
      <view class="set-msg">
        <img class="img" src="http://localhost:3000/icon-2.png" alt="" />
        <view class="content">
          <text class="person-msg">账户与安全</text>
          <view class="more-msg">修改密码、修改手机号、账号绑定管理</view>
        </view>
      </view>
      <view class="set-msg">
        <img class="img" src="http://localhost:3000/icon-1.png" alt="" />
        <view class="content">
          <text class="person-msg">支付设置</text>
        </view>
      </view>
      <view class="set-msg">
        <img class="img" src="http://localhost:3000/icon-3.png" alt="" />
        <view class="content">
          <text class="person-msg">开启通知</text>
        </view>
      </view>
      <view class="set-msg">
        <img class="img" src="http://localhost:3000/icon-4.png" alt="" />
        <view class="content">
          <text class="person-msg">常见问题</text>
        </view>
      </view>
      <view class="btn"> 退出当前账号 </view>
    </view>
  </div>
</template>

<style scoped lang="scss">
.settings {
  background-color: #f8f9fa;
  height: 100vh;

  .set-con {
    padding: 10px 15px 0;
    .set-msg {
      display: flex;
      align-items: center;
      padding: 20px 10px;
      margin-bottom: 10px;
      background-color: #fff;
      .img {
        width: 40px;
        height: 40px;
      }

      .content {
        padding-left: 10px;
        .person-msg {
          font-size: 14px;
          letter-spacing: 1px;
        }

        .more-msg {
          margin-top: 5px;
          font-size: 12px;
          color: #999;
        }
      }
    }

    .btn {
      font-size: 13px;
      color: #fff;
      background-color: #40ae36;
      border-radius: 30px;
      padding: 13px 0;
      text-align: center;
      margin-top: 30px;
    }
  }
}
</style>
