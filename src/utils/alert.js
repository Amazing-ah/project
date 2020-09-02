import Vue from "vue";

let key = new Vue;

export const successAlert = (msg) => {
  key.$message({
    message: msg,
    type: 'success'
  })

}

export const failureAlert = (msg) => {
  key.$message({
    message: msg,
    type: 'warning'
  })
}
