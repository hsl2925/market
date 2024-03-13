<script setup lang="ts">
//import { ref } from 'vue'
import { ref } from 'vue'

const value = ref('')

const iconClick = () => {
  console.log(123)
}
</script>

<template>
    <view>
      <uni-section title="图标" subTitle="使用 prefixIcon / suffixIcon 属性 ,可以自定义输入框左右侧图标" type="line" padding>
			<uni-easyinput prefixIcon="search" v-model="value" placeholder="左侧图标" @iconClick="iconClick">345
			</uni-easyinput>
			<uni-easyinput class="uni-mt-5" suffixIcon="search" v-model="value" placeholder="右侧图标" @iconClick="iconClick">231</uni-easyinput>
		</uni-section>
    <uni-icons type="arrow-left" size="30"></uni-icons>
    </view>
  </template>

<style lang="scss">
.uni-mt-5 {
	margin-top: 5px;
}
</style>
