/* 
 *  NyRadarChart
 *  Config layouts for NY Collision Data Radar Charts.
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
    //line: { tension: 0.1, borderWidth: 2 }
    line: { stepped: true, borderWidth: 2 }
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

class NyRadarChart extends NyChart {
  constructor(
    categories,
    datasets = defaultDatasets.map(ds => JSON.parse(JSON.stringify(ds))),
    options = defaultOptions,
    labels = []
  ) {
    super(categories, datasets, options, labels);
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
}

export { NyRadarChart };
