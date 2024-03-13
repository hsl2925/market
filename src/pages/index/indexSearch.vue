<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getSearchListAPI } from '@/services/search'
import type { SearchListItem } from '@/types/search'
import { searchStore } from '@/stores/modules/search'

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

// 获取搜索数据
const searchList = ref<SearchListItem[]>([])
const getSearchListData = async () => {
  const res = await getSearchListAPI()
  searchList.value = res.result
}

// 获取 Pinia store
const sourceStore = searchStore()

// 点击查询
const searchHistory = ref([])
const searchText = ref('') // input的keyword

const toSearch = () => {
  const searchKeyword = searchText.value
  sourceStore.setData(searchKeyword)
  saveSearchKeyword(searchKeyword) // 保存搜索关键词到本地存储中
  loadSearchHistory() // 重新加载搜索历史
  // 跳转搜索页面
  uni.navigateTo({
    url: `/pages/index/component/searchList`
  })
}

// 点击历史搜索数据显示到搜索框里面
const handleKeywordClick = (keyword: string) => {
  searchText.value = keyword
  sourceStore.setData(keyword)
  toSearch() // 立即执行搜索跳转
}

// 从本地存储加载搜索历史数据
const loadSearchHistory = () => {
  const history = getSearchHistory()
  searchHistory.value = history || []
}

// 保存搜索关键词到本地存储中
const saveSearchKeyword = (keyword: string) => {
  if (keyword.trim() === '') {
    return
  } else {
    const history = getSearchHistory()

    if (!history.includes(keyword)) {
      history.push(keyword)
      setSearchHistory(history)
    }
  }
}

// 从本地存储获取搜索的历史数据
const getSearchHistory = () => {
  return uni.getStorageSync('searchHistory') || []
}

// 搜索历史数据保存到本地存储当中
const setSearchHistory = (searchHistory: any[]) => {
  uni.setStorageSync('searchHistory', searchHistory)
}

// 返回首页
const toIndex = () => {
  uni.navigateBack()
}

// 删除历史搜索数据
const removeHistoryProduct = () => {
  uni.showModal({
    title: '温馨提示',
    content: '您确定要清空搜索记录吗？',
  })
  .then(() => {
    searchHistory.value = [] // 直接赋空数组清空搜索历史
    uni.removeStorageSync('searchHistory') // 清空本地存储中的搜索历史
  })
  .catch(() => {
    // 取消
  })
}

// 页面加载时加载搜索历史
onMounted(() => {
  getSearchListData()
  loadSearchHistory()
})
</script>

<template>
  <view class="insearch">
    <!-- 搜索 -->
    <view class="header_search" :style="{ paddingTop: safeAreaInsets!.top + 'px' }">
      <view class="img" @click="toIndex"><image src="../../static/back.png"></image></view>
      <view class="search_content" >
        <text class="icon-search"></text>
        <input type="text" v-model="searchText" @confirm="toSearch" placeholder="吃出美好生活">
      </view>
      <text class="close">取消</text>
    </view>
    <!-- 搜索历史 -->
    <view class="search_name">
      <view class="history">
        <view class="title">
          <view class="header">
            <text class="left">历史搜索</text>
            <view class="img" @click="removeHistoryProduct"><image src="../../static/delete.png"></image></view>
          </view>
          <text class="list" v-for="keyword in searchHistory" @click="handleKeywordClick(keyword)" :key="keyword">{{ keyword }}</text>
        </view>
      </view>
      <!-- 实时热搜 -->
      <view class="history">
        <view class="title">
          <view class="header">
            <text class="left">实时热搜</text>
          </view>
          <text class="list" v-for="item in searchList" :key="item.id">{{ item.name }} </text>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.insearch {
  margin-top: 20px;
  height: 100vh;
  background-color: #f8f9fa;
}
.header_search {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 50px;
  margin: 10px 0;

  .img {
    width: 12px;
    height: 18px;
  }

  .search_content {
    display: flex;
    align-items: center;
    width: 75%;
    background-color: #fff;
    padding: 10px 0 10px 20px;
    border-radius: 20px;
    color: #999;
    font-size: 16px;

    .icon-search {
      padding-right: 10px;
    }
  }

  .close {
    font-size: 14px;
    color: #333;
  }
}

// 搜索历史
.search_name {
  height: 100vh;
  background-color: #fff;
  margin-top: 30px;

  .history {
    margin-bottom: 15px;
    .title {
      padding: 15px 10px 0;
      background-color: #fff;
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;

        .left {
          font-size: 14px;
          font-weight: 500;
          color: #000;
        }

        .img {
          width: 16px;
          height: 16px;
        }
      }

      .list {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        display: inline-block;
        padding: 6px 18px;
        margin-bottom: 10px;
        margin-right: 10px;
        background-color: #f8f9fa;
        font-size: 12px;
        color: #333;
        border-radius: 20px;
      }
    }
  }
}
</style>
