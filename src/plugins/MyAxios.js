import axios from 'axios'

var MyAxios = {}
MyAxios.install = function (Vue) {
  const instance = axios.create({
    baseURL: 'http://localhost:8888/api/private/v1/'
  })
  // Add a request interceptor
  instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    // console.log('拦截器', config)
    // 如果不是登录
    if (config.url.toLowerCase() !== 'login') {
      const token = sessionStorage.getItem('token')
      config.headers.Authorization = token
    }
    // 返回config 并不再继续往下执行
    return config
  }, function (error) {
    // Do something with request error
    return Promise.reject(error)
  })

  // Add a response interceptor
  // axios.interceptors.response.use(function (response) {
  //   // Do something with response data
  //   return response;
  // }, function (error) {
  //   // Do something with response error
  //   return Promise.reject(error);
  // });
  Vue.prototype.$http = instance
}
export default MyAxios
