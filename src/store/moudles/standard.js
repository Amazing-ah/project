//商品规格
import {
  reqSpecsList,
  reqSpecsTotal
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
  reqSpecsListAction(context, bool) {
    //传递一个bool,如果是true,那么就请求全部的规格，如果是false,就请求分页
    let params = bool ? {} : {
      page: context.state.page,
      size: context.state.size
    }

    reqSpecsList(params).then(res => {
      let arr = res.data.list;
      arr.forEach(item => {
        item.attrs = JSON.parse(item.attrs)
      })

      context.commit('changeList', arr)
    })
  },
  reqSpecsTotalAction(context) {
    reqSpecsTotal().then(res => {
      context.commit('changeTotal', res.data.list[0].total);
    })
  },

  reqSpecsPageAction(context, page) {
    context.commit('changePages', page)
    //重新请求列表数据
    context.dispatch("reqSpecsListAction")
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
