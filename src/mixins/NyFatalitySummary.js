/* 
 *  Mixin: NyFatalitySummary
 *  Get the NyFatality Summary from NYC Open Data
 *  See: https://opendata.cityofnewyork.us/ 
 *  And: https://data.cityofnewyork.us/Public-Safety/NYPD-Motor-Vehicle-Collisions/h9gi-nx95
 * 
 */
import axios from "axios";
import format from "date-fns/format";
/* Local Imports */
import Categories from "../core/Categories";
import { NyRadarChart } from "../core/NyRadarChart";
import { NyPieChart } from "../core/NyPieChart";

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
let baseURL = "https://data.cityofnewyork.us/resource/";
let url = "/qiz3-axqb.json";
url = url + "?$select=" + socSql;

const NyFatalsSummary = {
  methods: {
    getCollisionFatalitySummary() {
      axios({
        method: "get",
        baseURL: baseURL,
        url: url
      })
        .then(response => {
          console.log("Record Ct: " + response.data.length);
          localStorage.collisionFatalitySummary = JSON.stringify(response.data);
          this.collisionFatalitySummary = response.data;

          /* Date range */
          this.dataMeta.startingAt =
            this.collisionFatalitySummary[0].starting_at;
          this.dataMeta.endingAt =
            this.collisionFatalitySummary[0].ending_at;

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
            console.log("Error in your response logic: ", error); // Request failed
          }
        });
    }
  }
};

export default NyFatalsSummary;
