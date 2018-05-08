import wepy from 'wepy'
import request from 'src/common/js/ajax.js'

const getUserInfo = (cb) => (
  new Promise((resolve) => {
    wepy.getUserInfo({
      success: resolve
    })
  })
)

const weLogin = (data, cb) => (
  new Promise((resolve) => {
    wepy.login({
      success: resolve
    })
  })
)

const login = function (userInfo, res) {
  request({
    url: '/session',
    method: 'post',
    data: {
      code: res.code,
      name: userInfo.nickName
    }
  })
    .then((res) => {
      wepy.setStorage({
        key: 'sessionUid',
        data: res.data.uid,
        success() {
          typeof cb === 'function' && cb(res.data.uid)
        }
      })
    })
}

export default (cb) => {
  getUserInfo()
    .then((res) => {
      weLogin()
        .then((res2) => {
          login(res.userInfo, res2)
        })
    })
}
