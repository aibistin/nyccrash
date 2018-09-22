/* 
 *  NyRadarChart
 *  Extends RadarChart 
 *  Config layouts for Charts.
 *  See: https://www.chartjs.org/ 
 *  and: https://vue-chartjs.org/
 * 
 */
import { nyColor } from "./Variables";

const defaultDataset = [
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
    name: "cyslists",
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
    datasets = defaultDataset,
    options = defaultOptions,
    labels = []
  ) {
    this.datasetss = datasets;
    this.options = options;
    this.labels = labels;
    this.categories = this.datasets.map(ds => {
      return {
        name: ds.name,
        total: 0,
        maxOneTime: 0
      };
    });
  }

  /* Label Methods */
  setLabels(newLabels) {
    return (this.labels = newLabels);
  }
  getLabels() {
    return this.labels;
  }

  /* Dataset Methods */
  setData(name = null, newData = []) {
    if (!name) {
      this.datasets.forEach(ds => (ds.data = newData));
    } else {
      let thisDs = this.datasets.find(ds => ds.name == name);
      thisDs.data = newData;
    }
  }

  setBoroughTotals(newData) {
    newData.forEach(rec => {
      this.datasets.forEach(ds => {
        let catBoroughTot = rec["tot_" + ds.name + "_killed"];
        ds.data.push(catBoroughTot);
        const thisCat = this.categories.find(cat => cat.name == name);
        thisCat.total += Number(catBoroughTot);
      });
    });
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

  setTitleText(newText) {
    if (!newText) return this.options.title.txt;
    return this.setTitle(newText);
  }

  layout(newLayout) {
    return newLayout ? (this.options.layout = newLayout) : this.options.layout;
  }
}

export { NyRadarChart };
