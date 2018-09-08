<template>
  <a 
    v-bind:href="href"
    v-bind:class="{ active: isActive }"
    v-on:click="go"
  >
         <slot></slot>
  </a>
</template>

<script>
import routes from "../routes";

export default {
  name: "Vlink",
  props: {
    href: {
      type: String,
      required: true,
    }
  },
  computed: {
    isActive(){
      return this.href == this.$root.currentRoute
    },
  },
  methods: {
    go(e) {
      e.preventDefault();
      this.$root.currentRoute = this.href;
      window.history.pushState(null, routes[this.href], this.href);
    }
  }
};
</script>

<style scoped lang="scss">
.active {
  color: cornflowerblue;
}
</style>
