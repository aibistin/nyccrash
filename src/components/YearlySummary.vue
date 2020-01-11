<template>
   <div>
        <template v-if="fatalitySummaryYearly">
          <div class="item item--2">
            <bar-chart 
              :data="fatalityYearly.chartData"
              :options="fatalityYearly.chartOptions"
              :height="600"
              :width="800"
             ></bar-chart>
          </div>
        </template>
   </div>
</template>

<script>
/* Local Imports*/
import { NyBarChart } from "../core/NyBarChart";
import BarChart from "./charts/BarChart";
import Filters from "../mixins/Filters";

export default {
  name: "YearlySummary",
  props: {
    Categories: Object,
    fatalitySummaryYearly: Array,
    titleDateStr: String
  },
  data: function() {
    return {};
  },
  mixins: [Filters],
  mounted() {},
  components: {
    BarChart
  },
  methods: {},
  computed: {
    fatalityYearly() {
      /* Bar Chart - Yearly fatalities */
      let labels = this.fatalitySummaryYearly.reduce((years, item) => {
        if (!years.length || item.year !== years[years.length - 1]) {
          years.push(item.year);
        }
        return years;
      }, []);
      let chart = new NyBarChart(this.Categories, "persons", labels);
      /*TODO put onto NyBarChart */

      chart.populateYearlyTotals(this.fatalitySummaryYearly);
      chart.title("Yearly fatalities " + this.titleDateStr);
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
