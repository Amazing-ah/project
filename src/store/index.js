import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex);


import actions from "./action"
import {
  state,
  mutations,
  getters,
} from "./mutation";

import menu from './moudles/menu'
import role from './moudles/role'
import admin from "./moudles/admin"
import members from "./moudles/members"
import goodsCate from './moudles/goodsCate'
import standard from './moudles/standard'
import carousel from './moudles/carousel'
import goodsManage from "./moudles/goodsManage"
import user from './moudles/user'
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    menu,
    role,
    admin,
    members,
    goodsCate,
    standard,
    carousel,
    goodsManage,
    user
  }
})
