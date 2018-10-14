<template>
  <div class="item item--4">
    <radar-chart 
      :data="maxFatalityByCollision.chartData"
      :options="maxFatalityByCollision.chartOptions"
      :height="700"
      :width="700"
    ></radar-chart>
  </div>
</template>

<script>
/* Local Imports*/
import { NyRadarChart } from "../core/NyRadarChart";
import RadarChart from "./charts/RadarChart";
import Filters from "../mixins/Filters";

export default {
  name: "BoroCollisionMax",
  props: {
    Categories: Object,
    fatalitySummary: Array,
    titleDateStr: String
  },
  data: function() {
    return {};
  },
  mixins: [Filters],
  mounted() {},
  components: {
    RadarChart
  },
  methods: {},
  computed: {
    maxFatalityByCollision() {
      /* Max Fatalities in a single collision. By Borough */
      /* TODO: Provide details of the collision(s) with these high fatalitis */
      let chart = new NyRadarChart(this.Categories);
      chart.labels = this.fatalitySummary.map(item => item.borough);
      chart.populateCollisionMax(this.fatalitySummary);
      chart.title("Max Single Collision Fatalities " + this.titleDateStr);
      return {
        chartData: chart.chartData(),
        chartOptions: chart.chartOptions()
      };
    }
  }
};
</script>

<style scoped lang="scss">
</style>
