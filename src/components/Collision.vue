<template>
  <main-layout>
    <h1>{{ msg }}</h1>
    <template v-if="fatalitySummary">
      <div class="grid-container">
        <div class="item item--header">
          <p>From {{ timeRange.startingAt | formatYYMMDD }} to {{ timeRange.endingAt | formatYYMMDD }}</p>
          <ul>
            <li v-for="cat in categories">Total {{cat.name | uCaseFirst}} killed = {{ cat.total }}</li>
          </ul> 
          <ul>
            <li v-for="cat in categories">Max {{cat.name | uCaseFirst}} killed in one collision = {{ cat.maxOneTime }}</li>
          </ul> 
        </div>
        <div class="item item--1">
          <pie-chart :data="fatalityTotalsBorough.chartData" :options="fatalityTotalsBorough.chartOptions"></pie-chart>
        </div>
        <div class="item item--2">
          <radar-chart :data="fatalitySummaryBorough.chartData" :options="fatalitySummaryBorough.chartOptions"></radar-chart>
        </div>
        <div class="item item--3">
          <radar-chart :data="maxFatalityByCollision.chartData" :options="maxFatalityByCollision.chartOptions"></radar-chart>
        </div>
        <template v-if="fatalityYearly">
        <div class="item item--5_6">
          <bar-chart :data="fatalityYearly.chartData" :options="fatalityYearly.chartOptions"></bar-chart>
        </div>
        </template>
      </div>
    </template>
  </main-layout>
</template>

<script>
import axios from "axios";
//import moment from "moment";
import format from "date-fns/format";
/* Local Imports*/
import Categories from "../core/Categories";
import Boroughs from "../core/Boroughs";
import { NyRadarChart } from "../core/NyRadarChart";
import { NyPieChart } from "../core/NyPieChart";
import { NyBarChart } from "../core/NyBarChart";
import RadarChart from "./RadarChart";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import MainLayout from "./../layouts/Main.vue";
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
      categories: Categories.clone(),
      boroughs: Boroughs.clone()
    };
  },
  mounted() {
    this.getCollisionFatalitySummary({ groupByYear: true });
    if (localStorage.fatalitySummary) {
      console.count("It's in local storage");
      this.fatalitySummary = JSON.parse(localStorage.fatalitySummary);
    } else {
      console.count("Not in local storage: Calling NYC");
      this.getCollisionFatalitySummary();
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
      console.count("date range called!");
      return {
        startingAt: this.fatalitySummary[0].starting_at,
        endingAt: this.fatalitySummary[0].ending_at
      };
    },
    titleDateStr() {
      console.count("Title date string called!");
      return `from ${format(
        this.timeRange.startingAt,
        "YYYY/MM/DD"
      )} To ${format(this.timeRange.endingAt, "YYYY/MM/DD")}`;
    },
    fatalityTotalsBorough() {
      /* Pie Chart  - Fatality Totals */
      let chart = new NyPieChart(this.categories.slice(1));
      chart.labels = this.categories.slice(1).map(cat => cat.name);
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
      let chart = new NyRadarChart(this.categories);
      chart.labels = this.fatalitySummary.map(item => item.borough);
      chart.setBoroughTotals(this.fatalitySummary);
      chart.title("Fatalities by Borough " + this.titleDateStr);
      console.count("FatilitySummary Radar chart called!");
      return {
        chartData: chart.chartData(),
        chartOptions: chart.chartOptions()
      };
    },
    maxFatalityByCollision() {
      /* Max Fatalities in a single collision. By Borough */
      /* TODO: Provide details of the collision(s) with these high fatalitis */
      let chart = new NyRadarChart(this.categories);
      chart.labels = this.fatalitySummary.map(item => item.borough);
      chart.setCollisionMax(this.fatalitySummary);
      chart.title("Max Single Collision Fatalities " + this.titleDateStr);
      console.count("MaxFatality by Collision Radar chart called!");
      return {
        chartData: chart.chartData(),
        chartOptions: chart.chartOptions()
      };
    },
    /*TODO Use Different component */
    fatalityYearly() {
      /* Bar Chart - Yearly fatalities */
      let chart = new NyBarChart(this.categories, this.boroughs);
      let yearSave = null;
      /*TODO put onto NyBarChart */
      /*
      chart.labels = this.fatalitySummaryYearly.map((item) => {
        if ((!yearSave) || (item.year !== yearSave) )
           yearSave = item.year;
           return item.year;
       });
       */

      chart.labels = [2012, 2013, 2014, 2015, 2016, 2017, 2018];

      if (this.fatalitySummaryYearly) {
        console.count("Yearly totals Bar chart called!");
        chart.setYearlyTotals(this.fatalitySummaryYearly);
        chart.title("Yearly fatalities " + this.titleDateStr);
        return {
          chartData: chart.chartData(),
          chartOptions: chart.chartOptions()
        };
      }
      return null;
    }
  },
  filters: {
    formatYYMMDD(inDateStr) {
      return inDateStr ? format(inDateStr, "YYYY-MM-DD") : "";
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
  grid-template-columns: repeat(2, minmax(max-content, 1fr));
  grid-auto-rows: minmax(min-content, 1fr);
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
  align-self: center;
  justify-self: center;
  grid-row: 1;
  grid-column: 1 / -1;
  align-self: center;
}
.item--1 {
  align-self: center;
  justify-self: center;
  grid-row: 2 / 3;
  grid-column: 1;
}

.item--2 {
  align-self: center;
  justify-self: center;
  grid-row: 2 / 3;
  grid-column: 2 / -1;
}

.item--3 {
  align-self: center;
  justify-self: center;
  grid-row: 3 / 4;
  grid-column: 1;
}

.item--4 {
  align-self: center;
  justify-self: center;
  grid-row: 3 / 4;
  grid-column: 2 / -1;
}

.item--5_6 {
  align-self: center;
  justify-self: center;
  grid-row: 4 / 5;
  grid-column: 1 / -1;
}
</style>
