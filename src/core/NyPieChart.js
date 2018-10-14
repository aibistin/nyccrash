/* 
 *  NyPieChart
 *  Config layouts for NY Collision Data Pie Charts.
 *  See: https://www.chartjs.org/ 
 *  and: https://vue-chartjs.org/
 * 
 */
import NyChart from "./NyChart";
import { chartColors } from "./Variables";

const defaultPieChartConfig = {
  datasets: [
    {
      data: [],
      backgroundColor: []
    }
  ],
  options: {
    elements: {
      line: { tension: 0.1, borderWidth: 2 }
    },
    title: {
      display: true,
      text: "",
      fontSize: 18,
      lineHeight: 1.8,
      fontColor: "#333"
    },
    layout: {
      padding: {
        top: 5,
        bottom: 5,
        left: 5,
        right: 5
      }
    }
  }
};

class NyPieChart extends NyChart {
  constructor(
    Categories,
    datasets = JSON.parse(JSON.stringify(defaultPieChartConfig.datasets)),
    options = JSON.parse(JSON.stringify(defaultPieChartConfig.options)),
    labels = []
  ) {
    super(Categories, datasets, options, labels);
    this._setChartColors();
    this.labels = labels.length ? labels : this.setLabels();
  }

  populateBoroughTotals() {
    this.datasets[0].data = this.Categories.getTotals().slice(1);
  }

  setLabels() {
    return (this.labels = this.Categories.getLabels().slice(1));
  }

  _setChartColors() {
    this.Categories.names.slice(1).forEach(name => {
      this.datasets[0].backgroundColor.push(chartColors[name].colorBackground);
    });
  }
}

export { NyPieChart };
