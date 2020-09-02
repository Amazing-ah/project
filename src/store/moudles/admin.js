import {
  reqAdminList,
  reqAdminTotal
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
  reqAdminListAction(context) {
    reqAdminList({
      size: context.state.size,
      page: context.state.page
    }).then(res => {
      let arr = res.data.list ? res.data.list : []
      context.commit("changeList", arr)
    })
  },

  reqAdminTotalAction(context) {
    reqAdminTotal().then(res => {
      context.commit('changeTotal', res.data.list[0].total);
    })
  },

  reqAdminPageAction(context, page) {
    context.commit('changePages', page)
    //重新请求列表数据
    context.dispatch("reqAdminListAction")
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
