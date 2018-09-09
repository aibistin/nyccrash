<template>
  <div class="container">
    <ul>
      <li>
      <v-link href="/">Home Page </v-link>
      <v-link href="/stats">NYC Fatalities Summary</v-link>
      </li>
    </ul>

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
  background: inherit,
}
</style>
