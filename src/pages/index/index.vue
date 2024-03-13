<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import {
  getIndexListAPI,
  getIndexImageAPI,
  getCheapAPI,
  getTabAPI,
  getStoreCategoryAPI,
} from '@/services/indexList'

import type {
  IndexListItem,
  CheapListItem,
  TabListItem,
  StoreCategoryListItem,
} from '@/types/indexList'

import Recommend from '@/components/recommend.vue'

// 1. 获取首页列表数据
const indexList = ref<IndexListItem[]>([])
const getIndexListData = async () => {
  const res = await getIndexListAPI()
  indexList.value = res.result
}

// 2. 获取首页列表图片
const indexImages = ref([])
const getIndexImageData = async () => {
  const res = await getIndexImageAPI()
  indexImages.value = res.result as never[]
}

// 3. 获取超划算数据
const indexcheap = ref<CheapListItem[]>([])
const getIndexCheapData = async () => {
  const res = await getCheapAPI()
  indexcheap.value = res.result
}

// 4. tab
const indextab = ref<TabListItem[]>([])
const getIndexTabData = async () => {
  const res = await getTabAPI()
  indextab.value = res.result
}

// 5. 四季商品分类
const indexall = ref<StoreCategoryListItem[]>([])
const getStoreCategoryData = async () => {
  const res = await getStoreCategoryAPI()
  indexall.value = res.result
}

// 动态类点击绑定
const toggleActive = (index: number) => {
  if (index >= 0 && index < indexall.value.length) {
    indexall.value.forEach((item, i) => {
      item.isActive = false // 将所有列表项的 isActive 设置为 false
    })
    indexall.value[index].isActive = true // 将指定索引的列表项的 isActive 设置为 true
  }
}

// 搜索页
const toSearch = () => {
  uni.navigateTo({
    url: '/pages/index/indexSearch',
  })
}

// 页面加载
onLoad(() => {
  getIndexListData()
  getIndexImageData()
  getIndexCheapData()
  getIndexTabData()
  getStoreCategoryData()
})
</script>

<template>
  <view class="header">
    <view class="search" @click="toSearch">
      <text class="icon-search"></text>
      <text>吃出美好生活</text>
    </view>
  </view>
  <div class="index">
    <view>
      <image class="logo-image" src="../../static/images/ban.png"></image>
    </view>
    <!-- 分类列表 -->
    <view class="list">
      <view class="name-list" v-for="item in indexList" :key="item.id">
        <view><img class="img" :src="item.imgUrl" alt="" /></view>
        <view class="name">{{ item.name }}</view>
      </view>
    </view>
    <!-- 超划算 -->
    <view class="cheap">
      <view class="cheap_header">
        <view class="left">
          <text class="title">超划算</text>
          <text class="see">冬日礼遇</text>
        </view>
        <view class="right">
          <text>查看全部</text>
        </view>
      </view>
      <view class="cheap_content">
        <view class="cheap_list" v-for="item in indexcheap" :key="item.id">
          <img class="img" :src="item.imgUrl" alt="" />
          <view class="name">{{ item.name }}</view>
          <view class="price">
            <view class="left">
              <text class="priceTag">{{ item.priceTag }}</text>
              <text>{{ item.price }}</text>
            </view>
            <img class="carticon" :src="item.imgCart" alt="" />
          </view>
        </view>
      </view>
    </view>
    <!-- tab -->
    <view class="tab">
      <view class="indextab" v-for="item in indextab" :key="item.id">
        <view class="tabs">
          <view class="title">
            <text class="name">{{ item.name }}</text>
            <view class="type">{{ item.type }}</view>
          </view>
          <view class="img">
            <img class="img_left" :src="item.imgUrl" alt="" />
            <img class="img_right" :src="item.imgUrl1" alt="" />
          </view>
        </view>
      </view>
    </view>
    <!-- indexall -->
    <view class="tabList">
      <view class="tabcon">
        <view class="list" v-for="(item, index) in indexall" :key="index">
          <view class="name" :class="{ 'name-active': item.isActive }" @click="toggleActive(index)">
            {{ item.name }}
          </view>
          <text class="type" :class="{ 'type-active': item.isActive }" @click="toggleActive(index)">
            {{ item.type }}
          </text>
        </view>
      </view>
    </view>
    <!-- 推荐列表 -->
    <Recommend />
  </div>
</template>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 50px;
  background-color: #fff;

  .search {
    background-color: #edeff2;
    padding: 10px 20px;
    margin: 10px 13px 0;
    border-radius: 20px;
    color: #999;
    font-size: 16px;

    .icon-search {
      padding-right: 10px;
    }
  }
}
.index {
  padding: 0 13px;
  background-color: #f8f9fa;
  height: 100%;

  .logo-image {
    height: 130px;
  }

  // 分类列表
  .list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0;
    .name-list {
      .img {
        width: 50px;
        height: 50px;
      }

      .name {
        margin-top: 10px;
        font-size: 13px;
        color: #333;
      }
    }
  }

  // 超划算
  .cheap {
    padding: 10px 15px;
    border-radius: 10px;
    background-color: #fff;

    .cheap_header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .left {
        display: flex;
        align-items: center;
        .title {
          font-size: 16px;
          font-weight: 500;
          color: #000;
        }
        .see {
          margin-left: 5px;
          padding: 1px 3px;
          font-size: 10px;
          color: #fff;
          background-color: #ec9f09;
          border-radius: 3px;
        }
      }

      .right {
        color: #40ae36;
        font-size: 13px;
        font-weight: 600;
      }
    }
    .cheap_content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 18px;
      width: 100%;
      .cheap_list {
        width: 30%;
        .img {
          margin-bottom: 15px;
          width: 92px;
          height: 92px;
        }

        .name {
          margin-bottom: 8px;
          font-size: 13px;
          color: #666;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .price {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .left {
            color: #f55726;

            .priceTag {
              font-size: 11px;
            }
          }
          .carticon {
            width: 23px;
            height: 23px;
          }
        }
      }
    }
  }

  // tabs
  .tab {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    width: 100%;

    .indextab {
      width: 48%;
      background-color: #fff;
      padding: 10px 20px 25px;
      border-radius: 10px;

      .tabs {
        .title {
          .name {
            color: #666;
            font-size: 16px;
            font-weight: 600;
          }
          .type {
            margin-top: 5px;
            font-size: 13px;
            color: #999;
          }
        }
        .img {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 20px;
          .img_left,
          .img_right {
            width: 52px;
            height: 43px;
          }
        }
      }
    }
  }

  // 全部
  .tabList {
    .tabcon {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      text-align: center;
      .list {
        width: 25%;
        display: block;

        .name {
          margin-bottom: 2px;
          font-size: 14px;
        }

        .type {
          color: #999;
          font-size: 12px;
        }
        .type-active {
          color: #fff;
          background-color: #40ae36;
          border-radius: 10px;
          padding: 0 8px;
        }

        .name-active {
          color: #40ae36;
        }
      }
    }
  }
}
</style>
