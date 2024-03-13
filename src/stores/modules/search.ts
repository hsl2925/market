import { defineStore } from 'pinia'

interface SourceState {
  searchText: any // 指定 data 的类型，根据实际情况调整
}

export const searchStore = defineStore('source', {
  state: (): SourceState => ({
    searchText: null
  }),
  actions: {
    setData(searchText: any) { // 显式指定 data 参数的类型
      this.searchText = searchText
    }
  }
})
