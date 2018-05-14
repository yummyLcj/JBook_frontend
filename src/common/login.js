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

export default (userInfo) => {
  return gettingCode().then((res) => {
    return ajax({
      method: 'post',
      data: {
        method: '/session',
        code: res.code,
        name: userInfo.nickName || '',
        avatar: userInfo.avatarUrl || ''
      }
    })
      .then((resp) => {
        wepy.setStorageSync('sessionUid', resp.data.uid)
        wepy.setStorageSync('userInfo', resp.data.userInfo)
        return resp
      })
  })
  .catch((err) => {
    console.error(err)
  })
}
