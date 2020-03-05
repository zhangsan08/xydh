import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',  // 加入这一句即可
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        },
        {
            path: '/:username',
            name: 'ShowSite',
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
            path: '/set/site',
            name: 'SetSite',
            component: () => import('./views/SiteSet.vue')
        },
        {
            path: '/set/links',
            name: 'SetLinks',
            component: () => import('./views/UserLogin.vue')
        },
        
    ]
})