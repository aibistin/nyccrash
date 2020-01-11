/* 
 *  NyRadarChart
 *  Config layouts for NY Collision Data Radar Charts.
 *  See: https://www.chartjs.org/ 
 *  and: https://vue-chartjs.org/
 * 
 */
import NyChart from "./NyChart";
import { chartColors } from "./Variables";

const defaultDatasets = [
  //NOTE populate these using Category Array
  {
    name: "persons",
    label: "People",
    data: [],
    fill: false,
    backgroundColor: chartColors.persons.colorBackground,
    borderColor: chartColors.persons.color,
    pointBackgroundColor: chartColors.persons.color,
    pointBorderColor: chartColors.pointBorderColor,
    pointHoverBackgroundColor: chartColors.persons.colorBackground,
    pointHoverBorderColor: chartColors.persons.color,
    pointStyle: "circle"
  },
  {
    name: "pedestrians",
    label: "Pedestrians",
    data: [],
    fill: "origin",
    backgroundColor: chartColors.pedestrians.colorBackground,
    borderColor: chartColors.pedestrians.color,
    pointBackgroundColor: chartColors.pedestrians.colorBackground,
    pointBorderColor: chartColors.pointBorderColor,
    pointHoverBackgroundColor: chartColors.pedestrians.colorBackground,
    pointHoverBorderColor: chartColors.pedestrians.color,
    pointStyle: "circle"
  },
  {
    name: "cyclists",
    label: "Cyclists",
    data: [],
    fill: "origin",
    backgroundColor: chartColors.cyclists.colorBackground,
    borderColor: chartColors.cyclists.color,
    borderWidth: 2,
    pointBackgroundColor: chartColors.cyclists.color,
    pointBorderColor: chartColors.pointBorderColor,
    pointHoverBackgroundColor: chartColors.cyclists.colorBackground,
    pointHoverBorderColor: chartColors.cyclists.color,
    pointStyle: "circle"
  },
  {
    label: "Motorists",
    name: "motorists",
    data: [],
    fill: "origin",
    backgroundColor: chartColors.motorists.colorBackground,
    borderColor: chartColors.motorists.colorBackground,
    pointBackgroundColor: chartColors.motorists.color,
    pointBorderColor: chartColors.pointBorderColor,
    pointHoverBackgroundColor: chartColors.motorists.colorBackground,
    pointHoverBorderColor: chartColors.motorists.color,
    pointStyle: "circle"
  }
];

const defaultOptions = {
  responsive: false,
  maintainAspectRatio: false,
  elements: {
    line: {
      tension: 0.1,
      //  stepped: true,
      borderWidth: 1
    }
  },
  title: {
    display: true,
    text: "",
    fontSize: 18,
    lineHeight: 1.8,
    fontColor: chartColors.fontColor
  },
  layout: {
    padding: {
      top: 4,
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
    Categories,
    datasets = defaultDatasets.map(ds => JSON.parse(JSON.stringify(ds))),
    options = JSON.parse(JSON.stringify(defaultOptions)),
    labels = []
  ) {
    super(Categories, datasets, options, labels);
  }

  populateBoroughTotals(newBoroughData) {
    //NOTE this can now be got from the Categories Obj
    newBoroughData.forEach(rec => {
      this.datasets.forEach(ds => {
        ds.data.push(rec["tot_" + ds.name + "_killed"]);
      });
    });
  }

  populateCollisionMax(newBoroughData) {
    newBoroughData.forEach(rec => {
      this.datasets.forEach(ds => {
        // "max_persons_killed_in_single_accident": "5",
        //NOTE this can now be got from the Categories Obj
        ds.data.push(rec["max_" + ds.name + "_killed_in_single_accident"]);
      });
    });
  }
}

export { NyRadarChart };
