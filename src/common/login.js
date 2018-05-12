import wepy from 'wepy'
import ajax from './ajax'

const gettingCode = () => (
  new Promise((resolve, reject) => {
    wepy.login({
      success: resolve,
      fail: reject
    })
  })
)

const gettingUserInfo = () => (
  new Promise((resolve, reject) => {
    wepy.getUserInfo({
      success: resolve,
      fail: reject
    })
  })
)

export default () => {
  const code = gettingCode()
  const userInfo = gettingUserInfo()
  return Promise.all([code, userInfo])
    .then((res) => {
      return ajax({
        method: 'post',
        data: {
          method: '/session',
          code: res[0].code,
          name: res[1].userInfo.nickName,
          avatar: res[1].userInfo.avatarUrl
        }
      })
        .then((resp) => {
          wepy.setStorageSync('sessionUid', resp.data.uid)
          wepy.setStorageSync('userInfo', res[1].userInfo)
          return resp
        })
    })
    .catch((err) => {
      console.error(err)
    })
}
