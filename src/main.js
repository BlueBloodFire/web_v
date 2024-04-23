import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router/router'
import store from './store/index'
import 'font-awesome/css/font-awesome.min.css'
import {postKeyValueRequest} from "@/utils/api";
import {putRequest} from "@/utils/api";
import {getRequest} from "@/utils/api";
import {deleteRequest} from "@/utils/api";
import {postRequest} from "@/utils/api";
import {initMenu} from "@/utils/menu";

Vue.config.productionTip = false

Vue.prototype.postKeyValueRequest = postKeyValueRequest
Vue.prototype.putRequest = putRequest
Vue.prototype.getRequest = getRequest
Vue.prototype.deleteRequest = deleteRequest
Vue.prototype.postRequest = postRequest

Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
  if (to.path == '/') {
    next();
  } else {
    if (window.sessionStorage.getItem("user")) {
      initMenu(router, store);
      next();
    } else {
      next('/');
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
