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

          /* TODO - What to do with this */
          /* TODO: Provide details of the accident(s) with the highest fatalitis */
          /* TODO - Why is PieChart called twice */

          /* Create tests for the Classes and Vue.js */
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
  },
  computed: {
    /* Date range */
    dataMeta() {
      return {
        startingAt: this.collisionFatalitySummary[0].starting_at,
        endingAt: this.collisionFatalitySummary[0].ending_at
      };
    },
    titleDateStr() {
      return `from ${format(
        this.dataMeta.startingAt,
        "YYYY/MM/DD"
      )} To ${format(this.dataMeta.endingAt, "YYYY/MM/DD")}`;
    },
    fatalityTotalsBorough() {
      /* Pie Chart  - Fatality Totals */
      let chart = new NyPieChart(Categories.slice(1));
      chart.labels = Categories.slice(1).map(cat => cat.name);
      chart.setCategoryTotals(this.collisionFatalitySummary);
      chart.title("Total Collision Fatalities " + this.titleDateStr);
      console.count("FatilityTotal Pie chart called!");
      return {
        chartData: chart.chartData(),
        chartOPtions: chart.options
      };
    },
    fatalitySummaryBorough() {
      /* Fatality summary by borough */
      let chart = new NyRadarChart(Categories);
      chart.labels = this.collisionFatalitySummary.map(item => item.borough);
      chart.setBoroughTotals(this.collisionFatalitySummary);
      chart.title("Fatalities by Borough " + this.titleDateStr);
      console.count("FatilitySummary Radar chart called!");
      return {
        chartData: chart.chartData(),
        chartOPtions: chart.options
      };
    },
    maxFatalityByCollision() {
      /* Max Fatalities in a single collision. By Borough */
      /* TODO: Provide details of the collision(s) with these high fatalitis */
      let chart = new NyRadarChart(Categories);
      chart.labels = this.collisionFatalitySummary.map(item => item.borough);
      chart.setCollisionMax(this.collisionFatalitySummary);
      chart.title("Max Single Collision Fatalities " + this.titleDateStr);
      console.count("MaxFatality by Collision Radar chart called!");
      return {
        chartData: chart.chartData(),
        chartOptions: chart.options
      };
    }
  }
};

export default NyFatalsSummary;
