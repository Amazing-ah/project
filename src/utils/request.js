import axios from "axios";
import qs from 'qs'

import store from "../store"
import {
  failureAlert
} from "../utils/alert";


const locUrl = '/api'

// 请求拦截
axios.interceptors.response.use(config => {
  // 除了登录接口之外，其他接口都需要携带一个token
  if (config.url == locUrl + '/api/userlogin') {
    return config;
  }

  config.headers.authorization = store.state.user.info.token;
  return config;
})



// 响应拦截
axios.interceptors.response.use(res => {
  console.group('-------请求的地址是:' + res.config.url + '-------')
  console.log(res);
  console.groupEnd()

  if (res.data.msg === "登录已过期或访问权限受限") {
    failureAlert("登录已过期或访问权限受限")
    //清空info
    store.dispatch("user/changeInfoAction", {})
    //跳转到登录 
    router.push("/login")
  }


  return res;
})

/* ----------------------菜单------------------------------------  */
/* 菜单添加 */

export const reqAddMenu = (form) => {
  return axios({
    url: locUrl + '/api/menuadd',
    method: 'post',
    data: qs.stringify(form)
  })

}

/* 菜单列表 */
export const reqMenuList = (params) => {
  return axios({
    url: locUrl + "/api/menulist",
    method: "get",
    params: params
  })
}


//菜单详情
export const reqMenuDetail = (params) => {
  return axios({
    url: locUrl + "/api/menuinfo",
    method: "get",
    params: params
  })
}

/* 菜单修改 */
export const reqMenuUpdate = (form) => {
  return axios({
    url: locUrl + "/api/menuedit",
    method: "post",
    data: qs.stringify(form)
  })

}

/* 菜单删除 */
export const reqMenuDel = (params) => {
  return axios({
    url: locUrl + '/api/menudelete',
    method: "post",
    data: qs.stringify(params)
  })
}

/* ----------------------菜单结束------------------------------------  */

/* ----------------------角色------------------------------------  */

/* 角色添加 */
export const reqRoleAdd = (form) => {
  return axios({
    url: locUrl + '/api/roleadd',
    method: 'post',
    data: qs.stringify(form)
  })
}

/* 角色列表 */
export const reqRoleList = () => {
  return axios({
    url: locUrl + '/api/rolelist',
    method: 'get',
  })
}

/* 角色获取 */
export const reqRoleDetail = (id) => {
  return axios({
    url: locUrl + '/api/roleinfo',
    method: 'get',
    params: id
  })
}

/* 角色修改 */
export const reqRoleChange = (form) => {
  return axios({
    url: locUrl + '/api/roleedit',
    method: 'post',
    data: qs.stringify(form)
  })
}

/* 角色删除 */
export const reqRoleDel = (id) => {
  return axios({
    url: locUrl + '/api/roledelete',
    method: 'post',
    data: qs.stringify(id)
  })
}


/* ----------------------角色结束------------------------------------  */



/* ----------------------管理员------------------------------------  */
/*管理员添加 */
export const reqAdminAdd = (form) => {
  return axios({
    url: locUrl + '/api/useradd',
    method: 'post',
    data: qs.stringify(form)
  })
}

/* 管理员列表 */
export const reqAdminList = (params) => {
  return axios({
    url: locUrl + '/api/userlist',
    method: 'get',
    params: params
  })
}

/* 管理员详情 */
export const reqAdminDet = (params) => {
  return axios({
    url: locUrl + '/api/userinfo',
    method: 'get',
    params: params
  })
}

/* 管理员修改 */
export const reqAdminChange = (form) => {
  return axios({
    url: locUrl + '/api/useredit',
    method: 'post',
    data: qs.stringify(form)
  })
}

/* 管理员删除 */
export const reqAdminDel = (uid) => {
  return axios({
    url: locUrl + '/api/userdelete',
    method: 'post',
    data: qs.stringify(uid)
  })
}

/* 管理员总数 */
export const reqAdminTotal = () => {
  return axios({
    url: locUrl + '/api/usercount',
    method: 'get',
  })
}

// 登录
export const reqAdminLogin = (form) => {
  return axios({
    url: locUrl + '/api/userlogin',
    method: 'post',
    data: qs.stringify(form)
  })
}


/* ----------------------管理员结束------------------------------------  */
/* ----------------------会员------------------------------------  */
/* 会员列表 */
export const reqMembers = () => {
  return axios({
    url: locUrl + '/api/memberlist',
    method: 'get',
  })
}

/* 会员详情 */
export const reqMemberDetails = (uid) => {
  return axios({
    url: locUrl + '/api/memberinfo',
    method: 'get',
    params: uid
  })
}

/* 会员修改 */
export const reqMemberChange = (form) => {
  return axios({
    url: locUrl + '/api/memberedit',
    method: 'post',
    data: qs.stringify(form)
  })
}

/* ----------------------会员结束------------------------------------  */
/* ----------------------商品------------------------------------  */

/* 商品分类添加 */
//因为有文件，因此要使用formDate
export const reqGoodsAdd = (form) => {
  var data = new FormData();

  for (const i in form) {
    data.append(i, form[i])
  }

  return axios({
    url: locUrl + '/api/cateadd',
    method: 'post',
    data: data
  })
}

/* 商品分类列表 */
export const reqGoodsList = (params) => {
  return axios({
    url: locUrl + '/api/catelist',
    method: 'get',
    params: params
  })
}

/* 商品分类详情 */
export const reqGoodsDetail = (id) => {
  return axios({
    url: locUrl + '/api/cateinfo',
    method: 'get',
    params: id
  })
}

/* 商品分类修改 */
export const reqGoodsChange = (form) => {
  var data = new FormData();

  for (const i in form) {
    data.append(i, form[i])
  }
  return axios({
    url: locUrl + '/api/cateedit',
    method: 'post',
    data: data
  })
}

/* 商品分类删除 */
export const reqGoodsDel = (id) => {
  return axios({
    url: locUrl + '/api/catedelete',
    method: 'post',
    data: qs.stringify(id)
  })
}



/* ----------------------商品结束------------------------------------  */
/* ----------------------商品规格------------------------------------  */
//添加
export const reqSpecsAdd = (form) => {
  return axios({
    url: locUrl + '/api/specsadd',
    method: 'post',
    data: qs.stringify(form)
  })
}
//总数
export const reqSpecsTotal = () => {
  return axios({
    url: locUrl + '/api/specscount',
    method: 'get',
  })
}

//列表
export const reqSpecsList = (params) => {
  return axios({
    url: locUrl + '/api/specslist',
    method: 'get',
    params
  })
}

//详情
export const reqSpecsDetail = (params) => {
  return axios({
    url: locUrl + '/api/specsinfo',
    method: 'get',
    params: params
  })
}
//修改
export const reqSpecsChange = (form) => {
  return axios({
    url: locUrl + '/api/specsedit',
    method: 'post',
    data: qs.stringify(form)
  })
}
//删除
export const reqSpecsDel = (id) => {
  return axios({
    url: locUrl + '/api/specsdelete',
    method: 'post',
    data: qs.stringify(id)
  })
}


/* ----------------------商品规格结束------------------------------------  */

/* ----------------------轮播图------------------------------------  */

/* 轮播图分类添加 */
//因为有文件，因此要使用formDate
export const reqBannerAdd = (form) => {
  var data = new FormData();

  for (const i in form) {
    data.append(i, form[i])
  }

  return axios({
    url: locUrl + '/api/banneradd',
    method: 'post',
    data: data
  })
}

/* 轮播图列表 */
export const reqBannerList = () => {
  return axios({
    url: locUrl + '/api/bannerlist',
    method: 'get',
  })
}

/* 轮播图详情 */
export const reqBannerDetail = (id) => {
  return axios({
    url: locUrl + '/api/bannerinfo',
    method: 'get',
    params: id
  })
}

/* 轮播图修改 */
export const reqBannerChange = (form) => {
  var data = new FormData();

  for (const i in form) {
    data.append(i, form[i])
  }
  return axios({
    url: locUrl + '/api/banneredit',
    method: 'post',
    data: data
  })
}

/* 轮播图分类删除 */
export const reqBannerDel = (id) => {
  return axios({
    url: locUrl + '/api/bannerdelete',
    method: 'post',
    data: qs.stringify(id)
  })
}


/* ----------------------轮播图结束------------------------------------  */
/* ----------------------商品管理------------------------------------  */
//添加
export const reqShangPinAdd = (form) => {
  var data = new FormData();

  for (const i in form) {
    data.append(i, form[i])
  }

  return axios({
    url: locUrl + '/api/goodsadd',
    method: 'post',
    data: data
  })
}

// 商品列表

export const reqShangPinList = (params) => {
  return axios({
    url: locUrl + '/api/goodslist',
    method: 'get',
    params: params
  })
}

//商品详情
export const reqShangPinDetail = (params) => {
  return axios({
    url: locUrl + '/api/goodsinfo',
    method: 'get',
    params: params
  })
}

//修改
export const reqShangPinChange = (form) => {
  var data = new FormData();

  for (const i in form) {
    data.append(i, form[i])
  }

  return axios({
    url: locUrl + '/api/goodsedit',
    method: 'post',
    data: data
  })
}

//删除

export const reqShangPinDel = (id) => {
  return axios({
    url: locUrl + '/api/goodsdelete',
    method: 'post',
    data: qs.stringify(id)
  })
}

//总数
export const reqShangPinTotal = () => {
  return axios({
    url: locUrl + '/api/goodscount',
    method: 'get',
  })
}
/* ----------------------商品管理结束------------------------------------  */
