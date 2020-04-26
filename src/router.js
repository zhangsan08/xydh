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
            // component: Home,
            component: () => import('./views/SiteShow.vue')
        },
        {
            path: '/Me',
            name: 'Me',
            component: () => import('./views/Me.vue')
        },
        {
            path: '/:username',
            name: 'ShowSite',
            // component: ShowSite,
            component: () => import('./views/SiteShow.vue')
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
            path: '/u/vip',
            name: 'vip',
            component: () => import('./views/UserVip.vue')
        },
    ]
})