/* 
 *  NyFatalitySummary
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

class NyFatalitySummary {
  constructor(appToken) {
    this.appToken = appToken;
    this.baseURL = "https://data.cityofnewyork.us/resource/";
    this.url = "/qiz3-axqb.json";
    this.socSql = `MIN(date) AS starting_at,MAX(date) AS ending_at,
                    coalesce(borough,"Unknown Borough") AS borough,
                    SUM(number_of_persons_killed) as tot_persons_killed,SUM(number_of_pedestrians_killed) as tot_pedestrians_killed,
                    SUM(number_of_cyclist_killed) as tot_cyclists_killed,
                    SUM(number_of_motorist_killed) as tot_motorists_killed,
                    MAX(number_of_persons_killed) as max_persons_killed_in_single_accident,
                    MAX(number_of_pedestrians_killed) as max_pedestrians_killed_in_single_accident,
                    MAX(number_of_cyclist_killed) as max_cyclists_killed_in_single_accident,
                    MAX(number_of_motorist_killed) as max_motorists_killed_in_single_accident
                    &$group=borough
                    &$$app_token=${this.appToken}
                    `;
    this.url = this.url + "?$select=" + this.socSql;
    //&$having=borough <> "Unknown Borough"
    this.data = null;
  }

  submitNycRequest(requestMethod,vueApp) {
    axios({
      method: requestMethod,
      baseURL: this.baseURL,
      url: this.url
    })
      .then(response => {
        console.log("Record Ct: " + response.data.length);
        localStorage.collisionFatalitySummary = JSON.stringify(response.data);
        vueApp.collisionFatalitySummary = response.data;

        /* Date range */
        vueApp.dataMeta.startingAt = vueApp.collisionFatalitySummary[0].starting_at;
        vueApp.dataMeta.endingAt = vueApp.collisionFatalitySummary[0].ending_at;

        /* TODO - What to do with this */
        /* Make this into a class to be passed to the Ny...Chart's */
        /* Also make an object for the Borough Data, with Axios request
             and response. Put all Classes in '/core' folder instead of 
             "configs" folder.
             Create tests for the Classes and Vue.js */

        /* Fatality summary by borough */
        vueApp.categories = Categories;

        const titleDateStr = `from ${format(
          vueApp.dataMeta.startingAt,
          "YYYY/MM/DD"
        )} To ${format(vueApp.dataMeta.endingAt, "YYYY/MM/DD")}`;

        let chartObj1 = new NyRadarChart(Categories);
        chartObj1.labels = vueApp.collisionFatalitySummary.map(
          item => item.borough
        );
        chartObj1.setBoroughTotals(vueApp.collisionFatalitySummary);
        chartObj1.title("Fatalities by Borough " + titleDateStr);
        vueApp.boroughChartData = chartObj1.chartData();
        vueApp.boroughChartOptions = chartObj1.options;

        /* Max Fatalities in a single accident. By Borough */
        /* TODO: Provide details of the accident(s) with these high fatalitis */
        let chartObj2 = new NyRadarChart(Categories);
        chartObj2.labels = vueApp.collisionFatalitySummary.map(
          item => item.borough
        );
        chartObj2.setCollisionMax(vueApp.collisionFatalitySummary);
        chartObj2.title("Max Single Collision Fatalities " + titleDateStr);
        vueApp.boroughMaxChartData = chartObj2.chartData();
        vueApp.boroughMaxChartOptions = chartObj2.options;

        /* Pie Chart  - Fatality Totals */
        let chartObj3 = new NyPieChart(Categories.slice(1));
        chartObj3.labels = Categories.slice(1).map(cat => cat.name);
        chartObj3.setCategoryTotals(vueApp.collisionFatalitySummary);
        chartObj3.title("Total Collision Fatalities " + titleDateStr);
        vueApp.totalsCategoryChartData = chartObj3.chartData();
        vueApp.totalsCategoryChartOptions = chartObj3.options;
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
}

export default NyFatalitySummary;
