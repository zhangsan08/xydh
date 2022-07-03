import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
// import ShowSite from './views/SiteShow.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',  // 加入这一句即可
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('./views/SiteShow.vue')
        },
        {
            path: '/Me',
            name: 'Me',
            component: () => import('./views/Me.vue')
        },
        {
            path: '/Hot',
            name: 'Hot',
            component: () => import('./views/Hot.vue')
        },
        {
            path: '/u/register',
            name: 'URegiser',
            component: () => import('./views/UserRegister.vue')
        },
        {
            path: '/u/login',
            name: 'ULogin',
            component: () => import('./views/UserLogin.vue')
        },
        {
            path: '/u/export',
            name: 'UExport',
            component: () => import('./views/UserExport.vue')
        },
        {
            path: '/u/copy',
            name: 'UExport',
            component: () => import('./views/LinksCopy.vue')
        },
        {
            path: '/u/vip',
            name: 'UVip',
            component: () => import('./views/UserVip.vue')
        },
        {
            path: '/u/rand',
            name: 'URand',
            component: () => import('./views/UserRandom.vue')
        },
        {
            path: '/a/admin',
            name: 'AAdmin',
            component: () => import('./views/UserAdmin.vue')
        },
        {
            path: '/l/sort',
            name: 'sort',
            component: () => import('./views/LinkSort.vue')
        },
        {
            path: '/sldt',
            name: 'sldt',
            component: () => import('./views/SLDT.vue')
        },
        {
            path: '/hgs',
            name: 'hgs',
            component: () => import('./views/HGS.vue')
        },
        // {
        //     path: '/test',
        //     name: 'ShowSite',
        //     component: () => import('./views/test.vue')
        // },
        {
            path: '/:username',
            name: 'ShowSite',
            component: () => import('./views/SiteShow.vue')
        },
    ]
})