/*
 * @Author       : djkloop
 * @Date         : 2021-07-07 22:03:22
 * @LastEditors  : djkloop
 * @LastEditTime : 2021-07-07 23:18:45
 * @Description  : 头部注释
 * @FilePath     : /vue-worker/src/main.js
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VSelect from "./components/appic-select";
import VList from "./components/appic-virtual-list";
Vue.use(ElementUI);
Vue.component(VSelect.name, VSelect);
Vue.component(VList.name, VList);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
