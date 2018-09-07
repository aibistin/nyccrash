<template>
  <div class="">
    <h1>{{ msg }}</h1>
    <div class="field is-grouped">
      <p class="control" v-on:click=getDeathsSummary>
        <a class="button is-link">
          Total Deaths By Borough
        </a>
      </p>
      <p class="control">
        <a class="button">
          Placemat...
        </a>
      </p>
      <p class="control">
        <a class="button is-danger">
         Placemat....
        </a>
      </p>
    </div>
    <!-- <p>{{ deathsSummary }}</p> -->
    <template v-if="deathsSummary">
       <radar-chart :data="chartData" :options="chartOptions"></radar-chart>
    </template>
  </div>
</template>

<script>
import axios from "axios";
import RadarChart from "./RadarChart";
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
  data: function() {
    return {
      deathsSummary: null,
      chartData: {
        labels: [],
        datasets: [
          {
            label: "People Killed",
            data: [],
            fill: true,
            backgroundColor: "rgba(255, 199, 132, 0.2)",
            borderColor: "rgb(255,199, 132)",
            pointBackgroundColor: "rgb(255, 199, 132)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgb(255, 199, 132)",
            pointStyle: "cross"
          },
          {
            label: "Pedestrians Killed",
            data: [],
            fill: true,
            backgroundColor: "rgba(0, 235, 80, 0.4)",
            borderColor: "rgb(0, 235, 80)",
            pointBackgroundColor: "rgb(0, 235, 80)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgb(0, 235, 80)",
            pointStyle: "star"
          },
          {
            label: "Cyclists Killed",
            data: [],
            fill: true,
            backgroundColor: "rgba(200, 255, 0, 0.4)",
            borderColor: "rgb(200, 255, 0)",
            //borderWidth: 1,
            pointBackgroundColor: "rgb(200, 255, 0)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgb(200, 255, 0)",
            pointStyle: "crossRot"
          },
          {
            label: "Motorists Killed",
            data: [],
            fill: true,
            backgroundColor: "rgba(10, 0, 255, 0.4)",
            borderColor: "rgb(10, 0, 255)",
            pointBackgroundColor: "rgb(10, 0, 255)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgb(10, 0, 255)",
            pointStyle: "triangle"
          }
        ]
      },
      chartOptions: {
        elements: {
          line: { tension: 0.2, borderWidth: 2 }
          //line: { stepped: true, borderWidth: 2 }
        },
        title: {
          display: true,
          text: "Deaths By Borough",
          fontSize: 18,
          lineHeight: 1.8,
          fontColor: "#333"
        },
        layout: {
          padding: {
            top: 60,
            bottom: 60,
            left: 60,
            right: 60
          }
        },
        scale: {
          display: true
        }
      }
    };
  },
  mounted() {
    //this.getDeathsSummary();
  },
  components: {
    RadarChart
  },
  methods: {
    getDeathsSummary(e) {
      if (e) {
        console.log("Clicked 'getDeaths'", e);
      }

      let baseURL = "https://data.cityofnewyork.us/resource/";
      let url = "/qiz3-axqb.json";
      let socSql = `MIN(date) AS starting_at,MAX(date) AS ending_at,
                    coalesce(borough,"NoBorough") AS borough,
                    SUM(number_of_persons_killed) as killed_sum,SUM(number_of_pedestrians_killed) as tot_pedestrians_killed,
                    SUM(number_of_cyclist_killed) as tot_cyclist_killed,
                    SUM(number_of_motorist_killed) as tot_motorists_killed,
                    MAX(number_of_persons_killed) as max_killed_in_single_accident,
                    MAX(number_of_pedestrians_killed) as max_pedestrians_killed_in_single_accident,
                    MAX(number_of_cyclist_killed) as max_cyclist_killed_in_single_accident,
                    MAX(number_of_motorist_killed) as max_motorist_killed_in_single_accident
                    &$group=borough
                    `;
                    //&$having=borough <> "NoBorough"
                    //;
      let that = this;
      url = url + "?$select=" + socSql;
      axios({
        baseURL,
        url,
        method: "get"
      })
        .then(function(response) {
          console.log("Success!");
          // console.log(response);
          //console.log("Data: " + JSON.stringify(response.data, null, 2));
          console.log("Record Ct: " + response.data.length);
          that.deathsSummary = response.data;
          that.chartData.labels = that.deathsSummary.map(item => item.borough);
          console.log(
            "Labels: ",
            JSON.stringify(that.chartData.labels, null, 2)
          );
          that.chartData.datasets[0].data = that.deathsSummary.map(
            item => item.killed_sum
          );
          that.chartData.datasets[1].data = that.deathsSummary.map(
            item => item.tot_pedestrians_killed
          );
          that.chartData.datasets[2].data = that.deathsSummary.map(
            item => item.tot_cyclist_killed
          );
          that.chartData.datasets[3].data = that.deathsSummary.map(
            item => item.tot_motorists_killed
          );
          console.log(
            "Killed: ",
            JSON.stringify(that.chartData.datasets[0].data, null, 2)
          );
          console.log(
            "Peds Killed: ",
            JSON.stringify(that.chartData.datasets[1].data, null, 2)
          );
        })
        .catch(function(error) {
          console.log("Got an error!");
          if (error.response) {
            console.log(
              "E Data" + JSON.stringify(error.response.data, null, 2)
            );
            console.log("Error status", error.response.status);
            console.log(
              "E headers" + JSON.stringify(error.response.headers, null, 2)
            );
          } else if (error.request) {
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log("Error req: ", JSON.stringify(error.request, null, 2));
          } else {
            console.log("Error msg: " + error.message); // Request failed
          }
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
