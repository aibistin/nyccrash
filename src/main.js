import Vue from "vue";
// eslint-disable-next-line
import Bulma from "bulma";
/* Local Imports */
import routes from "./routes";
import Summary from "./components/Summary.vue";
import Home from "./components/Home.vue";

Vue.config.productionTip = false;

const app = new Vue({
  el: "#app",
  data: {
    currentRoute: window.location.pathname
  },
  components: {
    Summary,
    Home
  },
  computed: {
    VueComponent() {
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

window.addEventListener("popstate", () => {
  app.currentRoute = window.location.pathname;
});
