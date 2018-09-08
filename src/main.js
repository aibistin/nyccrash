import Vue from "vue";
// eslint-disable-next-line
import Bulma from "bulma";
/* Local Imports */
import routes from "./routes";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    VueComponent() {
      return routes[this.currentRoute] || "Not Found";
    }
  },
  render: h => h(App)
}).$mount("#app");
