/**
 * @file environment
 */

const ua = window.navigator.userAgent.toLowerCase();

// ios
export const isIOS = () => {
    return /iphone|ipad|ipod/.test(ua);
};

// 微信
export const isWeiXin = () => {
    return /micromessenger/.test(ua);
};

// Android
export const isAndroid = () => {
    return ua.indexOf('android') > -1 || ua.indexOf('adr') > -1;
};

// 百度客户端
export const isShoubai = () => {
    return /baiduboxapp/.test(ua);
};

// QQ客户端
export const isQQ = () => {
    if (isAndroid()) {
        return ua.indexOf(' qq') > -1 && ua.indexOf('mqqbrowser') > -1;
    }

    return /\sQQ/i.test(ua);

};

// QQ浏览器
export const isQQBrowser = () => {
    return ua.indexOf('mqqbrowser') > -1 && ua.indexOf(' qq') < 0;
};

// 微博
export const isWeibo = () => {
    return /weibo/.test(ua);
};

export const getEnv = () => {
    // eslint-disable-next-line
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        return 'h5';
    }
    return 'pc';
};
