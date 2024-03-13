<script setup lang="ts">
import { ref } from 'vue'
import Recommend from '@/components/recommend.vue'

// 会员选项
const orderTypes = [
  { type: 1, text: '金额(元)', num: '1' },
  { type: 2, text: '优惠券', num: '2' },
  { type: 3, text: '电子券', num: '3' },
  { type: 4, text: '积分', num: '4' },
]

// 订单选项
const orderLists = [
  { type: 1, text: '待付款', icon: 'http://localhost:3000/待付款.png' },
  { type: 2, text: '待发货', icon: 'http://localhost:3000/待发货.png' },
  { type: 3, text: '待收货', icon: 'http://localhost:3000/待收货.png' },
  { type: 4, text: '待评价', icon: 'http://localhost:3000/待评价.png' },
  { text: '退款/售后', icon: 'http://localhost:3000/退款售后.png' },
]

// 服务选项
const serviceLists = [
  { type: 1, text: '收货地址', icon: 'http://localhost:3000/收货地址.png' },
  { type: 2, text: '足迹', icon: 'http://localhost:3000/足迹.png' },
  { type: 3, text: '我的收藏', icon: 'http://localhost:3000/我的收藏.png' },
  { type: 4, text: '服务中心', icon: 'http://localhost:3000/服务中心.png' },
  { type: 5, text: '在线客服', icon: 'http://localhost:3000/在线客服.png' },
]

const isFirstItemClicked = ref(false)
</script>

<template>
  <view class="profile">
    <view class="my">
      <!-- 个人信息 -->
      <view class="left">
        <img class="avatar" src="http://localhost:3000/img-9.png" alt="" />
        <view class="nickname">
          <view style="font-size: 18px; letter-spacing: 2px">咪咪</view>
          <text style="font-size: 13px">13197607296</text>
        </view>
        <view class="settings">
          <navigator
            url="/pagesMember/settings/settings"
            open-type="navigate"
            hover-class="navigator-hover"
            ><img class="set" src="http://localhost:3000/设置.png" alt="" />
          </navigator>
        </view>
      </view>
      <view class="my-list">
        <view class="list" v-for="v in orderTypes" :key="v.type">
          <view>{{ v.num }}</view>
          <view>{{ v.text }}</view>
        </view>
      </view>
      <!-- 我的订单 -->
      <view class="order">
        <view class="header">
          <view class="my-order">我的订单</view>
          <view class="order-all">
            <navigator
              style="margin-right: 5px"
              class="navigator"
              url="/pagesOrder/list/list?type=0"
              hover-class="none"
              >全部订单
            </navigator>
            <img class="img" src="http://localhost:3000/箭头.png" alt="" />
          </view>
        </view>
        <view class="state">
          <navigator
            class="list"
            v-for="v in orderLists"
            :key="v.type"
            :url="`/pagesOrder/list/list?type=${v.type}`"
            hover-class="none"
            ><img class="order-img" :src="v.icon" alt="" />
            <view>{{ v.text }}</view>
          </navigator>
        </view>
      </view>
      <!-- 我的服务 -->
      <view class="service">
        <view class="header">
          <view class="my-service">我的服务</view>
        </view>
        <view class="service-list">
          <view class="list" v-for="(v, index) in serviceLists" :key="index">
            <navigator
              v-if="index === 0 && !isFirstItemClicked"
              url="/pagesMember/address/address"
              open-type="navigate"
              hover-class="navigator-hover"
              @click="isFirstItemClicked = true"
            >
              <image class="order-img" :src="v.icon" alt="" />
            </navigator>
            <image v-else class="order-img" :src="v.icon" alt="" />
            <view>{{ v.text }}</view>
          </view>
        </view>
      </view>
      <!-- 为你推荐 -->
      <img class="image" src="http://localhost:3000/tit.png" alt="" />
      <!-- 推荐列表 -->
      <Recommend />
    </view>
  </view>
</template>

<style lang="scss">
.profile {
  height: 100vh;
  background-color: #f8f9fa;
}

.my {
  background: url('http://localhost:3000/topbg.png');
  width: 100%;
  height: 260px;
  background-repeat: no-repeat;
  background-size: 100% 100%;

  .left {
    display: flex;
    align-items: center;
    padding-top: 60px;
    margin-left: 10px;

    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }

    .nickname {
      margin-left: 10px;
      color: #fff;
    }

    .settings {
      padding-left: 180px;
      .set {
        width: 23px;
        height: 21px;
      }
    }
  }

  .my-list {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .list {
      padding: 20px;
      text-align: center;
      color: #fff;
      font-size: 12px;
      letter-spacing: 1px;
    }
  }

  .order {
    background-color: #fff;
    border-radius: 10px;
    margin: 10px 13px;

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 15px 10px 20px;

      .my-order {
        font-size: 14px;
        color: #000;
        letter-spacing: 1px;
      }

      .order-all {
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #666;

        .img {
          width: 7px;
          height: 10px;
        }
      }
    }

    .state {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 15px 12px 15px;

      .list {
        text-align: center;
        color: #999;
        font-size: 12px;
        letter-spacing: 1px;

        .order-img {
          padding-bottom: 5px;
          width: 25px;
          height: 24px;
        }
      }
    }
  }
  // 我的服务
  .service {
    background-color: #fff;
    border-radius: 10px;
    margin: 10px 13px;

    .header {
      padding: 15px 10px 20px;
      .my-service {
        font-size: 14px;
        color: #000;
        letter-spacing: 1px;
      }
    }

    .service-list {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 15px 12px 15px;

      .list {
        text-align: center;
        color: #999;
        font-size: 12px;
        letter-spacing: 1px;

        .order-img {
          padding-bottom: 5px;
          width: 23px;
          height: 25px;
        }
      }
    }
  }
  // 为你推荐
  .image {
    padding-left: 30%;
    padding-top: 20px;
    padding-bottom: 20px;
    width: 38%;
    height: 16px;
  }
}
</style>
