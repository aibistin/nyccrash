/* 
 *  Mixin: FatalitySummary
 *  Get the Collision Fatality Summary from NYC Open Data
 *  See: https://opendata.cityofnewyork.us/ 
 *  And: https://data.cityofnewyork.us/Public-Safety/NYPD-Motor-Vehicle-Collisions/h9gi-nx95
 * 
 * Returns a collection of data similar to this: 
 *  {
 *         "borough": "QUEENS",
 *         "ending_at": "2018-08-26T00:00:00.000",
 *         "tot_persons_killed": "305",
 *         "tot_cyclists_killed": "22",
 *         "tot_motorists_killed": "111",
 *         "tot_pedestrians_killed": "172"
 *         "max_persons_killed_in_single_accident": "5",
 *         "max_cyclists_killed_in_single_accident": "1",
 *         "max_motorists_killed_in_single_accident": "5",
 *         "max_pedestrians_killed_in_single_accident": "2",
 *         "starting_at": "2012-07-01T00:00:00.000",
 *   },
 * 
 */
import axios from "axios";

const FatalitySummary = {
  methods: {
    getCollisionFatalitySummary(param = { groupByBorough: true }) {
      let baseURL = "https://data.cityofnewyork.us/resource/";
      let url = "/qiz3-axqb.json" + "?$select=" + this.getSocSQL(param);
      axios({
        method: "get",
        baseURL: baseURL,
        url: url
      })
        .then(response => {
          console.log("Summary ct from NYC : " + response.data.length);
          if (param.groupByBorough) {
            localStorage.fatalitySummary = JSON.stringify(response.data);
            this.fatalitySummary = response.data;
          } else {
            localStorage.fatalitySummaryYearly = JSON.stringify(response.data);
            this.fatalitySummaryYearly = response.data;
          }

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
    },
    getSocSQL(param) {
      let filterByYear = "";
      let groupBy = "";
      let orderBy = "";
      let removeUnknown = '&$having=borough <> "Unknown Borough"';
      if (param.groupByBorough) {
        console.count("Group by borough");
        groupBy = "&$group=borough";
        orderBy = "&$order=borough";
      } else {
        console.count("Group by year");
        filterByYear = "date_extract_y(date) AS year,";
        groupBy = "&$group=borough,year";
        orderBy = "&$order=year,borough";
      }
      return `MIN(date) AS starting_at,MAX(date) AS ending_at,
                    ${filterByYear}
                    coalesce(borough,"Unknown Borough") AS borough,
                    SUM(number_of_persons_killed) as tot_persons_killed,
                    SUM(number_of_pedestrians_killed) as tot_pedestrians_killed,
                    SUM(number_of_cyclist_killed) as tot_cyclists_killed,
                    SUM(number_of_motorist_killed) as tot_motorists_killed,
                    MAX(number_of_persons_killed) as max_persons_killed_in_single_accident,
                    MAX(number_of_pedestrians_killed) as max_pedestrians_killed_in_single_accident,
                    MAX(number_of_cyclist_killed) as max_cyclists_killed_in_single_accident,
                    MAX(number_of_motorist_killed) as max_motorists_killed_in_single_accident
                    ${groupBy}
                    ${orderBy}
                    &$$app_token=${process.env.VUE_APP_NYC_APP_TOKEN}
                    `;
    },
    setBoroughTotals() {
      this.fatalitySummary.forEach(rec => {
        this.Categories.names.forEach(name => {
          //TODO GET from Boroughs class (this is also in NyRadarChart)
          let catBoroughTot = rec["tot_" + name + "_killed"];
          this.Categories.updateCatTotal(name, catBoroughTot);
        });
      });
    },
    setCollisionMax() {
      this.fatalitySummary.forEach(rec => {
        this.Categories.names.forEach(name => {
          let catBoroughMax = rec["max_" + name + "_killed_in_single_accident"];
          this.Categories.updateMaxOneTime(name, catBoroughMax);
        });
      });
    }
  },
  computed: {}
};

export default FatalitySummary;
