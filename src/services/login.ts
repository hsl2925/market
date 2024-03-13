import { http } from '@/utils/http'
type LoginItem = {
  id: number // id
  phoneNumber: string // 手机号
  generatedCode: string // 验证码
}

/**
 * 获取验证码
 * @param data 请求体参数
 */
export const postMemberSendCodeAPI = (phoneNumber: string) => {
  return http<LoginItem>({
    method: 'POST',
    url: '/api/sendCode',
    data: {
      phoneNumber,
    },
  })
}

/**
 * 登录接口请求
 * @param data 请求体参数
 */
export const postMemberLoginAPI = (data: LoginItem) => {
  return http<LoginItem>({
    method: 'POST',
    url: '/login',
    data,
  })
}
