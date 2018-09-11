<template>
  <main-layout>
    <h1>{{ msg }}</h1>
    <template v-if="deathsSummary">
       <h3>From {{deathsMeta.startingAt.format("YYYY-MM-DD") }} to {{ deathsMeta.endingAt.format("YYYY-MM-DD") }}</h3>
         <radar-chart :data="chartData" :options="chartOptions"></radar-chart>
    </template>
  </main-layout>
</template>

<script>
import axios from "axios";
import moment from "moment";
/* Local Imports*/
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
  data: function() {
    return {
      deathsSummary: null,
      deathsMeta: {
        startingAt: null,
        endingAt: null
      },
      chartData: {
        labels: [],
        datasets: []
      },
      chartOptions: {
        elements: {
          line: { tension: 0.1, borderWidth: 2 }
          //line: { stepped: true, borderWidth: 2 }
        },
        title: {
          display: true,
          text: "Fatalities By Borough",
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
      let datasetAttr = [
        {
          label: "People Killed",
          field: "killed_sum",
          fill: false,
          color: "255,199,132"
        },
        {
          label: "Pedestrians Killed",
          field: "tot_pedestrians_killed",
          fill: false,
          color: "0,235,80"
        },
        {
          label: "Cyclists Killed",
          field: "tot_cyclist_killed",
          fill: "+2",
          color: "200,235,0"
        },
        {
          label: "Motorists Killed",
          field: "tot_motorists_killed",
          fill: "+1",
          color: "10,0,255"
        }
      ];

      let that = this;
      url = url + "?$select=" + socSql;
      axios({
        baseURL,
        url,
        method: "get"
      })
        .then(function(response) {
          console.log("Success!");
          //console.log("Data: " + JSON.stringify(response.data, null, 2));
          console.log("Record Ct: " + response.data.length);
          that.deathsSummary = response.data;
          that.chartData.labels = that.deathsSummary.map(item => item.borough);
          // console.log( "Labels: ", JSON.stringify(that.chartData.labels, null, 2));
          that.deathsMeta.startingAt = moment(
            that.deathsSummary[0].starting_at
          );
          that.deathsMeta.endingAt = moment(that.deathsSummary[0].ending_at);

          datasetAttr.forEach((attrItem, i) => {
            let rgbColor = `rgb(${attrItem.color})`;

            let cDataset = {
              label: attrItem.label,
              field: attrItem.field,
              fill: attrItem.fill,
              backgroundColor: `rgb(${attrItem.color},0.2)`,
              borderColor: rgbColor,
              pointBackgroundColor: rgbColor,
              pointHoverBorderColor: rgbColor,
              pointStyle: "cross",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff"
            };
            /* Data for each Fatality category */
            cDataset.data = that.deathsSummary.map(
              item => item[attrItem.field]
            );
            that.chartData.datasets[i] = cDataset;
          });
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
            console.log("Error: " + JSON.stringify(error, null, 2)); // Request failed
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
