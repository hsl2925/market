<script setup lang="ts">
import { ref } from 'vue'
import { postMemberSendCodeAPI, postMemberLoginAPI } from '@/services/login'
import { useMemberStore } from '@/stores'
import type { LoginResult } from '@/types/member'
import { onLoad } from '@dcloudio/uni-app'

// 手机号 验证码
let phoneNumber = ''
let generatedCode = ''

// 获取验证码
// onLoad(async () => {
//   const res = await postMemberSendCodeAPI(phoneNumber)
//   generatedCode = res.code
// })
let code = ''
const sendCode = async () => {
  try {
    const res = await postMemberSendCodeAPI('17777028446')
    code = res.code
    console.log(res.code)
  } catch (error) {
    console.error('请求失败', error)
  }
}

// 验证码倒计时
const countdown = ref(0)
const buttonText = ref('获取验证码')

const getCode = async () => {
  if (countdown.value === 0) {
    countdown.value = 60
    buttonText.value = `${countdown.value}s后再次获取`
    sendCode()

    const timer = setInterval(() => {
      countdown.value--
      if (countdown.value === 0) {
        clearInterval(timer)
        buttonText.value = '获取验证码'
      } else {
        buttonText.value = `${countdown.value}s后再次获取`
      }
    }, 1000)
  }
}

// 登录
const loginSuccess = (profile: LoginResult) => {
  if (code) {
    // 保存会员信息
    const memberStore = useMemberStore()
    memberStore.setProfile(profile)
    // 成功提示
    uni.showToast({ icon: 'success', title: '登录成功' })
    setTimeout(() => {
      // 页面跳转
      uni.switchTab({ url: '/pages/index/index' })
      uni.navigateBack()
    }, 500)
  }
}

// const toLogin = () => {
//   if (code) {
//     loginSuccess
//   }
// }

// 页面加载
// onLoad(() => {
//   sendCode()
// })
</script>

<template>
  <view class="login_page">
    <view class="login">手机号码登录</view>
    <view class="inputBox">
      <input
        type="text"
        placeholder="请输入手机号码"
        v-model="phoneNumber"
        placeholder-style="color:#CCC8C8"
      />
    </view>
    <view class="inputBox">
      <input
        type="text"
        placeholder="请输入手机验证码"
        v-model="generatedCode"
        placeholder-style="color:#CCC8C8"
      />
      <button class="btn-countdown" @click="getCode" :disabled="countdown > 0">
        {{ buttonText }}
      </button>
    </view>
    <view class="btn" @click="loginSuccess"> 登录 </view>
    <view class="toRegister">
      <view class="newperson">新用户注册</view>
    </view>
    <view class="moreLogin">
      <view class="more">其它登录方式</view>
      <view class="weizhi">
        <image src="../../static/微信.png" mode="scaleToFill" />
        <image src="../../static/QQ.png" mode="scaleToFill" />
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.login_page {
  height: 100vh;
}
.login {
  margin: 120px 0 54px 20px;
  font-size: 20px;
  font-weight: 500;
  color: #000;
}

.inputBox {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 15px;
  margin: 20px 20px;

  .btn-countdown {
    background-color: #40ae36;
    font-size: 30rpx;
    color: #fff;
  }
}

.input {
  display: inline-block;
  height: 120px;
  font-size: 13px;
  letter-spacing: 1px; // 调整文字间距
}

.btn {
  margin: 30px 20px 0;
  background-color: #8cce86;
  border-radius: 30px;
  padding: 15px 20px;
  text-align: center;
  color: #fff;
  font-size: 14px;
}

.newperson {
  margin-top: 20px;
  font-size: 14px;
  color: #666;
  text-align: center;
  letter-spacing: 1px; // 调整文字间距
}

.moreLogin {
  position: relative;
  bottom: 0;
  left: 25%;
  top: 200px;

  .more {
    font-size: 13px;
    color: #999;
    padding-left: 15%;
    margin-bottom: 20px;
  }
}

.weizhi {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;

  image {
    width: 50px;
    height: 50px;
  }
}
</style>
