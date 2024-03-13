<script setup lang="ts">
import { getCategoryTopAPI } from '@/services/category'
import type { CategoryTopItem } from '@/types/category'
import { onLoad } from '@dcloudio/uni-app'
import { computed, ref, defineComponent } from 'vue'

// 获取分类列表数据
const activeIndex = ref(0)
const categoryList = ref<CategoryTopItem[]>([])
const getCategoryTopData = async () => {
  const res = await getCategoryTopAPI()
  categoryList.value = res.result
}

// 是否数据加载完毕
const isFinish = ref(false)

// 页面加载
onLoad(async () => {
  await Promise.all([getCategoryTopData()])
  isFinish.value = true
})

// 提取当前二级分类数据
const subCategoryList = computed(() => {
  return categoryList.value[activeIndex.value]?.children || []
})
</script>

<template>
  <view class="viewport" v-if="isFinish">
    <!-- 搜索框 -->
    <view class="search">
      <view class="input">
        <text class="icon-search">女靴</text>
      </view>
    </view>
    <!-- 分类 -->
    <view class="categories">
      <!-- 左侧：一级分类 -->
      <scroll-view class="primary" scroll-y>
        <view
          v-for="(item, index) in categoryList"
          :key="item.id"
          class="item"
          :class="{ active: index === activeIndex }"
          @tap="activeIndex = index"
        >
          <text class="name">
            {{ item.name }}
          </text>
        </view>
      </scroll-view>
      <!-- 右侧：二级分类 -->
      <scroll-view enable-back-to-top class="secondary" scroll-y>
        <!-- 内容区域 -->
        <view class="panel" v-for="item in subCategoryList" :key="item.id">
          <view class="title">
            <text class="name">{{ item.name }}</text>
            <navigator class="more" hover-class="none">全部</navigator>
          </view>
          <view class="section">
            <navigator
              v-for="goods in item.goods"
              :key="goods.id"
              class="goods"
              hover-class="none"
              :url="`/pages/goods/goods?id=${goods.id}`"
            >
              <image class="image" :src="goods.picture"></image>
              <view class="name ellipsis">{{ goods.name }}</view>
              <view class="price">
                <text class="symbol">¥</text>
                <text class="number">{{ goods.price }}</text>
              </view>
            </navigator>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
  <PageSkeleton v-else />
</template>

<style lang="scss">
// @import './style/category.scss';
@charset "UTF-8";
page {
  height: 100%;
  overflow: hidden;
}

.viewport {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.search {
  padding: 20rpx 30rpx;
  background-color: #fff;
}

.search .input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64rpx;
  padding-left: 26rpx;
  color: #8b8b8b;
  font-size: 28rpx;
  border-radius: 32rpx;
  background-color: #f3f4f4;
}

.icon-search::before {
  margin-right: 10rpx;
}

/* 分类 */
.categories {
  flex: 1;
  min-height: 400rpx;
  display: flex;
}

/* 一级分类 */
.primary {
  overflow: hidden;
  width: 180rpx;
  flex: none;
  background-color: #f6f6f6;
}

.primary .item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100rpx;
  font-size: 26rpx;
  letter-spacing: 1px;
  color: #595c63;
  position: relative;
}

.primary .item::after {
  content: '';
  position: absolute;
  left: 42rpx;
  bottom: 0;
}

.primary .active {
  background-color: #fff;
}

.primary .active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background-color: #27ba9b;
}

.primary .item:last-child::after,
.primary .active::after {
  display: none;
}

/* 二级分类 */
.secondary {
  background-color: #fff;
}

.secondary .carousel {
  height: 200rpx;
  margin: 0 30rpx 20rpx;
  border-radius: 4rpx;
  overflow: hidden;
}

.secondary .panel {
  margin: 0 30rpx 0rpx;
}

.secondary .title {
  height: 60rpx;
  line-height: 60rpx;
  color: #333;
  font-size: 28rpx;
  border-bottom: 1rpx solid #f7f7f8;
}

.secondary .title .more {
  float: right;
  padding-left: 20rpx;
  font-size: 24rpx;
  color: #999;
}

.secondary .more::after {
  font-family: 'erabbit' !important;
  content: '\e6c2';
}

.secondary .section {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 20rpx 0;
}

.secondary .section .goods {
  width: 150rpx;
  margin: 0rpx 20rpx 20rpx 0;
}

.secondary .section .goods:nth-child(3n) {
  margin-right: 0;
}

.secondary .section .goods .image {
  width: 150rpx;
  height: 150rpx;
}

.secondary .section .goods .name {
  padding: 5rpx;
  font-size: 22rpx;
  color: #333;
}

.secondary .section .goods .price {
  padding: 5rpx;
  font-size: 18rpx;
  color: #cf4444;
}

.secondary .section .goods .number {
  font-size: 24rpx;
  margin-left: 2rpx;
}

</style>
