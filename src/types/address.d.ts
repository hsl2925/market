/** 添加收货地址: 请求参数 */

export type AddressParams = {
  receiver: string // 收货人姓名
  contact: string // 联系方式
  provinceCode: string // 省份编码
  cityCode: string // 城市编码
  countyCode: string // 区/县编码
  address: string // 详细地址
  isDefault: number // 默认地址，1为是，0为否
  id: number // 收货地址 id
}

/** 收货地址项 */
export type AddressItem = AddressParams & {
  id: string // 收货地址 id
  fullLocation: string // 省市区
}
