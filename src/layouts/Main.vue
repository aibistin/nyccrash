<template>
  <div class="container has-background-white-bis">
    <section class="hero is-light is-small is-bold">
      <div class="hero-body">
          <h1 class="title">New York City Collisions</h1>
            <div class="field is-grouped">
              <p class="control">
                <v-link class="button" href="/">Home</v-link>
              </p>
              <p class="control">
                <v-link class="button" href="/summary">NYC Traffic Fatalities Summary</v-link>
              </p>
            </div>
      </div>
    </section>
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
  background: inherit;
}
</style>
