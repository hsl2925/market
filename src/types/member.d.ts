/** 通用的用户信息 */
type BaseProfile = {
  id: number // 用户ID
  avatar: string // 头像
  account: string // 账户名
  nickname?: string // 昵称
}

/** 小程序登录 登录用户信息 */
export type LoginResult = BaseProfile & {
  mobile: string // 手机号
  token: string // 登录凭证
}

/** 个人信息 用户详情信息 */
export type ProfileDetail = BaseProfile & {
  gender?: Gender // 性别
  birthday?: string // 生日
  fullLocation?: string // 省市区
  profession?: string // 职业
}
/** 性别 */
export type Gender = '女' | '男'

/** 个人信息 修改请求体参数 */
export type ProfileParams = Pick<
  ProfileDetail,
  'nickname' | 'gender' | 'birthday' | 'profession'
> & {
  /** 省份编码 */
  provinceCode?: string
  /** 城市编码 */
  cityCode?: string
  /** 区/县编码 */
  countyCode?: string
}
