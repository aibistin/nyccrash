<template>
  <div class="item item--3">
    <radar-chart 
      :data="fatalitySummaryBorough.chartData"
      :options="fatalitySummaryBorough.chartOptions"
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
  name: "BoroughSummary",
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
    fatalitySummaryBorough() {
      /* Fatality summary by borough */
      let chart = new NyRadarChart(this.Categories);
      chart.labels = this.fatalitySummary.map(item => item.borough);
      chart.populateBoroughTotals(this.fatalitySummary);
      chart.title("Fatalities by Borough " + this.titleDateStr);
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
