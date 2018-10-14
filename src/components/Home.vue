<template>
    <main-layout>
      <h3>NYC Collisions Home</h3>
    </main-layout>
</template>

<script>
import MainLayout from "../layouts/Main.vue";
import Summary from "./Summary.vue";

export default {
  name: "Home",
  data: function(){
    return { }
  },
  components: {
    MainLayout,
    Summary,
  },
  mounted() {
  },
};
</script>

<style scoped lang="scss">
</style>
