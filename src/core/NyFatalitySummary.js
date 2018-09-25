/* 
 *  NyFatalitySummary
 *  Get the NyFatality Summary from NYC Open Data
 *  See: https://opendata.cityofnewyork.us/ 
 *  And: https://data.cityofnewyork.us/Public-Safety/NYPD-Motor-Vehicle-Collisions/h9gi-nx95
 * 
 */

import axios from "axios";

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
  responseData(newData) {
    return newData ? (this.data = newData) : this.data;
  }

  submit(requestMethod) {
    return new Promise((resolve, reject) => {
      axios({
        method: requestMethod,
        baseURL: this.baseURL,
        url: this.url
      })
        .then(response => {
          this.onSuccess(response.data);
          resolve(response.data);
        })
        .catch(error => {
          this.onFail(error.response.data);
          reject(error.response.data);
        });
    });
  }

  onSuccess(data) {
    console.log("Success,'data.length': ", data.length);
    this.responseData(data);
  }

  onFail(errors) {
    console.log("Fail, 'errors', ", errors);
    this.errors.record(errors);
  }
}

export default NyFatalitySummary;
