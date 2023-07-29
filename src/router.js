import Vue from 'vue';
import Router from 'vue-router';
import {userService} from '@/common/api';

Vue.use(Router);

const router = new Router({
    mode: 'history', // 加入这一句即可
    routes: [
        // {
        //     path: '/',
        //     name: 'Home',
        //     component: () => import('./views/main/SiteShow/index.vue'),
        // },
        {
            path: '/',
            name: 'Home',
            component: () => import('./views/main/siteInlet.vue'),
        },
        {
            path: '/Me',
            name: 'Me',
            component: () => import('./views/admin/Me.vue'),
            meta: {requiresAuth: true}, // 添加一个 meta 字段用于标记需要登录的路由
        },
        {
            path: '/Hot',
            name: 'Hot',
            component: () => import('./views/admin/Hot.vue'),
        },
        {
            path: '/u/register',
            name: 'URegiser',
            component: () => import('./views/admin/UserRegister.vue'),
        },
        {
            path: '/u/login',
            name: 'ULogin',
            component: () => import('./views/admin/Login.vue'),
        },
        {
            path: '/u/export',
            name: 'UExport',
            component: () => import('./views/admin/UserExport.vue'),
        },
        {
            path: '/u/copy',
            name: 'UExport',
            component: () => import('./views/admin/LinksCopy.vue'),
        },
        {
            path: '/u/importBookmarks',
            name: 'UExport',
            component: () => import('./views/admin/ImportBookmarks.vue'),
        },
        {
            path: '/u/vip',
            name: 'UVip',
            component: () => import('./views/admin/UserVip.vue'),
        },
        {
            path: '/u/rand',
            name: 'URand',
            component: () => import('./views/main/UserRandom.vue'),
        },
        {
            path: '/a/admin',
            name: 'AAdmin',
            component: () => import('./views/admin/UserAdmin.vue'),
        },
        {
            path: '/l/sort',
            name: 'sort',
            component: () => import('./views/admin/LinkSort.vue'),
        },
        {
            path: '/sldt',
            name: 'sldt',
            component: () => import('./views/main/SLDT.vue'),
        },
        {
            path: '/hgs',
            name: 'hgs',
            component: () => import('./views/main/HGS.vue'),
        },
        {
            path: '/:username',
            name: 'ShowSite',
            component: () => import('./views/main/siteInlet.vue'),
        },
    ],
});
const getLogged = () => {
    return userService.UserMe().then(res => {
        if (res.code > 0) {
            return false;
        } else {
            return true;
        }
    });
};
router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        let isLogged = await getLogged();
        // 判断是否已登录的逻辑
        if (!isLogged) {
            next('/u/login'); // 未登录则跳转到登录页
        } else {
            next(); // 已登录则继续加载目标路由
        }
    } else {
        next(); // 不需要登录的路由直接加载
    }
});
export default router;
