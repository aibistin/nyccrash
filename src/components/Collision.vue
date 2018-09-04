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

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Collision",
  props: {
    msg: String
  },
  methods: {
    getDeathsSummary(e) {
      console.log("Clicked 'getDeaths'", e);
      let baseURL = "https://data.cityofnewyork.us/resource/";
      let url = "/qiz3-axqb.json";
      let socSql = `MIN(date) AS starting_at,MAX(date) AS ending_at,coalesce(borough,"No Booro") AS borough,SUM(number_of_persons_killed) as killed_sum,SUM(number_of_pedestrians_killed) as tot_pedestrians_killed,SUM(number_of_cyclist_killed) as tot_cyclist_killed,SUM(number_of_motorist_killed) as tot_motorists_killed,MAX(number_of_persons_killed) as max_killed_in_single_accident,MAX(number_of_pedestrians_killed) as max_pedestrians_killed_in_single_accident,MAX(number_of_cyclist_killed) as max_cyclist_killed_in_single_accident,MAX(number_of_motorist_killed) as max_motorist_killed_in_single_accident&$group=borough`;
      url = url + "?$select=" + socSql;
      axios({
        baseURL,
        url,
        method: "get",
      })
        .then(function(response) {
          console.log("Success!");
          // console.log(response);
          console.log("Data: " + JSON.stringify(response.data, null, 2));
        })
        .catch(function(error) {
          console.log("Got an error!");
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(
              "Error Data" + JSON.stringify(error.response.data, null, 2)
            );
            console.log("Error status", error.response.status);
            console.log(
              "Error headers" + JSON.stringify(error.response.headers, null, 2)
            );
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log("Error req", error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error msg", error.message);
          }
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
