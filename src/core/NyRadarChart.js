/* 
 *  NyRadarChart
 *  Config layouts for NY Collision Data Radar Charts.
 *  See: https://www.chartjs.org/ 
 *  and: https://vue-chartjs.org/
 * 
 */
import { nyColor } from "./Variables";

const defaultDatasets = [
  {
    name: "persons",
    label: "People",
    data: [],
    fill: false,
    backgroundColor: nyColor.peopleBackColor,
    borderColor: nyColor.peopleColor,
    pointBackgroundColor: nyColor.peopleColor,
    pointBorderColor: nyColor.pointBorderColor,
    pointHoverBackgroundColor: nyColor.peopleBackColor,
    pointHoverBorderColor: nyColor.peopleColor,
    pointStyle: "cross"
  },
  {
    name: "pedestrians",
    label: "Pedestrians",
    data: [],
    fill: false,
    backgroundColor: nyColor.pedestrianBackColor,
    borderColor: nyColor.pedestrianColor,
    pointBackgroundColor: nyColor.pedestrianColor,
    pointBorderColor: nyColor.pointBorderColor,
    pointHoverBackgroundColor: nyColor.pedestrianBackColor,
    pointHoverBorderColor: nyColor.pedestrianColor,
    pointStyle: "cross"
  },
  {
    name: "cyclists",
    label: "Cyclists",
    data: [],
    fill: "+2",
    backgroundColor: nyColor.cyclistBackColor,
    borderColor: nyColor.cyclistColor,
    //borderWidth: 1,
    pointBackgroundColor: nyColor.cyclistColor,
    pointBorderColor: nyColor.pointBorderColor,
    pointHoverBackgroundColor: nyColor.cyclistBackColor,
    pointHoverBorderColor: nyColor.cyclistColor,
    pointStyle: "cross"
  },
  {
    label: "Motorists",
    name: "motorists",
    data: [],
    fill: "+2",
    backgroundColor: nyColor.motoristBackColor,
    borderColor: nyColor.motoristColor,
    pointBackgroundColor: nyColor.motoristColor,
    pointBorderColor: nyColor.pointBorderColor,
    pointHoverBackgroundColor: nyColor.motoristBackColor,
    pointHoverBorderColor: nyColor.motoristColor,
    pointStyle: "cross"
  }
];

const defaultOptions = {
  elements: {
    line: { tension: 0.1, borderWidth: 2 }
    //line: { stepped: true, borderWidth: 2 }
  },
  title: {
    display: true,
    text: "Borough Fatalities",
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
  },
  scale: {
    display: true
  }
};

class NyRadarChart {
  constructor(
    categories,
    datasets = defaultDatasets.map(ds => JSON.parse(JSON.stringify(ds))),
    options = defaultOptions,
    labels = []
  ) {
    this.categories = categories;
    this.datasets = datasets;
    this.options = options;
    this.labels = labels;
  }

  /* Label Methods */
  labels(newLabels) {
    return newLabels ? (this.labels = newLabels) : this.labels;
  }

  /* Dataset Methods */
  setData(name = null, newData = []) {
    if (!name) {
      this.datasets.forEach(ds => (ds.data = newData));
    } else {
      let thisDs = this.datasets.find(ds => ds.name === name);
      if (thisDs) {
        thisDs.data = newData;
      } else {
        throw `Error: No dataset with name ${name}`;
      }
    }
  }

  setBoroughTotals(newBoroughData) {
    newBoroughData.forEach(rec => {
      this.datasets.forEach(ds => {
        let catBoroughTot = rec["tot_" + ds.name + "_killed"];
        ds.data.push(catBoroughTot);
        const thisCat = this.categories.find(cat => cat.name === ds.name);
        if (thisCat) {
          thisCat.total += Number(catBoroughTot);
        } else {
          throw `Error: No cateory with name ${ds.name}`;
        }
      });
    });
  }

  setCollisionMax(newBoroughData) {
    newBoroughData.forEach(rec => {
      this.datasets.forEach(ds => {
        // "max_persons_killed_in_single_accident": "5",
        let catBoroughMax =
          rec["max_" + ds.name + "_killed_in_single_accident"];
        const thisCat = this.categories.find(cat => cat.name === ds.name);
        ds.data.push(catBoroughMax);
        /* Also get the Grand Max for each Category */
        thisCat.maxOneTime =
          Number(catBoroughMax) > thisCat.maxOneTime
            ? Number(catBoroughMax)
            : thisCat.maxOneTime;
      });
    });
  }

  chartData() {
    return {
      labels: this.labels,
      datasets: this.datasets
    };
  }

  /* Options Methods */
  title(newTitle) {
    if (!newTitle) return this.options.newTitle;
    if (typeof newTitle === "object") {
      return (this.options.title = newTitle);
    } else {
      /* Hack to get around normal assumption that "title" is a string */
      return (this.options.title.text = newTitle);
    }
  }

  titleText(newText) {
    return newText ? this.title(newText) : this.options.title.txt;
  }

  layout(newLayout) {
    return newLayout ? (this.options.layout = newLayout) : this.options.layout;
  }
}

export { NyRadarChart };
