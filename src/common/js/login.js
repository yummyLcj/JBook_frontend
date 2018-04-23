import wepy from 'wepy'
import request from 'src/common/js/ajax.js'

export default (cb) => {
  wepy.login({
    success (res) {
      request({
        url: '/session',
        method: 'post',
        data: {
          code: res.code
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
  })
}
