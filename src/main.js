import Vue from "vue";
// eslint-disable-next-line
import Bulma from "bulma";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
