/* 
 *  Boroughs
 *  Keep track of data based on "Boroughs" for NycCrach Data
 * 
 */

const Boroughs = {
  boroughs: [
    {
      name: "BRONX",
      label: "Bronx",
      total: 0,
      avg: 0,
      maxOneTime: 0
    },
    {
      name: "BROOKLYN",
      label: "Brooklyn",
      total: 0,
      avg: 0,
      maxOneTime: 0
    },
    {
      name: "MANHATTAN",
      label: "Manhattan",
      total: 0,
      avg: 0,
      maxOneTime: 0
    },
    {
      name: "QUEENS",
      label: "Queens",
      total: 0,
      avg: 0,
      maxOneTime: 0
    },
    {
      name: "STATEN ISLAND",
      label: "Staten Island",
      total: 0,
      avg: 0,
      maxOneTime: 0
    },
    {
      name: "UNKNOWN",
      label: "Unknown Borough",
      total: 0,
      avg: 0,
      maxOneTime: 0
    }
  ],
  clone() {
    return JSON.parse(JSON.stringify(this.boroughs));
  }
};

export default Boroughs;
