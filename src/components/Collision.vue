<template>
  <main-layout>
    <h1>{{ msg }}</h1>
    <template v-if="deathsSummary">
      <div class="grid-container">
        <div class="item item--1">
          <p>From {{ deathsMeta.startingAt | formatYYMMDD }} to {{ deathsMeta.endingAt | formatYYMMDD }}</p>
          <radar-chart :data="boroughChartData" :options="boroughChartOptions"></radar-chart>
        </div>
        <!--
        <div class="item item--2">
          <p>From {{ deathsMeta.startingAt | formatYYMMDD }} to {{ deathsMeta.endingAt | formatYYMMDD }}</p>
          <radar-chart :data="categoryChartData" :options="categoryChartOptions"></radar-chart>
        </div>
        -->
      </div>
    </template>
  </main-layout>
</template>

<script>
import axios from "axios";
import moment from "moment";
/* Local Imports*/
import { boroughRadiusChartConfig } from "./mixins/BoroughChartjsConfig";
import RadarChart from "./RadarChart";
import MainLayout from "./../layouts/Main.vue";

/*
 {
        "borough": "QUEENS",
        "ending_at": "2018-08-26T00:00:00.000",
        "killed_sum": "305",
        "max_cyclist_killed_in_single_accident": "1",
        "max_killed_in_single_accident": "5",
        "max_motorist_killed_in_single_accident": "5",
        "max_pedestrians_killed_in_single_accident": "2",
        "starting_at": "2012-07-01T00:00:00.000",
        "tot_cyclist_killed": "22",
        "tot_motorists_killed": "111",
        "tot_pedestrians_killed": "172"
    },
    */

export default {
  name: "Collision",
  props: {
    msg: String
  },
  mixins: [boroughRadiusChartConfig],
  data: function() {
    return {
      deathsSummary: null,
      deathsMeta: {
        startingAt: null,
        endingAt: null
      },
      /* See https://www.chartjs.org/ */
      /* By Borough */
      boroughChartData: {
        labels: [],
        datasets: []
      },
      /* By Category */
      categoryChartData: {
        labels: ["Pedestrian", "Motorist", "Cyclist"],
        datasets: []
      },
      categoryChartOptions: {
        elements: {
          line: { tension: 0.1, borderWidth: 2 }
        },
        title: {
          display: true,
          text: "Fatalities By Category",
          fontSize: 18,
          lineHeight: 1.8,
          fontColor: "#333"
        },
        layout: {
          padding: {
            top: 5,
            bottom: 5,
            left: 5,
            right: 5
          }
        }
      }
    };
  },
  mounted() {
    if (!this.deathsSummary) {
      this.getDeathsSummary();
    }
  },
  components: {
    MainLayout,
    RadarChart
  },
  methods: {
    getDeathsSummary() {
      let baseURL = "https://data.cityofnewyork.us/resource/";
      let url = "/qiz3-axqb.json";
      let socSql = `MIN(date) AS starting_at,MAX(date) AS ending_at,
                    coalesce(borough,"Unknown Borough") AS borough,
                    SUM(number_of_persons_killed) as killed_sum,SUM(number_of_pedestrians_killed) as tot_pedestrians_killed,
                    SUM(number_of_cyclist_killed) as tot_cyclist_killed,
                    SUM(number_of_motorist_killed) as tot_motorists_killed,
                    MAX(number_of_persons_killed) as max_killed_in_single_accident,
                    MAX(number_of_pedestrians_killed) as max_pedestrians_killed_in_single_accident,
                    MAX(number_of_cyclist_killed) as max_cyclist_killed_in_single_accident,
                    MAX(number_of_motorist_killed) as max_motorist_killed_in_single_accident
                    &$group=borough
                    `;
      //&$having=borough <> "Unknown Borough"
      //;
      /*
      let boroughChartDatasetAttr = [
        {
          label: "People Killed",
          field: "killed_sum",
          fill: false,
          redGreenBlue: "255,199,132"
        },
        {
          label: "Pedestrians Killed",
          field: "tot_pedestrians_killed",
          fill: false,
          redGreenBlue: "0,235,80"
        },
        {
          label: "Cyclists Killed",
          field: "tot_cyclist_killed",
          fill: "+2",
          redGreenBlue: "200,235,0"
        },
        {
          label: "Motorists Killed",
          field: "tot_motorists_killed",
          fill: "+1",
          redGreenBlue: "10,0,255"
        }
      ];
      */
      /*
      let categoryChartDatasetAttr = [
        {
          label: "Pedestrians Killed",
          field: "tot_pedestrians_killed",
          redGreenBlue: "0,235,80"
        },
        {
          label: "Cyclists Killed",
          field: "tot_cyclist_killed",
          redGreenBlue: "200,235,0"
        },
        {
          label: "Motorists Killed",
          field: "tot_motorists_killed",
          redGreenBlue: "10,0,255"
        }
      ];
*/
      url = url + "?$select=" + socSql;

      axios({
        baseURL,
        url,
        method: "get"
      })
        .then(response => {
          console.log("Record Ct: " + response.data.length);
          // console.log( "Response data: " + JSON.stringify(response.data, null, 2));
          this.deathsSummary = response.data;
          /* Labels are NYC Boroughs */
          this.boroughChartData.labels = this.deathsSummary.map(
            item => item.borough
          );

          console.log( "Chart labels: " + JSON.stringify(this.boroughChartData.labels));

          /* Date range */
          this.deathsMeta.startingAt = this.deathsSummary[0].starting_at;
          this.deathsMeta.endingAt = this.deathsSummary[0].ending_at;
          let fields = [
            "killed_sum",
            "tot_pedestrians_killed",
            "tot_cyclist_killed",
            "tot_motorists_killed"
          ];

          this.boroughChartData.datasets = this.boroughChartDataConfig.datasets;

          this.deathsSummary.forEach(boroughRec => {
            fields.forEach((field, idx) => {
              this.boroughChartData.datasets[idx].data.push(boroughRec[field]);
            });
          });
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
      return inDateStr ? moment(inDateStr).format("YYYY-MM-DD") : "";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.grid-container {
  display: grid;
  height: 100%;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-gap: 1px 1px;
}

.item {
  padding: 5px;
  /* font-size: 20px;
  font-family: sans-serif;
  color: white; */
}
item--1 {
  /*grid-row-start: 2;
    grid-row-end: 3;
    grid-column-start: 2;
    grid-column-end: 3;*/
  grid-row: 1 / 2;
  grid-column: 1 / 2;
  z-index: 10;
}
</style>
