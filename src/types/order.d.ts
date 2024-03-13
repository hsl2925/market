import type { OrderState } from '@/services/constants'
import type { AddressItem } from './address'
import type { PageParams } from '@/types/global'

/** 获取预付订单 返回信息 */
export type OrderPreResult = {
  /** 商品集合 [ 商品信息 ] */
  goods: OrderPreGoods[]
  /** 结算信息 */
  summary: {
    totalPrice: number // 商品总价
    postFee: number // 邮费
    totalPayPrice: number // 应付金额
  }
  /** 用户地址列表 [ 地址信息 ] */
  userAddresses: AddressItem[]
}

/** 商品信息 */
export type OrderPreGoods = {
  /** 属性文字，例如“颜色:瓷白色 尺寸：8寸” */
  attrsText: string
  count: number // 数量
  id: string // id
  name: string // 商品名称
  payPrice: string // 实付单价
  picture: string // 图片
  price: string // 原单价
  skuId: string // SKUID
  totalPayPrice: string // 实付价格小计
  totalPrice: string // 小计总价
  quantity: string
  image: string
}

/** 提交订单 请求参数 */
export type OrderCreateParams = {
  addressId: string // 所选地址Id
  receiverContact: string
  receiverMobile: string
  provinceCode: string
  cityCode: string
  countyCode: string
  receiverAddress: string
  /** 配送时间类型，1为不限，2为工作日，3为双休或假日 */
  deliveryTimeType: number
  buyerMessage: string // 订单备注
  /** 商品集合[ 商品信息 ] */
  skus: {
    spuId: string // skuId
  }[]
  /** 支付渠道：支付渠道，1支付宝、2微信--支付方式为在线支付时，传值，为货到付款时，不传值 */
  payChannel: 1 | 2
  /** 支付方式，1为在线支付，2为货到付款 */
  payType: 1 | 2
  orderState: OrderState
  totalMoney: number
  payMoney: number
  countdown: number
}
1
/** 提交订单 返回信息 */
export type OrderCreateResult = {
  id: string // 订单Id
}

/** 订单详情 返回信息 */
export type OrderResult = {
  id: string // 订单编号
  /** 订单状态，1为待付款、2为待发货、3为待收货、4为待评价、5为已完成、6为已取消 */
  orderState: OrderState
  /** 倒计时--剩余的秒数 -1 表示已经超时，正数表示倒计时未结束 */
  countdown: number
  /** 商品集合 [ 商品信息 ] */
  skus: OrderSkuItem[]
  receiverContact: string // 收货人
  receiverMobile: string // 收货人手机
  receiverAddress: string // 收货人地址
  createTime: string // 下单时间
  totalMoney: string // 商品总价
  postFee: number // 运费
  payMoney: string // 应付金额
}

/** 商品信息 */
export type OrderSkuItem = {
  id: string // sku id
  spuId: string // 商品 id
  name: string // 商品名称
  attrsText: Array // 商品属性文字
  quantity: number // 数量
  curPrice: string // 购买时单价
  picture: string // 图片地址
}

/** 物流信息 返回值类型 */
export type OrderLogisticResult = {
  /** 快递公司 */
  company: {
    name: string // 公司名称
    number: string // 快递编号
    tel: string // 联系电话
  }
  /** 商品件数 */
  count: number
  /** 物流日志 */
  list: LogisticItem[]
}

/** 物流日志 */
export type LogisticItem = {
  id: string // 信息ID
  text: string // 信息文字
  time: string // 时间
}

/** 订单列表参数 */
export type OrderListParams = PageParams & { orderState: number }

/** 订单列表 */
export type OrderListResult = {
  counts: number // 总记录数
  /** 数据集合 [ 订单信息 ] */
  items: OrderItem[]
  page: number // 当前页码
  pages: number // 总页数
  pageSize: number // 页尺寸
}

/** 订单列表项 */
export type OrderItem = OrderResult & {
  totalNum: number // 总件数
}
