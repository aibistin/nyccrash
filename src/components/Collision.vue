<template>
  <main-layout>
    <h1>{{ msg }}</h1>
    <template v-if="deathsSummary">
      <div class="grid-container">
        <div class="item item--header">
          <p>From {{ dataMeta.startingAt | formatYYMMDD }} to {{ dataMeta.endingAt | formatYYMMDD }}</p>
          <ul>
            <li v-for="cat in dataMeta.categories">Total {{cat.name | uCaseFirst}} killed = {{ cat.total }}</li>
          </ul> 
          <ul>
            <li v-for="cat in dataMeta.categories">Max {{cat.name | uCaseFirst}} killed in one collision = {{ cat.maxOneTime }}</li>
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
import {
  boroughRadiusChartConfig,
  categoryPieChartConfig
} from "./configs/Config";
import RadarChart from "./RadarChart";
import PieChart from "./PieChart";
import MainLayout from "./../layouts/Main.vue";

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
      deathsSummary: null,
      dataMeta: {
        startingAt: null,
        endingAt: null,
        categories: []
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
    if (!this.deathsSummary) {
      this.getDeathsSummary();
    }
    /*     if (!this.deathsSummary) {
      if (localStorage.deathsSummary) {
        this.deathsSummary = JSON.parse(localStorage.deathsSummary);
      } else {
        this.getDeathsSummary();
      }
    } */
  },
  components: {
    MainLayout,
    RadarChart,
    PieChart
  },
  methods: {
    getDeathsSummary() {
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
          localStorage.deathsSummary = JSON.stringify(response.data, null, 2);
          this.deathsSummary = response.data;

          /* Date range */
          this.dataMeta.startingAt = this.deathsSummary[0].starting_at;
          this.dataMeta.endingAt = this.deathsSummary[0].ending_at;

          this.dataMeta.categories = [
            { name: "persons", total: 0, avg: 0, maxOneTime: 0 },
            { name: "pedestrians", total: 0, avg: 0, maxOneTime: 0 },
            { name: "cyclists", total: 0, avg: 0, maxOneTime: 0 },
            { name: "motorists", total: 0, avg: 0, maxOneTime: 0 }
          ];

          const chartObj1 = populateBoroughChartData(
            this.deathsSummary,
            this.dataMeta,
            boroughRadiusChartConfig
          );
          this.boroughChartData = chartObj1.boroughChartData;
          this.boroughChartOptions = chartObj1.boroughChartOptions;

          const chartObj2 = populateBoroughMaxChartData(
            this.deathsSummary,
            this.dataMeta,
            boroughRadiusChartConfig
          );
          this.boroughMaxChartData = chartObj2.boroughMaxChartData;
          this.boroughMaxChartOptions = chartObj2.boroughMaxChartOptions;
          /* Pie Chart */
          let chartObj3 = populateTotalsCategoryChartData(
            this.deathsSummary,
            this.dataMeta,
            categoryPieChartConfig
          );
          this.totalsCategoryChartData = chartObj3.totalsCategoryChartData;
          this.totalsCategoryChartOptions =
            chartObj3.totalsCategoryChartOptions;
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

//this.boroughChartOptions = this.boroughChartData.datasets =
function populateBoroughChartData(
  deathsSummary,
  dataMeta,
  boroughRadiusChartConfig
) {
  const titleDateStr = ` from ${format(
    dataMeta.startingAt,
    "YYYY/MM/DD"
  )} To ${format(dataMeta.endingAt, "YYYY/MM/DD")}`;

  /* Get Radius chart configs for Borough fatality totals */
  const boroughChartOptions = boroughRadiusChartConfig.options;
  boroughChartOptions.title.text += titleDateStr;

  const boroughChartData = {
    /* Labels are NYC Boroughs */
    labels: deathsSummary.map(item => item.borough),
    datasets: boroughRadiusChartConfig.datasetConfig
  };

  console.log("labels: " + JSON.stringify(boroughChartData.labels));

  deathsSummary.forEach(boroughRec => {
    dataMeta.categories.forEach((category, idx) => {
      let catBoroughTot = boroughRec["tot_" + category.name + "_killed"];
      boroughChartData.datasets[idx].data.push(catBoroughTot);
      dataMeta.categories[idx].total += Number(catBoroughTot);
    });
  });
  return { boroughChartOptions, boroughChartData };
}

function populateBoroughMaxChartData(
  deathsSummary,
  dataMeta,
  boroughRadiusChartConfig
) {
  /* Get Radius chart configs for Borough MAX fatality per accident */
  const boroughMaxChartOptions = boroughRadiusChartConfig.options;
  const titleDateStr = ` from ${format(
    dataMeta.startingAt,
    "YYYY/MM/DD"
  )} To ${format(dataMeta.endingAt, "YYYY/MM/DD")}`;

  boroughMaxChartOptions.title.text =
    "Max Fatalities per Accident" + titleDateStr;

  const boroughMaxChartData = {
    labels: deathsSummary.map(item => item.borough),
    datasets: boroughRadiusChartConfig.datasetConfig
  };
  boroughMaxChartData.labels = deathsSummary.map(item => item.borough);

  console.log("labels: " + JSON.stringify(boroughMaxChartData.labels));

  deathsSummary.forEach(boroughRec => {
    dataMeta.categories.forEach((category, idx) => {
      // "max_persons_killed_in_single_accident": "5",
      let catBoroughMax =
        boroughRec["max_" + category.name + "_killed_in_single_accident"];
      boroughMaxChartData.datasets[idx].data.push(catBoroughMax);
      dataMeta.categories[idx].maxOneTime =
        Number(catBoroughMax) > dataMeta.categories[idx].maxOneTime
          ? Number(catBoroughMax)
          : dataMeta.categories[idx].maxOneTime;
    });
  });

  return { boroughMaxChartOptions, boroughMaxChartData };
}

/* Get Pie Chart Configs */
function populateTotalsCategoryChartData(
  deathsSummary,
  dataMeta,
  categoryPieChartConfig
) {
  const totalsCategoryChartData = {
    datasets: categoryPieChartConfig.datasetConfig
  };

  const totalsCategoryChartOptions = categoryPieChartConfig.options;
  const titleDateStr = ` from ${format(
    dataMeta.startingAt,
    "YYYY/MM/DD"
  )} To ${format(dataMeta.endingAt, "YYYY/MM/DD")}`;

  totalsCategoryChartOptions.title.text += titleDateStr;

  totalsCategoryChartData.datasets[0].data = dataMeta.categories
    .slice(1)
    .map(category => {
      return category.total;
    });

  return { totalsCategoryChartOptions, totalsCategoryChartData };
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
