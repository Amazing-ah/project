import {
  reqShangPinList,
  reqShangPinTotal
} from "../../utils/request";
const state = {
  list: [],
  total: 0,
  size: 2,
  page: 1
}
const mutations = {
  changeList(state, arr) {
    state.list = arr
  },
  changeTotal(state, num) {
    state.total = num
  },
  changePages(state, page) {
    state.page = page
  }
}
const actions = {
  reqShangPinListAction(context, bool) {
    let params = bool ? {} : {
      page: context.state.page,
      size: context.state.size
    }
    reqShangPinList(params).then(res => {
      let arr = res.data.list ? res.data.list : []
      context.commit("changeList", arr)
    })
  },

  reqShangPinTotalAction(context) {
    reqShangPinTotal().then(res => {
      context.commit('changeTotal', res.data.list[0].total);
    })
  },

  reqShangPinPageAction(context, page) {
    context.commit('changePages', page)
    //重新请求列表数据
    context.dispatch("reqShangPinListAction")
  }
}
const getters = {
  list(state) {
    return state.list
  },

  total(state) {
    return state.total
  },

  page(state) {
    return state.page
  },
  size(state) {
    return state.size
  }
}
export default {
  state,
  mutations,
  actions,
  getters,
  //命名空间 
  namespaced: true
}
