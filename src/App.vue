<template>
  <div id="app">
    <Collision msg="NYC Crash Data"/>
  </div>
</template>

<script>
import Collision from "./components/Collision.vue";

export default {
  name: "app",
  components: {
    Collision
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
