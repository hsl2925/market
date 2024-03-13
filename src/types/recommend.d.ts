// 推荐商品
export type RecommendListItem = {
  id: number // 商品id
  name: string // 商品名称
  discound: string // 商品特价
  hours: string // 发货时间
  imgUrl: string // 商品图片
  cartIcon: string // 购物车图标
  skuId: string // skuId
  priceTag: string // 当前价格
  price: string // 原价
  num: string // 数量
}
