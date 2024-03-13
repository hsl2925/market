/** 购物车类型 */
export type CartItem = {
  id: string // 商品 ID
  skuId: string // SKU ID
  name: string // 商品名称
  picture: string // 图片
  count: number // 数量
  price: number // 加入时价格
  nowPrice: number // 当前的价格
  stock: number // 库存
  selected: boolean // 是否选中
  attrsText: string // 属性文字
  isEffective: boolean // 是否为有效商品
  specs: { list: string }[]
}
