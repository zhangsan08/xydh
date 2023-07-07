import {siteService} from '@/common/api';
import {cookieGet, cookieSet} from '@/common/cookie';

// 获取密码文件夹
export function getPWDFolderFunc(id, password) {
    if (!password) return;
    siteService.getLinksbyfolderid(id, password).then(res => {
        if (res.code > 0) {
            this.$message({
                message: '密码错误,请重试',
                type: 'error',
            });
            return {};
        }
        if (res.data == null) {
            // 文件夹里没有书签
            return {};
        }

        let result = {
            need_password: false,
            links: res.data.sort(function (l1, l2) {
                return l2.weight - l1.weight; // weight
            }),
        };
        return result;
    });
}
// 获取书签数据
export function getActiveLabelDataFunc(id, newRandom) {
    // 记录当前的随机数，用于判断是否需要更新数据
    const random = newRandom;
    // 调用API获取数据
    siteService.getAllsiteandlinks(id).then(res => {
        // 如果随机数已经变化，则表示已经更新了tab，需要丢弃当前的数据
        if (newRandom !== random) return;
        // 对数据进行相关处理
        let linksData = handlelinkSort(res.data.folder_with_links);
        // 比较数据是否和缓存中的一致
        const cacheKey = `xydh_tab_cached_data_for_id_${id}`;
        const cachedData = window.localStorage.getItem(cacheKey);
        if (!_.isEqual(linksData, cachedData)) {
            // 如果不一致，则进行更新，并将数据存入localStorage中
            window.localStorage.setItem(cacheKey, JSON.stringify(linksData));
            return [...linksData];
        }
    });
}
// 添加足迹
export function setHistoryLink(linkInfo) {
    let cache = cookieGet('cacheLinkList');
    let existKey = false;
    if (cache) {
        let cacheExist = JSON.parse(cache);
        cacheExist.filter(d => {
            if (d.id === linkInfo.id) {
                existKey = true;
                d.count += 1;
            }
        });

        if (!existKey) {
            linkInfo.count = 1;
            cacheExist.push(linkInfo);
        }
        // 取最新10个
        let newArr = cacheExist.slice(-10);
        cookieSet('cacheLinkList', JSON.stringify(newArr));
        return [...newArr];
    } else {
        let array = [];
        linkInfo.count = 1;
        array.push(linkInfo);
        let newArr = array.slice(-10);
        cookieSet('cacheLinkList', JSON.stringify(newArr));
        return [...newArr];
    }
}
// 排序
export function handlelinkSort(data) {
    // 取文件夹和书签
    let linksData = data;
    // 文件夹排序
    linksData.sort(function (f1, f2) {
        return f1.weight - f2.weight; // weight
    });
    // 文件夹里的每个书签排序
    for (var i = 0; i < linksData.length; i++) {
        if (!linksData[i].links) continue;
        linksData[i].links.sort(function (l1, l2) {
            return l2.weight - l1.weight; // weight
        });
    }
    return linksData;
}
// 获取用户书签配置
export function getAllLinkDataFunc(id) {
    return siteService.getAllsiteandlinks(id).then(res => {
        if (res.code > 0) {
            this.$message({
                message: '走迷路了哦，用户不存在',
                onClose: function (instance) {
                    window.location.href = 'https://xydh.fun';
                },
            });
        } else {
            const userInfo = {};
            const siteInfo = res.data.site_info;
            const target = res.data.target;
            // 加载用户
            userInfo.userid = target.id;
            userInfo.is_vip = target.is_vip;
            // 违规用户
            if (target.level <= 0) {
                this.$alert(
                    '网络不是不法之地！请珍惜您的账号,账号申诉请联系邮箱 xuanyuandaohang@126.com 上传了非法网站的就不要申诉了',
                    '该账号传播违法信息已被封禁',
                    {
                        confirmButtonText: '回主页',
                        callback: () => {
                            window.location.href = 'https://xydh.fun';
                        },
                    }
                );
                return;
            }
            // 加载 Site
            userInfo.sitename = siteInfo.name;
            userInfo.siteinfo = siteInfo.info;
            userInfo.bglizi = siteInfo.bglizi;
            userInfo.lybID = siteInfo.lyb_id;
            userInfo.mobile_bg = siteInfo.mobile_bg;
            document.title = siteInfo.name;
            setBackgroundColor(siteInfo);
            // 取文件夹和书签
            userInfo.Folders = handlelinkSort(res.data.folder_with_links);
            //    载入所有书签到 AllLinks,检索用
            userInfo.AllLinks = [];
            for (let i = 0; i < userInfo.Folders.length; i++) {
                userInfo.AllLinks = userInfo.AllLinks.concat(userInfo.Folders[i].links);
            }
            if (siteInfo.bg_switch) {
                userInfo.isBorder = siteInfo.bg !== '';
            }
            // 载入音乐和自定义底部
            if (siteInfo.music !== '') {
                userInfo.music = JSON.parse(siteInfo.music);
            }
            if (!target.is_vip) {
                userInfo.music.list.splice(1);
            }
            if (siteInfo.top_bottom !== '') {
                userInfo.top_bottom = JSON.parse(siteInfo.top_bottom);
            }
            console.log(userInfo);

            return userInfo;
        }
    });
}
// 设置背景和颜色
export function setBackgroundColor(site_info) {
    // 改背景颜色或图片
    var obj = document.getElementsByTagName('body')[0];
    var style = document.createElement('style');
    if (site_info.bg_switch) {
        let bg = '';
        if (window.innerWidth < 768 && site_info.mobile_bg) {
            bg = site_info.mobile_bg;
        } else {
            bg = site_info.bg;
        }
        style.innerHTML = `body::before { background-image: url(${bg})}`;
        document.head.appendChild(style);
    } else {
        obj.style.backgroundColor = site_info.bg_color;
    }
    obj.style.color = site_info.font_color;
}
