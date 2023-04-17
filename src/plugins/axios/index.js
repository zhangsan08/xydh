import axios from 'axios'
import { cookieGet } from '@/common/cookie'
// import router from '@/router'
import { isPlainObject } from 'lodash'
// import qs from 'qs'

// 记录和显示错误
function errorLog (info) {
    this.$message({
        message: info,
        type: 'error',
        duration: 3000
    });
}

// 成功
// function success () {
//   message.success('成功',3)
// }

// 创建一个 axios 实例
const service = axios.create({
    baseURL: process.env.VUE_APP_API,
    timeout: 1000 * 180,
    withCredentials: true
})

/**
 * 请求拦截
 */
service.interceptors.request.use(config => {
    // config.headers['Content-type'] = 'application/json; charset=utf-8'
    // config.headers['token'] = cookieGet('token') || ''
    var token = cookieGet('token') || ''

    // 默认参数
    var defaults = {}

    // 防止缓存，GET请求默认带_t参数
    if (config.method === 'get' || config.data.noQs) {

        config.params = {
            ...config.params,
            ...{ '_t': new Date().getTime() }
        }

        if (token != '') {
            config.params.token = token
        }
    } else {
        config.data = {
            ...config.data
        }

        if (token != '') {
            config.data.token = token
        }

    }
    if (isPlainObject(config.params)) {
        config.params = {
            ...defaults,
            ...config.params
        }
    }
    if (isPlainObject(config.data)) {
        config.data = {
            ...defaults,
            ...config.data
        }
        // if (/^application\/x-www-form-urlencoded/.test(config.headers['content-type'])) {
        if (!config.data.noQs) {
        //  config.data = qs.stringify(config.data)
        }
    // }
    }

    if (config.method === 'delete') {
        config.headers['Content-type'] = 'application/json'
    }

    return config
}, error => {
    return Promise.reject(error)
})

/**
 * 响应拦截
 */
service.interceptors.response.use(response => {

    // if (response.data.code === 401) {
    //   // errorLog(response.data.msg)
    //   // cookieRemove("token")
    //   // cookieRemove("userInfo")
    //   // router.push({name:'ULogin'})
    //   // return Promise.reject(response.data.msg)
    //   return response.data;
    // } else if (response.config.url == "/h/index/createLoginCaptcha" || response.config.url == "/h/index/createRegisterCaptcha") {
    //   return response.data
    // } else if (response.data.code !== 0 && response.config.url != "/h/audio/getAudioToTxtRes") {
    //   errorLog(response.data.msg)
    //   return Promise.reject(response.data.msg)
    // } else {
    //   if (response.config.method !== "get"){
    //     // success()
    //   }
    return response.data;
    // }
}, error => {
    errorLog(error.msg)
    return Promise.reject(error)
})

export default service

