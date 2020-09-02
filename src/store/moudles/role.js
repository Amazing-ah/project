import {
  reqRoleList
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
  reqRoleListAction(context) {
    reqRoleList().then(res => {
      let arr = res.data.list ? res.data.list : []
      context.commit('changeList', arr)
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
