<template>
    <pie-chart 
        :data="fatalityTotalsBorough.chartData" 
        :options="fatalityTotalsBorough.chartOptions" 
    ></pie-chart>
</template>

<script>
/* Local Imports*/
import { NyPieChart } from "../core/NyPieChart";
import BarChart from "./charts/BarChart";
import PieChart from "./charts/PieChart";
import Filters from "../mixins/Filters";

export default {
  name: "BoroughTotals",
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
    PieChart
  },
  methods: {},
  computed: {
    fatalityTotalsBorough() {
      /* Pie Chart  - Fatality Totals */
      let chart = new NyPieChart(this.Categories);
      chart.populateBoroughTotals(this.fatalitySummary);
      chart.title("Total Collision Fatalities " + this.titleDateStr);
      console.count("FatilityTotal Pie chart called!");
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
