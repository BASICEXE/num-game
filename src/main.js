import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

Vue.config.productionTip = false;

// css の読み込み
require("ress");
require("./css/style.styl");

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
