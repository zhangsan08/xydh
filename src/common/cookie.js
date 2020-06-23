import Cookie from 'js-cookie'

/**
 * @description 存储 cookie 值
 * @param {String} name cookie name
 * @param {String} value cookie value
 * @param {Object} setting cookie setting
 */
export const cookieSet = function (name = 'default', value = '', cookieSetting = {}) {
  let currentCookieSetting = {
    expires: 1
  }
  Object.assign(currentCookieSetting, cookieSetting)
  Cookie.set(`h5store-${name}`, value, currentCookieSetting)
}

/**
 * @description 拿到 cookie 值
 * @param {String} name cookie name
 */
export const cookieGet = function (name = 'default') {
  return Cookie.get(`h5store-${name}`)
}

/**
 * @description 拿到 cookie 值取对象
 * @param {String} name cookie name
 */
export const cookieGetJson = function (name = 'default') {
  return Cookie.getJSON(`h5store-${name}`)
}

/**
 * @description 拿到 cookie 全部的值
 */
export const cookieGetAll = function () {
  return Cookie.get()
}

/**
 * @description 删除 cookie
 * @param {String} name cookie name
 */
export const cookieRemove = function (name = 'default') {
  return Cookie.remove(`h5store-${name}`)
}

/**
 * 
 * 以下均是存储大数据量是调用(存储预订单信息时js-cookie无法用,初步认为是数据量大问题)
 */

export const getBigCache = (key) => {
  return localStorage.getItem(key)
}

export const setBigCache = (key,value) => {
  localStorage.setItem(key,value)
}

export const removeBigCache = (key) => {
  localStorage.removeItem(key)
}