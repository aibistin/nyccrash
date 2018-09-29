<template>
  <main-layout>
    <h1>{{ msg }}</h1>
    <template v-if="collisionFatalitySummary">
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
import { NyRadarChart } from "../core/NyRadarChart";
import { NyPieChart } from "../core/NyPieChart";
import RadarChart from "./RadarChart";
import PieChart from "./PieChart";
import MainLayout from "./../layouts/Main.vue";
import FatalitySummary from "../mixins/FatalitySummary";

/*
 {
        "borough": "QUEENS",
        "ending_at": "2018-08-26T00:00:00.000",
        "tot_persons_killed": "305",
        "tot_cyclists_killed": "22",
        "tot_motorists_killed": "111",
        "tot_pedestrians_killed": "172"
        "max_persons_killed_in_single_accident": "5",
        "max_cyclists_killed_in_single_accident": "1",
        "max_motorists_killed_in_single_accident": "5",
        "max_pedestrians_killed_in_single_accident": "2",
        "starting_at": "2012-07-01T00:00:00.000",
    },
    */

export default {
  name: "Collision",
  props: {
    msg: String
  },
  mixins: [FatalitySummary],
  data: function() {
    return {
      collisionFatalitySummary: null,
      categories: Categories,
    };
  },
  mounted() {
    if (!this.collisionFatalitySummary) {
      this.getCollisionFatalitySummary();
      console.count("Mounted: Calling function that will call NYC");
    }
    /*     if (!this.collisionFatalitySummary) {
      if (localStorage.collisionFatalitySummary) {
        this.collisionFatalitySummary = JSON.parse(localStorage.collisionFatalitySummary);hsSummary);
      } else {
        this.getCollisionFatalitySummary();
      }
    } */
  },
  components: {
    MainLayout,
    RadarChart,
    PieChart
  },
  methods: {},
  computed: {
    /* Date range */
    timeRange() {
      console.count("date range called!");
      return {
        startingAt: this.collisionFatalitySummary[0].starting_at,
        endingAt: this.collisionFatalitySummary[0].ending_at
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
      let chart = new NyPieChart(Categories.slice(1));
      chart.labels = Categories.slice(1).map(cat => cat.name);
      chart.setCategoryTotals(this.collisionFatalitySummary);
      chart.title("Total Collision Fatalities " + this.titleDateStr);
      console.count("FatilityTotal Pie chart called!");
      return {
        chartData: chart.chartData(),
        chartOptions: chart.chartOptions()
      };
    },
    fatalitySummaryBorough() {
      /* Fatality summary by borough */
      let chart = new NyRadarChart(Categories);
      chart.labels = this.collisionFatalitySummary.map(item => item.borough);
      chart.setBoroughTotals(this.collisionFatalitySummary);
      chart.title("Fatalities by Borough " + this.titleDateStr);
      console.count("FatilitySummary Radar chart called!");
      return {
        chartData: chart.chartData(),
        //chartOPtions: chart.options
        chartOptions: chart.chartOptions()
      };
    },
    maxFatalityByCollision() {
      /* Max Fatalities in a single collision. By Borough */
      /* TODO: Provide details of the collision(s) with these high fatalitis */
      let chart = new NyRadarChart(Categories);
      chart.labels = this.collisionFatalitySummary.map(item => item.borough);
      chart.setCollisionMax(this.collisionFatalitySummary);
      chart.title("Max Single Collision Fatalities " + this.titleDateStr);
      console.count("MaxFatality by Collision Radar chart called!");
      return {
        chartData: chart.chartData(),
        chartOptions: chart.chartOptions()
      };
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
</style>
