import Vue from 'vue';
import App from './App.vue';
import router from './router';
import {Message} from 'element-ui';
import store from './store';

Vue.config.productionTip = false;
Vue.prototype.$message = Message;

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app');

// //main.js里面的代码
// router.beforeEach((to) => {
//   /* 路由发生变化修改页面meta */
//   if(to.meta.content){
//     let head = document.getElementsByTagName('head');
//     let meta = document.createElement('meta');
//     meta.content = to.meta.content;
//     head[0].appendChild(meta)
//   }
//   /* 路由发生变化修改页面title */
//   if (to.meta.title) {
//     document.title = to.meta.title;
//   }
// })
