import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
    // 状态
    state: {
        routes: [],
        currentHr: JSON.parse(window.sessionStorage.getItem("user"))
    },
    // 事件（均为同步事务）
    mutations: {
        initRoutes(state, data) {
            state.routes = data;
        }
    },
    // 操作
    actions: {

    },
})
