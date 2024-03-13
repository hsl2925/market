import type {
  IndexListItem,
  CheapListItem,
  TabListItem,
  StoreCategoryListItem,
} from '@/types/indexList'

import { http } from '@/utils/http'

// 1. 首页列表接口请求封装
export const getIndexListAPI = () => {
  return http<IndexListItem[]>({
    method: 'GET',
    url: '/indexList',
  })
}

// 2. 列表图片请求
export const getIndexImageAPI = () => {
  return http({
    method: 'GET',
    url: '/images',
  })
}

// 2. 列表图片请求
export const getCheapAPI = () => {
  return http<CheapListItem[]>({
    method: 'GET',
    url: '/api/cheap',
  })
}

// 首页 indextabs
export const getTabAPI = () => {
  return http<TabListItem[]>({
    method: 'GET',
    url: '/api/tab',
  })
}

// 首页 storeCategory
export const getStoreCategoryAPI = () => {
  return http<StoreCategoryListItem[]>({
    method: 'GET',
    url: '/api/indexall',
  })
}
