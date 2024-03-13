<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getSearchResultAPI } from '@/services/search'
import type { SearchResultItem } from '@/types/search'
import { searchStore } from '@/stores/modules/search'

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

// 获取搜索结果数据
const searchResult = ref<SearchResultItem[]>([])
const getSearchResultData = async () => {
  const res = await getSearchResultAPI()
  searchResult.value = res.result
}

// 返回搜索页
const toSearch = () => {
  uni.navigateBack()
}

// 结果页面直接搜索
const searchCont = ref('')
// 获取搜索页面输入的值，然后渲染到搜索结果页的搜索框中
const sourceStore = searchStore()
const searchText = ref(sourceStore.searchText)
const newSearchText = ref('')

const filteredSearchResult2 = computed(() => {
  if(searchCont.value && searchCont.value.length > 0) {
    return searchResult.value.filter(item => item.name.includes(searchCont.value))
  } else {
    getSearchResultData()
  }
})

// 过滤搜索结果页 @input
const place = ref('')

const filterResults = async () => {
  if (searchText.value && searchText.value.length > 0) {
    searchResult.value = searchResult.value.filter(item => item.name.includes(searchText))
  } else if (searchText === '') {
    searchCont.value = ''
    getSearchResultData()
  }
}

// 搜索页
const filteredSearchResult = computed(() => {
  if(searchText.value && searchText.value.length > 0) {
    return searchResult.value.filter(item => item.name.includes(searchText.value))
  }
})

const handleDelete = () => {
  setTimeout(() => {
    searchText.value = newSearchText.value
  }, 3000)
}

// 页面加载
onMounted(() => {
  getSearchResultData()
})
</script>

<template>
  <!-- 搜索页面搜索关键字跳转 -->
  <view class="search" v-if="searchText">
    <!-- 搜索 -->
    <view class="header_search" :style="{ paddingTop: safeAreaInsets!.top + 'px' }">
      <view class="img" @click="toSearch"><image src="../../static/back.png"></image></view>
      <view class="search_content">
        <text class="icon-search"></text>
        <input type="text" v-model="searchText" @input="handleDelete" :placeholder="place">
      </view>
      <text class="close" @confirm="filterResults()">搜索</text>
    </view>
    <!-- 搜索有数据 -->
    <view class="searchre" v-if="searchText || searchText.length > 0">
      <view class="result" v-if="filteredSearchResult!.length > 0">
        <view class="result_list" v-for="item in filteredSearchResult" :key="item.id">
          <view class="left_img"><image :src="item.imgUrl"></image></view>
            <view class="right_text">
              <view class="name">
                <view class="title">{{ item.name }}</view>
                <text class="title2">{{ item.classify }}</text>
              </view>
              <view class="btn">
                <text class="btn1">{{ item.discound }}</text>
                <text class="btn2">{{ item.hours }}</text>
              </view>
              <view class="price">
                <view class="price_left">
                  <text class="text1">¥{{ item.price }}</text>
                  <text class="text2">{{ item.num }}</text>
                  <text class="text3">¥{{ item.price }}份</text>
                </view>
                <view class="price_card"><image :src="item.cartIcon"></image></view>
              </view>
            </view>
        </view>
      </view>
      <!-- 搜索无数据 -->
      <view class="noStore" v-else>
        <view class="nullstore">
          <view class="logo"><image src="http://localhost:3000/imgno.png" alt="" /></view>
          <view class="searchNull">搜索不到你要找的宝贝呢</view><br>
          <text>换个词试试吧～</text>
        </view>
      </view>
    </view>
  </view>
  <!-- 搜索结果页直接搜索 -->
  <view class="search" v-else-if="searchText === ''">
    <!-- 搜索 -->
    <view class="header_search" :style="{ paddingTop: safeAreaInsets!.top + 'px' }">
      <view class="img" @click="toSearch"><image src="../../static/back.png"></image></view>
      <view class="search_content">
        <text class="icon-search"></text>
        <input type="text" v-model="searchCont" @input="filterResults()" :placeholder="place">
      </view>
      <text class="close" @confirm="filterResults()">搜索</text>
    </view>
    <!-- 无搜索时显示的页面 -->
    <view class="searchre" v-if="searchCont === ''">
      <view class="result">
          <view class="result_list" v-for="item in searchResult" :key="item.id">
            <view class="left_img"><image :src="item.imgUrl"></image></view>
              <view class="right_text">
                <view class="name">
                  <view class="title">{{ item.name }}</view>
                  <text class="title2">{{ item.classify }}</text>
                </view>
                <view class="btn">
                  <text class="btn1">{{ item.discound }}</text>
                  <text class="btn2">{{ item.hours }}</text>
                </view>
                <view class="price">
                  <view class="price_left">
                    <text class="text1">¥{{ item.price }}</text>
                    <text class="text2">{{ item.num }}</text>
                    <text class="text3">¥{{ item.price }}份</text>
                  </view>
                  <view class="price_card"><image :src="item.cartIcon"></image></view>
                </view>
              </view>
          </view>
      </view>
    </view>
    <!-- 搜索结果 -->
    <view class="searchre" v-if="searchCont || searchCont.length > 0">
      <view class="result" v-if="filteredSearchResult2!.length > 0">
        <view class="result_list" v-for="item in filteredSearchResult2" :key="item.id">
          <view class="left_img"><image :src="item.imgUrl"></image></view>
            <view class="right_text">
              <view class="name">
                <view class="title">{{ item.name }}</view>
                <text class="title2">{{ item.classify }}</text>
              </view>
              <view class="btn">
                <text class="btn1">{{ item.discound }}</text>
                <text class="btn2">{{ item.hours }}</text>
              </view>
              <view class="price">
                <view class="price_left">
                  <text class="text1">¥{{ item.price }}</text>
                  <text class="text2">{{ item.num }}</text>
                  <text class="text3">¥{{ item.price }}份</text>
                </view>
                <view class="price_card"><image :src="item.cartIcon"></image></view>
              </view>
            </view>
        </view>
      </view>
      <!-- 搜索无数据 -->
      <view class="noStore" v-else>
        <view class="nullstore">
          <view class="logo"><image src="http://localhost:3000/imgno.png" alt="" /></view>
          <view class="searchNull">搜索不到你要找的宝贝呢</view><br>
          <text>换个词试试吧～</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
// 搜索页
.search {
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
  background-color: #fff;

  .img {
    width: 12px;
    height: 18px;
  }

  .search_content {
    display: flex;
    align-items: center;
    width: 75%;
    padding: 10px 0 10px 20px;
    border-radius: 20px;
    color: #999;
    font-size: 16px;
    background-color: #fff;

    .icon-search {
      padding-right: 10px;
    }
  }

  .close {
    font-size: 14px;
    color: #333;
  }
}
.searchre {
  margin-top: 30px;
  padding: 10px 15px 10px 20px;
  background-color: #fff;
  height: 100%;
}
.result {
  .result_list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left_img {
      width: 37%;
      image{
        width: 110px;
        height: 110px;
        margin-right: 30px;
      }
    }
    .right_text {
      flex: 1;
      color:#333;
      border-bottom: 1px solid #e7e5e5;
      padding-top: 12px;
      .name{
        min-height: 62px;
      }
      .title {
        font-size: 13px;
        line-height: 18px;
        letter-spacing: .5px;
        white-space: wrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .title2 {
        font-size: 11px;
        color:#929090;
      }
      .btn {
        font-size: 10px;
        color: red;
        .btn1 {
          border: .5px solid red;
          margin-right: 5px;
          border-radius: 2px;
          padding: 0 2px;
        }
        .btn2 {
          border: 1px solid  #40ae36;
          color: #40ae36;
          border-radius: 2px;
          padding: 0 2px;
        }
      }
      .price {
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 15px;
        .text1 {
          font-weight: 500;
          color: red;
        }
        .text2 {
          font-size: 12px;
          color:#999;
          padding-right: 4px;
        }
        .text3 {
          font-size: 12px;
          color:#c7c6c6;
          text-decoration: line-through;
        }
        .price_card {
          width: 25px;
          height: 24px;
        }
      }
    }
  }
}

// 搜索无结果
.noStore {
		position: relative;
		height: 60vh;
		text-align: center;

		.nullstore {
			position: absolute;
			top: 50%;
			left: 60%;
			transform: translate(-60%, -30%);

			.logo {
				width: 100px;
				height: 110px;
        padding-bottom: 10px;
        vertical-align: middle;
			}

			p {
				font-size: 13px;
				color: #999;
			}

			.searchNull {
        width: 200px;
				margin-top: 10px;
			}
		}
	}
</style>
