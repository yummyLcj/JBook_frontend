import wepy from 'wepy'

export default (options = {}) => {
  return new Promise((resolve, reject) => {
    options.url = `http://localhost:3000${options.url}`
    // options.url = `http://ss.ylittle.com:3000${options.url}`
    options.success = resolve
    options.fail = reject
    const data = options.data || {}
    data.uid = wepy.getStorageSync('sessionUid') || ''
    options.data = data
    wepy.request(options)
  })
}
