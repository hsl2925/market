<script setup lang="ts">
import { ref } from 'vue'
import { getRecommendListAPI } from '@/services/recommend'
import type { RecommendListItem } from '@/types/recommend'
import { onLoad } from '@dcloudio/uni-app'

// 1. 获取首页列表数据
const recommendList = ref<RecommendListItem[]>([])
const getRecommendListData = async () => {
  const res = await getRecommendListAPI()
  recommendList.value = res.result
  console.log(res.result)
}

// 页面加载
onLoad(() => {
  getRecommendListData()
})
</script>

<template>
  <view class="recommend">
    <navigator
      class="list"
      v-for="item in recommendList"
      :key="item.id"
      :url="`/pages/goods/goods?id=${item.id}`"
    >
      <img class="img" :src="item.imgUrl" alt="" />
      <view class="title">{{ item.name }}</view>
      <view class="tags">
        <text class="discound">{{ item.discound }}</text>
        <text class="hours">{{ item.hours }}</text>
      </view>
      <view class="price">
        <view class="left">
          <text class="priceTag">{{ item.priceTag }}</text>
          <text class="store">{{ item.price }}</text>
          <text class="num">{{ item.num }}</text>
        </view>
        <img class="icon" :src="item.cartIcon" alt="" />
      </view>
    </navigator>
  </view>
</template>

<style lang="scss" scoped>
.recommend {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .list {
    width: 49%;
    display: flex;
    flex-direction: column;
    padding: 10px 15px;
    background-color: #fff;
    border-radius: 5px;
    margin-bottom: 10px;

    .img {
      text-align: center;
      display: block;
      width: 100%;
      height: 100px;
      padding-bottom: 10px;
    }

    .title {
      margin-bottom: 10px;
      font-size: 13px;
      font-weight: 500;
      color: #000;
      letter-spacing: 1px;
    }

    .tags {
      font-size: 8px;
      .discound {
        padding: 0 1px;
        border: 0.5px solid #f67147;
        color: #f67147;
        border-radius: 3px;
        letter-spacing: 1px;
      }

      .hours {
        padding: 0 1px;
        margin-left: 5px;
        border: 0.5px solid #40ae36;
        color: #40ae36;
        border-radius: 3px;
        letter-spacing: 1px;
      }
    }

    .price {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 15px;
      .left {
        .priceTag {
          font-size: 10px;
          color: #f67147;
          font-weight: 600;
        }

        .store {
          font-size: 14px;
          color: #f67147;
          font-weight: 600;
        }
        .num {
          font-size: 11px;
          color: #999;
        }
      }
      .icon {
        width: 25px;
        height: 25px;
      }
    }
  }
}
</style>
