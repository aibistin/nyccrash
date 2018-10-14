/* 
 *  NyBarChart
 *  Config layouts for NY Collision Data Bar Charts.
 *  See: https://www.chartjs.org/ 
 *  and: https://vue-chartjs.org/
 * 
 */
import NyChart from "./NyChart";
import { chartColors } from "./Variables";

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
  constructor(Categories, stackOn, labels = []) {
    super(Categories);
    this.stackOn = this.Categories.getCat(stackOn) ? stackOn : "persons";
    this.labels = labels;
    this.datasets = [];
    this.options = JSON.parse(JSON.stringify(defaultOptions));
    this.yearlyTotals = [];
    this._initDatasets();
  }

  populateYearlyTotals(yearlyRecords) {
    let yearSave = null;
    let fatalityTotals = {};
    yearlyRecords.map(rec => {
      if (!yearSave || rec.year !== yearSave) {
        if (yearSave) this.yearlyTotals.push(this.cloneObj(fatalityTotals));
        yearSave = rec.year;
        this.Categories.names.forEach(catName => (fatalityTotals[catName] = 0));
      }
      this.Categories.names.forEach(catName => {
        fatalityTotals[catName] += Number(rec["tot_" + catName + "_killed"]);
      });
    });
    if (yearSave) this.yearlyTotals.push(this.cloneObj(fatalityTotals));
    /* Store yearly totals for each category */
    this.yearlyTotals.forEach(tots => {
      this.datasets.forEach(ds => {
        ds.data.push(tots[ds.name]);
      });
    });
  }

  _initDatasets() {
    this.Categories.categories.forEach((cat, idx) => {
      this.datasets[idx] = {
        name: cat.name,
        label: cat.label,
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 3
      };

      this.labels.forEach(label => {
        this.datasets[idx].backgroundColor.push(
          chartColors[cat.name].colorBackground
        );
        if (this.datasets[idx].name !== this.stackOn)
          this.datasets[idx].stack = this.stackOn;
        this.datasets[idx].borderColor.push(chartColors[cat.name].colorBorder);
      });
    });
  }
}
export { NyBarChart };
