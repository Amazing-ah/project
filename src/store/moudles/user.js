const state = {
  // 用户信息
  info: sessionStorage.getItem('info') ? JSON.parse(sessionStorage.getItem('info')) : {}
}
const mutations = {
  changeInfo(state, info) {
    state.info = info;
    if (info.username) {
      // 数据存储到本地
      sessionStorage.setItem('info', JSON.stringify(info))
    } else {
      sessionStorage.removeItem('info')
    }
  }

}
const actions = {
  changeInfoAction({
    commit
  }, info) {
    commit('changeInfo', info)
  }
}
const getters = {
  info(state) {
    return state.info
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
