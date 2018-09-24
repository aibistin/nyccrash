/* 
 *  NyPieChart
 *  Config layouts for NY Collision Data Pie Charts.
 *  See: https://www.chartjs.org/ 
 *  and: https://vue-chartjs.org/
 * 
 */
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
      text: "Fatalities",
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

class NyPieChart {
  constructor(
    categories,
    datasets = defaultPieChartConfig.datasets,
    options = defaultPieChartConfig.options,
    labels = []
  ) {
    this.categories = categories;
    this.datasets = JSON.parse(JSON.stringify(datasets));
    this.options = JSON.parse(JSON.stringify(options));
    this.labels = labels;
  }

  /* Label Methods */
  labels(newLabels) {
    return newLabels ? (this.labels = newLabels) : this.labels;
  }

  chartData() {
    return {
      labels: this.labels,
      datasets: this.datasets
    };
  }

  setCategoryTotals() {
    this.datasets[0].data = this.categories.map(cat => {
      //if (cat.name !== "persons") return cat.total;
      return cat.total;
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

  titleText(newText) {
    return newText ? this.title(newText) : this.options.title.txt;
  }

  layout(newLayout) {
    return newLayout ? (this.options.layout = newLayout) : this.options.layout;
  }
}

export { NyPieChart };
