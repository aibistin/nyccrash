<template>
  <div class="container">
    <div class="field is-grouped">
      <p class="control">
        <v-link class="button" href="/">Home</v-link>
      </p>
      <p class="control">
        <v-link class="button" href="/stats">NYC Traffic Fatalities Summary</v-link>
      </p>
      <p class="control">
        <a class="button is-danger">
         Placemat....
        </a>
      </p>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import VLink from "../components/VLink";

export default {
  name: "MainLayout",
  components: {
    VLink
  }
};
</script>

<style lang="scss">
.container {
  background: inherit
}
</style>
