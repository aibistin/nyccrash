<template>
  <main-layout>
    <h1>{{ msg }}</h1>
    <template v-if="fatalitySummary">
      <div class="grid-container">

        <template v-if="fatalitySummary">
          <div class="item item--header notification is-light">
            <h3 class="subtitle is-3">Collision Fatalities From {{ timeRange.startingAt | formatYYMMDD }} to {{ timeRange.endingAt | formatYYMMDD }}</h3>
          </div>
        </template>

        <div class="item item--1-1">
          <ul class="">
            <li v-for="cat in Categories.categories" class="" >Total {{cat.name | uCaseFirst}} killed, {{ cat.total }}</li>
          </ul> 
        </div>
        <div class="item item--1-2">
          <pie-chart 
              :data="fatalityTotalsBorough.chartData" 
              :options="fatalityTotalsBorough.chartOptions" 
              ></pie-chart>
        </div>

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

        <div class="item item--3">
          <radar-chart 
          :data="fatalitySummaryBorough.chartData"
          :options="fatalitySummaryBorough.chartOptions"
          :height="700"
          :width="700"
          ></radar-chart>
        </div>

        <div class="item item--4">
          <radar-chart 
            :data="maxFatalityByCollision.chartData"
            :options="maxFatalityByCollision.chartOptions"
            :height="700"
            :width="700"
            ></radar-chart>
        </div>
      </div>
    </template>
  </main-layout>
</template>

<script>
import axios from "axios";
//import moment from "moment";
import format from "date-fns/format";
/* Local Imports*/
import MainLayout from "./../layouts/Main.vue";
import Boroughs from "../core/Boroughs";
import Categories from "../core/Categories";
import { NyBarChart } from "../core/NyBarChart";
import { NyPieChart } from "../core/NyPieChart";
import { NyRadarChart } from "../core/NyRadarChart";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import RadarChart from "./RadarChart";
import FatalitySummary from "../mixins/FatalitySummary";

export default {
  name: "Collision",
  props: {
    msg: String
  },
  mixins: [FatalitySummary],
  data: function() {
    return {
      fatalitySummary: null,
      fatalitySummaryYearly: null,
      Categories: new Categories,
      boroughs: Boroughs.clone()
    };
  },
  mounted() {
    if (localStorage.fatalitySummary) {
      this.fatalitySummary = JSON.parse(localStorage.fatalitySummary);
    } else {
      this.getCollisionFatalitySummary();
    }
    if (localStorage.fatalitySummaryYearly) {
      this.fatalitySummaryYearly = JSON.parse(
        localStorage.fatalitySummaryYearly
      );
    } else {
      this.getCollisionFatalitySummary({ groupByYear: true });
    }
  },
  components: {
    BarChart,
    MainLayout,
    PieChart,
    RadarChart
  },
  methods: {},
  computed: {
    /* Date range */
    timeRange() {
      return {
        startingAt: this.fatalitySummary[0].starting_at,
        endingAt: this.fatalitySummary[0].ending_at
      };
    },
    titleDateStr() {
      return `from ${format(
        this.timeRange.startingAt,
        "YYYY/MM/DD"
      )} To ${format(this.timeRange.endingAt, "YYYY/MM/DD")}`;
    },
    fatalityTotalsBorough() {
      /* Pie Chart  - Fatality Totals */
      let chart = new NyPieChart(this.Categories);
      chart.setCategoryTotals(this.fatalitySummary);
      chart.title("Total Collision Fatalities " + this.titleDateStr);
      console.count("FatilityTotal Pie chart called!");
      return {
        chartData: chart.chartData(),
        chartOptions: chart.chartOptions()
      };
    },
    fatalitySummaryBorough() {
      /* Fatality summary by borough */
      let chart = new NyRadarChart(this.Categories);
      chart.labels = this.fatalitySummary.map(item => item.borough);
      chart.setBoroughTotals(this.fatalitySummary);
      chart.title("Fatalities by Borough " + this.titleDateStr);
      return {
        chartData: chart.chartData(),
        chartOptions: chart.chartOptions()
      };
    },
    maxFatalityByCollision() {
      /* Max Fatalities in a single collision. By Borough */
      /* TODO: Provide details of the collision(s) with these high fatalitis */
      let chart = new NyRadarChart(this.Categories);
      chart.labels = this.fatalitySummary.map(item => item.borough);
      chart.setCollisionMax(this.fatalitySummary);
      chart.title("Max Single Collision Fatalities " + this.titleDateStr);
      return {
        chartData: chart.chartData(),
        chartOptions: chart.chartOptions()
      };
    },
    /*TODO Use seperate component */
    fatalityYearly() {
      /* Bar Chart - Yearly fatalities */
      let chart = new NyBarChart(this.Categories, this.boroughs);
      /*TODO put onto NyBarChart */
      chart.labels = this.fatalitySummaryYearly.reduce((years, item) => {
        if (!years.length || item.year !== years[years.length - 1]) {
          years.push(item.year);
        }
        return years;
      }, []);

      chart.setYearlyTotals(this.fatalitySummaryYearly);
      chart.title("Yearly fatalities " + this.titleDateStr);
      return {
        chartData: chart.chartData(),
        chartOptions: chart.chartOptions()
      };
    }
  },
  filters: {
    formatYYMMDD(inDateStr) {
      return inDateStr ? format(inDateStr, "YYYY/MM/DD") : "";
    },
    uCaseFirst(inStr) {
      return (
        inStr && inStr.charAt(0).toUpperCase() + inStr.slice(1).toLowerCase()
      );
    }
  }
};
/* For Debugging */
function toStr(obj) {
  return JSON.stringify(obj, null, 2);
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.grid-container {
  box-sizing: border-box;
  display: grid;
  height: 100%;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: minmax(1fr, 1fr);
  grid-gap: 2rem;
}

.item {
  padding: 2px;
}

.item--header {
  /*grid-row-start: 2;
    grid-row-end: 3;
    grid-column-start: 2;
    grid-column-end: 3;*/
    /*
  align-self: center;
  */

  grid-row: 1;
  grid-column: 1 / -1;
  align-self: center;
  justify-self: center;
}

.item--1-1 {
  align-self: center;
  justify-self: center;
  grid-row: 2 / 3;
  grid-column: 1 / 2;
}
.item--1-2 {
  align-self: center;
  justify-self: center;
  grid-row: 2 / 3;
  grid-column: 2 / -1;
}

.item--2 {
  align-self: center;
  justify-self: center;
  grid-row: 3 / 4;
  grid-column: 1 / -1;
}

.item--3 {
  align-self: center;
  justify-self: center;
  grid-row: 4 / 5;
  grid-column: 1 / -1;
}

.item--4 {
  align-self: center;
  justify-self: center;
  grid-row: 5 / 6;
  grid-column: 1 / -1;
}

.item--5 {
  align-self: center;
  justify-self: center;
  grid-row: 6 / 7;
  grid-column: 1 / -1;
}
</style>
