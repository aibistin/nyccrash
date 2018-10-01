/* 
 *  NyBarChart
 *  Config layouts for NY Collision Data Bar Charts.
 *  See: https://www.chartjs.org/ 
 *  and: https://vue-chartjs.org/
 * 
 */
import NyChart from "./NyChart";
import { chartColors } from "./Variables";

const defaultDatasets = [
  {
    name: "persons",
    label: "People",
    data: [],
    backgroundColor: [],
    borderColor: [],
    borderWidth: 1
  },
  {
    name: "pedestrians",
    label: "Pedestrians",
    stack: "people",
    data: [],
    backgroundColor: [],
    borderColor: [],
    borderWidth: 1
  },
  {
    name: "cyclists",
    label: "Cyclists",
    stack: "people",
    data: [],
    backgroundColor: [],
    borderColor: [],
    borderWidth: 1
  },
  {
    label: "Motorists",
    name: "motorists",
    stack: "people",
    data: [],
    backgroundColor: [],
    borderColor: [],
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
    fontColor: chartColors.fontColor
  },
  layout: {
    padding: {
      top: 1,
      bottom: 1,
      left: 1,
      right: 1
    }
  },
  scales: {
    xAxes: [
      {
        stacked: true,
        ticks: {
          beginAtZero: true
        }
      }
    ],
    yAxes: [
      {
        stacked: true,
        ticks: {
          beginAtZero: true
        }
      }
    ]
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
      if (!yearSave || rec.year !== yearSave) {
        if (yearSave) this.yearlyTotals.push(this.cloneObj(fatalityTotals));
        yearSave = rec.year;
        this.categories.forEach(cat => (fatalityTotals[cat.name] = 0));
      }
      this.categories.forEach(cat => {
        fatalityTotals[cat.name] += Number(rec["tot_" + cat.name + "_killed"]);
      });
    });
    if (yearSave) this.yearlyTotals.push(this.cloneObj(fatalityTotals));
    /* Store yearly totals for each category */
    this.yearlyTotals.map(tots => {
      this.datasets.forEach(ds => {
        ds.data.push(tots[ds.name]);
        ds.backgroundColor.push(chartColors[ds.name].colorBackground);
        ds.borderColor.push(chartColors[ds.name].color);
      });
      /*TODO push the colors for each year/category */
    });
  }
}
export { NyBarChart };

/* For Debugging */
function toStr(obj) {
  return JSON.stringify(obj, null, 2);
}