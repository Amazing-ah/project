import {
  reqBannerList
} from "../../utils/request";
const state = {
  list: []
}
const mutations = {
  changeList(state, arr) {
    state.list = arr
  }
}
const actions = {
  reqBannerListAction(context) {
    reqBannerList().then(res => {
      context.commit('changeList', res.data.list ? res.data.list : [])
    })
  }
}
const getters = {
  list(state) {
    return state.list
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
