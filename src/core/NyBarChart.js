/* 
 *  NyBarChart
 *  Config layouts for NY Collision Data Bar Charts.
 *  See: https://www.chartjs.org/ 
 *  and: https://vue-chartjs.org/
 * 
 */
import NyChart from "./NyChart";
import { nyColor } from "./Variables";

const defaultDatasets = [
  {
    name: "persons",
    label: "People",
    data: [],
    backgroundColor: [
      nyColor.peopleBackColor,
      nyColor.peopleBackColor,
      nyColor.peopleBackColor,
      nyColor.peopleBackColor,
      nyColor.peopleBackColor,
      nyColor.peopleBackColor,
      nyColor.peopleBackColor
    ],
    borderColor: [
      nyColor.peopleColor,
      nyColor.peopleColor,
      nyColor.peopleColor,
      nyColor.peopleColor,
      nyColor.peopleColor,
      nyColor.peopleColor,
      nyColor.peopleColor
    ],
    borderWidth: 1
  },
  {
    name: "pedestrians",
    label: "Pedestrians",
    data: [],
    backgroundColor: [
      nyColor.pedestrianBackColor,
      nyColor.pedestrianBackColor,
      nyColor.pedestrianBackColor,
      nyColor.pedestrianBackColor,
      nyColor.pedestrianBackColor,
      nyColor.pedestrianBackColor,
      nyColor.pedestrianBackColor
    ],
    borderColor: [
      nyColor.pedestrianColor,
      nyColor.pedestrianColor,
      nyColor.pedestrianColor,
      nyColor.pedestrianColor,
      nyColor.pedestrianColor,
      nyColor.pedestrianColor,
      nyColor.pedestrianColor
    ],
    borderWidth: 1
  },
  {
    name: "cyclists",
    label: "Cyclists",
    data: [],
    backgroundColor: [
      nyColor.cyclistBackColor,
      nyColor.cyclistBackColor,
      nyColor.cyclistBackColor,
      nyColor.cyclistBackColor,
      nyColor.cyclistBackColor,
      nyColor.cyclistBackColor,
      nyColor.cyclistBackColor
    ],
    borderColor: [
      nyColor.cyclistColor,
      nyColor.cyclistColor,
      nyColor.cyclistColor,
      nyColor.cyclistColor,
      nyColor.cyclistColor,
      nyColor.cyclistColor,
      nyColor.cyclistColor
    ],
    borderWidth: 1
  },
  {
    label: "Motorists",
    name: "motorists",
    data: [],
    backgroundColor: [
      nyColor.motoristBackColor,
      nyColor.motoristBackColor,
      nyColor.motoristBackColor,
      nyColor.motoristBackColor,
      nyColor.motoristBackColor,
      nyColor.motoristBackColor,
      nyColor.motoristBackColor
    ],
    borderColor: [
      nyColor.motoristColor,
      nyColor.motoristColor,
      nyColor.motoristColor,
      nyColor.motoristColor,
      nyColor.motoristColor,
      nyColor.motoristColor,
      nyColor.motoristColor
    ],
    borderWidth: 1
  }
];

const defaultOptions = {
  /*
  elements: {
    line: { stepped: true, borderWidth: 2 }
  },
  */
  title: {
    display: true,
    text: "",
    fontSize: 18,
    lineHeight: 1.8,
    fontColor: nyColor.fontColor
  },
  layout: {
    padding: {
      top: 1,
      bottom: 1,
      left: 1,
      right: 1
    }
  }
};

class NyBarChart extends NyChart {
  constructor(
    categories,
    boroughs,
    datasets = defaultDatasets.map(ds => JSON.parse(JSON.stringify(ds))),
    options = JSON.parse(JSON.stringify(defaultOptions)),
    labels = []
  ) {
    super(categories, datasets, options, labels);
    this.yearlyTotals = [];
    this.boroughs = boroughs;
  }

  setYearlyTotals(yearlyRecords) {
    let yearSave = null;
    let fatalityTotals = {};
    console.count("Set yearly totals with record ct: " + yearlyRecords.length);
    yearlyRecords.map(rec => {
      console.count(`Working on year ${rec.year}`);
      if (!yearSave || rec.year !== yearSave) {
        if (yearSave)
          this.yearlyTotals.push(this.cloneObj(fatalityTotals));
        yearSave = rec.year;
        this.categories.forEach(cat => (fatalityTotals[cat.name] = 0));
      }
      this.categories.forEach(cat => {
        fatalityTotals[cat.name] += Number(rec["tot_" + cat.name + "_killed"]);
      });
    });
    if (yearSave)
      this.yearlyTotals.push(this.cloneObj(fatalityTotals));
    /* Store yearly totals for each category */
    this.yearlyTotals.map(tots => {
      this.datasets[0].data.push(tots["persons"]);
      this.datasets[1].data.push(tots["pedestrians"]);
      this.datasets[2].data.push(tots["cyclists"]);
      this.datasets[3].data.push(tots["motorists"]);
    });
    console.count("Datasets 0: " + toStr(this.datasets[0]));
  }
}
export { NyBarChart };

/* For Debugging */
function toStr(obj) {
  return JSON.stringify(obj, null, 2);
}
