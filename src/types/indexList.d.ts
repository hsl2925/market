/** 首页列表: 请求参数 */
export type IndexListItem = {
  id: number
  relevanceId: string
  type: string
  createTime: string
  updateTime: string
  status: string
  name: string
  jumpContent: string
  sort: number
  path: string
  page: string
  isDelete: number
  imgUrl: string
}

/** 超划算 */
export type CheapListItem = {
  id: number
  name: string
  type: string
  priceTag: string
  price: string
  skuId: string
  isDelete: number
  imgUrl: string
  imgCart: string
}

/** tabs */
export type TabListItem = {
  id: number
  name: string
  type: string
  imgUrl: string
  imgUrl1: string
}

/** storeCategory */
export type StoreCategoryListItem = {
  id: number
  name: string
  type: string
  isActive: boolean
}
