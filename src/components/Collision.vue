<template>
  <main-layout>
    <h1>{{ msg }}</h1>
    <template v-if="collisionFatalitySummary">
      <div class="grid-container">
        <div class="item item--header">
          <p>From {{ dataMeta.startingAt | formatYYMMDD }} to {{ dataMeta.endingAt | formatYYMMDD }}</p>
          <ul>
            <li v-for="cat in categories">Total {{cat.name | uCaseFirst}} killed = {{ cat.total }}</li>
          </ul> 
          <ul>
            <li v-for="cat in categories">Max {{cat.name | uCaseFirst}} killed in one collision = {{ cat.maxOneTime }}</li>
          </ul> 
        </div>
        <div class="item item--1">
          <pie-chart :data="totalsCategoryChartData" :options="totalsCategoryChartOptions"></pie-chart>
        </div>
        <div class="item item--2">
          <radar-chart :data="boroughChartData" :options="boroughChartOptions"></radar-chart>
        </div>
        <div class="item item--3">
          <radar-chart :data="boroughMaxChartData" :options="boroughMaxChartOptions"></radar-chart>
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
//import NyFatalitySummary from "../core/NyFatalitySummary";
import NyFatalsSummary from "../mixins/NyFatalitySummary";

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
  mixins: [NyFatalsSummary],
  data: function() {
    return {
      collisionFatalitySummary: null,
      categories: [],
    //  fatalitySummary: new NyFatalitySummary(process.env.VUE_APP_NYC_APP_TOKEN),
      dataMeta: {
        startingAt: null,
        endingAt: null
      },
      /* By Borough - Tot Killed for each category in each borough */
      boroughChartData: {
        labels: [],
        datasets: []
      },
      boroughChartOptions: {},
      /* By Borough - Max Killed in single accident for each category in each borough */
      boroughMaxChartData: {
        labels: [],
        datasets: []
      },
      boroughMaxChartOptions: {},
      /* By Category */
      totalsCategoryChartData: {
        labels: ["Pedestrians", "Cyclists", "Motorists"],
        datasets: []
      },
      totalsCategoryChartOptions: {}
    };
  },
  mounted() {
    if (!this.collisionFatalitySummary) {
      this.getCollisionFatalitySummary();
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
  methods: {
    /*
   getCollisionFatalitySummary() {
      console.log("Submitting Stuff: ", this.fatalitySummary);
      //this.fatalitySummary.submitNycRequest("get",this);
   }
   */
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
