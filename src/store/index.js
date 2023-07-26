import Vue from 'vue';
import Vuex from 'vuex';
import {cookieGet} from '@/common/cookie';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: cookieGet('token') ? cookieGet('token') : '',
        userInfo: cookieGet('userInfo') ? cookieGet('userInfo') : '',
        userConfig: JSON.parse(window.localStorage.getItem('userConfig')) || {
            themeType: 3,
            showHistory: true,
            lineTextCenter: false,
            showLineIcon: true,
        },
    },
    mutations: {
        updateUserConfig(state, newData) {
            state.userConfig = {...state.userConfig, ...newData};
            window.localStorage.setItem('userConfig', JSON.stringify(state.userConfig));
        },
    },
    actions: {},
    modules: {},
});
