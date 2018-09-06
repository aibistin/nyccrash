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
       <pie-chart :data="chartData" :options="chartOptions"></pie-chart>
    </template>
  </div>
</template>

<script>
import axios from "axios";
import PieChart from "./PieChart";

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
            label: "Deaths By Borough",
            backgroundColor: "#f87979",
            data: []
          }
        ]
      },
      chartOptions: {

      }
    };
  },
  mounted() {
      //this.getDeathsSummary();
  },
  components: {
    PieChart
  },
  methods: {
    getDeathsSummary(e) {
      if (e){
          console.log("Clicked 'getDeaths'", e);
      }

      let baseURL = "https://data.cityofnewyork.us/resource/";
      let url = "/qiz3-axqb.json";
      let socSql = `MIN(date) AS starting_at,MAX(date) AS ending_at,coalesce(borough,"No Boro") AS borough,SUM(number_of_persons_killed) as killed_sum,SUM(number_of_pedestrians_killed) as tot_pedestrians_killed,SUM(number_of_cyclist_killed) as tot_cyclist_killed,SUM(number_of_motorist_killed) as tot_motorists_killed,MAX(number_of_persons_killed) as max_killed_in_single_accident,MAX(number_of_pedestrians_killed) as max_pedestrians_killed_in_single_accident,MAX(number_of_cyclist_killed) as max_cyclist_killed_in_single_accident,MAX(number_of_motorist_killed) as max_motorist_killed_in_single_accident&$group=borough`;
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
          that.chartData.labels= 
          that.deathsSummary.map((item) => item.borough );
          console.log("Labels: ", JSON.stringify(that.chartData.labels,null,2));
          that.chartData.datasets[0].data = 
          that.deathsSummary.map((item) => item.killed_sum );

          console.log("Killed: ", JSON.stringify(that.chartData.datasets[0].data,null,2));
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
