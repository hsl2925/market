import type { SearchListItem, SearchResultItem } from '@/types/search'

import { http } from '@/utils/http'

// 实时热搜
export const getSearchListAPI = () => {
  return http<SearchListItem[]>({
    method: 'GET',
    url: '/api/search',
  })
}

// 推荐商品列表接口请求封装
export const getSearchResultAPI = () => {
  return http<SearchResultItem[]>({
    method: 'GET',
    url: '/api/search/list',
  })
}
