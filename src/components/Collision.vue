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
import NyFatalitySummary from "../core/NyFatalitySummary";

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
  data: function() {
    return {
      collisionFatalitySummary: null,
      categories: [],
      fatalitySummary: new NyFatalitySummary(process.env.VUE_APP_NYC_APP_TOKEN),
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
      //this.getCollisionFatalitySummary();
      this.onSubmit();
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
    getCollisionFatalitySummary() {
      let baseURL = "https://data.cityofnewyork.us/resource/";
      let url = "/qiz3-axqb.json";
      let socSql = `MIN(date) AS starting_at,MAX(date) AS ending_at,
                    coalesce(borough,"Unknown Borough") AS borough,
                    SUM(number_of_persons_killed) as tot_persons_killed,SUM(number_of_pedestrians_killed) as tot_pedestrians_killed,
                    SUM(number_of_cyclist_killed) as tot_cyclists_killed,
                    SUM(number_of_motorist_killed) as tot_motorists_killed,
                    MAX(number_of_persons_killed) as max_persons_killed_in_single_accident,
                    MAX(number_of_pedestrians_killed) as max_pedestrians_killed_in_single_accident,
                    MAX(number_of_cyclist_killed) as max_cyclists_killed_in_single_accident,
                    MAX(number_of_motorist_killed) as max_motorists_killed_in_single_accident
                    &$group=borough
                    &$$app_token=${process.env.VUE_APP_NYC_APP_TOKEN}
                    `;
      //&$having=borough <> "Unknown Borough"
      url = url + "?$select=" + socSql;

      axios({
        baseURL,
        url,
        method: "get"
      })
        .then(response => {
          console.log("Record Ct: " + response.data.length);
          // console.log( "Response data: " + JSON.stringify(response.data, null, 2));
          localStorage.collisionFatalitySummary = JSON.stringify(
            response.data,
            null,
            2
          );
          this.collisionFatalitySummary = response.data;

          /* Date range */
          this.dataMeta.startingAt = this.collisionFatalitySummary[0].starting_at;
          this.dataMeta.endingAt = this.collisionFatalitySummary[0].ending_at;

          /* TODO - What to do with this */
          /* Make this into a class to be passed to the Ny...Chart's */
          /* Also make an object for the Borough Data, with Axios request
             and response. Put all Classes in '/core' folder instead of 
             "configs" folder.
             Create tests for the Classes and Vue.js */

          /* Fatality summary by borough */
          this.categories = Categories;

          const titleDateStr = `from ${format(
            this.dataMeta.startingAt,
            "YYYY/MM/DD"
          )} To ${format(this.dataMeta.endingAt, "YYYY/MM/DD")}`;

          let chartObj1 = new NyRadarChart(Categories);
          chartObj1.labels = this.collisionFatalitySummary.map(
            item => item.borough
          );
          chartObj1.setBoroughTotals(this.collisionFatalitySummary);
          chartObj1.title("Fatalities by Borough " + titleDateStr);
          this.boroughChartData = chartObj1.chartData();
          this.boroughChartOptions = chartObj1.options;

          /* Max Fatalities in a single accident. By Borough */
          /* TODO: Provide details of the accident(s) with these high fatalitis */
          let chartObj2 = new NyRadarChart(Categories);
          chartObj2.labels = this.collisionFatalitySummary.map(
            item => item.borough
          );
          chartObj2.setCollisionMax(this.collisionFatalitySummary);
          chartObj2.title("Max Single Collision Fatalities " + titleDateStr);
          this.boroughMaxChartData = chartObj2.chartData();
          this.boroughMaxChartOptions = chartObj2.options;

          /* Pie Chart  - Fatality Totals */
          let chartObj3 = new NyPieChart(Categories.slice(1));
          chartObj3.labels = Categories.slice(1).map(cat => cat.name);
          chartObj3.setCategoryTotals(this.collisionFatalitySummary);
          chartObj3.title("Total Collision Fatalities " + titleDateStr);
          this.totalsCategoryChartData = chartObj3.chartData();
          this.totalsCategoryChartOptions = chartObj3.options;
        })
        .catch(error => {
          console.log("Got an error!");
          if (error.response) {
            console.log(
              "Error Data" + JSON.stringify(error.response.data, null, 2)
            );
            console.log("Error status", error.response.status);
            console.log(
              "Error headers" + JSON.stringify(error.response.headers, null, 2)
            );
          } else if (error.request) {
            console.log("Error req: ", JSON.stringify(error.request, null, 2));
          } else {
            console.log("Error in response manip: ", error); // Request failed
          }
        });
    },
    onSubmit() {
      console.log("Submitting Stuff: ", this.fatalitySummary);

      this.fatalitySummary
        .submit("get")
        .then(response => {
          alert("Yeeehaaah");
          localStorage.collisionFatalitySummary = JSON.stringify(
            response.data,
            null,
            2
          );
 
          this.collisionFatalitySummary = this.fatalitySummary.responseData();
          /* Date range */
          this.dataMeta.startingAt = this.collisionFatalitySummary[0].starting_at;
          this.dataMeta.endingAt = this.collisionFatalitySummary[0].ending_at;
          console.log("Got stuff: " + JSON.stringify( this.collisionFatalitySummary ));

        })
        .catch(errors => {
          console.log("Errors... " + JSON.stringify(errors));
          for (let e in errors) {
            console.log("Error: ", e);
          }
        });
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
