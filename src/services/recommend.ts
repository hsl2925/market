import type { RecommendListItem } from '@/types/recommend'

import { http } from '@/utils/http'

// 推荐商品列表接口请求封装
export const getRecommendListAPI = () => {
  return http<RecommendListItem[]>({
    method: 'GET',
    url: '/api/recommendList',
  })
}
