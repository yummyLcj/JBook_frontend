import wepy from 'wepy'
export default (cb = () => false) => {
  typeof cb === 'function' && cb(!!wepy.getStorageSync('sessionUid'))
}
