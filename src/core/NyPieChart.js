/* 
 *  NyPieChart
 *  Config layouts for NY Collision Data Pie Charts.
 *  See: https://www.chartjs.org/ 
 *  and: https://vue-chartjs.org/
 * 
 */
import NyChart from "./NyChart";
import { nyColor } from "./Variables";

const defaultPieChartConfig = {
  datasets: [
    {
      data: [],
      backgroundColor: [
        nyColor.pedestrianColor,
        nyColor.cyclistColor,
        nyColor.motoristColor
      ]
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
    categories,
    datasets = JSON.parse(JSON.stringify(defaultPieChartConfig.datasets)),
    options = JSON.parse(JSON.stringify(defaultPieChartConfig.options)),
    labels = []
  ) {
    super(categories, datasets, options, labels);
  }

  setCategoryTotals() {
    this.datasets[0].data = this.categories.map(cat => {
      return cat.total;
    });
  }
}

export { NyPieChart };
