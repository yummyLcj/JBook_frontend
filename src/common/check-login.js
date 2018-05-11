import wepy from 'wepy'

export default (cb) => {
  const uid = wepy.getStorageSync('sessionUid')
  typeof cb === 'function' && cb(uid)
}
