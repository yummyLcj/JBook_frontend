import wepy from 'wepy'

// const serverUrl = 'http://localhost:3000'
const serverUrl = 'http://ss.ylittle.com:3000'

const parseUrl = function (defaultOptions) {
  let url = defaultOptions.url.replace('{uid}', defaultOptions.data.uid)
  return url
}

export default (options = {}) => (
  new Promise((resolve, reject) => {
    let defaultOptions = {
      url: options.url ? options.url : `${serverUrl}${options.data.method}`,
      data: options.data || {},
      method: options.method ? options.method.toUpperCase() : 'GET'
    }
    defaultOptions.data.uid = wepy.getStorageSync('sessionUid') || 0
    defaultOptions.url = parseUrl(defaultOptions)
    Object.assign(options, defaultOptions)
    options.success = resolve
    options.fail = reject
    wepy.request(options)
  })
)
