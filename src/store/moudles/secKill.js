import {
  reqSecKillList
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
  reqSecKillListAction(context) {
    reqSecKillList().then(res => {
      context.commit('changeList', res.data.list)
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
