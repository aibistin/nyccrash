import Vue from "vue";
// eslint-disable-next-line
import Bulma from "bulma";
/* Local Imports */
import routes from "./routes";
//import App from "./App.vue";
import Collision from "./components/Collision.vue";
import Home from "./components/Home.vue";

Vue.config.productionTip = false;

//new Vue({
const app = new Vue({
  el: "#app",
  data: {
    currentRoute: window.location.pathname
  },
  components: {
    Collision,
    Home
  },
  computed: {
    VueComponent() {
      console.log("Current route: " + this.currentRoute);
      const routeComponent = routes[this.currentRoute];
      if (routeComponent) {
        console.log("Component: " + routeComponent);
        require("./components/" + routeComponent + ".vue");
        return routeComponent;
      } else {
        return "Not Found";
      }
    }
  },
  render(h) {
    return h(this.VueComponent);
  }
});
//}).$mount("#app");

//  render: h => h(App)

window.addEventListener("popstate", () => {
  app.currentRoute = window.location.pathname;
});
